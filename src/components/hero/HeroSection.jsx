import React, { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import { BRAND } from "../../data/navigation";
import { useGsap } from "../../hooks/useGsap";
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

export default function HeroSection({ onDiscussProject }) {
  const [motionPaused, setMotionPaused] = useState(false);
  const motionControl = useRef(null);
  const heroRef = useGsap((scope) => initHeroAnimations(scope, motionControl));
  const MotionIcon = motionPaused ? Play : Pause;

  return (
    <section
      id="home"
      ref={heroRef}
      data-motion-paused={motionPaused}
      aria-labelledby="hero-heading"
      className="hero"
    >
      <div className="hero-stage">
        <div data-hero-backdrop className="hero-backdrop" aria-hidden="true" />
        <div className="hero-canvas">
          <div className="hero-content">
            <p data-hero-eyebrow className="hero-tagline">
              <Sparkles size={14} strokeWidth={1.7} aria-hidden="true" />
              {BRAND.tagline}
            </p>

            <h1 id="hero-heading" className="hero-title">
              {HEADLINE_LINES.map((line, i) => (
                <React.Fragment key={line}>
                  {i > 0 && " "}
                  <span className="hero-line">
                    {line.split(" ").map((word, j) => (
                      <React.Fragment key={word}>
                        {j > 0 && " "}
                        <span className="hero-word-mask">
                          <span data-hero-word className="hero-word-inner">
                            {i === 2 ? <em>{word}</em> : word}
                          </span>
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                </React.Fragment>
              ))}
            </h1>

            <div className="hero-copy">
              <p data-hero-copy>
                From custom software development to advanced AI-powered
                applications, Medixo AI helps businesses innovate, automate, and
                scale with modern technology.
              </p>
              <p data-hero-copy>
                We engineer intelligent solutions that connect business
                challenges with technological innovation.
              </p>
            </div>

            <div className="hero-actions" data-hero-actions>
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

          <div className="hero-margin editorial-label">
            <span className="hero-edition">
              <span className="registration-mark" aria-hidden="true">
                +
              </span>{" "}
              Engineering in practice
            </span>
            <div className="hero-margin-actions">
              <button
                type="button"
                className="hero-motion-control"
                onClick={() => {
                  motionControl.current?.(!motionPaused);
                  setMotionPaused(!motionPaused);
                }}
              >
                <MotionIcon size={13} strokeWidth={1.8} aria-hidden="true" />
                {motionPaused ? "Resume motion" : "Pause motion"}
              </button>
              <a href="#about" onClick={(event) => jumpTo(event, "about")}>
                Scroll to discover <ArrowDown size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
}
