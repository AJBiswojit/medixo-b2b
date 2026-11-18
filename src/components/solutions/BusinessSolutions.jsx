import React, { Fragment, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { BUSINESS_SOLUTIONS } from "../../data/businessSolutions";
import { useGsap } from "../../hooks/useGsap";
import {
  revealCardGroups,
  revealStagger,
} from "../../animations/scrollAnimations";
import { gsap, ANIMATION_CONFIG } from "../../animations/animationConfig";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import "../../styles/solutions.css";

function SolutionPanel({ scenario, onInquire }) {
  const panelRef = useGsap(
    (scope) => {
      gsap.from(scope.querySelectorAll("[data-solution-part]"), {
        y: 10,
        opacity: 0.55,
        stagger: 0.046,
        duration: 0.47,
        ease: ANIMATION_CONFIG.ease.editorial,
        clearProps: "transform,opacity",
      });
    },
    [scenario.id],
  );

  return (
    <section
      ref={panelRef}
      id="recommended-solution"
      aria-labelledby="recommended-solution-title"
      className="solution-panel"
      style={{ "--scenario-accent": scenario.accent }}
    >
      <div className="solution-panel-meta" data-solution-part>
        <span className="editorial-label">Recommended Solution</span>
        <span className="editorial-label">
          Scenario {scenario.number} / 0{BUSINESS_SOLUTIONS.length}
        </span>
      </div>
      <div className="solution-panel-intro" data-solution-part>
        <p>&ldquo;{scenario.challenge}&rdquo;</p>
        <h3 id="recommended-solution-title" className="font-display">
          {scenario.solution}
        </h3>
        <p>{scenario.overview}</p>
      </div>
      <div className="solution-focus" data-solution-part>
        <h4 className="editorial-label">Core Implementation Focus</h4>
        <ul>
          {scenario.capabilities.map((capability) => (
            <li key={capability}>
              <Check size={15} aria-hidden="true" />
              {capability}
            </li>
          ))}
        </ul>
      </div>
      <div className="solution-services" data-solution-part>
        <h4 className="editorial-label">Relevant Medixo AI Services</h4>
        <ul>
          {scenario.relevantServices.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
      <div data-solution-part>
        <Button icon={ArrowUpRight} onClick={onInquire}>
          Tell Us What You Want to Build.
        </Button>
      </div>
    </section>
  );
}

export default function BusinessSolutions({ onSelectChallengeInquiry }) {
  const [selectedId, setSelectedId] = useState(BUSINESS_SOLUTIONS[0].id);
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    revealCardGroups("[data-challenge-row]", scope, { size: 2, y: 12 });
  });

  const handleInquire = (scenario) =>
    onSelectChallengeInquiry?.({
      industry: scenario.recommendedIndustry,
      serviceRequired: scenario.recommendedService,
      projectNote: `Business goal: "${scenario.challenge}" — Exploring ${scenario.solution}.`,
    });

  return (
    <section
      id="solutions"
      ref={sectionRef}
      aria-labelledby="solutions-heading"
      className="section-shell solutions-section"
    >
      <div className="editorial-container">
        <SectionHeading
          id="solutions-heading"
          index="08"
          eyebrow="Business Solutions"
          spread
          title="Have a Business Challenge? We Have the Technology to Solve It."
          subtitle="Select a business goal below to explore how Medixo AI architects the right combination of artificial intelligence, automation, and software engineering."
        />
        <div
          className="solutions-layout"
          style={{ "--scenario-count": BUSINESS_SOLUTIONS.length }}
          role="group"
          aria-label="Select a business challenge"
        >
          {BUSINESS_SOLUTIONS.map((scenario) => {
            const selected = scenario.id === selectedId;
            return (
              <Fragment key={scenario.id}>
                <button
                  type="button"
                  data-challenge-row
                  className="solution-challenge"
                  aria-expanded={selected}
                  aria-controls={selected ? "recommended-solution" : undefined}
                  style={{ "--scenario-accent": scenario.accent }}
                  onClick={(event) => {
                    setSelectedId(scenario.id);
                    // The preceding inline panel may disappear and move this button.
                    // Keep the newly chosen challenge in view on small screens.
                    if (!window.matchMedia("(min-width: 960px)").matches) {
                      const button = event.currentTarget;
                      requestAnimationFrame(() => {
                        if (!button.isConnected) return;
                        const header = document.querySelector(".site-header");
                        if (
                          button.getBoundingClientRect().top <
                          (header?.offsetHeight ?? 65) + 10
                        ) {
                          button.scrollIntoView({
                            block: "start",
                            behavior: "instant",
                          });
                        }
                      });
                    }
                  }}
                >
                  <span className="editorial-label">{scenario.number}</span>
                  <span>&ldquo;{scenario.challenge}&rdquo;</span>
                  <span className="solution-arrow">
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </button>
                {selected && (
                  <SolutionPanel
                    scenario={scenario}
                    onInquire={() => handleInquire(scenario)}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
