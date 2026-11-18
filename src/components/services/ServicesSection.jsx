import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SERVICES } from "../../data/services";
import { useGsap } from "../../hooks/useGsap";
import {
  revealStagger,
  revealCardGroups,
} from "../../animations/scrollAnimations";
import { scrollToSection } from "../../utils/validation";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import ServiceCard from "./ServiceCard";
import "../../styles/services.css";

export default function ServicesSection({
  highlightedService,
  onInquireService,
}) {
  const [expandedIds, setExpandedIds] = useState(["ai-ml", "gen-agentic-ai"]);
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    revealCardGroups("[data-service-card]", scope, { y: 22, stagger: 0.09 });
  });

  const expand = (id) =>
    setExpandedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  useEffect(() => {
    if (highlightedService) expand(highlightedService.id);
  }, [highlightedService]);

  const allExpanded = expandedIds.length === SERVICES.length;

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="section-shell services-section"
    >
      <div className="editorial-container">
        <SectionHeading
          id="services-heading"
          index="02"
          eyebrow="Our Services"
          spread
          title="Comprehensive Technology Solutions for Modern Businesses."
          subtitle="Eight core engineering practices covering artificial intelligence, generative and agentic systems, enterprise RAG, computer vision, custom software, automation, and data engineering."
          action={
            <Button
              variant="secondary"
              size="sm"
              icon={allExpanded ? ArrowUp : ArrowDown}
              onClick={() =>
                setExpandedIds(
                  allExpanded ? [] : SERVICES.map((service) => service.id),
                )
              }
            >
              {allExpanded ? "Collapse All Details" : "Expand All 8 Services"}
            </Button>
          }
        />

        <nav
          data-reveal
          aria-label="Service quick navigation"
          className="service-directory no-scrollbar"
        >
          {SERVICES.map((service) => (
            <button
              key={service.id}
              type="button"
              aria-controls={`service-panel-${service.id}`}
              aria-expanded={expandedIds.includes(service.id)}
              onClick={() => {
                expand(service.id);
                scrollToSection(`service-${service.id}`);
              }}
            >
              <span
                className="service-directory-dot"
                style={{ backgroundColor: service.accent }}
                aria-hidden="true"
              />
              {service.title.split("&")[0].trim()}
            </button>
          ))}
        </nav>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              signature={index < 2}
              isExpanded={expandedIds.includes(service.id)}
              onToggle={(id) =>
                setExpandedIds((prev) =>
                  prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id],
                )
              }
              onInquire={(serviceRequired) =>
                onInquireService?.({ serviceRequired })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
