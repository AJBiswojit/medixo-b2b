import { gsap } from "./animationConfig";

// Desktop hero choreography.
//
// One scrubbed master timeline (ScrollTrigger scrub) owns a single progress
// value `p`. Every card is a pure function of `p`, so scrolling back replays
// the same frames and no per-frame state leaks between passes.
//
// Four scenes (fractions of the pinned scroll distance):
//   01 Introduction  0.00 – 0.20  eight original cards at rest, ambient motion only
//   02 Reveal        0.20 – 0.44  two waves of four cards travel parabolic arcs
//                                 into a balanced two-column arrangement
//   03 Showcase      0.44 – 0.80  eight industry cards enter in four pairs and
//                                 each takes over the slot of its original card
//   04 Conclusion    0.80 – 1.00  ambient motion decays, the scene label resolves
//                                 and the pin releases into About
//
// Coordinates are artboard fractions for card centres. The slot a card lands
// in is the same one its sector card occupies in the showcase.

const SCENE = { reveal: 0.2, showcase: 0.44, settle: 0.8 };

// Wave 1 leaves first, wave 2 follows once wave 1 is in motion. Within a wave,
// cards start 0.012 apart so the group reads as one gesture.
const WAVES = [
  {
    window: [0.2, 0.33],
    arc: [0, -0.09], // lift: a parabola bowing upwards
    depth: 36,
    cards: ["ai", "education", "healthcare", "commerce"],
  },
  {
    window: [0.31, 0.42],
    arc: [0, 0.07], // lift: a parabola dipping downwards
    depth: -50,
    cards: ["vision", "automation", "enterprise", "creative"],
  },
];

// Final arrangement: outer cards hold the edges, inner cards step inwards, and
// the centre stays open for the scene label. Vertical gaps keep neighbours
// apart at every desktop size. The sector each slot shows is in the comment.
const FINAL = {
  ai: { x: 0.11, y: 0.24, tilt: -3 }, // Robotics
  healthcare: { x: 0.89, y: 0.24, tilt: 3 }, // Energy
  vision: { x: 0.28, y: 0.42, tilt: 2.5 }, // Automotive
  enterprise: { x: 0.72, y: 0.42, tilt: -2.5 }, // Finance
  automation: { x: 0.11, y: 0.63, tilt: -2 }, // Manufacturing
  creative: { x: 0.89, y: 0.63, tilt: 2 }, // Construction
  education: { x: 0.28, y: 0.81, tilt: 3 }, // Agriculture
  commerce: { x: 0.72, y: 0.81, tilt: -3 }, // Logistics
};

// Sector entrances, in the requested order, as pairs: Robotics + Construction,
// Manufacturing + Finance, Agriculture + Automotive, Energy + Logistics.
const SECTOR_ENTRY = {
  ai: 0.44,
  creative: 0.47,
  automation: 0.515,
  enterprise: 0.545,
  education: 0.59,
  vision: 0.62,
  healthcare: 0.665,
  commerce: 0.695,
};
const RETIRE_LENGTH = 0.07; // the original fades out first ...
const ENTER_DELAY = 0.04; // ... then its sector card rises into the same slot.
const ENTER_LENGTH = 0.08;

const TARGET_WIDTH = 0.13; // readable card width as a fraction of the artboard
const SCALE_RANGE = [0.95, 1.12];

// Ambient drift is tied to scroll, not time. It is strongest in the opening
// composition and decays to zero as the conclusion settles.
const AMBIENT = [
  [0, 4],
  [0.2, 3.4],
  [0.44, 2.2],
  [0.8, 1.1],
  [1, 0],
];

const ease = gsap.parseEase("sine.inOut");
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const lerp = (a, b, t) => a + (b - a) * t;
const windowed = (p, [start, end]) => ease(clamp01((p - start) / (end - start)));

function piecewise(p, points) {
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i];
    if (p <= x1) {
      const [x0, y0] = points[i - 1];
      return lerp(y0, y1, (p - x0) / (x1 - x0));
    }
  }
  return points[points.length - 1][1];
}

// Quadratic Bézier: a parabolic path whose control point sets the arc.
function quadratic(a, control, b, t) {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * control.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * control.y + t * t * b.y,
  };
}

