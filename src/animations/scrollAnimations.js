import {
  gsap,
  ScrollTrigger,
  ANIMATION_CONFIG,
  prefersReducedMotion,
  isMobileViewport,
} from "./animationConfig";

/**
 * Reveals staggered items when a section enters the viewport.
 */
export function revealStagger(selector, triggerEl, options = {}) {
  if (!triggerEl || prefersReducedMotion()) return;

  const targets =
    typeof selector === "string"
      ? triggerEl.querySelectorAll(selector)
      : selector;

  if (!targets || !targets.length) return;

  const mobile = isMobileViewport();

  // Keep the rendered content readable before, during, and after the reveal.
  // A paused scroll trigger must never leave a catalog or its heading invisible.
  return gsap.fromTo(
    targets,
    { y: options.y ?? (mobile ? 12 : 18) },
    {
      y: 0,
      immediateRender: false,
      duration: options.duration ?? ANIMATION_CONFIG.duration.base,
      stagger: options.stagger ?? ANIMATION_CONFIG.stagger.base,
      ease: options.ease ?? ANIMATION_CONFIG.ease.editorial,
      clearProps: "transform",
      scrollTrigger: {
        trigger: options.trigger || triggerEl,
        start: options.start || ANIMATION_CONFIG.triggerStart,
        once: true,
      },
    }
  );
}

/**
 * Reveals an editorial image frame with a soft clip-path + gentle scale settle.
 */
export function revealImageMask(selector, triggerEl, options = {}) {
  if (!triggerEl || prefersReducedMotion()) return;

  const frames = triggerEl.querySelectorAll(selector);
  if (!frames.length) return;

  frames.forEach((frame, idx) => {
    const img = frame.querySelector("img");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        start: options.start || "top 88%",
        once: true,
      },
    });

    tl.from(frame, {
      y: 28,
      opacity: 0,
      clipPath: "inset(8% 0% 0% 0% round 20px)",
      duration: 0.95,
      delay: idx * 0.08,
      ease: ANIMATION_CONFIG.ease.smooth,
      clearProps: "clipPath,transform",
    });

    if (img) {
      tl.from(
        img,
        {
          scale: 1.09,
          duration: 1.15,
          ease: ANIMATION_CONFIG.ease.editorial,
          clearProps: "transform",
        },
        0
      );
    }
  });
}

/**
 * Subtle vertical scroll parallax for layered portfolio elements on desktop.
 */
export function applySubtleParallax(selector, triggerEl, amount = -24) {
  if (!triggerEl || prefersReducedMotion() || isMobileViewport()) return;

  const items = triggerEl.querySelectorAll(selector);
  if (!items.length) return;

  items.forEach((item) => {
    gsap.fromTo(
      item,
      { y: -amount * 0.5 },
      {
        y: amount,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );
  });
}

/**
 * Animates process timeline progress bar and stage cards on scroll.
 */
export function initProcessTimeline(scopeEl) {
  if (!scopeEl || prefersReducedMotion()) return;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const desktopLine = scopeEl.querySelector("[data-process-line-desktop]");
    const desktopStages = scopeEl.querySelectorAll(
      "[data-process-desktop] [data-process-stage]"
    );

    if (desktopLine) {
      gsap.fromTo(
        desktopLine,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scopeEl,
            start: "top 78%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        }
      );
    }

    if (desktopStages.length) {
      gsap.from(desktopStages, {
        y: 26,
        opacity: 0,
        duration: 0.78,
        stagger: 0.09,
        ease: ANIMATION_CONFIG.ease.editorial,
        clearProps: "transform",
        scrollTrigger: {
          trigger: scopeEl,
          start: "top 84%",
          once: true,
        },
      });
    }
  });

  mm.add("(max-width: 1023px)", () => {
    const mobileLine = scopeEl.querySelector("[data-process-line-mobile]");
    const mobileStages = scopeEl.querySelectorAll(
      "[data-process-mobile] [data-process-stage]"
    );

    if (mobileLine) {
      gsap.fromTo(
        mobileLine,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scopeEl,
            start: "top 82%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        }
      );
    }

    if (mobileStages.length) {
      gsap.from(mobileStages, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: ANIMATION_CONFIG.ease.editorial,
        clearProps: "transform",
        scrollTrigger: {
          trigger: scopeEl,
          start: "top 86%",
          once: true,
        },
      });
    }
  });
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
