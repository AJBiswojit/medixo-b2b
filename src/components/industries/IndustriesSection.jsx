import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  PRIMARY_INDUSTRIES,
  ADDITIONAL_INDUSTRIES,
} from "../../data/industries";
import { useGsap } from "../../hooks/useGsap";
import { gsap, prefersReducedMotion } from "../../animations/animationConfig";
import {
  revealStagger,
  revealCardGroups,
  revealImageMask,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import IndustryCard from "./IndustryCard";
import "../../styles/industries.css";

gsap.registerPlugin(ScrollToPlugin);

const LAST_SLIDE = PRIMARY_INDUSTRIES.length - 1;
const SECTOR_ACCENTS = [
  "var(--pastel-beige)",
  "var(--pastel-mint)",
  "var(--pastel-butter)",
  "var(--pastel-powder)",
];

export default function IndustriesSection({ onInquireIndustry }) {
  const trackRef = useRef(null);
  const tabsRef = useRef(null);
  const motionRef = useRef(null);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    revealImageMask("[data-industry-image]", scope);
    revealCardGroups("[data-extra-industry]", scope, { size: 2, y: 12 });
  });

  const stopMotion = () => {
    if (!motionRef.current) return;
    motionRef.current.kill();
    motionRef.current = null;
    trackRef.current?.style.removeProperty("scroll-snap-type");
  };

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
      stopMotion();
    };
  }, []);

  // Keep the selected chip in view without moving the page or its focus.
  useEffect(() => {
    const tabs = tabsRef.current;
    const button = tabs?.children[activeIndex];
    if (!button) return;
    if (
      button.offsetLeft < tabs.scrollLeft ||
      button.offsetLeft + button.offsetWidth >
        tabs.scrollLeft + tabs.clientWidth
    ) {
      tabs.scrollLeft =
        button.offsetLeft - (tabs.clientWidth - button.offsetWidth) / 2;
    }
  }, [activeIndex]);

  const readScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track || motionRef.current) return;
      const max = track.scrollWidth - track.clientWidth;
      const distance = (card) =>
        Math.abs(Math.min(max, card.offsetLeft) - track.scrollLeft);
      const cards = [...track.children];
      const index = cards.reduce(
        (best, card, i) => (distance(card) < distance(cards[best]) ? i : best),
        0,
      );
      setActiveIndex(index);
    });
  };

  const select = (index) => {
    const track = trackRef.current;
    const next = Math.min(LAST_SLIDE, Math.max(0, index));
    const card = track?.children[next];
    if (!card) return;

    stopMotion();
    const left = Math.min(
      card.offsetLeft,
      track.scrollWidth - track.clientWidth,
    );
    setActiveIndex(next);
    if (prefersReducedMotion() || Math.abs(track.scrollLeft - left) < 2) {
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
  };

  return (
    <section
      id="industries"
      ref={sectionRef}
      aria-labelledby="industries-heading"
      className="section-shell industries-section"
    >
      <div className="editorial-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            id="industries-heading"
            index="03"
            eyebrow="Industries We Serve"
            title="Technology Solutions Across Multiple Industries."
            subtitle="Domain-aware AI systems and custom software applications built around the distinct operational needs of healthcare, education, commerce, luxury retail, human resources, and industrial sectors."
          />
          <div
            className="industry-controls"
            data-reveal
            role="group"
            aria-label="Slide through industries"
          >
            <span aria-hidden="true" className="editorial-label">
              {PRIMARY_INDUSTRIES[activeIndex].number} / 0
              {PRIMARY_INDUSTRIES.length}
            </span>
            <button
              type="button"
              className="icon-button"
              disabled={activeIndex === 0}
              onClick={() => select(activeIndex - 1)}
              aria-label="Previous industry"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-button icon-button--dark"
              disabled={activeIndex === LAST_SLIDE}
              onClick={() => select(activeIndex + 1)}
              aria-label="Next industry"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          data-reveal
          ref={tabsRef}
          className="industry-index no-scrollbar"
          aria-label="Industry index"
          role="group"
        >
          {PRIMARY_INDUSTRIES.map((industry, index) => (
            <button
              key={industry.id}
              type="button"
              onClick={() => select(index)}
              aria-pressed={index === activeIndex}
              aria-controls="industry-gallery"
              style={{ "--industry-accent": industry.accent }}
            >
              <span aria-hidden="true">{industry.number}</span> {industry.title}
            </button>
          ))}
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
            if (
              event.target !== event.currentTarget ||
              !["ArrowLeft", "ArrowRight"].includes(event.key)
            )
              return;
            event.preventDefault();
            select(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
          }}
        >
          {PRIMARY_INDUSTRIES.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              isActive={index === activeIndex}
              onSelect={() => select(index)}
              onInquire={() =>
                onInquireIndustry?.({ industry: industry.title })
              }
            />
          ))}
        </div>

        <div className="additional-sectors">
          <div className="flex flex-wrap justify-between gap-2 mb-5">
            <h3 className="editorial-label">Additional Sectors Supported</h3>
            <span className="text-[13px] text-[var(--text-secondary)]">
              Tailored architecture for specialized enterprise domains
            </span>
          </div>
          <ul>
            {ADDITIONAL_INDUSTRIES.map((sector, index) => (
              <li
                key={sector.id}
                data-extra-industry
                style={{ "--sector-accent": SECTOR_ACCENTS[index] }}
              >
                <h4 className="font-display">
                  <button
                    type="button"
                    onClick={() =>
                      onInquireIndustry?.({ industry: sector.title })
                    }
                  >
                    <span>{sector.title}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </h4>
                <p>{sector.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