function measureSlots(select, gallery) {
  const width = gallery.clientWidth;
  const height = gallery.clientHeight;
  const center = (card) => ({
    x: card.offsetLeft + card.offsetWidth / 2,
    y: card.offsetTop + card.offsetHeight / 2,
  });
  return Object.entries(FINAL).map(([slot, final], index) => {
    const original = select(`[data-hero-card="${slot}"]`)[0];
    const sector = select(`[data-hero-industry="${slot}"]`)[0];
    const wave = WAVES.findIndex((spec) => spec.cards.includes(slot));
    return {
      slot,
      final,
      original,
      sector,
      target: { x: final.x * width, y: final.y * height },
      restOriginal: center(original),
      restSector: center(sector),
      tilt: parseFloat(original.style.getPropertyValue("--tile-tilt")) || 0,
      side: final.x < 0.5 ? -1 : 1,
      finalScale: clampScale((TARGET_WIDTH * width) / original.offsetWidth),
      wave,
      waveOrder: WAVES[wave].cards.indexOf(slot),
      phase: index * 0.9,
      height,
    };
  });
}

function clampScale(value) {
  return Math.min(SCALE_RANGE[1], Math.max(SCALE_RANGE[0], value));
}

function poseOriginal(slot, p) {
  const { final, target, restOriginal, side, tilt, wave, waveOrder } = slot;
  const spec = WAVES[wave];
  const start = spec.window[0] + waveOrder * 0.012;
  const t = windowed(p, [start, spec.window[1]]);
  const control = {
    x: (restOriginal.x + target.x) / 2,
    y: (restOriginal.y + target.y) / 2 + spec.arc[1] * slot.height,
  };
  const position = quadratic(restOriginal, control, target, t);
  const bow = Math.sin(Math.PI * t);
  return {
    ...position,
    z: spec.depth * bow,
    scale: lerp(1, slot.finalScale, t),
    rotate: lerp(tilt, final.tilt, t) + side * 4 * bow,
    rotateX: wave === 0 ? -5 * bow : 4 * bow,
    rotateY: -side * 7 * bow,
    opacity: 1,
  };
}

function poseSector(slot, p) {
  const { final, target, side } = slot;
  const start = SECTOR_ENTRY[slot.slot] + ENTER_DELAY;
  const t = windowed(p, [start, start + ENTER_LENGTH]);
  const from = {
    x: target.x + side * 60,
    y: target.y + 30,
  };
  const control = {
    x: target.x + side * 18,
    y: target.y - 40,
  };
  const position = quadratic(from, control, target, t);
  return {
    ...position,
    z: -160 * (1 - t),
    scale: slot.finalScale * (0.9 + 0.1 * t),
    rotate: final.tilt - 4 * side * (1 - t),
    rotateX: 4 * (1 - t),
    rotateY: side * 6 * (1 - t),
    opacity: t,
  };
}

// The original is retired in place just before its sector card rises into the
// same slot, so the artboard keeps eight cards at every moment.
function retireOriginal(pose, slot, p) {
  const start = SECTOR_ENTRY[slot.slot];
  const r = windowed(p, [start, start + RETIRE_LENGTH]);
  return {
    ...pose,
    x: pose.x + slot.side * 30 * r,
    z: pose.z - 150 * r,
    scale: pose.scale * (1 - 0.08 * r),
    opacity: 1 - r,
  };
}

function applyPose(card, rest, pose, wobble) {
  const dx = pose.x - rest.x;
  const dy = pose.y - rest.y + wobble.y;
  const rotate = pose.rotate + wobble.rotate;
  card.style.transform =
    `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, ${pose.z.toFixed(2)}px) ` +
    `rotateX(${pose.rotateX.toFixed(2)}deg) rotateY(${pose.rotateY.toFixed(2)}deg) ` +
    `rotate(${rotate.toFixed(2)}deg) scale(${pose.scale.toFixed(4)})`;
  const opacity = clamp01(pose.opacity);
  card.style.opacity = opacity.toFixed(3);
  const visibility = opacity < 0.01 ? "hidden" : "visible";
  if (card.style.visibility !== visibility) card.style.visibility = visibility;
}

function clearCard(card) {
  card.style.removeProperty("transform");
  card.style.removeProperty("opacity");
  card.style.removeProperty("visibility");
}

