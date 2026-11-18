import React from "react";
import { Braces, Layers3, Sparkles } from "lucide-react";
import { CORE_PRINCIPLES } from "../../data/navigation";
import { useGsap } from "../../hooks/useGsap";
import {
  revealStagger,
  revealImageMask,
  revealCardGroups,
  applySubtleParallax,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import "../../styles/editorial.css";

const PRINCIPLE_TONES = [
  "beige",
  "mint",
  "blush",
  "lavender",
  "powder",
  "sage",
];

export default function AboutSection() {
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    revealImageMask("[data-image-mask]", scope);
    revealCardGroups("[data-principle-item]", scope, { size: 3, y: 13 });
    return applySubtleParallax("[data-parallax-layer]", scope, 10);
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="section-shell about-section"
    >
      <div className="editorial-container">
        <div className="about-grid">
          <div className="about-story">
            <SectionHeading
              id="about-heading"
              index="01"
              eyebrow="About Medixo AI"
              title={
                <>
                  Engineering Intelligence.{" "}
                  <em className="section-accent">Delivering Innovation.</em>
                </>
              }
            />
            <div className="about-prose" data-reveal>
              <p>
                At Medixo AI, we bring together software engineering and
                artificial intelligence to develop solutions that make
                businesses smarter and more efficient.
              </p>
              <p>
                We work across multiple technology domains, including AI,
                Generative AI, Agentic AI, Machine Learning, Computer Vision,
                RAG architectures, and full-stack application development.
              </p>
              <p>
                We believe every business has unique challenges. Therefore, we
                focus on understanding business requirements and designing
                customized technology solutions rather than providing generic
                applications.
              </p>
            </div>
            <p className="about-pull font-display" data-reveal>
              Tailored engineering grounded in real operational clarity — from
              system architecture to intelligent automation.
            </p>
          </div>

          <div className="about-artboard" data-parallax-frame>
            <figure
              className="about-photo editorial-image-frame"
              data-image-mask
            >
              <img
                src="/images/about-studio.webp"
                srcSet="/images/about-studio-520.webp 520w, /images/about-studio.webp 1000w"
                sizes="(max-width: 899px) 92vw, 520px"
                width="1000"
                height="667"
                alt="Sunlit contemporary studio interior with a long conference table"
                loading="lazy"
                decoding="async"
                data-image-layer
              />
            </figure>
            <div className="about-insight" data-parallax-layer>
              <span className="editorial-label">
                <Layers3 size={17} strokeWidth={1.6} aria-hidden="true" /> Our
                Practice
              </span>
              <p>
                Bridging research-informed AI capabilities — RAG pipelines,
                agentic orchestration, and computer vision — with dependable
                production software engineering.
              </p>
            </div>
            <div className="about-mini-row" data-reveal>
              <div className="about-mini about-mini--blush">
                <Sparkles size={18} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="editorial-label">Innovation</span>
                  <p>Research-informed AI</p>
                </div>
              </div>
              <div className="about-mini about-mini--beige">
                <Braces size={18} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="editorial-label">Engineering</span>
                  <p>Built for production</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="principle-ledger">
          <header className="principle-heading" data-reveal>
            <div>
              <p className="editorial-label">Core Principles</p>
              <h3 className="font-display">
                Standards That Guide Every Engagement
              </h3>
            </div>
            <p>
              Six foundational commitments embedded into how we architect,
              build, validate, and evolve every digital product.
            </p>
          </header>
          <ol className="principle-list">
            {CORE_PRINCIPLES.map((principle, index) => (
              <li
                key={principle.number}
                data-principle-item
                style={{
                  "--principle-accent": `var(--pastel-${PRINCIPLE_TONES[index]})`,
                }}
              >
                <span className="editorial-label" aria-hidden="true">
                  {principle.number}
                </span>
                <h4>{principle.title}</h4>
                <p>{principle.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
