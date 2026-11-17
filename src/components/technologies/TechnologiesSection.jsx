import React, { useState } from "react";
import { TECHNOLOGY_CATEGORIES } from "../../data/technologies";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger } from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import TechnologyGrid from "./TechnologyGrid";

export default function TechnologiesSection() {
  const [activeCategoryId, setActiveCategoryId] = useState("genai-llm");

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
  }, []);

  const activeCategory =
    TECHNOLOGY_CATEGORIES.find((cat) => cat.id === activeCategoryId) ||
    TECHNOLOGY_CATEGORIES[0];

  return (
    <section
      id="technologies"
      ref={sectionRef}
      aria-labelledby="technologies-heading"
      className="bg-[#F5F5F3] py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA]"
    >
      <div className="editorial-container">
        <div id="technologies-heading">
          <SectionHeading
            eyebrow="Technology Stack"
            title="Powered by Modern Technologies."
            subtitle="We select proven programming languages, machine learning libraries, generative AI frameworks, application backends, and data infrastructure aligned to each project's architecture."
            accentColor="#E5D3C9"
          />
        </div>

        {/* Interactive Category Tab Bar */}
        <div
          data-reveal
          role="tablist"
          aria-label="Technology stack categories"
          className="mt-10 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2"
        >
          {TECHNOLOGY_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                id={`tech-tab-${cat.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`tech-panel-${cat.id}`}
                onClick={() => setActiveCategoryId(cat.id)}
                className={[
                  "shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-[13px] font-medium border transition-all duration-250 cursor-pointer",
                  isActive
                    ? "bg-[#171717] text-white border-[#171717] shadow-editorial-sm"
                    : "bg-white text-[#555555] border-[#EAEAEA] hover:border-[#202020] hover:text-[#202020]",
                ].join(" ")}
              >
                <span>{cat.label}</span>
                <span
                  className={[
                    "ml-2 text-[11px]",
                    isActive ? "text-white/65" : "text-[#999999]",
                  ].join(" ")}
                >
                  {cat.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Technology Category Panel */}
        <div
          id={`tech-panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tech-tab-${activeCategory.id}`}
        >
          <TechnologyGrid category={activeCategory} />
        </div>

        {/* Transparent Capability Disclaimer */}
        <p className="mt-10 pt-6 border-t border-[#E4E4E0] text-[12px] text-[#777777] leading-relaxed">
          Technologies shown represent frameworks, languages, platforms, and
          tools supported within Medixo AI engineering and delivery workflows.
          Product names and marks belong to their respective owners and do not
          imply formal vendor affiliation or certification.
        </p>
      </div>
    </section>
  );
}
