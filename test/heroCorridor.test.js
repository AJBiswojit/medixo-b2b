import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  corridorPose,
  measureCorridor,
} from "../src/animations/heroCorridor.js";
import { HERO_GALLERY } from "../src/data/heroGallery.js";
import { SERVICES } from "../src/data/services.js";

const COUNT = 12;
const WINDOWS = [
  [1440, 827, "desktop"],
  [1280, 477, "desktop"],
  [2560, 1367, "desktop"],
  [768, 959, "tablet"],
  [390, 779, "mobile"],
  [320, 503, "mobile"],
];

function poses(layout, travel, depth) {
  return HERO_GALLERY.map((_, index) =>
    corridorPose(layout, { travel, depth }, index, COUNT),
  );
}

function projection(layout, pose) {
  return 1 - pose.z / layout.perspective;
}

function screenHeight(layout, pose) {
  return (layout.portraitHeight * pose.scale) / projection(layout, pose);
}

test("the hero contains eight catalogue services and four independent industry portraits", () => {
  assert.equal(HERO_GALLERY.length, COUNT);
  assert.deepEqual(
    HERO_GALLERY.slice(0, 8).map(({ id, title }) => ({ id, title })),
    SERVICES.map(({ id, title }) => ({ id, title })),
  );
  assert.deepEqual(
    HERO_GALLERY.slice(8).map(({ title }) => title),
    [
      "Robotics & Intelligent Systems",
      "Construction & Infrastructure",
      "Healthcare & Medical Technology",
      "Retail, Fashion & Digital Commerce",
    ],
  );
  assert.ok(
    HERO_GALLERY.every((card) => !("number" in card || "category" in card)),
  );
  const hashes = new Set();
  for (const { image, smallImage, imageWidth, imageHeight } of HERO_GALLERY) {
    assert.equal(imageWidth / imageHeight, 3 / 4);
    for (const src of [image, smallImage]) {
      assert.ok(src.startsWith("/images/photography/hero/"));
      const data = readFileSync(new URL(`../public${src}`, import.meta.url));
      assert.equal(data.toString("ascii", 8, 12), "WEBP");
      hashes.add(createHash("sha256").update(data).digest("hex"));
    }
  }
  assert.equal(hashes.size, COUNT * 2);
});

for (const [width, height, mode] of WINDOWS) {
  test(`${mode} ${width} × ${height}: all twelve foreground portraits fit`, () => {
    const layout = measureCorridor(width, height, mode);
    for (let i = 0; i < COUNT; i++) {
      const all = poses(layout, i, 1);
      const focus = all[i];
      assert.deepEqual(
        all.filter((p) => p.primary),
        [focus],
      );
      assert.equal(focus.x, 0);
      assert.equal(Math.abs(focus.yaw), 0);
      assert.equal(focus.opacity, 1);
      assert.equal(focus.caption, 1);
      assert.equal(focus.shade, 0);
      assert.ok(
        focus.z > Math.max(...all.filter((p) => p !== focus).map((p) => p.z)),
      );
      const h = screenHeight(layout, focus);
      const w = h * 0.75;
      assert.ok(w <= width - 39 && w <= 330.01);
      assert.ok(Math.abs(h - layout.foregroundHeight) < 0.01);
      assert.ok(h - layout.portraitHeight >= 15.99);
      assert.ok(focus.y / projection(layout, focus) + height / 2 - h / 2 > 0);
      assert.ok(focus.captionY < height - 100);
    }
  });

  test(`${mode} ${width} × ${height}: enlargement stays inside the focal aperture`, () => {
    const layout = measureCorridor(width, height, mode);
    const base = { ...layout, foregroundHeight: layout.portraitHeight };
    for (const [travel, depth] of [
      [-0.5, 0],
      [-0.18, 0.64],
      [2, 1],
      [5.38, 1],
      [mode === "mobile" ? 11 : 11.25, 0.25],
      [COUNT - 0.5, 0],
    ]) {
      const unscaled = poses(base, travel, depth);
      for (const [i, pose] of poses(layout, travel, depth).entries()) {
        if (!pose.primary) assert.deepEqual(pose, unscaled[i]);
      }
    }
  });

  test(`${mode} ${width} × ${height}: the reset restores each opening pose exactly`, () => {
    const layout = measureCorridor(width, height, mode);
    const opening = poses(layout, -0.5, 0);
    const restored = poses(layout, COUNT - 0.5, 0);
    assert.deepEqual(restored, opening);
    assert.ok(
      restored.every((p) => !p.primary && p.caption === 0 && p.shade === 0),
    );
  });

  test(`${mode} ${width} × ${height}: no competing foreground or captions in handoffs`, () => {
    const layout = measureCorridor(width, height, mode);
    for (let i = 0; i <= 1100; i++) {
      const all = poses(layout, i / 100, 1);
      assert.ok(all.filter((p) => p.primary).length <= 1);
      assert.ok(all.filter((p) => p.caption > 0).length <= 1);
      if (mode === "mobile")
        assert.ok(all.filter((p) => p.opacity > 0).length <= 1);
    }
  });
}

