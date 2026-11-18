import { gsap, ScrollTrigger } from "./animationConfig";
import { corridorPose, measureCorridor } from "./heroCorridor";

const OPENING_HOLD = 0.48;
const APPROACH = 0.96;
const HOLD = 0.64;
const HANDOFF = 0.54;
const GALLERY_RESET = 1.68;
const HEADLINE_RETURN = 0.55;
const CTA_RETURN = 0.44;
const CUE_REVEAL = 0.38;
const RELEASE_HOLD = 0.18;
const OPEN_TRAVEL = -0.5;
const px = (n) => `${n.toFixed(2)}px`;

function createCorridor(scope, mode) {
  const stage = scope.querySelector("[data-hero-stage]");
  const brand = stage.querySelector("[data-hero-brand]");
  const intro = stage.querySelector("[data-hero-intro]");
  const cue = stage.querySelector("[data-hero-scroll-cue]");
  const cueArrow = cue.querySelector("svg");
  const cards = Array.from(stage.querySelectorAll("[data-hero-card]"), (el) => {
    const frame = el.querySelector(".hero-frame");
    const image = frame.querySelector("img");
    return { el, frame, image, loading: image.loading };
  });
  const camera = { travel: OPEN_TRAVEL, depth: 0 };
  let layout;
  let previous;

  stage.dataset.mode = mode;

  function paint() {
    const { travel, depth } = camera;
    if (previous?.travel === travel && previous.depth === depth) return;
    previous = { travel, depth };

    for (const [index, { el, frame }] of cards.entries()) {
      const pose = corridorPose(layout, camera, index, cards.length);
      frame.style.transform = `translate3d(calc(${px(pose.x)} - 50%), calc(${px(pose.y)} - 50%), ${px(pose.z)}) rotateY(${pose.yaw.toFixed(2)}deg) scale(${pose.scale.toFixed(4)})`;
      frame.style.opacity = pose.opacity.toFixed(4);
      frame.style.setProperty("--hero-shade", pose.shade.toFixed(4));
      el.style.setProperty("--caption-opacity", pose.caption.toFixed(4));
      el.style.setProperty("--caption-top", px(pose.captionY));
      el.toggleAttribute("data-primary", pose.primary);
    }
  }

  function measure() {
    layout = measureCorridor(stage.clientWidth, stage.clientHeight, mode);
    stage.style.setProperty("--hero-perspective", px(layout.perspective));
    stage.style.setProperty(
      "--hero-portrait-height",
      px(layout.portraitHeight),
    );
    previous = null;
    paint();
  }

  measure();
  // Prioritize the open banks. Keep native lazy loading for out-of-view
  // portraits on smaller screens and for the normal-flow gallery.
  if (mode !== "mobile") {
    cards.forEach(({ image }, index) => {
      if (corridorPose(layout, camera, index, cards.length).opacity === 1) {
        image.loading = "eager";
      }
    });
  }
  const sequence = gsap.timeline({ paused: true, onUpdate: paint });
  sequence
    .addLabel("opening", 0)
    .to(
      camera,
      { travel: 0, depth: 1, duration: APPROACH, ease: "sine.inOut" },
      OPENING_HOLD,
    )
    .to(brand, { opacity: 0, duration: 0.56, ease: "sine.inOut" }, OPENING_HOLD)
    .to(intro, { opacity: 0, duration: 0.44, ease: "sine.inOut" }, OPENING_HOLD)
    // Keep the intro in the reading order, but don't tab to invisible CTAs.
    .set(intro, { inert: true }, OPENING_HOLD + 0.38);

  let cursor = OPENING_HOLD + APPROACH;
  const chapterStarts = new Map([
    [0, "intelligence-and-software"],
    [4, "vision-automation-and-data"],
    [8, "industries"],
  ]);
  cards.forEach(({ el }, index) => {
    if (chapterStarts.has(index))
      sequence.addLabel(chapterStarts.get(index), cursor);
    sequence.addLabel(el.dataset.heroCard, cursor);
    const chapterEnd = (index + 1) % 4 === 0;
    cursor += HOLD + (chapterEnd ? 0.12 : 0);
    if (index < cards.length - 1) {
      const duration = HANDOFF + (chapterEnd ? 0.11 : 0);
      sequence.to(
        camera,
        { travel: index + 1, duration, ease: "sine.inOut" },
        cursor,
      );
      cursor += duration;
    }
  });

  const phone = mode === "mobile";
  const recede = phone ? 1.02 : GALLERY_RESET;
  const panDelay = phone ? recede : 0.18;
  const galleryRestored = cursor + GALLERY_RESET;
  const restored = galleryRestored + 0.19;

  sequence
    .addLabel("reset", cursor)
    .set(brand, { "--hero-brand-y": "8px" }, "reset")
    // Ease the final portrait away, then advance half a station on the same
    // rail. In a cyclic gallery this is the exact opening camera pose.
    .to(camera, { depth: 0, duration: recede, ease: "sine.inOut" }, "reset")
    .to(
      camera,
      {
        travel: cards.length + OPEN_TRAVEL,
        duration: GALLERY_RESET - panDelay,
        ease: "sine.inOut",
      },
      cursor + panDelay,
    )
    .addLabel("gallery-restored", galleryRestored)
    // Let the headline and supporting group return as the rails finish
    // settling. The same two links become interactive only when fully visible.
    .to(
      brand,
      {
        opacity: 1,
        "--hero-brand-y": "0px",
        duration: HEADLINE_RETURN,
        ease: "sine.out",
      },
      restored - HEADLINE_RETURN,
    )
    .to(
      intro,
      { opacity: 1, duration: CTA_RETURN, ease: "sine.inOut" },
      restored - CTA_RETURN,
    )
    .addLabel("restored", restored)
    .set(intro, { inert: false }, "restored")
    .addLabel("cue", restored + 0.06)
    .fromTo(
      cue,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: CUE_REVEAL,
        ease: "sine.inOut",
        immediateRender: false,
      },
      "cue",
    )
    .fromTo(
      cueArrow,
      { y: -6 },
      {
        y: 0,
        duration: CUE_REVEAL,
        ease: "sine.out",
        immediateRender: false,
      },
      "cue",
    )
    // Hold the complete composition briefly, then let it scroll out as a
    // unit with no additional spacer or independent cue animation.
    .to({}, { duration: RELEASE_HOLD });
  const duration = sequence.duration();
  sequence.addLabel("release", duration);

  ScrollTrigger.create({
    id: "hero-corridor",
    trigger: stage,
    animation: sequence,
    start: () => `top top+=${parseFloat(getComputedStyle(scope).paddingTop)}`,
    end: () => {
      // Scale the reading distance with available space, not the time the
      // visitor spends on the page. Short viewports get a shorter pin.
      const unit =
        mode === "mobile"
          ? gsap.utils.clamp(125, 168, stage.clientHeight * 0.218)
          : gsap.utils.clamp(161, 213, stage.clientHeight * 0.264);
      return `+=${Math.round(duration * unit)}`;
    },
    scrub: 1,
    pin: true,
    pinSpacing: true,
    refreshPriority: 1,
    onRefresh: measure,
  });

  return () => {
    delete stage.dataset.mode;
    stage.style.removeProperty("--hero-perspective");
    stage.style.removeProperty("--hero-portrait-height");
    intro.inert = false;
    cards.forEach(({ el, frame, image, loading }) => {
      image.loading = loading;
      frame.removeAttribute("style");
      el.removeAttribute("style");
      el.removeAttribute("data-primary");
    });
  };
}

export function initHeroAnimations(scope) {
  if (!scope) return;
  // matchMedia scopes each setup in a GSAP context. Reverting it removes the
  // pin, timeline and inline tween styles, including under React StrictMode.
  const media = gsap.matchMedia(scope);
  media.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      roomToPin: "(min-height: 530px)",
      desktop: "(min-width: 1100px)",
      tablet: "(min-width: 680px)",
    },
    ({ conditions: { motion, roomToPin, desktop, tablet } }) => {
      if (!motion || !roomToPin) return;
      return createCorridor(
        scope,
        desktop ? "desktop" : tablet ? "tablet" : "mobile",
      );
    },
  );
  return () => media.revert();
}
