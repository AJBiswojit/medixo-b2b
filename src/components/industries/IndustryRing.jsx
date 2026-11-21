import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion } from "../../animations/animationConfig";
import { industryAnchor } from "../../data/industries";
import IndustryCard from "./IndustryCard";
import IndustryDetailDialog from "./IndustryDetailDialog";
import useIndustryOrbit from "./useIndustryOrbit";
import { wrapSlot } from "./industryOrbit";

const HOVER_DISTANCE = 12;
const SWIPE_DISTANCE = 28;
const TOUCH_IDLE_MS = 8000;
const isTouch = (pointerType) =>
  pointerType === "touch" || pointerType === "pen";

function advanceHover(intent, x, y) {
  if (intent.last?.x === x && intent.last?.y === y) return false;
  intent.last = { x, y };
  if (
    intent.origin &&
    Math.hypot(x - intent.origin.x, y - intent.origin.y) < HOVER_DISTANCE
  ) {
    return false;
  }
  // Once the pointer has moved away, returning to the same *screen* slot
  // should select the new photo there, not inherit the previous dead zone.
  intent.origin = null;
  return true;
}

export default function IndustryRing({ industries, onInquireIndustry }) {
  const { hash, key } = useLocation();
  const orbit = useIndustryOrbit(industries.length);
  const {
    stageRef,
    cardRefs,
    cardAt,
    selection,
    select,
    setHolds,
    cancelPending,
  } = orbit;
  const gesture = useRef(null);
  const pointerType = useRef("");
  const touchIdle = useRef(0);
  const suppressClick = useRef(false);
  const hover = useRef({ last: null, origin: null });
  const detailLock = useRef(null);
  const [detail, setDetail] = useState(null);
  const [autoplayPaused, setAutoplayPaused] = useState(null);
  const selected =
    selection.index === null ? null : industries[selection.index];

  const clearTouchTimer = useCallback(() => {
    window.clearTimeout(touchIdle.current);
    touchIdle.current = 0;
  }, []);

  const releaseTouch = useCallback(() => {
    clearTouchTimer();
    setHolds({ touch: false });
  }, [clearTouchTimer, setHolds]);

  useEffect(() => {
    const onOutsidePress = (event) => {
      if (touchIdle.current && !stageRef.current?.contains(event.target)) {
        releaseTouch();
      }
    };
    document.addEventListener("pointerdown", onOutsidePress, true);
    return () => {
      document.removeEventListener("pointerdown", onOutsidePress, true);
      clearTouchTimer();
    };
  }, [stageRef, clearTouchTimer, releaseTouch]);

  useEffect(() => {
    setDetail(null);
    cancelPending();
    const index = industries.findIndex(
      ({ id }) => hash === `#${industryAnchor(id)}`,
    );
    if (index < 0) {
      setHolds({ keyboard: false });
      return;
    }
    const frame = requestAnimationFrame(() => {
      setHolds({ keyboard: true });
      select(index, { immediate: true });
      cardAt(index)?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, key, industries, select, cardAt, cancelPending, setHolds]);

  useLayoutEffect(() => {
    const lock = detailLock.current;
    if (detail || !lock) return;
    // The dialog restores focus before this runs. If the caption is about
    // to disappear on resume, return focus to its still-mounted portrait.
    if (
      !autoplayPaused &&
      !prefersReducedMotion() &&
      lock.trigger === document.activeElement &&
      lock.trigger !== cardAt(lock.index)
    ) {
      cardAt(lock.index)?.focus({ preventScroll: true });
    }
    detailLock.current = null;
    gesture.current = null;
    clearTouchTimer();
    hover.current.origin = null;
    setHolds({
      detail: false,
      hover: false,
      touch: false,
      keyboard: false,
      press: false,
    });
  }, [detail, autoplayPaused, cardAt, clearTouchTimer, setHolds]);

  const openDetails = (index, trigger) => {
    if (detailLock.current) return;
    detailLock.current = { index, trigger };
    setHolds({ detail: true });
    const entry = { industry: industries[index], trigger };
    setDetail({ ...entry, ready: false });
    select(index);
    orbit.whenSettled(() => setDetail({ ...entry, ready: true }));
  };

  const activate = (index, event) => {
    if (detailLock.current) return;
    const viaTouch =
      event.detail !== 0 &&
      isTouch(event.nativeEvent.pointerType || pointerType.current);
    // A tap still selects first; mouse and keyboard can open any portrait.
    if (viaTouch && select(index)) return;
    openDetails(index, event.currentTarget);
  };

  const onKeyboardFocus = (event) => {
    if (
      detailLock.current ||
      gesture.current ||
      !event.target.matches(":focus-visible")
    )
      return;
    clearTouchTimer();
    setHolds({ keyboard: true, touch: false });
    const index = event.target.dataset.orbitCard;
    if (index !== undefined) select(Number(index));
  };

  const onKeyDown = (event) => {
    if (
      detailLock.current ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    if (event.key.toLowerCase() === "p") {
      event.preventDefault();
      if (event.repeat) return;
      setHolds({ manual: !autoplayPaused });
      setAutoplayPaused(!autoplayPaused);
      return;
    }
    const from = Number(
      event.target.closest("[data-orbit-card]")?.dataset.orbitCard ??
        orbit.activeSlot(),
    );
    const count = industries.length;
    const next = {
      ArrowLeft: wrapSlot(from - 1, count),
      ArrowRight: wrapSlot(from + 1, count),
      Home: 0,
      End: count - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    clearTouchTimer();
    setHolds({ keyboard: true, touch: false });
    select(next);
    cardAt(next)?.focus({ preventScroll: true });
  };

  const onPointerDown = (event) => {
    if (detailLock.current || !event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    pointerType.current = event.pointerType;
    clearTouchTimer();
    const touch = isTouch(event.pointerType);
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      horizontal: false,
      touch,
    };
    setHolds({
      press: true,
      keyboard: false,
      touch,
      ...(touch ? { hover: false } : {}),
    });
  };

  const onPointerMove = (event) => {
    if (detailLock.current) return;
    const swipe = gesture.current;
    if (swipe?.touch && swipe.id === event.pointerId) {
      const dx = event.clientX - swipe.x;
      const dy = event.clientY - swipe.y;
      if (
        !swipe.horizontal &&
        Math.abs(dx) > Math.max(13, Math.abs(dy) * 1.25)
      ) {
        swipe.horizontal = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      return;
    }
    if (event.pointerType !== "mouse" || event.buttons) return;

    // The cards move under a stationary pointer. Use physical pointer motion,
    // not pointerenter/leave on the animated elements, to change selection.
    const { clientX: x, clientY: y } = event;
    const intent = hover.current;
    if (!advanceHover(intent, x, y)) return;
    const card = event.target.closest("[data-orbit-card]");
    if (!card) return;
    clearTouchTimer();
    setHolds({ hover: true, touch: false, keyboard: false });
    if (select(Number(card.dataset.orbitCard))) intent.origin = { x, y };
  };

  const finishPress = (event, cancelled = false) => {
    const press = gesture.current;
    if (press?.id !== event.pointerId) return;
    gesture.current = null;
    if (press.touch) {
      if (cancelled) {
        releaseTouch();
      } else {
        if (press.horizontal) {
          suppressClick.current = true;
          const dx = event.clientX - press.x;
          if (Math.abs(dx) >= SWIPE_DISTANCE)
            select(orbit.activeSlot() - Math.sign(dx));
        }
        touchIdle.current = window.setTimeout(releaseTouch, TOUCH_IDLE_MS);
      }
    }
    setHolds({ press: false });
  };

  return (
    <>
      <p className="sr-only" id="industry-ring-instructions">
        Use the Left and Right arrow keys to rotate the gallery. Press Enter or
        Space to open details. If motion is allowed, press P to pause or enable
        automatic rotation. On a touch screen, swipe or tap to select an
        industry, then tap the selected photo again to open it.
      </p>
      <div className="sr-only" role="status">
        {autoplayPaused === true && "Automatic rotation paused."}
        {autoplayPaused === false &&
          "Automatic rotation enabled when motion is allowed."}
      </div>
      <div
        id="industry-gallery"
        ref={stageRef}
        className="industry-ring"
        role="region"
        aria-label="Industry gallery"
        aria-describedby="industry-ring-instructions"
        onKeyDown={onKeyDown}
        onFocusCapture={onKeyboardFocus}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setHolds({ keyboard: false });
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          advanceHover(hover.current, event.clientX, event.clientY);
          finishPress(event, true);
          setHolds({ hover: false });
        }}
        onPointerUp={(event) => finishPress(event)}
        onPointerCancel={(event) => finishPress(event, true)}
        onLostPointerCapture={(event) => {
          // The originating touch button loses its implicit capture when the
          // ring takes over a swipe; only clear on the ring's own loss.
          if (event.target === event.currentTarget) finishPress(event, true);
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current || event.detail === 0) return;
          suppressClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {industries.map((industry, index) => (
          <IndustryCard
            key={industry.id}
            ref={cardRefs[index]}
            industry={industry}
            index={index}
            selected={selection.index === index}
            tabbable={(selection.index ?? 0) === index}
            onActivate={activate}
          />
        ))}
        {selected && (
          <div
            className="industry-caption text-center"
            data-visible={selection.settled}
          >
            <p className="industry-caption-title">{selected.title}</p>
            <p className="industry-caption-subtitle">{selected.subtitle}</p>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`Explore Industry: ${selected.title}`}
              onClick={(event) =>
                openDetails(selection.index, event.currentTarget)
              }
            >
              Explore Industry <ArrowRight size={13} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {detail?.ready && (
        <IndustryDetailDialog
          industry={detail.industry}
          trigger={detail.trigger}
          onClose={() => setDetail(null)}
          onInquire={() => {
            setDetail(null);
            onInquireIndustry({ industry: detail.industry.title });
          }}
        />
      )}
    </>
  );
}
