import { gsap } from "./animationConfig";

// Timing is a fraction of the scroll span. The flight points are two Bézier
// controls and a landing: [canvas x, canvas y, camera depth in px]. The first
// point is measured from each card's original CSS position at refresh time.
// Bank is [pitch, yaw, roll]; landing is [roll, scale, opacity].
const FLIGHTS = {
  ai: {
    timing: [0.035, 0.91],
    points: [
      [0.255, 0.177, 35],
      [0.29, 0.238, 210],
      [0.38, 0.47, 177],
    ],
    bank: [-10, -16, 6],
    landing: [-4, 1.12, 1],
  },
  healthcare: {
    timing: [0.065, 0.86],
    points: [
      [1.02, 0.44, -160],
      [0.69, 0.41, -280],
      [0.533, 0.27, -196],
    ],
    bank: [13, 17, -8],
    landing: [6, 0.91, 0.95],
  },
  education: {
    timing: [0.15, 0.94],
    points: [
      [0.24, 0.41, -170],
      [0.32, 0.38, -265],
      [0.444, 0.765, -35],
    ],
    bank: [18, -10, -7],
    landing: [4, 1.02, 1],
  },
  commerce: {
    timing: [0.1, 0.93],
    points: [
      [0.91, 0.48, -92],
      [0.57, 0.34, -135],
      [0.758, 0.724, 30],
    ],
    bank: [14, 15, 9],
    landing: [-6, 0.99, 1],
  },
  vision: {
    timing: [0.045, 0.84],
    points: [
      [0.17, 0.19, -235],
      [0.43, 0.12, -330],
      [0.212, 0.335, -145],
    ],
    bank: [-13, -22, -11],
    landing: [-7, 0.97, 0.96],
  },
  creative: {
    timing: [0.085, 0.92],
    points: [
      [0.976, 0.67, 40],
      [0.77, 0.85, 210],
      [0.635, 0.5, 205],
    ],
    bank: [-15, 23, 8],
    landing: [6, 1.19, 1],
  },
  automation: {
    timing: [0.12, 0.87],
    points: [
      [0.36, 0.44, -95],
      [0.52, 0.31, -220],
      [0.227, 0.65, -105],
    ],
    bank: [12, -19, -16],
    landing: [4, 0.99, 0.97],
  },
  enterprise: {
    timing: [0.055, 0.89],
    points: [
      [0.94, 0.74, -82],
      [0.57, 0.79, -160],
      [0.836, 0.25, -138],
    ],
    bank: [-15, 13, 16],
    landing: [-4, 0.97, 0.96],
  },
};

// Opening cards keep their original paths. A second set takes over their
// landing positions in staggered passes, entering from the far depth plane.
const OPENING_SPAN = 0.83;
const SECTOR_LANES = {
  ai: {
    timing: [0.66, 0.97],
    launch: [0.11, 0.52, -460],
    bend: [
      [0.2, 0.18, -300],
      [0.28, 0.28, 190],
    ],
  },
  healthcare: {
    timing: [0.55, 0.89],
    launch: [0.92, 0.23, -435],
    bend: [
      [0.86, 0.12, -305],
      [0.65, 0.18, -165],
    ],
  },
  education: {
    timing: [0.64, 0.94],
    launch: [0.13, 0.87, -380],
    bend: [
      [0.24, 0.86, -250],
      [0.4, 0.61, 20],
    ],
  },
  commerce: {
    timing: [0.69, 0.95],
    launch: [0.94, 0.82, -380],
    bend: [
      [0.97, 0.61, -265],
      [0.9, 0.57, 95],
    ],
  },
  vision: {
    timing: [0.56, 0.87],
    launch: [0.12, 0.54, -475],
    bend: [
      [0.08, 0.48, -300],
      [0.16, 0.27, -160],
    ],
  },
  creative: {
    timing: [0.7, 0.98],
    launch: [0.95, 0.26, -460],
    bend: [
      [0.94, 0.47, -290],
      [0.8, 0.63, 190],
    ],
  },
  automation: {
    timing: [0.6, 0.9],
    launch: [0.11, 0.65, -430],
    bend: [
      [0.22, 0.48, -280],
      [0.32, 0.51, 15],
    ],
  },
  enterprise: {
    timing: [0.58, 0.88],
    launch: [0.94, 0.5, -440],
    bend: [
      [0.99, 0.37, -305],
      [0.91, 0.2, -125],
    ],
  },
};

