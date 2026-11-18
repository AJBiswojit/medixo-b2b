import { gsap, ScrollTrigger, ANIMATION_CONFIG } from "./animationConfig";

export function initHeroAnimations(scope, motionControl) {
  const select = gsap.utils.selector(scope);
  const cards = select("[data-hero-entry]");
  const visibleCards = cards.filter((card) => card.getClientRects().length);
  const entrance = gsap.timeline({
    defaults: { ease: ANIMATION_CONFIG.ease.editorial },
  });

  entrance
    .from(
      select("[data-hero-backdrop]"),
      { opacity: 0, duration: 0.62, clearProps: "opacity" },
      0,
    )
    .from(
      select("[data-hero-eyebrow]"),
      { opacity: 0, y: 8, duration: 0.48, clearProps: "opacity,transform" },
      0.04,
    )
    .from(
      select("[data-hero-word]"),
      {
        yPercent: 108,
        duration: 0.75,
        stagger: 0.043,
        clearProps: "transform",
      },
      0.1,
    )
    .from(
      select("[data-hero-copy]"),
      {
        opacity: 0,
        y: 11,
        duration: 0.52,
        stagger: 0.07,
        clearProps: "opacity,transform",
      },
      0.32,
    )
    .from(
      visibleCards,
      {
        x: (_, card) => Number(card.dataset.fromX),
        y: (_, card) => Number(card.dataset.fromY),
        rotation: (_, card) => Number(card.dataset.depth) * 5,
        scale: 0.94,
        opacity: 0,
        duration: 0.86,
        stagger: 0.052,
        clearProps: "opacity,transform",
      },
      0.39,
    )
    .from(
      select("[data-hero-actions] > *"),
      {
        opacity: 0,
        y: 10,
        duration: 0.52,
        stagger: 0.07,
        clearProps: "opacity,transform",
      },
      0.58,
    );

  const media = gsap.matchMedia(scope);
  media.add(
    {
      desktop: "(min-width: 1100px)",
      finePointer: "(hover: hover) and (pointer: fine)",
    },
    ({ conditions }) => {
      if (!conditions.desktop) return;
      let paused = scope.dataset.motionPaused === "true";
      let visible = false;
      const ambient = select("[data-hero-drift]").map((layer, i) =>
        gsap.to(layer, {
          y: i % 2 ? -7 : 6,
          rotation: i % 2 ? 0.85 : -0.85,
          duration: 3.8 + (i % 4) * 0.48,
          repeat: -1,
          yoyo: true,
          ease: ANIMATION_CONFIG.ease.float,
          paused: true,
        }),
      );

      const syncMotion = () =>
        ambient.forEach((tween) => tween.paused(paused || !visible));
      const visibility = ScrollTrigger.create({
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => {
          visible = isActive;
          syncMotion();
        },
      });
      visible = visibility.isActive;
      syncMotion();

      let removePointerListeners;
      let resetPointer;
      if (conditions.finePointer) {
        const canvas = scope.querySelector(".hero-canvas");
        const gallery = scope.querySelector(".hero-gallery");
        const xTo = gsap.quickTo(gallery, "x", {
          duration: 0.72,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(gallery, "y", {
          duration: 0.72,
          ease: "power3.out",
        });
        const move = (event) => {
          if (paused || event.pointerType !== "mouse") return;
          xTo((event.clientX / window.innerWidth - 0.5) * 12);
          yTo((event.clientY / window.innerHeight - 0.5) * 8);
        };
        resetPointer = () => {
          xTo(0);
          yTo(0);
        };
        canvas.addEventListener("pointermove", move, { passive: true });
        canvas.addEventListener("pointerleave", resetPointer);
        removePointerListeners = () => {
          canvas.removeEventListener("pointermove", move);
          canvas.removeEventListener("pointerleave", resetPointer);
        };
      }

      motionControl.current = (shouldPause) => {
        paused = shouldPause;
        if (paused) resetPointer?.();
        syncMotion();
      };
      return () => {
        motionControl.current = null;
        removePointerListeners?.();
      };
    },
  );

  return () => media.revert();
}
