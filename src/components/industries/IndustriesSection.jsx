import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  INDUSTRIES,
  INDUSTRY_GROUPS,
  industryAnchor,
} from "../../data/industries";
import { useGsap } from "../../hooks/useGsap";
import { gsap, prefersReducedMotion } from "../../animations/animationConfig";
import {
  revealStagger,
  revealImageMask,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import IndustryCard from "./IndustryCard";
import "../../styles/industries.css";

gsap.registerPlugin(ScrollToPlugin);

const GALLERY_INDUSTRIES = [
  ...INDUSTRIES.filter(({ spotlight }) => spotlight),
  ...INDUSTRIES.filter(({ spotlight }) => !spotlight),
];
const LAST_SLIDE = GALLERY_INDUSTRIES.length - 1;
const formatNumber = (number) => String(number).padStart(2, "0");
const slideLeft = (track, card) =>
  Math.min(card.offsetLeft, track.scrollWidth - track.clientWidth);
const DIRECTORY_GROUPS = INDUSTRY_GROUPS.map((group) => ({
  ...group,
  entries: INDUSTRIES.filter((industry) => industry.group === group.id),
})).filter((group) => group.entries.length);

export default function IndustriesSection({ onInquireIndustry }) {
  const { hash, key } = useLocation();
  const trackRef = useRef(null);
  const motionRef = useRef(null);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndustry = GALLERY_INDUSTRIES[activeIndex];

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    // Later images load as the visitor browses, not as 18 simultaneous reveals.
    revealImageMask("[data-industry-image='lead']", scope);
  });

  const stopMotion = useCallback(() => {
    if (!motionRef.current) return;
    motionRef.current.kill();
    motionRef.current = null;
    trackRef.current?.style.removeProperty("scroll-snap-type");
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const reduce = ({ matches }) => {
      if (!matches || !motionRef.current) return;
      const destination = motionRef.current.vars.scrollTo.x;
      stopMotion();
      if (trackRef.current) trackRef.current.scrollLeft = destination;
    };
    motionPreference.addEventListener("change", reduce);
    return () => {
      motionPreference.removeEventListener("change", reduce);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      stopMotion();
    };
  }, [stopMotion]);

  const readScroll = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const track = trackRef.current;
      if (!track || motionRef.current) return;
      const left = track.scrollLeft;
      const cards = [...track.children];
      const distance = (card) => Math.abs(slideLeft(track, card) - left);
      const nearest = cards.reduce(
        (best, card, index) =>
          distance(card) < distance(cards[best]) ? index : best,
        0,
      );
      setActiveIndex(nearest);
    });
  }, []);

  const select = useCallback(
    (index, { jump = false } = {}) => {
      const track = trackRef.current;
      const next = Math.min(LAST_SLIDE, Math.max(0, index));
      const card = track?.children[next];
      if (!card) return;

      stopMotion();
      const left = slideLeft(track, card);
      setActiveIndex(next);
      if (
        jump ||
        prefersReducedMotion() ||
        Math.abs(track.scrollLeft - left) < 2
      ) {
        track.scrollLeft = left;
        return;
      }

      const finish = () => {
        motionRef.current = null;
        track.style.removeProperty("scroll-snap-type");
        readScroll();
      };
      motionRef.current = gsap.to(track, {
        scrollTo: { x: left, autoKill: true, onAutoKill: finish },
        duration: 0.68,
        ease: "power3.inOut",
        onComplete: finish,
      });
    },
    [readScroll, stopMotion],
  );

  // Hero links and bookmarked sector URLs pick the corresponding slide before
  // the page's normal hash navigation scrolls to the card.
  useEffect(() => {
    const index = GALLERY_INDUSTRIES.findIndex(
      ({ id }) => hash === `#${industryAnchor(id)}`,
    );
    if (index < 0) return;
    select(index, { jump: true });
    trackRef.current?.children[index]?.focus({ preventScroll: true });
  }, [hash, key, select]);

  if (!activeIndustry) return null;

  return (
    <section
      id="industries"
      ref={sectionRef}
      aria-labelledby="industries-heading"
      className="section-shell industries-section"
    >
      <div className="editorial-container">
        <div className="industry-intro">
          <SectionHeading
            id="industries-heading"
            index="03"
            eyebrow="Industry Ecosystem"
            title={
              <>
                Technology Solutions Across{" "}
                <em className="section-accent">Multiple Industries.</em>
              </>
            }
            subtitle="Medixo AI engineers AI systems, custom software, and automation for the distinct demands of each sector, from robotics and infrastructure to finance, commerce, and people operations."
          />
          <div data-reveal className="industry-context">
            <p className="editorial-label">Capabilities by sector</p>
            <p>
              These cards show solutions we can engineer. The imagery is
              illustrative; project examples are listed separately.
            </p>
            <Link to="#our-work">
              View selected projects{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="industry-toolbar" data-reveal>
          <div className="industry-directory">
            <label htmlFor="industry-directory" className="editorial-label">
              Explore by industry
            </label>
            <div className="industry-select">
              <select
                id="industry-directory"
                value={activeIndustry.id}
                aria-controls="industry-gallery"
                onChange={(event) =>
                  select(
                    GALLERY_INDUSTRIES.findIndex(
                      ({ id }) => id === event.target.value,
                    ),
                    { jump: true },
                  )
                }
              >
                {DIRECTORY_GROUPS.map((group) => (
                  <optgroup key={group.id} label={group.title}>
                    {group.entries.map(({ id, title }) => (
                      <option value={id} key={id}>
                        {title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
          </div>
          <div
            className="industry-controls"
            role="group"
            aria-label="Browse industry cards"
          >
            <span className="editorial-label" aria-hidden="true">
              {formatNumber(activeIndex + 1)} <span>/</span>{" "}
              {formatNumber(GALLERY_INDUSTRIES.length)}
            </span>
            <button
              type="button"
              className="icon-button"
              disabled={activeIndex === 0}
              onClick={() => select(activeIndex - 1)}
              aria-controls="industry-gallery"
              aria-label="Previous industry"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-button icon-button--dark"
              disabled={activeIndex === LAST_SLIDE}
              onClick={() => select(activeIndex + 1)}
              aria-controls="industry-gallery"
              aria-label="Next industry"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          <span className="sr-only" role="status">
            {activeIndustry.title}, {activeIndex + 1} of{" "}
            {GALLERY_INDUSTRIES.length}
          </span>
        </div>

        <div
          id="industry-gallery"
          ref={trackRef}
          role="region"
          aria-label="Industry gallery"
          tabIndex={0}
          onScroll={readScroll}
          className="industry-track no-scrollbar"
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              select(event.key === "Home" ? 0 : LAST_SLIDE, { jump: true });
            } else if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
              event.preventDefault();
              select(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
            }
          }}
        >
          {GALLERY_INDUSTRIES.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              number={formatNumber(index + 1)}
              isLead={index === 0}
              isActive={index === activeIndex}
              onSelect={() => select(index)}
              onInquire={onInquireIndustry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