const COMPACT_FLIGHTS = {
  ai: [5, -14, 1],
  healthcare: [7, 2, -1],
  commerce: [4, -10, -1.6],
  enterprise: [-4, -5, 0.8],
};

function makeFlight(
  card,
  { timing: [start, end], points, bank, landing, launch, retireAt },
) {
  const [pitch, yaw, roll] = bank;
  const [endRoll, endScale, endOpacity] = landing;
  const restRoll = parseFloat(card.style.getPropertyValue("--tile-tilt"));
  const driver = { t: 0, recede: 0 };
  let lastT = 0;
  let lastRecede = 0;
  let controls;

  return {
    addTo(timeline) {
      timeline.to(
        driver,
        { t: 1, duration: end - start, ease: "sine.inOut" },
        start,
      );
      if (retireAt !== undefined) {
        timeline.to(
          driver,
          { recede: 1, duration: 0.122, ease: "sine.inOut" },
          retireAt,
        );
      }
    },
    measure(width, height) {
      const x = card.offsetLeft + card.offsetWidth / 2;
      const y = card.offsetTop + card.offsetHeight / 2;
      const point = ([u, v, depth]) => [u * width - x, v * height - y, depth];
      controls = [launch ? point(launch) : [0, 0, 0], ...points.map(point)];
      lastT = -1;
    },
    draw() {
      const { t, recede } = driver;
      if (t === lastT && recede === lastRecede) return;
      lastT = t;
      lastRecede = recede;
      if (t === 0 && recede === 0) {
        this.reset();
        return;
      }
      if (recede === 1) {
        card.style.visibility = "hidden";
        card.style.removeProperty("transform");
        card.style.removeProperty("opacity");
        return;
      }

      // Evaluate the cubic in xyz. Retiring cards sink as their next sector
      // enters the lane, so the visual count stays near the opening eight.
      const inverse = 1 - t;
      const a = inverse * inverse * inverse;
      const b = 3 * inverse * inverse * t;
      const c = 3 * inverse * t * t;
      const d = t * t * t;
      const [p0, p1, p2, p3] = controls;
      const x = a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0];
      const y = a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1] - 45 * recede;
      const z = a * p0[2] + b * p1[2] + c * p2[2] + d * p3[2] - 360 * recede;
      const lean = 4 * t * inverse;
      const rotation = restRoll + (endRoll - restRoll) * t + roll * lean;
      const scale = (1 + (endScale - 1) * t) * (1 - 0.16 * recede);
      const clarity = 1 + (endOpacity - 1) * t - Math.max(0, -z / 1800) * lean;
      const opacity =
        clarity * (1 - recede) * (launch ? Math.min(1, 4.3 * t) : 1);
      card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${(pitch * lean).toFixed(2)}deg) rotateY(${(yaw * lean).toFixed(2)}deg) rotateZ(${rotation.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      card.style.opacity = opacity.toFixed(3);
      if (launch || recede || card.style.visibility) {
        const visibility = opacity < 0.025 ? "hidden" : "visible";
        if (card.style.visibility !== visibility)
          card.style.visibility = visibility;
      }
    },
    reset() {
      card.style.removeProperty("transform");
      card.style.removeProperty("opacity");
      card.style.removeProperty("visibility");
    },
  };
}

