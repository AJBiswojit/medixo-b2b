import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ANIMATION_CONFIG = {
  ease: {
    editorial: "power3.out",
    smooth: "expo.out",
    float: "sine.inOut",
  },
  duration: {
    fast: 0.45,
    base: 0.85,
    slow: 1.15,
  },
  stagger: {
    tight: 0.045,
    base: 0.09,
    relaxed: 0.13,
  },
  triggerStart: "top 86%",
};

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.innerWidth < 768;
}

export { gsap, ScrollTrigger };
