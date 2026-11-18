import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ANIMATION_CONFIG = {
  ease: { editorial: "power3.out", float: "sine.inOut" },
  duration: { base: 0.85 },
  stagger: { base: 0.09 },
  triggerStart: "top 86%",
};

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
