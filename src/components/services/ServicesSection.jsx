import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../../data/services";
import { SERVICE_SHOWCASE } from "../../data/serviceShowcase";
import { gsap } from "../../animations/animationConfig";
import { scrollToSection } from "../../utils/validation";
import "../../styles/services.css";

// Timeline units: service i is fully presented between i + ENTER and i + EXIT_AT.
// Its successor enters at i + 1, so exactly one service is on stage at a time.
const ENTER = 0.36;
const EXIT_AT = 0.7;
const EXIT = 0.3;
const TOTAL = SERVICES.length - 1 + EXIT_AT;

// Scroll distance per timeline unit. Clamped so the showcase stays comfortable
// on tall and short desktop windows alike.
const unitHeight = () =>
  Math.min(760, Math.max(480, window.innerHeight * 0.72));

function ServicePanel({ service, index, onInquire }) {
  const showcase = SERVICE_SHOWCASE[service.id];
  return (
    <article
      id={`service-${service.id}`}
      data-service-panel
      aria-labelledby={`service-title-${service.id}`}
      className="svc-panel"
      style={{ "--svc-accent": service.accent }}
    >
      <figure className="svc-visual" data-svc-frame>
        <div className="svc-visual-media">
          <img
            data-svc-img
            src={showcase.image.src}
            width={showcase.image.width}
            height={showcase.image.height}
            alt={showcase.image.alt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            sizes="(min-width: 1100px) 58vw, 100vw"
          />
        </div>
      </figure>

      <div className="svc-copy">
        <p className="svc-label" data-svc-part="label">
          Service <span>{service.number}</span>
        </p>
        <h3
          id={`service-title-${service.id}`}
          className="svc-title font-display"
          data-svc-part="title"
        >
          {service.title}
        </h3>
        <p className="svc-desc" data-svc-part="desc">
          {service.shortSummary}
        </p>
        <ul className="svc-points" data-svc-part="items">
          {showcase.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <button
          type="button"
          className="svc-cta"
          data-svc-part="cta"
          onClick={() => onInquire?.(service.title)}
        >
          Explore Service <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

// Builds the single pinned timeline. Every service has an enter and an exit
// window; the scroll position is the only thing that moves them.
function buildPinnedShowcase(section, goTo) {
  const panels = [...section.querySelectorAll("[data-service-panel]")];
  const fill = section.querySelector("[data-svc-fill]");
  const counter = section.querySelector("[data-svc-counter]");
  const ticks = [...section.querySelectorAll("[data-svc-tick]")];
  const last = panels.length - 1;
  let activeIndex = -1;

  const showIndex = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;
    if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    ticks.forEach((tick, i) => {
      if (i === index) tick.setAttribute("aria-current", "step");
      else tick.removeAttribute("aria-current");
      tick.dataset.state = i < index ? "done" : i === index ? "active" : "";
    });
  };

  const timeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    onUpdate: () => showIndex(Math.min(last, Math.floor(timeline.time()))),
    scrollTrigger: {
      id: "services-showcase",
      trigger: section,
      start: "top top",
      end: () => `+=${Math.round(TOTAL * unitHeight())}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  if (fill) {
    timeline.fromTo(
      fill,
      { scaleX: 0 },
      { scaleX: 1, duration: TOTAL, ease: "none" },
      0,
    );
  }

  panels.forEach((panel, index) => {
    const frame = panel.querySelector("[data-svc-frame]");
    const img = panel.querySelector("[data-svc-img]");
    const part = (name) => panel.querySelector(`[data-svc-part="${name}"]`);
    const label = part("label");
    const title = part("title");
    const desc = part("desc");
    const items = [...panel.querySelectorAll("[data-svc-part='items'] li")];
    const cta = part("cta");
    const at = index;

    // Enter: the first service is already on stage at time zero.
    if (index > 0) {
      timeline
        .fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, at)
        .fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0% round 19px)" },
          { clipPath: "inset(0% 0% 0% 0% round 19px)", duration: ENTER, ease: "power3.out" },
          at,
        )
        .fromTo(img, { scale: 1.12 }, { scale: 1, duration: ENTER, ease: "power3.out" }, at)
        .fromTo(label, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.16 }, at + 0.02)
        .fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22 }, at + 0.05)
        .fromTo(desc, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.2 }, at + 0.12)
        .fromTo(
          items,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.12, stagger: 0.02 },
          at + 0.16,
        )
        .fromTo(cta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.11 }, at + 0.25);
    }

    // Exit: the presentation closes before the next one opens.
    if (index < last) {
      const exitAt = index + EXIT_AT;
      timeline
        .to(
          [label, title, desc, ...items, cta],
          { opacity: 0, y: -12, duration: 0.2, stagger: 0, ease: "power2.in" },
          exitAt,
        )
        .to(frame, { clipPath: "inset(0% 0% 100% 0% round 19px)", duration: EXIT, ease: "power2.in" }, exitAt)
        .to(panel, { autoAlpha: 0, duration: 0.01, ease: "none" }, exitAt + EXIT);
    }
  });

  timeline.progress(0);
  showIndex(0);

  // Scroll to the middle of a service's presentation.
  const goToIndex = (index) => {
    const trigger = timeline.scrollTrigger;
    if (!trigger) return false;
    const target = trigger.start + ((index + 0.5) / TOTAL) * (trigger.end - trigger.start);
    window.scrollTo({ top: target, behavior: "smooth" });
    return true;
  };
  goTo.current = goToIndex;

  return () => {
    goTo.current = null;
  };
}

export default function ServicesSection({ highlightedService, onInquireService }) {
  const sectionRef = useRef(null);
  const goToRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          pinned: "(min-width: 1100px) and (min-height: 680px)",
        },
        ({ conditions }) => {
          if (conditions.motion && conditions.pinned) {
            return buildPinnedShowcase(section, goToRef);
          }
          // Tablet, mobile and reduced-motion: each service reads as a stacked
          // block. Blocks reveal once, without pinning or scroll hijacking.
          goToRef.current = null;
          if (!conditions.motion) return undefined;
          section.querySelectorAll("[data-service-panel]").forEach((panel) => {
            gsap.from(panel.querySelectorAll("[data-svc-frame], [data-svc-part]"), {
              opacity: 0,
              y: 22,
              duration: 0.8,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: panel, start: "top 84%", once: true },
            });
          });
          return undefined;
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!highlightedService) return;
    const index = SERVICES.findIndex(
      (service) => service.id === highlightedService.id,
    );
    if (index < 0) return;
    if (goToRef.current?.(index)) return;
    scrollToSection(`service-${highlightedService.id}`);
  }, [highlightedService]);

  const jumpTo = (index, id) => {
    if (goToRef.current?.(index)) return;
    scrollToSection(`service-${id}`);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="services-showcase"
    >
      <div className="services-inner editorial-container">
        <header className="svc-header">
          <p className="editorial-label svc-eyebrow">02 · Our Services</p>
          <h2 id="services-heading" className="svc-heading font-display">
            Comprehensive Technology Solutions for Modern Businesses.
          </h2>
        </header>

        <div className="svc-stage">
          {SERVICES.map((service, index) => (
            <ServicePanel
              key={service.id}
              service={service}
              index={index}
              onInquire={(serviceRequired) =>
                onInquireService?.({ serviceRequired })
              }
            />
          ))}
        </div>

        <nav className="svc-footer" aria-label="Service progress">
          <div className="svc-counter" aria-live="polite">
            <span data-svc-counter>01</span>
            <span aria-hidden="true"> / {String(SERVICES.length).padStart(2, "0")}</span>
          </div>
          <div className="svc-progress">
            <div className="svc-progress-track" aria-hidden="true">
              <span className="svc-progress-fill" data-svc-fill />
            </div>
            <ol className="svc-ticks">
              {SERVICES.map((service, index) => (
                <li key={service.id}>
                  <button
                    type="button"
                    data-svc-tick
                    onClick={() => jumpTo(index, service.id)}
                    aria-label={`Show service ${service.number}: ${service.title}`}
                  >
                    <span aria-hidden="true">{service.number}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    </section>
  );
}