function createDesktopScene(scope, select) {
  const [scene] = select(".hero-scene");
  const [gallery] = select(".hero-gallery");
  const [progress] = select(".hero-progress-fill");
  const [scrim] = select(".hero-scrim");
  const [content] = select(".hero-content");
  const [actions] = select(".hero-actions");
  const [copy] = select(".hero-copy");
  const [tagline] = select(".hero-tagline");
  const [title] = select(".hero-title");
  const [label] = select(".hero-scene-label");
  const cards = select("[data-hero-card]");
  const sectorSlots = new Set(
    cards.map((card) => card.dataset.heroIndustry).filter(Boolean),
  );
  const flights = cards.map((card) => {
    const sectorSlot = card.dataset.heroIndustry;
    const slot = sectorSlot || card.dataset.heroCard;
    const flight = FLIGHTS[slot];
    const lane = SECTOR_LANES[slot];
    if (sectorSlot) {
      return makeFlight(card, {
        ...flight,
        timing: lane.timing,
        launch: lane.launch,
        points: [...lane.bend, flight.points[2]],
      });
    }
    return makeFlight(card, {
      ...flight,
      timing: flight.timing.map((time) => time * OPENING_SPAN),
      retireAt: sectorSlots.has(slot) ? lane.timing[0] - 0.047 : undefined,
    });
  });
  const draw = () => flights.forEach((flight) => flight.draw());
  const measure = () => {
    const { clientWidth, clientHeight } = gallery;
    flights.forEach((flight) => flight.measure(clientWidth, clientHeight));
    draw();
  };
  measure();

  const timeline = gsap.timeline({
    defaults: { ease: "sine.inOut" },
    onUpdate: draw,
    scrollTrigger: {
      id: "hero-scene",
      trigger: scene,
      start: () => `top top+=${parseFloat(getComputedStyle(scope).paddingTop)}`,
      end: () =>
        `+=${Math.round(gsap.utils.clamp(1000, 1740, window.innerHeight * 1.63))}`,
      scrub: true,
      pin: true,
      pinSpacing: true,
      refreshPriority: 1,
      onRefresh: measure,
    },
  });

  flights.forEach((flight) => flight.addTo(timeline));

  timeline
    .addLabel("departure", 0.09)
    .addLabel("crossing", 0.42)
    .addLabel("resolve", 0.67)
    .to(progress, { scaleX: 1, duration: 1, ease: "none" }, 0)
    .to(scrim, { opacity: 0.93, duration: 0.21 }, "departure")
    .to(actions, { opacity: 0, y: -12, duration: 0.13 }, "crossing")
    .set(actions, { pointerEvents: "none" }, "crossing+=0.12")
    .to(copy, { opacity: 0, y: -22, duration: 0.14 }, "crossing+=0.02")
    .to(tagline, { opacity: 0, y: -15, duration: 0.14 }, "crossing+=0.05")
    .to(title, { opacity: 0, y: -36, duration: 0.165 }, "crossing+=0.055")
    .set(content, { pointerEvents: "none" }, "resolve")
    .to(scrim, { opacity: 0, duration: 0.135 }, "resolve-=0.105")
    .to(label, { opacity: 1, y: 0, duration: 0.16 }, "resolve+=0.04");

  return () => {
    flights.forEach((flight) => flight.reset());
    // The pin can render time zero during a media change. Drop those inline
    // values too, so the static and compact layouts are owned solely by CSS.
    [progress, scrim, content, actions, copy, tagline, title, label].forEach(
      (layer) => layer.removeAttribute("style"),
    );
  };
}

function createCompactScene(select, tablet) {
  const [gallery] = select(".hero-gallery");
  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "hero-scene",
      trigger: gallery,
      start: () =>
        Math.max(
          0,
          gallery.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight * 0.72,
        ),
      end: () => {
        const span = window.innerHeight * (tablet ? 0.47 : 0.33);
        return `+=${Math.round(gsap.utils.clamp(180, tablet ? 410 : 300, span))}`;
      },
      scrub: true,
    },
  });
  const amplitude = tablet ? 1.35 : 1;
  const cards = select("[data-compact]");
  cards.forEach((card, i) => {
    const [x, y, roll] = COMPACT_FLIGHTS[card.dataset.heroCard];
    const offset = i * 0.07;
    // Offset the CSS resting pose instead of caching it in GSAP's transform.
    // This keeps the same small arc when a short desktop layout becomes a grid.
    timeline
      .to(
        card,
        {
          "--tile-arc-x": `${x * amplitude}px`,
          "--tile-arc-tilt": `${roll}deg`,
          duration: 0.79,
          ease: "sine.inOut",
        },
        offset,
      )
      .to(
        card,
        {
          "--tile-arc-y": `${y * amplitude}px`,
          duration: 0.79,
          ease: "power1.out",
        },
        offset,
      );
  });
}

export function initHeroAnimations(scope) {
  if (!scope) return;
  const select = gsap.utils.selector(scope);
  const context = gsap.context(() => {
    gsap.matchMedia(scope).add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1100px) and (min-height: 680px)",
        tablet: "(min-width: 680px)",
      },
      ({ conditions }) => {
        if (!conditions.motion) return;
        if (conditions.desktop) return createDesktopScene(scope, select);
        createCompactScene(select, conditions.tablet);
      },
    );
  }, scope);
  return () => context.revert();
}
