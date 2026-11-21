import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  autoplayFrame,
  closestPhase,
  measureOrbit,
  ORBIT_RESUME_SECONDS,
  ORBIT_REVOLUTION_SECONDS,
  projectSlot,
  travelFrame,
  wrapSlot,
} from "../src/components/industries/industryOrbit.js";
import {
  ALL_INDUSTRY_OPTIONS,
  INDUSTRIES,
  industryAnchor,
} from "../src/data/industries.js";

const SECTORS = [
  ["healthcare", "Healthcare & Medical"],
  ["education", "Education & EdTech"],
  ["retail-ecommerce", "Retail & E-commerce"],
  ["jewellery-fashion", "Jewellery & Fashion"],
  ["human-resources", "Human Resources"],
  ["manufacturing", "Manufacturing & Industrial"],
  ["robotics", "Robotics & Intelligent Automation"],
  ["construction", "Construction & Infrastructure"],
  ["finance-fintech", "Finance & FinTech"],
  ["real-estate", "Real Estate & Property Technology"],
  ["agriculture", "Agriculture & AgriTech"],
  ["automotive", "Automotive & Mobility"],
  ["energy", "Energy & Utilities"],
  ["logistics", "Logistics & Supply Chain"],
  ["hospitality-travel", "Hospitality & Travel"],
  ["telecommunications", "Telecommunications"],
  ["media-entertainment", "Media & Entertainment"],
  ["professional-services", "Professional Services"],
];
const COUNT = SECTORS.length;
const WIDTHS = [320, 390, 430, 640, 768, 1024, 1229, 1440, 1536];
const near = (a, b, tolerance = 1e-7) =>
  assert.ok(Math.abs(a - b) < tolerance, `${a} ≠ ${b}`);
const hashAsset = ({ src }) =>
  createHash("sha256")
    .update(readFileSync(new URL(`../public${src}`, import.meta.url)))
    .digest("hex");
const emptyPose = () => ({ phase: 0, lifts: Array(COUNT).fill(0) });

test("the orbit, industry anchors and inquiry form retain the complete sector catalogue", () => {
  assert.deepEqual(
    INDUSTRIES.map(({ id, title }) => [id, title]),
    SECTORS,
  );
  assert.deepEqual(ALL_INDUSTRY_OPTIONS, [
    ...SECTORS.map(([, title]) => title),
    "Technology / SaaS Startup",
    "Other Business Sector",
  ]);
  assert.deepEqual(
    INDUSTRIES.map(({ id }) => industryAnchor(id)),
    SECTORS.map(([id]) => `industry-${id}`),
  );
  for (const entry of INDUSTRIES) {
    assert.ok(entry.summary.length > 50);
    assert.ok(entry.subtitle.length < 50);
    assert.ok(entry.alt);
    assert.ok(entry.challenges.length >= 2);
    assert.ok(entry.capabilities.length >= 2);
    assert.ok(entry.solutions.length >= 4);
    assert.equal(entry.portrait.width / entry.portrait.height, 3 / 4);
  }
  assert.equal(
    new Set(INDUSTRIES.map(({ portrait }) => hashAsset(portrait))).size,
    COUNT,
  );
  assert.equal(
    new Set(INDUSTRIES.map(({ cover }) => hashAsset(cover))).size,
    COUNT,
  );
});

test("wraparound and interruptions use the shortest arc from the current phase", () => {
  assert.equal(wrapSlot(-1, COUNT), 17);
  assert.equal(wrapSlot(18, COUNT), 0);
  assert.equal(closestPhase(17, 0, COUNT), 18);
  assert.equal(closestPhase(0, 17, COUNT), -1);
  near(closestPhase(17.7, 1, COUNT), 19);
  near(closestPhase(1.3, 17, COUNT), -1);
  for (let phase = -COUNT; phase < 2 * COUNT; phase += 0.125) {
    for (let index = 0; index < COUNT; index++) {
      const next = closestPhase(phase, index, COUNT);
      near(wrapSlot(next + COUNT, COUNT), index);
      assert.ok(Math.abs(phase - next) <= COUNT / 2);
    }
  }
});

for (const width of WIDTHS) {
  test(`${width}px: front-to-back projection stays centred and fits the stage`, () => {
    const layout = measureOrbit(width);
    const front = projectSlot(layout, COUNT, 0, 0);
    const rear = projectSlot(layout, COUNT, COUNT / 2, 0);
    near(front.x, width / 2);
    near(rear.x, width / 2);
    assert.ok(front.y > rear.y);
    assert.ok(front.scale > 1.8 * rear.scale);
    assert.ok(front.zIndex > rear.zIndex);
    assert.ok(front.clarity > rear.clarity);

    const lift = projectSlot(layout, COUNT, 0, 0, 1);
    near(lift.x, width / 2);
    assert.ok(lift.y < front.y && lift.zIndex > front.zIndex);
    assert.ok(lift.scale > front.scale);
    const liftTop = lift.y - (layout.cardWidth * lift.scale) / 1.5;
    const rearTop = rear.y - (layout.cardWidth * rear.scale) / 1.5;
    assert.ok(
      liftTop - rearTop >= 14 - 1e-7,
      "opposite card remains exposed when selected",
    );
    assert.ok(
      lift.y + (layout.cardWidth * lift.scale) / 1.5 < layout.captionTop,
    );

    for (let phase = 0; phase <= COUNT; phase += 0.2) {
      for (let i = 0; i < COUNT; i++) {
        const pose = projectSlot(layout, COUNT, i, phase);
        const nextTurn = projectSlot(layout, COUNT, i, phase + COUNT);
        near(pose.x, nextTurn.x);
        near(pose.y, nextTurn.y);
        near(pose.scale, nextTurn.scale);
        const halfWidth = (layout.cardWidth * pose.scale) / 2;
        const halfHeight = halfWidth / (3 / 4);
        assert.ok(
          pose.x - halfWidth >= 0 && pose.x + halfWidth <= layout.width,
        );
        assert.ok(
          pose.y - halfHeight >= 0 && pose.y + halfHeight <= layout.height,
        );
      }
    }

    for (let index = 1; index < COUNT / 2; index++) {
      const left = projectSlot(layout, COUNT, -index, 0);
      const right = projectSlot(layout, COUNT, index, 0);
      near(left.x + right.x, width);
      near(left.y, right.y);
      near(left.scale, right.scale);
      near(left.yaw, -right.yaw);
    }
  });
}

