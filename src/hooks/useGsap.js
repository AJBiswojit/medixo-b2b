import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/animationConfig";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// matchMedia supplies a scoped GSAP context and reverts its effects on unmount,
// dependency changes, or a live change to the user's motion preference.
export function useGsap(callback, deps = []) {
  const scopeRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const media = gsap.matchMedia(scope);
    media.add("(prefers-reduced-motion: no-preference)", () => callback(scope));
    return () => media.revert();
  }, deps);

  return scopeRef;
}