function createDesktopScene(scope, select) {
  const [scene] = select(".hero-scene");
  const [gallery] = select(".hero-gallery");
  const [progress] = select(".hero-progress-fill");
  const [scrim] = select(".hero-scrim");
  const [content] = select(".hero-content");
  const [actions] = select(".hero-actions");
  const [copy] = select(".hero-copy");
  const [tagline] = select(".hero-tagline");
  const [title] = select(".hero-title");
  const [label] = select(".hero-scene-label");

  let slots = [];
  const state = { p: 0 };

  const draw = () => {
    const p = state.p;
    const amp = piecewise(p, AMBIENT);
    for (const slot of slots) {
      const wobble = {
        y: amp * Math.sin(2 * Math.PI * 2.2 * p + slot.phase),
        rotate: 0.22 * amp * Math.sin(2 * Math.PI * 1.7 * p + slot.phase + 1.1),
      };
      applyPose(
        slot.original,
        slot.restOriginal,
        retireOriginal(poseOriginal(slot, p), slot, p),
        wobble,
      );
      applyPose(slot.sector, slot.restSector, poseSector(slot, p), wobble);
    }
  };

  const measure = () => {
    slots = measureSlots(select, gallery);
    draw();
  };
  measure();

  const timeline = gsap.timeline({
    defaults: { ease: "sine.inOut" },
    onUpdate: draw,
    scrollTrigger: {
      id: "hero-scene",
      trigger: scene,
      start: () => `top top+=${parseFloat(getComputedStyle(scope).paddingTop)}`,
      // Four scenes need roughly two viewports of scroll; longer ones feel idle.
      end: () =>
        `+=${Math.round(gsap.utils.clamp(1400, 2200, window.innerHeight * 2.2))}`,
      scrub: true,
      pin: true,
      pinSpacing: true,
      refreshPriority: 1,
      onRefresh: measure,
    },
  });

  timeline
    .to(state, { p: 1, duration: 1, ease: "none" }, 0)
    .addLabel("reveal", SCENE.reveal)
    .addLabel("showcase", SCENE.showcase)
    .addLabel("settle", SCENE.settle)
    .to(progress, { scaleX: 1, duration: 1, ease: "none" }, 0)
    .to(actions, { opacity: 0, y: -12, duration: 0.08 }, 0.2)
    .set(actions, { pointerEvents: "none" }, 0.27)
    .to(copy, { opacity: 0, y: -22, duration: 0.1 }, 0.21)
    .to(tagline, { opacity: 0, y: -15, duration: 0.1 }, 0.22)
    .to(title, { opacity: 0, y: -36, duration: 0.12 }, 0.23)
    .set(content, { pointerEvents: "none" }, 0.3)
    .to(scrim, { opacity: 0.85, duration: 0.1 }, 0.26)
    .to(scrim, { opacity: 0, duration: 0.08 }, 0.38)
    .to(label, { opacity: 1, y: 0, duration: 0.08 }, 0.4);

  return () => {
    slots.forEach((slot) => {
      clearCard(slot.original);
      clearCard(slot.sector);
    });
    // The pin can render time zero during a media change. Drop those inline
    // values too, so the static and compact layouts are owned solely by CSS.
    [progress, scrim, content, actions, copy, tagline, title, label].forEach(
      (layer) => layer.removeAttribute("style"),
    );
  };
}

// Tablet and small desktop keep the original compact arcs: four cards, short
// movements, no sector cards.
const COMPACT_FLIGHTS = {
  ai: [5, -14, 1],
  healthcare: [7, 2, -1],
  commerce: [4, -10, -1.6],
  enterprise: [-4, -5, 0.8],
};

function createCompactScene(select, tablet) {
  const [gallery] = select(".hero-gallery");
  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "hero-scene",
      trigger: gallery,
      start: () =>
        Math.max(
          0,
          gallery.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight * 0.72,
        ),
      end: () => {
        const span = window.innerHeight * (tablet ? 0.47 : 0.33);
        return `+=${Math.round(gsap.utils.clamp(180, tablet ? 410 : 300, span))}`;
      },
      scrub: true,
    },
  });
  const amplitude = tablet ? 1.35 : 1;
  const cards = select("[data-compact]");
  cards.forEach((card, i) => {
    const [x, y, roll] = COMPACT_FLIGHTS[card.dataset.heroCard];
    const offset = i * 0.07;
    // Offset the CSS resting pose instead of caching it in GSAP's transform.
    // This keeps the same small arc when a short desktop layout becomes a grid.
    timeline
      .to(
        card,
        {
          "--tile-arc-x": `${x * amplitude}px`,
          "--tile-arc-tilt": `${roll}deg`,
          duration: 0.79,
          ease: "sine.inOut",
        },
        offset,
      )
      .to(
        card,
        {
          "--tile-arc-y": `${y * amplitude}px`,
          duration: 0.79,
          ease: "power1.out",
        },
        offset,
      );
  });
}

export function initHeroAnimations(scope) {
  if (!scope) return;
  const select = gsap.utils.selector(scope);
  const context = gsap.context(() => {
    gsap.matchMedia(scope).add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1100px) and (min-height: 680px)",
        tablet: "(min-width: 680px)",
      },
      ({ conditions }) => {
        if (!conditions.motion) return;
        if (conditions.desktop) return createDesktopScene(scope, select);
        createCompactScene(select, conditions.tablet);
      },
    );
  }, scope);
  return () => context.revert();
}
