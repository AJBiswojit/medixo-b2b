import React, { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BUSINESS_SOLUTIONS } from "../../data/businessSolutions";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger } from "../../animations/scrollAnimations";
import {
  gsap,
  ANIMATION_CONFIG,
  prefersReducedMotion,
} from "../../animations/animationConfig";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";

export default function BusinessSolutions({ onSelectChallengeInquiry }) {
  const [selectedId, setSelectedId] = useState(BUSINESS_SOLUTIONS[0].id);
  const detailPanelRef = useRef(null);

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
    revealStagger("[data-challenge-row]", scope, {
      trigger: scope.querySelector("[data-challenges-list]"),
      stagger: 0.055,
      y: 20,
    });
  }, []);

  const activeScenario =
    BUSINESS_SOLUTIONS.find((item) => item.id === selectedId) ||
    BUSINESS_SOLUTIONS[0];

  const handleSelectScenario = (scenario) => {
    if (scenario.id === selectedId) return;
    setSelectedId(scenario.id);

    // Smooth GSAP content transition on solution card
    requestAnimationFrame(() => {
      const panel = detailPanelRef.current;
      if (!panel || prefersReducedMotion()) return;
      const items = panel.querySelectorAll("[data-solution-animate]");
      gsap.fromTo(
        items,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.48,
          stagger: 0.055,
          ease: ANIMATION_CONFIG.ease.editorial,
          clearProps: "transform",
        }
      );
    });
  };

  const handleInquire = (scenario) => {
    if (!onSelectChallengeInquiry) return;
    onSelectChallengeInquiry({
      industry: scenario.recommendedIndustry,
      serviceRequired: scenario.recommendedService,
      projectNote: `Business goal: "${scenario.challenge}" — Exploring ${scenario.solution}.`,
    });
  };

  return (
    <section
      id="solutions"
      ref={sectionRef}
      aria-labelledby="solutions-heading"
      className="bg-[#F5F5F3] py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA]"
    >
      <div className="editorial-container">
        <div id="solutions-heading">
          <SectionHeading
            eyebrow="Business Solutions"
            title="Have a Business Challenge? We Have the Technology to Solve It."
            subtitle="Select a business goal below to explore how Medixo AI architects the right combination of artificial intelligence, automation, and software engineering."
            accentColor="#F6EAEA"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Interactive Scenarios List (with inline mobile solution drawer) */}
          <div
            data-challenges-list
            role="listbox"
            aria-label="Select a business challenge"
            className="lg:col-span-6 space-y-2.5"
          >
            {BUSINESS_SOLUTIONS.map((scenario) => {
              const isSelected = scenario.id === selectedId;
              return (
                <div key={scenario.id} data-challenge-row>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectScenario(scenario)}
                    className={[
                      "w-full text-left px-5 py-4 rounded-[18px] border transition-all duration-250 flex items-center justify-between gap-4 cursor-pointer",
                      isSelected
                        ? "bg-[#171717] text-white border-[#171717] shadow-editorial-sm"
                        : "bg-white text-[#202020] border-[#EAEAEA] hover:border-[#202020]/35",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span
                        className={[
                          "text-[11.5px] font-semibold tracking-[0.12em] shrink-0",
                          isSelected ? "text-[#ACC6C1]" : "text-[#777777]",
                        ].join(" ")}
                      >
                        {scenario.number}
                      </span>
                      <span className="text-[14.5px] sm:text-[15px] font-medium leading-snug">
                        &ldquo;{scenario.challenge}&rdquo;
                      </span>
                    </div>

                    <ArrowRight
                      className={[
                        "w-4 h-4 shrink-0 transition-transform duration-300",
                        isSelected
                          ? "text-white translate-x-0.5 rotate-90 lg:rotate-0"
                          : "text-[#777777]",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mobile-dedicated Inline Solution Reveal so user never scrolls past */}
                  {isSelected && (
                    <div className="lg:hidden mt-2.5 rounded-[20px] bg-white border border-[#EAEAEA] p-6 space-y-5 shadow-editorial-sm">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F3] border border-[#EAEAEA] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#777777]">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              scenario.accent === "#F5F5F3"
                                ? "#202020"
                                : scenario.accent,
                          }}
                          aria-hidden="true"
                        />
                        Recommended Solution
                      </div>

                      <div>
                        <h3 className="font-display text-[1.6rem] leading-[1.18] text-[#202020]">
                          {scenario.solution}
                        </h3>
                        <p className="mt-2.5 text-[14px] leading-[1.68] text-[#666666]">
                          {scenario.overview}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#777777] mb-2.5">
                          Relevant Services
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {scenario.relevantServices.map((srv) => (
                            <span
                              key={srv}
                              className="text-[12px] px-3 py-1 rounded-full bg-[#F5F5F3] border border-[#EAEAEA] text-[#202020]"
                            >
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="md"
                        icon={ArrowUpRight}
                        className="w-full"
                        onClick={() => handleInquire(scenario)}
                      >
                        Tell Us What You Want to Build.
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Interactive Solution Blueprint Panel */}
          <div
            ref={detailPanelRef}
            aria-live="polite"
            className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28 rounded-[26px] bg-white border border-[#EAEAEA] p-8 xl:p-10 shadow-editorial"
          >
            <div
              data-solution-animate
              className="flex items-center justify-between gap-4 pb-6 border-b border-[#EAEAEA]"
            >
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] text-[#202020] border border-[#EAEAEA]"
                style={{ backgroundColor: activeScenario.accent }}
              >
                Recommended Solution
              </span>
              <span className="text-[12px] font-semibold tracking-[0.14em] text-[#777777]">
                Scenario {activeScenario.number} / 08
              </span>
            </div>

            <div data-solution-animate className="mt-6">
              <p className="text-[13.5px] italic text-[#777777]">
                &ldquo;{activeScenario.challenge}&rdquo;
              </p>
              <h3 className="mt-2 font-display text-[2.15rem] xl:text-[2.4rem] leading-[1.12] text-[#202020]">
                {activeScenario.solution}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.74] text-[#555555]">
                {activeScenario.overview}
              </p>
            </div>

            {/* Key Solution Deliverables */}
            <div data-solution-animate className="mt-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-3">
                Core Implementation Focus
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {activeScenario.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-center gap-2 text-[13.5px] text-[#202020] bg-[#F5F5F3] rounded-[12px] px-3.5 py-2.5 border border-[#EAEAEA]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#202020] shrink-0"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Relevant Medixo AI Services */}
            <div
              data-solution-animate
              className="mt-7 pt-6 border-t border-[#EAEAEA]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-3">
                Relevant Medixo AI Services
              </p>
              <div className="flex flex-wrap gap-2">
                {activeScenario.relevantServices.map((srv) => (
                  <span
                    key={srv}
                    className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full bg-white border border-[#DCDCD8] text-[#202020]"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Inquiry CTA */}
            <div data-solution-animate className="mt-8">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowUpRight}
                onClick={() => handleInquire(activeScenario)}
              >
                Tell Us What You Want to Build.
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
