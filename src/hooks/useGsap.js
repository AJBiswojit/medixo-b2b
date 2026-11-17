import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/animationConfig";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Clean GSAP React lifecycle hook using gsap.context() scoped to a container ref.
 * Automatically reverts all animations and ScrollTriggers on unmount or dependency update.
 */
export function useGsap(callback, deps = []) {
  const scopeRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = scopeRef.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      callback(el);
    }, el);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
