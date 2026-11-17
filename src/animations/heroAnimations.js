import {
  gsap,
  ANIMATION_CONFIG,
  prefersReducedMotion,
} from "./animationConfig";

/**
 * Orchestrates the hero entrance timeline and responsive ambient floating motion.
 * Uses gsap.matchMedia() aligned with Tailwind's lg (1024px) breakpoint.
 */
export function initHeroAnimations(scopeEl) {
  if (!scopeEl || prefersReducedMotion()) {
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: ANIMATION_CONFIG.ease.editorial },
  });

  // Eyebrow / tagline
  const eyebrow = scopeEl.querySelectorAll("[data-hero-eyebrow]");
  if (eyebrow.length) {
    tl.from(
      eyebrow,
      {
        y: 16,
        opacity: 0,
        duration: 0.65,
        clearProps: "transform",
      },
      0.05
    );
  }

  // Staggered headline words
  const words = scopeEl.querySelectorAll("[data-hero-word]");
  if (words.length) {
    tl.from(
      words,
      {
        yPercent: 105,
        opacity: 0,
        duration: 0.9,
        stagger: ANIMATION_CONFIG.stagger.tight,
        ease: ANIMATION_CONFIG.ease.smooth,
        clearProps: "transform",
      },
      0.14
    );
  }

  // Supporting paragraphs
  const copy = scopeEl.querySelectorAll("[data-hero-copy]");
  if (copy.length) {
    tl.from(
      copy,
      {
        y: 18,
        opacity: 0,
        duration: 0.72,
        stagger: 0.09,
        clearProps: "transform",
      },
      0.42
    );
  }

  // CTA buttons
  const ctas = scopeEl.querySelectorAll("[data-hero-cta]");
  if (ctas.length) {
    tl.from(
      ctas,
      {
        y: 16,
        opacity: 0,
        duration: 0.62,
        stagger: 0.08,
        clearProps: "transform",
      },
      0.54
    );
  }

  // Responsive visual choreography synchronized to lg: 1024px
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const accents = scopeEl.querySelectorAll("[data-hero-accent]");
    if (accents.length) {
      gsap.from(accents, {
        scale: 0.85,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
        delay: 0.2,
        ease: ANIMATION_CONFIG.ease.editorial,
      });
    }

    const desktopCards = scopeEl.querySelectorAll("[data-hero-card]");
    desktopCards.forEach((card, index) => {
      const fromX = Number(card.dataset.fromX || 0);
      const fromY = Number(card.dataset.fromY || 44);
      const fromRot = Number(card.dataset.fromRotate || 0);
      const floatAmp = Number(card.dataset.floatAmp || 9);
      const floatRot = Number(card.dataset.floatRot || 1.0);
      const floatDur = Number(card.dataset.floatDur || 4.4);

      gsap.from(card, {
        x: fromX,
        y: fromY,
        rotation: `+=${fromRot}`,
        scale: 0.92,
        opacity: 0,
        duration: 1.05,
        delay: 0.24 + index * 0.085,
        ease: ANIMATION_CONFIG.ease.smooth,
      });

      gsap.to(card, {
        y: `-=${floatAmp}`,
        rotation: `+=${floatRot}`,
        duration: floatDur,
        repeat: -1,
        yoyo: true,
        ease: ANIMATION_CONFIG.ease.float,
        delay: 1.35 + index * 0.2,
      });
    });
  });

  mm.add("(max-width: 1023px)", () => {
    const mobileCards = scopeEl.querySelectorAll("[data-hero-mobile-card]");
    if (mobileCards.length) {
      gsap.from(mobileCards, {
        y: 24,
        opacity: 0,
        scale: 0.96,
        duration: 0.72,
        stagger: 0.085,
        delay: 0.45,
        ease: ANIMATION_CONFIG.ease.editorial,
        clearProps: "opacity,scale",
      });
    }
  });

  return tl;
}
