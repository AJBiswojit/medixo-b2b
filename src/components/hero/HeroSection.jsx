import React, { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { initHeroAnimations } from "../../animations/heroAnimations";
import { scrollToSection } from "../../utils/validation";
import Button from "../common/Button";
import HeroVisual from "./HeroVisual";
import "../../styles/hero.css";

export default function HeroSection({ onDiscussProject }) {
  const heroRef = useRef(null);
  useLayoutEffect(() => initHeroAnimations(heroRef.current), []);

  function navigate(event, section) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    if (section === "contact" && onDiscussProject) onDiscussProject({});
    else scrollToSection(section);
  }

  return (
    <section
      id="home"
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="hero"
    >
      <div className="hero-stage" data-hero-stage>
        <div className="hero-brand-intro" data-hero-brand>
          <p className="hero-eyebrow editorial-label">Medixo AI</p>
          <h1 id="hero-heading" className="hero-title">
            <span>Building Intelligent Solutions.</span>{" "}
            <span>Engineering the Future.</span>
          </h1>
        </div>

        <div className="hero-intro" data-hero-intro>
          <p className="hero-disciplines">
            AI · Software Engineering · Automation
          </p>
          <div className="hero-actions">
            <Button
              href="#services"
              icon={ArrowRight}
              onClick={(event) => navigate(event, "services")}
            >
              Explore Services
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              icon={ArrowUpRight}
              onClick={(event) => navigate(event, "contact")}
            >
              Discuss Your Project
            </Button>
          </div>
        </div>

        <HeroVisual />

        <div
          className="hero-scroll-note editorial-label"
          data-hero-scroll-cue
          aria-hidden="true"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={16} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
