import { gsap, ScrollTrigger, ANIMATION_CONFIG } from "./animationConfig";

// Short, related groups move as a unit. Nothing is hidden while waiting offscreen,
// so anchor jumps and keyboard focus never depend on a reveal finishing first.
export function revealStagger(selector, scope, options = {}) {
  const targets =
    typeof selector === "string"
      ? [...scope.querySelectorAll(selector)]
      : [...selector];
  const groups = new Map();
  for (const item of targets) {
    const trigger =
      options.trigger ||
      item.closest(".section-heading, [data-reveal-group]") ||
      item;
    if (!groups.has(trigger)) groups.set(trigger, []);
    groups.get(trigger).push(item);
  }

  for (const [trigger, items] of groups) {
    gsap.fromTo(
      items,
      { y: options.y ?? 15, opacity: options.opacity ?? 0.85 },
      {
        y: 0,
        opacity: 1,
        immediateRender: false,
        duration: options.duration ?? ANIMATION_CONFIG.duration.base,
        stagger: options.stagger ?? ANIMATION_CONFIG.stagger.base,
        ease: ANIMATION_CONFIG.ease.editorial,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger,
          start: options.start || ANIMATION_CONFIG.triggerStart,
          once: true,
        },
      },
    );
  }
}

export function revealCardGroups(
  selector,
  scope,
  { size = 2, ...options } = {},
) {
  const cards = [...scope.querySelectorAll(selector)];
  for (let index = 0; index < cards.length; index += size) {
    revealStagger(cards.slice(index, index + size), scope, {
      ...options,
      trigger: cards[index],
    });
  }
}

export function revealImageMask(selector, scope, options = {}) {
  scope.querySelectorAll(selector).forEach((frame) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        start: options.start || "top 91%",
        once: true,
      },
    });
    timeline.fromTo(
      frame,
      { clipPath: "inset(0 0 9% 0 round 18px)" },
      {
        clipPath: "inset(0 0 0% 0 round 18px)",
        immediateRender: false,
        duration: 0.95,
        ease: "power3.out",
        clearProps: "clipPath",
      },
    );
    const layer = frame.querySelector("[data-image-layer]");
    if (layer)
      timeline.fromTo(
        layer,
        { scale: 1.065 },
        {
          scale: 1,
          immediateRender: false,
          duration: 1.05,
          ease: "power3.out",
          clearProps: "transform",
        },
        0,
      );
  });
}

// A companion layer drifts only while the feature containing it is on screen.
export function applySubtleParallax(selector, scope, amount = 13) {
  const media = gsap.matchMedia(scope);
  media.add("(min-width: 1100px)", () => {
    scope.querySelectorAll(selector).forEach((item) => {
      const trigger =
        item.closest("[data-parallax-frame]") || item.parentElement;
      gsap.fromTo(
        item,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        },
      );
    });
  });
  return () => media.revert();
}

export function initProcessTimeline(scope) {
  const media = gsap.matchMedia(scope);
  const timeline = scope.querySelector("[data-process-timeline]");
  const line = scope.querySelector("[data-process-line]");
  media.add(
    { horizontal: "(min-width: 1100px)", vertical: "(max-width: 1099px)" },
    ({ conditions }) => {
      const property = conditions.horizontal ? "scaleX" : "scaleY";
      gsap.fromTo(
        line,
        {
          [property]: 0,
          transformOrigin: conditions.horizontal ? "left center" : "center top",
        },
        {
          [property]: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 83%",
            end: "bottom 61%",
            scrub: 0.55,
          },
        },
      );
      revealCardGroups("[data-process-stage]", scope, {
        size: conditions.horizontal ? 6 : 2,
        y: 13,
        start: "top 89%",
      });
    },
  );
  return () => media.revert();
}

export function refreshScrollTriggers() {
  // The safe refresh defers past active scrolling instead of cancelling native smooth jumps.
  ScrollTrigger.refresh(true);
}
