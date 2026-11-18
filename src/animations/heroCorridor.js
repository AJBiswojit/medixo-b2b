// One rail, mirrored at the horizon. Stations are [distance from the lens,
// screen-width offset, relative portrait height, lens-depth ratio, yaw].
// The last station is outside the matte, where the order can wrap unseen.
const OPEN_RAIL = [
  [0, 0, 0.156, -0.56, 0],
  [0.5, 0.028, 0.166, -0.53, 5],
  [1.5, 0.088, 0.245, -0.42, 10],
  [2.5, 0.166, 0.363, -0.28, 15],
  [3.5, 0.263, 0.516, -0.13, 20],
  [4.5, 0.385, 0.714, 0.025, 25],
  [5.5, 0.524, 0.974, 0.13, 30],
  [6, 0.77, 1, 0.14, 30],
];

const BACK_RAIL = [
  [0, 0, 0.4, -0.78, 0],
  [0.5, 0.1, 0.53, -0.75, 8],
  [1.5, 0.175, 0.651, -0.61, 12],
  [2.5, 0.263, 0.75, -0.46, 16],
  [3.5, 0.359, 0.852, -0.31, 20],
  [4.5, 0.459, 0.942, -0.16, 23],
  [5.5, 0.558, 0.986, -0.015, 26],
  [6, 0.8, 1, 0.03, 26],
];

const PRIMARY_THRESHOLD = 0.47;
const mix = (a, b, t) => a + (b - a) * t;

function smooth(a, b, n) {
  const t = Math.max(0, Math.min(1, (n - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Monotone cubics give each station a shared tangent with its neighbours.
// That keeps a card from changing speed abruptly as it passes a station.
function makeRail(rows) {
  const slope = (i, j, k) =>
    (rows[j][k] - rows[i][k]) / (rows[j][0] - rows[i][0]);
  const tangents = rows.map(([, ...values], i) =>
    values.map((_, column) => {
      const k = column + 1;
      if (i === 0) return slope(i, i + 1, k);
      if (i === rows.length - 1) return slope(i - 1, i, k);
      const left = slope(i - 1, i, k);
      const right = slope(i, i + 1, k);
      return left * right > 0 ? (2 * left * right) / (left + right) : 0;
    }),
  );

  return (distance) => {
    let i = 0;
    while (i < rows.length - 2 && distance > rows[i + 1][0]) i++;
    const [a, ...from] = rows[i];
    const [b, ...to] = rows[i + 1];
    const span = b - a;
    const t = Math.min(1, (distance - a) / span);
    const t2 = t * t;
    const t3 = t2 * t;
    return from.map(
      (value, k) =>
        (2 * t3 - 3 * t2 + 1) * value +
        (t3 - 2 * t2 + t) * span * tangents[i][k] +
        (-2 * t3 + 3 * t2) * to[k] +
        (t3 - t2) * span * tangents[i + 1][k],
    );
  };
}

const openingRail = makeRail(OPEN_RAIL);
const backgroundRail = makeRail(BACK_RAIL);

export function measureCorridor(width, height, mode) {
  const mobile = mode === "mobile";
  const tablet = mode === "tablet";
  const opensAt = Math.min(height * 0.726, width * (tablet ? 0.59 : 0.57));
  const portraitHeight = Math.min(
    424,
    height * (mobile ? 0.66 : 0.644),
    (width - 40) / 0.75,
  );
  return {
    width,
    height,
    mode,
    perspective: Math.max(665, Math.min(1320, width * 0.76, height * 1.3)),
    opensAt,
    // Preserve the continuity of the small portraits on short, wide screens.
    profile: Math.max(0.49, Math.min(1, (opensAt * 2.45) / width)),
    recedesTo: Math.min(height * 0.45, portraitHeight * 0.79, width * 0.49),
    portraitHeight,
    foregroundHeight: Math.min(
      440,
      height * (mobile ? 0.735 : 0.725),
      (width - 40) / 0.75,
    ),
    focusY: (height - Math.min(110, height * 0.17)) / 2,
  };
}

export function corridorPose(layout, camera, index, count) {
  const { width, height, perspective, mode, portraitHeight, focusY } = layout;
  const { travel, depth } = camera;
  const half = count / 2;
  const lane = ((((index - travel + half) % count) + count) % count) - half;
  const distance = Math.abs(lane);
  const side = Math.sign(lane);
  // The aperture is less than half a station in either direction. During a
  // handoff the outgoing card clears it before the incoming card reaches it.
  const arrival = 1 - smooth(0, 0.49, distance);
  const near = depth * arrival;
  let x, y, h, z, yaw, opacity, shade;

  if (mode === "mobile") {
    const departure = 1 - arrival;
    const openingHeight = Math.min(height * 0.407, width * 1.03, 344);
    h = mix(openingHeight, portraitHeight * mix(0.84, 1, arrival), depth);
    x = side * width * 0.037 * departure * depth;
    y = mix(height * 0.492, focusY, depth);
    z = mix(-0.16, 0.12, near);
    yaw = -side * 10 * departure * depth;
    const last = count - 1;
    const returnProgress = (travel - last) * 2;
    if (returnProgress > 0) {
      // The phone's final portrait is already back at the opening scale
      // when the camera moves this last half-station. Both photos share the
      // same slot. Bring in the first before fading the last so the slot
      // never shows bare paper between them.
      opacity =
        index === 0
          ? smooth(0, 0.35, returnProgress)
          : index === last
            ? 1 - smooth(0.35, 1, returnProgress)
            : 0;
    } else {
      opacity = index === 0 && travel < 0 ? 1 : 1 - smooth(0.32, 0.5, distance);
    }
    shade = 0;
  } else {
    const tablet = mode === "tablet";
    const station = Math.min(half, distance * (tablet ? 1.46 : 1));
    const [ox, oh, oz, oyaw] = openingRail(station);
    const [bx, bh, bz, byaw] = backgroundRail(station);
    const backHeight = layout.recedesTo * bh ** layout.profile;
    const railHeight = mix(
      layout.opensAt * oh ** layout.profile,
      backHeight,
      depth,
    );
    const railX = width * side * mix(ox, bx, depth);
    const railY = height * mix(0.5, 0.477, depth);
    x = railX * (1 - near);
    y = mix(railY, focusY, near);
    h = mix(railHeight, portraitHeight, near);
    z = mix(mix(oz, bz, depth), tablet ? 0.17 : 0.24, near);
    yaw = -side * mix(oyaw, byaw, depth) * (1 - near);
    // Only the peripheral exit becomes transparent. Background photographs
    // retain their natural colour; this is a little neutral shadow, not a wash.
    opacity = tablet
      ? 1 - smooth(3.64, 4.12, distance)
      : 1 - smooth(5.62, half, distance);
    shade = 0.11 * depth * (1 - near);
  }

  // Enlarge only inside the focal aperture. A portrait returns to its rail
  // size smoothly on departure.
  h +=
    (layout.foregroundHeight - portraitHeight) *
    smooth(PRIMARY_THRESHOLD, 1, near);

  // The image plane never changes aspect ratio. Compose its X/Y positions in
  // camera space and let the actual CSS perspective project it to the screen.
  const projection = 1 - z;
  return {
    x: x * projection,
    y: (y - height / 2) * projection,
    z: z * perspective,
    yaw,
    scale: (h / portraitHeight) * projection,
    opacity,
    shade,
    primary: near > PRIMARY_THRESHOLD,
    caption: smooth(0.78, 0.986, near),
    captionY: y + h / 2,
  };
}
