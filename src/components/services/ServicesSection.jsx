import React, { useEffect, useState } from "react";
import { SERVICES } from "../../data/services";
import { useGsap } from "../../hooks/useGsap";
import {
  revealStagger,
  refreshScrollTriggers,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import ServiceCard from "./ServiceCard";

export default function ServicesSection({
  highlightedServiceId,
  onInquireService,
}) {
  // Default open the first two signature AI service practices
  const [expandedIds, setExpandedIds] = useState(["ai-ml", "gen-agentic-ai"]);

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
    revealStagger("[data-service-card]", scope, {
      trigger: scope.querySelector("[data-services-grid]"),
      stagger: 0.075,
      y: 28,
    });
  }, []);

  // Expand a specific service if navigated from footer or external trigger
  useEffect(() => {
    if (!highlightedServiceId) return;
    setExpandedIds((prev) =>
      prev.includes(highlightedServiceId)
        ? prev
        : [...prev, highlightedServiceId]
    );
  }, [highlightedServiceId]);

  const handleToggle = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    window.setTimeout(() => refreshScrollTriggers(), 400);
  };

  const allExpanded = expandedIds.length === SERVICES.length;

  const handleToggleAll = () => {
    setExpandedIds(allExpanded ? [] : SERVICES.map((s) => s.id));
    window.setTimeout(() => refreshScrollTriggers(), 400);
  };

  const handleQuickJump = (id) => {
    if (!expandedIds.includes(id)) {
      setExpandedIds((prev) => [...prev, id]);
    }
    const cardEl = document.getElementById(`service-${id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="bg-[#F5F5F3] py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA]"
    >
      <div className="editorial-container">
        {/* Header & View Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div id="services-heading">
            <SectionHeading
              eyebrow="Our Services"
              title="Comprehensive Technology Solutions for Modern Businesses."
              subtitle="Eight core engineering practices covering artificial intelligence, generative and agentic systems, enterprise RAG, computer vision, custom software, automation, and data engineering."
              accentColor="#ACC6C1"
            />
          </div>

          <div data-reveal className="shrink-0">
            <button
              type="button"
              onClick={handleToggleAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium bg-white border border-[#DFDFDC] text-[#202020] hover:border-[#202020] transition-colors cursor-pointer"
            >
              {allExpanded ? "Collapse All Details" : "Expand All 8 Services"}
            </button>
          </div>
        </div>

        {/* Service Directory Quick-Jump Strip */}
        <div
          data-reveal
          aria-label="Service quick navigation"
          className="mt-9 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar"
        >
          {SERVICES.map((service) => {
            const isOpen = expandedIds.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleQuickJump(service.id)}
                className={[
                  "shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-medium border transition-all duration-200 cursor-pointer",
                  isOpen
                    ? "bg-[#171717] text-white border-[#171717]"
                    : "bg-white text-[#555555] border-[#EAEAEA] hover:border-[#202020] hover:text-[#202020]",
                ].join(" ")}
              >
                <span className="opacity-65">{service.number}</span>
                <span>{service.title.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* 8 Interactive Service Cards Grid */}
        <div
          data-services-grid
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start"
        >
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isExpanded={expandedIds.includes(service.id)}
              onToggle={handleToggle}
              onInquire={(serviceTitle) => {
                if (onInquireService) {
                  onInquireService({ serviceRequired: serviceTitle });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
