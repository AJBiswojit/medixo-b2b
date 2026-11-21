const TAU = 2 * Math.PI;
const LENS = 0.205;
const REAR_SCALE = 0.79;
const PORTRAIT_RATIO = 3 / 4;
const mix = (from, to, t) => from + (to - from) * t;
const unit = (t) => Math.max(0, Math.min(1, t));
const smooth = (t) => t * t * (3 - 2 * t);

export const ORBIT_REVOLUTION_SECONDS = 75;
export const ORBIT_RESUME_SECONDS = 0.65;

export const wrapSlot = (slot, count) => ((slot % count) + count) % count;

// Phase is measured in slots, not degrees, so even a mid-flight reversal
// can take the shortest arc from the current pose rather than the last stop.
export function closestPhase(phase, index, count) {
  return phase + wrapSlot(index - phase + count / 2, count) - count / 2;
}

export function measureOrbit(width) {
  const compact = unit((840 - width) / 470);
  const compactCaption = unit((1040 - width) / 145);
  const cardWidth = width * mix(0.089, 0.133, compact);
  const cardHeight = cardWidth / PORTRAIT_RATIO;
  const focusWidth = mix(width * 0.108, Math.min(126, width * 0.244), compact);
  const focusHeight = focusWidth / PORTRAIT_RATIO;
  const backTop = mix(6, 11, compact);
  // Leave a strip of the farthest card above the enlarged portrait. The
  // opposite sector remains directly selectable even in the lifted pose.
  const focusTop = backTop + mix(Math.max(14, width * 0.012), 17, compact);
  const captionTop = focusTop + focusHeight + mix(7, 5, compact);
  // On a wide stage the caption fits in the vacated front slot. Narrow
  // stages need more vertical clearance so long titles can wrap legibly.
  const frontTop =
    captionTop +
    mix(
      Math.max(18, width * 0.018),
      mix(88, 82, compact),
      unit(compactCaption * 1.8),
    );

  return {
    width,
    cardWidth,
    focusWidth,
    radiusX: width * mix(0.346, 0.394, compact),
    spacing: mix(0.114, 0, compact),
    frontY: frontTop + cardHeight / 2,
    backY: backTop + (cardHeight / 2) * ((1 - LENS) / (1 + LENS)) * REAR_SCALE,
    focusY: focusTop + focusHeight / 2,
    captionTop,
    captionWidth: mix(
      Math.max(138, width * 0.145),
      Math.min(width * 0.66, 238),
      smooth(compactCaption),
    ),
    height: frontTop + cardHeight + mix(width * 0.012, 14, compact),
    rearClarity: mix(0.39, 0.57, compact),
  };
}

// Project upright portraits on a single tilted circle. Give the side turns
// slightly more travel to keep the screen-space cadence with just 18 slots.
// The same mapping applies to every card, including during a reversal.
export function projectSlot(layout, count, index, phase, lift = 0) {
  const slotAngle = ((index - phase) * TAU) / count;
  const angle = slotAngle - layout.spacing * Math.sin(slotAngle * 2);
  const side = Math.sin(angle);
  const depth = Math.cos(angle);
  const perspective = 1 / (1 - LENS * depth);
  const nearScale = (1 - LENS) * perspective;
  const depthFraction = (depth + 1) / 2;
  const orbitY = mix(layout.backY, layout.frontY, depthFraction * nearScale);

  return {
    x: layout.width / 2 + layout.radiusX * side * perspective,
    y: mix(orbitY, layout.focusY, lift),
    scale: mix(
      nearScale * mix(REAR_SCALE, 1, depthFraction),
      layout.focusWidth / layout.cardWidth,
      lift,
    ),
    yaw: -17 * side * (1 - lift),
    clarity: mix(mix(layout.rearClarity, 1, smooth(depthFraction)), 1, lift),
    zIndex: 1 + Math.round(200 * depthFraction + 250 * lift),
  };
}

// Lower any lifted portrait as the shared phase eases back to cruise speed.
// Integrating smoothstep makes velocity continuous at both ends of the ramp.
export function autoplayFrame(from, count, elapsed, pose) {
  const t = unit(elapsed / ORBIT_RESUME_SECONDS);
  const rampTime = ORBIT_RESUME_SECONDS * t ** 3 * (1 - t / 2);
  const cruiseTime = Math.max(0, elapsed - ORBIT_RESUME_SECONDS);
  pose.phase = wrapSlot(
    from.phase + ((rampTime + cruiseTime) * count) / ORBIT_REVOLUTION_SECONDS,
    count,
  );
  from.lifts.forEach((lift, index) => {
    pose.lifts[index] = mix(lift, 0, smooth(t));
  });
  return pose;
}

export function travelFrame(from, targetPhase, selectedIndex, progress, pose) {
  const rotate = smooth(unit(progress));
  const lower = smooth(unit(progress / 0.62));
  const raise = smooth(unit((progress - 0.29) / 0.71));
  pose.phase = mix(from.phase, targetPhase, rotate);
  from.lifts.forEach((lift, index) => {
    pose.lifts[index] =
      index === selectedIndex ? mix(lift, 1, raise) : mix(lift, 0, lower);
  });
  return pose;
}
