import React, { useCallback } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND } from "../../data/navigation";
import { useGsap } from "../../hooks/useGsap";
import { initHeroAnimations } from "../../animations/heroAnimations";
import {
  gsap,
  prefersReducedMotion,
  isMobileViewport,
} from "../../animations/animationConfig";
import { scrollToSection } from "../../utils/validation";
import Button from "../common/Button";
import { HeroFlankingVisuals, HeroBottomGallery } from "./HeroVisual";

const HEADLINE_WORDS = [
  { text: "Transforming", italic: false },
  { text: "Business", italic: false },
  { text: "Ideas", italic: false },
  { text: "Into", italic: false },
  { text: "Intelligent", italic: true },
  { text: "Digital", italic: false },
  { text: "Solutions.", italic: false },
];

export default function HeroSection({ onDiscussProject }) {
  const heroRef = useGsap((scope) => {
    initHeroAnimations(scope);
  }, []);

  // Gentle desktop pointer perspective shift on floating gallery cards
  const handlePointerMove = useCallback(
    (event) => {
      const scope = heroRef.current;
      if (!scope || prefersReducedMotion() || isMobileViewport() || window.innerWidth < 1024) return;

      const rect = scope.getBoundingClientRect();
      const normX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      const cards = scope.querySelectorAll("[data-parallax-depth]");
      cards.forEach((card) => {
        const depth = Number(card.dataset.parallaxDepth || 10);
        gsap.to(card, {
          x: normX * depth,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
        // Keep vertical float independent; subtle rotateY tilt only
        const inner = card.firstElementChild;
        if (inner) {
          gsap.to(inner, {
            y: normY * (Math.abs(depth) * 0.35),
            duration: 0.9,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    },
    [heroRef]
  );

  const handlePointerLeave = useCallback(() => {
    const scope = heroRef.current;
    if (!scope || prefersReducedMotion() || isMobileViewport()) return;
    const cards = scope.querySelectorAll("[data-parallax-depth]");
    cards.forEach((card) => {
      gsap.to(card, { x: 0, duration: 1.0, ease: "power3.out", overwrite: "auto" });
      if (card.firstElementChild) {
        gsap.to(card.firstElementChild, {
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });
  }, [heroRef]);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      aria-label="Medixo AI Hero"
      className="relative bg-white pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-[#EAEAEA]"
    >
      {/* Flanking Desktop Floating Visual Compositions */}
      <HeroFlankingVisuals />

      <div className="editorial-container relative z-20">
        {/* Central Editorial Hero Content — sized to leave generous margin beside flanking cards */}
        <div className="max-w-[650px] xl:max-w-[740px] mx-auto text-center">
          {/* Brand Tagline Pill */}
          <div
            data-hero-eyebrow
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F5F5F3] border border-[#EAEAEA] mb-7"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#ACC6C1]"
              aria-hidden="true"
            />
            <span className="text-[11.5px] sm:text-[12px] font-medium tracking-[0.04em] text-[#555555]">
              {BRAND.tagline}
            </span>
          </div>

          {/* Primary Display Headline */}
          <h1 className="font-display text-[2.45rem] sm:text-[3.35rem] lg:text-[3.75rem] xl:text-[4.35rem] leading-[1.07] tracking-[-0.02em] text-[#202020]">
            {HEADLINE_WORDS.map((word, index) => (
              <React.Fragment key={word.text}>
                <span className="hero-word-mask">
                  <span
                    data-hero-word
                    className={[
                      "hero-word-inner",
                      word.italic ? "italic text-[#353535]" : "",
                    ].join(" ")}
                  >
                    {word.text}
                  </span>
                </span>
                {index < HEADLINE_WORDS.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </h1>

          {/* Primary Supporting Paragraph */}
          <p
            data-hero-copy
            className="mt-6 text-[15.5px] sm:text-[17px] leading-[1.7] text-[#5F5F5F] max-w-[600px] mx-auto"
          >
            From custom software development to advanced AI-powered
            applications, Medixo AI helps businesses innovate, automate, and
            scale with modern technology.
          </p>

          {/* Secondary Supporting Statement */}
          <p
            data-hero-copy
            className="mt-3 text-[13.5px] sm:text-[14.5px] leading-[1.65] text-[#777777] max-w-[540px] mx-auto"
          >
            We engineer intelligent solutions that connect business challenges
            with technological innovation.
          </p>

          {/* Three Balanced Corporate CTA Actions */}
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-3.5">
            <div data-hero-cta className="w-full sm:w-auto">
              <Button
                href="#services"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
              >
                Explore Our Services
              </Button>
            </div>

            <div data-hero-cta className="w-full sm:w-auto">
              <Button
                href="#contact"
                variant="secondary"
                size="lg"
                icon={ArrowUpRight}
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  if (onDiscussProject) {
                    onDiscussProject({});
                  } else {
                    scrollToSection("contact");
                  }
                }}
              >
                Discuss Your Project
              </Button>
            </div>

            <div data-hero-cta className="w-full sm:w-auto">
              <Button
                href="#our-work"
                variant="subtle"
                size="lg"
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("our-work");
                }}
              >
                Explore Our Work
              </Button>
            </div>
          </div>
        </div>

        {/* Layered Bottom Floating Visual Arc (Desktop) & Curated Grid (Mobile) */}
        <HeroBottomGallery />

        {/* Quiet Editorial Domain Index Bar */}
        <div
          data-hero-copy
          className="mt-10 pt-6 border-t border-[#EAEAEA] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] tracking-[0.06em] uppercase text-[#777777]"
        >
          <span>Artificial Intelligence</span>
          <span className="w-1 h-1 rounded-full bg-[#D2D2CE]" aria-hidden="true" />
          <span>Generative &amp; Agentic AI</span>
          <span className="w-1 h-1 rounded-full bg-[#D2D2CE]" aria-hidden="true" />
          <span>RAG Architectures</span>
          <span className="w-1 h-1 rounded-full bg-[#D2D2CE]" aria-hidden="true" />
          <span>Computer Vision</span>
          <span className="w-1 h-1 rounded-full bg-[#D2D2CE]" aria-hidden="true" />
          <span>Custom Software</span>
        </div>
      </div>
    </section>
  );
}
