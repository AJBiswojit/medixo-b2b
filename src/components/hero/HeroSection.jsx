import React, { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { BRAND } from "../../data/navigation";
import { initHeroAnimations } from "../../animations/heroAnimations";
import { scrollToSection } from "../../utils/validation";
import Button from "../common/Button";
import HeroVisual from "./HeroVisual";
import "../../styles/hero.css";

const HEADLINE_LINES = [
  "Transforming Business",
  "Ideas Into Intelligent",
  "Digital Solutions.",
];
const CAPABILITIES = [
  "Artificial Intelligence",
  "Generative & Agentic AI",
  "RAG Architectures",
  "Computer Vision",
  "Custom Software",
];

function jumpTo(event, section) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  scrollToSection(section);
}

function CapabilityIndex() {
  return (
    <div className="hero-index">
      <div className="editorial-container hero-index-inner">
        <span className="editorial-label hero-index-label">
          Capability index
        </span>
        <ul aria-label="Medixo AI capabilities">
          {CAPABILITIES.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HeroSection({ onDiscussProject }) {
  const heroRef = useRef(null);
  useLayoutEffect(() => initHeroAnimations(heroRef.current), []);

  return (
    <section
      id="home"
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="hero"
    >
      <div className="hero-scene">
        <div className="hero-stage">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-canvas">
            <div className="hero-content">
              <p className="hero-tagline">
                <Sparkles size={14} strokeWidth={1.7} aria-hidden="true" />
                {BRAND.tagline}
              </p>

              <h1 id="hero-heading" className="hero-title">
                {HEADLINE_LINES.map((line, i) => (
                  <React.Fragment key={line}>
                    {i > 0 && " "}
                    <span className="hero-line">
                      {i === 2 ? <em>{line}</em> : line}
                    </span>
                  </React.Fragment>
                ))}
              </h1>

              <div className="hero-copy">
                <p>
                  From custom software development to advanced AI-powered
                  applications, Medixo AI helps businesses innovate, automate,
                  and scale with modern technology.
                </p>
                <p>
                  We engineer intelligent solutions that connect business
                  challenges with technological innovation.
                </p>
              </div>

              <div className="hero-actions">
                <Button
                  href="#services"
                  icon={ArrowRight}
                  onClick={(event) => jumpTo(event, "services")}
                >
                  Explore Our Services
                </Button>
                <Button
                  href="#contact"
                  variant="secondary"
                  icon={ArrowUpRight}
                  onClick={(event) => {
                    if (!onDiscussProject) return jumpTo(event, "contact");
                    if (
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    event.preventDefault();
                    onDiscussProject({});
                  }}
                >
                  Discuss Your Project
                </Button>
                <Button
                  href="#our-work"
                  variant="ghost"
                  icon={ArrowUpRight}
                  onClick={(event) => jumpTo(event, "our-work")}
                >
                  Explore Our Work
                </Button>
              </div>
            </div>

            <HeroVisual />
            <div className="hero-scrim" aria-hidden="true" />
            <div
              className="hero-scene-label editorial-label"
              aria-hidden="true"
            >
              Industry ecosystem
            </div>

            <div className="hero-margin editorial-label">
              <span className="hero-edition">
                <span className="registration-mark" aria-hidden="true">
                  +
                </span>{" "}
                Engineering in practice
              </span>
              <div className="hero-margin-actions">
                <span className="hero-progress" aria-hidden="true">
                  <span className="hero-progress-fill" />
                </span>
                <a href="#about" onClick={(event) => jumpTo(event, "about")}>
                  Scroll to discover <ArrowDown size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <CapabilityIndex />
      </div>
    </section>
  );
}
