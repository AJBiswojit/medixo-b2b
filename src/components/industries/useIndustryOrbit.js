import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../../animations/animationConfig";
import {
  autoplayFrame,
  closestPhase,
  measureOrbit,
  ORBIT_RESUME_SECONDS,
  ORBIT_REVOLUTION_SECONDS,
  projectSlot,
  travelFrame,
  wrapSlot,
} from "./industryOrbit";

function stopMotion(state) {
  const motion = state.motion;
  state.motion = null;
  motion?.tween.kill();
}

function snapshot({ phase, lifts }) {
  return { phase, lifts: [...lifts] };
}

export default function useIndustryOrbit(count) {
  const stageRef = useRef(null);
  const cards = useRef([]);
  const layout = useRef(null);
  const orbit = useRef(null);
  const [selection, setSelection] = useState({ index: null, settled: true });

  if (!orbit.current) {
    orbit.current = {
      index: null,
      pose: { phase: 0, lifts: Array(count).fill(0) },
      motion: null,
      afterTravel: null,
      holds: new Set(),
      inView: false,
      pageVisible: true,
      reduced: false,
    };
  }

  const cardRefs = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => (node) => {
        cards.current[index] = node;
      }),
    [count],
  );

  const paint = useCallback(() => {
    if (!layout.current) return;
    const { phase, lifts } = orbit.current.pose;
    cards.current.forEach((card, index) => {
      if (!card) return;
      const { x, y, yaw, scale, clarity, zIndex } = projectSlot(
        layout.current,
        count,
        index,
        phase,
        lifts[index],
      );
      card.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${scale}) rotateY(${yaw}deg)`;
      card.firstElementChild.style.opacity = clarity;
      card.style.zIndex = zIndex;
    });
  }, [count]);

  const startAutoplay = useCallback(() => {
    const state = orbit.current;
    stopMotion(state);
    state.afterTravel = null;
    const from = snapshot(state.pose);
    if (state.index !== null) {
      state.index = null;
      setSelection({ index: null, settled: true });
    }

    const clock = { ramp: 0, lap: 0 };
    const tween = gsap.timeline({ paused: true });
    const draw = (elapsed) => {
      if (state.motion?.tween !== tween) return;
      autoplayFrame(from, count, elapsed, state.pose);
      paint();
    };
    // The ramp runs once. Only the linear 75-second lap repeats, and its
    // two endpoints project to the same pose on this closed orbit.
    tween
      .to(clock, {
        ramp: ORBIT_RESUME_SECONDS,
        duration: ORBIT_RESUME_SECONDS,
        ease: "none",
        lazy: false,
        onUpdate: () => draw(clock.ramp),
      })
      .to(clock, {
        lap: ORBIT_REVOLUTION_SECONDS,
        duration: ORBIT_REVOLUTION_SECONDS,
        repeat: -1,
        ease: "none",
        lazy: false,
        onUpdate: () => draw(ORBIT_RESUME_SECONDS + clock.lap),
      });
    state.motion = { kind: "auto", tween };
    tween.play();
  }, [count, paint]);

  const syncPlayback = useCallback(() => {
    const state = orbit.current;
    const shouldSpin =
      state.inView && state.pageVisible && !state.reduced && !state.holds.size;
    const motion = state.motion;
    if (shouldSpin) {
      if (motion?.kind !== "auto") startAutoplay();
    } else if (motion?.kind === "auto") {
      stopMotion(state);
    } else if (motion?.kind === "selection") {
      // Keep a moving hit target still between pointerdown and click.
      motion.tween.paused(state.holds.has("press") || !state.pageVisible);
    }
  }, [startAutoplay]);

  const setHolds = useCallback(
    (changes) => {
      const { holds } = orbit.current;
      for (const [reason, active] of Object.entries(changes)) {
        if (active) holds.add(reason);
        else holds.delete(reason);
      }
      syncPlayback();
    },
    [syncPlayback],
  );

  const settle = useCallback(() => {
    const state = orbit.current;
    state.motion = null;
    state.pose.phase = state.index;
    state.pose.lifts.fill(0);
    state.pose.lifts[state.index] = 1;
    paint();
    setSelection({ index: state.index, settled: true });
    const afterTravel = state.afterTravel;
    state.afterTravel = null;
    afterTravel?.();
    syncPlayback();
  }, [paint, syncPlayback]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const state = orbit.current;
    const resize = () => {
      const width = stage.clientWidth;
      if (!width || layout.current?.width === width) return;
      const next = measureOrbit(width);
      layout.current = next;
      stage.style.setProperty("--orbit-height", `${next.height}px`);
      stage.style.setProperty("--orbit-card-width", `${next.cardWidth}px`);
      stage.style.setProperty("--orbit-caption-top", `${next.captionTop}px`);
      stage.style.setProperty(
        "--orbit-caption-width",
        `${next.captionWidth}px`,
      );
      paint();
      stage.dataset.ready = "true";
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.reduced = preference.matches;
    const onPreferenceChange = ({ matches }) => {
      state.reduced = matches;
      if (matches && state.motion?.kind === "selection") {
        stopMotion(state);
        settle();
        return;
      }
      syncPlayback();
      if (matches && state.index === null) {
        // A preference change during the resume ramp should not leave a
        // portrait partially lifted in the static pose.
        state.pose.lifts.fill(0);
        paint();
      }
    };
    const onVisibilityChange = () => {
      state.pageVisible = !document.hidden;
      syncPlayback();
    };
    let observing = true;
    // Don't animate a sliver of the ring at the edge of the viewport.
    const visiblePortion = 0.15;
    const viewport = new IntersectionObserver(
      ([entry]) => {
        if (!observing) return;
        state.inView = entry.intersectionRatio >= visiblePortion;
        syncPlayback();
      },
      { threshold: visiblePortion },
    );
    onVisibilityChange();
    viewport.observe(stage);
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observing = false;
      state.inView = false;
      observer.disconnect();
      viewport.disconnect();
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      state.afterTravel = null;
      stopMotion(state);
    };
  }, [paint, settle, syncPlayback]);

  const select = useCallback(
    (index, { immediate = false } = {}) => {
      const state = orbit.current;
      const next = wrapSlot(index, count);
      const changed = next !== state.index;
      if (!changed && !(immediate && state.motion?.kind === "selection"))
        return false;

      stopMotion(state);
      state.index = next;
      state.afterTravel = null;
      if (immediate || state.reduced) {
        settle();
        return changed;
      }

      setSelection({ index: next, settled: false });
      const from = snapshot(state.pose);
      const phase = closestPhase(from.phase, next, count);
      const clock = { progress: 0 };
      const tween = gsap.to(clock, {
        progress: 1,
        duration: Math.min(0.88, 0.52 + Math.abs(phase - from.phase) * 0.045),
        ease: "none",
        paused: true,
        lazy: false,
        onUpdate: () => {
          if (state.motion?.tween !== tween) return;
          travelFrame(from, phase, next, clock.progress, state.pose);
          paint();
        },
        onComplete: () => {
          if (state.motion?.tween === tween) settle();
        },
      });
      state.motion = { kind: "selection", tween };
      if (!state.holds.has("press") && state.pageVisible) tween.play();
      return changed;
    },
    [count, paint, settle],
  );

  const whenSettled = (action) => {
    const state = orbit.current;
    if (state.motion?.kind === "selection") state.afterTravel = action;
    else action();
  };

  const cardAt = useCallback((index) => cards.current[index], []);
  const cancelPending = useCallback(() => {
    orbit.current.afterTravel = null;
  }, []);

  return {
    stageRef,
    cardRefs,
    cardAt,
    activeSlot: () =>
      orbit.current.index ??
      wrapSlot(Math.round(orbit.current.pose.phase), count),
    selection,
    select,
    setHolds,
    whenSettled,
    cancelPending,
  };
}
