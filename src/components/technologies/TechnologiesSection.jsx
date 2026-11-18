import React, { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { TECHNOLOGY_CATEGORIES } from "../../data/technologies";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger } from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import TechnologyGrid from "./TechnologyGrid";
import "../../styles/technologies.css";

export default function TechnologiesSection() {
  const [activeCategoryId, setActiveCategoryId] = useState("genai-llm");
  const tabRefs = useRef([]);
  const [vertical, setVertical] = useState(
    () => matchMedia("(min-width: 900px)").matches,
  );
  useEffect(() => {
    const query = matchMedia("(min-width: 900px)");
    const update = ({ matches }) => setVertical(matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const sectionRef = useGsap((scope) => revealStagger("[data-reveal]", scope));
  const activeCategory = TECHNOLOGY_CATEGORIES.find(
    (category) => category.id === activeCategoryId,
  );

  const handleKey = (event, index) => {
    const last = TECHNOLOGY_CATEGORIES.length - 1;
    let target;
    if (event.key === "Home") target = 0;
    else if (event.key === "End") target = last;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key))
      target = index === 0 ? last : index - 1;
    else if (["ArrowDown", "ArrowRight"].includes(event.key))
      target = index === last ? 0 : index + 1;
    else return;
    event.preventDefault();
    setActiveCategoryId(TECHNOLOGY_CATEGORIES[target].id);
    tabRefs.current[target]?.focus();
  };

  return (
    <section
      id="technologies"
      ref={sectionRef}
      aria-labelledby="technologies-heading"
      className="section-shell tech-section"
    >
      <div className="editorial-container">
        <SectionHeading
          id="technologies-heading"
          index="04"
          eyebrow="Technology Stack"
          title="Powered by Modern Technologies."
          subtitle="We select proven programming languages, machine learning libraries, generative AI frameworks, application backends, and data infrastructure aligned to each project's architecture."
        />

        <div className="tech-board">
          <div className="tech-tab-column">
            <p className="editorial-label">Engineering toolkit</p>
            <div
              role="tablist"
              aria-label="Technology stack categories"
              aria-orientation={vertical ? "vertical" : "horizontal"}
              className="tech-tablist no-scrollbar"
            >
              {TECHNOLOGY_CATEGORIES.map((category, index) => {
                const active = category.id === activeCategoryId;
                return (
                  <button
                    key={category.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    id={`tech-tab-${category.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    title={category.label}
                    tabIndex={active ? 0 : -1}
                    aria-controls="technology-panel"
                    onKeyDown={(event) => handleKey(event, index)}
                    onClick={() => setActiveCategoryId(category.id)}
                  >
                    <span>{category.shortLabel}</span>
                    <span className="tech-tab-count" aria-hidden="true">
                      {category.items.length}
                    </span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
          <div
            id="technology-panel"
            role="tabpanel"
            aria-labelledby={`tech-tab-${activeCategory.id}`}
            tabIndex={0}
            className="tech-panel"
          >
            <TechnologyGrid key={activeCategory.id} category={activeCategory} />
          </div>
        </div>
        <p className="tech-note">
          Technologies shown represent frameworks, languages, platforms, and
          tools supported within Medixo AI engineering and delivery workflows.
          Product names and marks belong to their respective owners and do not
          imply formal vendor affiliation or certification.
        </p>
      </div>
    </section>
  );
}