test("handoffs start at the live pose and put the previous portrait back on its own slot", () => {
  const pose = emptyPose();
  pose.phase = 16;
  pose.lifts[16] = 1;
  let from = structuredClone(pose);
  let target = closestPhase(pose.phase, 0, COUNT);
  travelFrame(from, target, 0, 0.49, pose);
  assert.ok(pose.phase > 16 && pose.phase < 18);
  assert.ok(pose.lifts[16] > 0 && pose.lifts[0] > 0);

  from = structuredClone(pose);
  target = closestPhase(pose.phase, 14, COUNT);
  travelFrame(from, target, 14, 0, pose);
  assert.deepEqual(pose, from);
  travelFrame(from, target, 14, 0.62, pose);
  assert.equal(pose.lifts[16], 0);
  assert.equal(pose.lifts[0], 0);
  travelFrame(from, target, 14, 1, pose);
  near(wrapSlot(pose.phase, COUNT), 14);
  assert.deepEqual(
    pose.lifts,
    Array.from({ length: COUNT }, (_, index) => Number(index === 14)),
  );
});

test("autoplay lowers from the current pose and eases to the 75-second pace", () => {
  const from = { phase: 17.94, lifts: emptyPose().lifts };
  from.lifts[4] = 0.74;
  from.lifts[5] = 0.18;
  const pose = emptyPose();
  const elapsedPhase = (time) =>
    wrapSlot(
      autoplayFrame(from, COUNT, time, pose).phase - from.phase + COUNT / 2,
      COUNT,
    ) -
    COUNT / 2;
  near(elapsedPhase(0), 0);
  assert.deepEqual(pose.lifts, from.lifts);

  const speed = COUNT / ORBIT_REVOLUTION_SECONDS;
  const dt = 0.0001;
  assert.ok(elapsedPhase(dt) / dt < 0.0001);
  near(
    elapsedPhase(ORBIT_RESUME_SECONDS / 2),
    speed * ORBIT_RESUME_SECONDS * 0.09375,
  );
  near(pose.lifts[4], 0.37);
  const rampEnd = elapsedPhase(ORBIT_RESUME_SECONDS);
  near(rampEnd, (speed * ORBIT_RESUME_SECONDS) / 2);
  assert.deepEqual(pose.lifts, emptyPose().lifts);
  near((rampEnd - elapsedPhase(ORBIT_RESUME_SECONDS - dt)) / dt, speed);
  near((elapsedPhase(ORBIT_RESUME_SECONDS + dt) - rampEnd) / dt, speed);
});

test("autoplay covers one continuous turn per lap regardless of frame cadence", () => {
  const from = { phase: 5.45, lifts: emptyPose().lifts };
  const frame = (seconds) => autoplayFrame(from, COUNT, seconds, emptyPose());
  const start = frame(ORBIT_RESUME_SECONDS);
  const quarter = frame(ORBIT_RESUME_SECONDS + ORBIT_REVOLUTION_SECONDS / 4);
  near(wrapSlot(quarter.phase - start.phase, COUNT), COUNT / 4);
  const lapEnd = frame(ORBIT_RESUME_SECONDS + ORBIT_REVOLUTION_SECONDS);
  near(lapEnd.phase, start.phase);

  const layout = measureOrbit(1440);
  for (let index = 0; index < COUNT; index++) {
    const a = projectSlot(layout, COUNT, index, start.phase);
    const b = projectSlot(layout, COUNT, index, lapEnd.phase);
    near(a.x, b.x);
    near(a.y, b.y);
    near(a.scale, b.scale);
    assert.equal(a.zIndex, b.zIndex);
  }
  // Sampling once after an uneven frame interval produces the same pose
  // as stepping there at either a low or high refresh rate.
  const time = ORBIT_RESUME_SECONDS + ORBIT_REVOLUTION_SECONDS + 1.333;
  for (const fps of [24, 60, 144]) {
    const pose = emptyPose();
    for (let t = 0; t < time; t += 1 / fps) autoplayFrame(from, COUNT, t, pose);
    assert.deepEqual(autoplayFrame(from, COUNT, time, pose), frame(time));
  }
});
