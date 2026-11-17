import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  PRIMARY_INDUSTRIES,
  ADDITIONAL_INDUSTRIES,
} from "../../data/industries";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger } from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import IndustryCard from "./IndustryCard";

export default function IndustriesSection({ onInquireIndustry }) {
  const trackRef = useRef(null);
  const [activeId, setActiveId] = useState(PRIMARY_INDUSTRIES[0].id);

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
    revealStagger("[data-industry-card]", scope, {
      trigger: scope.querySelector("[data-industries-track]"),
      stagger: 0.09,
      y: 30,
    });
    revealStagger("[data-extra-industry]", scope, {
      trigger: scope.querySelector("[data-extra-industries]"),
      stagger: 0.08,
      y: 22,
    });
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = window.innerWidth < 640 ? window.innerWidth * 0.85 : 446;
    track.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });

    const currentIndex = PRIMARY_INDUSTRIES.findIndex((i) => i.id === activeId);
    const nextIndex = Math.max(
      0,
      Math.min(PRIMARY_INDUSTRIES.length - 1, currentIndex + direction)
    );
    setActiveId(PRIMARY_INDUSTRIES[nextIndex].id);
  };

  const jumpToIndustry = (industry, index) => {
    setActiveId(industry.id);
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll("[data-industry-card]");
    const targetCard = cards[index];
    if (targetCard) {
      track.scrollTo({
        left: targetCard.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const handleInquire = (industryName) => {
    if (onInquireIndustry) {
      onInquireIndustry({ industry: industryName });
    }
  };

  return (
    <section
      id="industries"
      ref={sectionRef}
      aria-labelledby="industries-heading"
      className="bg-white py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA] overflow-hidden"
    >
      <div className="editorial-container">
        {/* Heading + Horizontal Gallery Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div id="industries-heading">
            <SectionHeading
              eyebrow="Industries We Serve"
              title="Technology Solutions Across Multiple Industries."
              subtitle="Domain-aware AI systems and custom software applications built around the distinct operational needs of healthcare, education, commerce, luxury retail, human resources, and industrial sectors."
              accentColor="#F6EAEA"
            />
          </div>

          <div
            data-reveal
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Slide through industries"
          >
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous industry"
              className="w-11 h-11 rounded-full border border-[#DFDFDC] bg-white text-[#202020] hover:border-[#202020] hover:bg-[#F5F5F3] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next industry"
              className="w-11 h-11 rounded-full border border-[#171717] bg-[#171717] text-white hover:bg-[#2E2E2E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Interactive Industry Index Tabs */}
        <div
          data-reveal
          className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          {PRIMARY_INDUSTRIES.map((industry, index) => {
            const isSelected = activeId === industry.id;
            return (
              <button
                key={industry.id}
                type="button"
                onClick={() => jumpToIndustry(industry, index)}
                className={[
                  "shrink-0 px-4 py-2 rounded-full text-[12.5px] font-medium border transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "bg-[#F5F5F3] border-[#202020] text-[#202020]"
                    : "bg-white border-[#EAEAEA] text-[#777777] hover:text-[#202020] hover:border-[#CFCFCB]",
                ].join(" ")}
              >
                <span className="mr-1.5 text-[11px] opacity-70">
                  {industry.number}.
                </span>
                {industry.title}
              </button>
            );
          })}
        </div>

        {/* Horizontal Image-Led Industry Showcase Track */}
        <div
          ref={trackRef}
          data-industries-track
          className="mt-8 flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
        >
          {PRIMARY_INDUSTRIES.map((industry) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              isActive={activeId === industry.id}
              onSelect={setActiveId}
              onInquire={handleInquire}
            />
          ))}
        </div>

        {/* Additional Served Industries Band */}
        <div
          data-extra-industries
          className="mt-14 pt-12 border-t border-[#EAEAEA]"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#777777]">
              Additional Sectors Supported
            </h3>
            <span className="text-[13px] text-[#777777]">
              Tailored architecture for specialized enterprise domains
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADDITIONAL_INDUSTRIES.map((sector, idx) => {
              const accents = ["#E5D3C9", "#ACC6C1", "#F6EAEA", "#E8E8E8"];
              return (
                <button
                  key={sector.id}
                  type="button"
                  data-extra-industry
                  onClick={() => handleInquire(sector.title)}
                  className="group text-left p-6 rounded-[20px] bg-[#F5F5F3] border border-[#EAEAEA] hover:bg-white hover:border-[#202020]/30 hover:shadow-editorial-sm transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: accents[idx % accents.length] }}
                        aria-hidden="true"
                      />
                      <ArrowUpRight
                        className="w-4 h-4 text-[#777777] group-hover:text-[#202020] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className="font-display text-[1.3rem] text-[#202020] leading-snug">
                      {sector.title}
                    </h4>
                    <p className="mt-2 text-[13.5px] leading-[1.62] text-[#777777]">
                      {sector.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
