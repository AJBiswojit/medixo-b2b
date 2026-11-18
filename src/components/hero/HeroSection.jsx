import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND } from "../../data/navigation";
import { scrollToSection } from "../../utils/validation";
import BrandMark from "../common/BrandMark";
import Button from "../common/Button";
import "../../styles/hero.css";

function jumpTo(event, section) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  scrollToSection(section);
}

export default function HeroSection({ onDiscussProject }) {
  return (
    <section id="home" aria-labelledby="hero-heading" className="hero">
      <div className="hero-stage">
        <div className="hero-backdrop" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-logo">
            <BrandMark />
            <span>{BRAND.name}</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            <span className="hero-line">Building Intelligent Solutions.</span>
            <em className="hero-line">Engineering the Future.</em>
          </h1>

          <p className="hero-tech">AI · Software Engineering · Automation</p>

          <div className="hero-actions">
            <Button
              href="#services"
              icon={ArrowRight}
              onClick={(event) => jumpTo(event, "services")}
            >
              Explore Services
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
          </div>
        </div>
      </div>
    </section>
  );
}