test("the six opening stations mirror both banks and recede to the horizon", () => {
  const layout = measureCorridor(1440, 827, "desktop");
  const opening = poses(layout, -0.5, 0);
  for (let i = 0; i < COUNT / 2; i++) {
    const right = opening[i];
    const left = opening[COUNT - 1 - i];
    assert.equal(right.opacity, 1);
    assert.equal(right.x, -left.x);
    assert.equal(right.yaw, -left.yaw);
    assert.equal(right.z, left.z);
    assert.equal(left.y, 0);
    if (i === 0) continue;
    assert.ok(right.z > opening[i - 1].z);
    assert.ok(
      screenHeight(layout, right) > screenHeight(layout, opening[i - 1]),
    );
  }
  assert.ok(
    screenHeight(layout, opening[5]) > 4 * screenHeight(layout, opening[0]),
  );
});

test("the cyclic wrap stays hidden at the periphery", () => {
  const layout = measureCorridor(1440, 827, "desktop");
  for (const travel of [0, 0.5, 5.5, 11]) {
    assert.equal(
      poses(layout, travel, 1).filter(({ opacity }) => opacity === 0).length,
      Number.isInteger(travel) ? 1 : 0,
    );
  }
});

test("the mobile reset recesses the final portrait before trading photos at the opening slot", () => {
  const layout = measureCorridor(390, 779, "mobile");
  let h = layout.foregroundHeight;
  for (let step = 0; step <= 100; step++) {
    const all = poses(layout, COUNT - 1, 1 - step / 100);
    assert.deepEqual(
      all.filter((p) => p.opacity > 0),
      [all.at(-1)],
    );
    const next = screenHeight(layout, all.at(-1));
    assert.ok(next <= h + 0.001);
    h = next;
  }
  const { opacity: _, ...opening } = poses(layout, -0.5, 0)[0];
  let firstAlpha = 0;
  let lastAlpha = 1;
  for (let step = 0; step <= 100; step++) {
    const all = poses(layout, COUNT - 1 + step / 200, 0);
    assert.ok(all.slice(1, -1).every((p) => p.opacity === 0));
    assert.equal(Math.max(all[0].opacity, all.at(-1).opacity), 1);
    assert.ok(all[0].opacity >= firstAlpha);
    assert.ok(all.at(-1).opacity <= lastAlpha);
    firstAlpha = all[0].opacity;
    lastAlpha = all.at(-1).opacity;
    for (const { opacity, ...pose } of all.filter((p) => p.opacity > 0)) {
      // Multiplication by zero can preserve the side's sign. Compare the
      // physical pose rather than distinguishing -0 from +0.
      assert.deepEqual(
        { ...pose, x: pose.x || 0, yaw: pose.yaw || 0 },
        {
          ...opening,
          x: opening.x || 0,
          yaw: opening.yaw || 0,
        },
      );
    }
  }
});
