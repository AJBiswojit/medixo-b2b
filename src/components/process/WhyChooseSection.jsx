import React from "react";
import { ArrowUpRight } from "lucide-react";
import { WHY_CHOOSE_ITEMS } from "../../data/navigation";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger } from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";

export default function WhyChooseSection({ onDiscussProject }) {
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
    revealStagger("[data-why-item]", scope, {
      trigger: scope.querySelector("[data-why-grid]"),
      stagger: 0.065,
      y: 24,
    });
  }, []);

  return (
    <section
      id="why-medixo"
      ref={sectionRef}
      aria-labelledby="why-heading"
      className="bg-white py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA]"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Sticky Editorial Proposition */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div id="why-heading">
              <SectionHeading
                eyebrow="Why Choose Medixo AI"
                title="More Than a Technology Provider. Your Innovation Partner."
                accentColor="#E5D3C9"
              />
            </div>

            <p
              data-reveal
              className="text-[16px] sm:text-[17px] leading-[1.75] text-[#4A4A4A]"
            >
              Our focus is not simply on delivering software. We focus on
              building reliable solutions that create meaningful business value.
            </p>

            {/* Minimalist Architectural Alignment Diagram */}
            <div
              data-reveal
              className="rounded-[22px] bg-[#F5F5F3] border border-[#EAEAEA] p-6 space-y-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777]">
                Partnership Model
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#E5D3C9]/65 text-[12px] font-medium text-[#202020]">
                  Business Context
                </span>
                <span className="hidden sm:block h-[1px] flex-1 min-w-[14px] bg-[#D2D2CE]" aria-hidden="true" />
                <span className="px-3 py-1.5 rounded-full bg-[#ACC6C1]/55 text-[12px] font-medium text-[#202020]">
                  AI + Software
                </span>
                <span className="hidden sm:block h-[1px] flex-1 min-w-[14px] bg-[#D2D2CE]" aria-hidden="true" />
                <span className="px-3 py-1.5 rounded-full bg-[#F6EAEA] border border-[#EADADA] text-[12px] font-medium text-[#202020]">
                  Scale
                </span>
              </div>
              <p className="text-[13.5px] leading-[1.65] text-[#777777]">
                Every architecture decision, model integration, and interface
                detail is evaluated against long-term operational reliability.
              </p>
            </div>

            <div data-reveal>
              <Button
                href="#contact"
                variant="primary"
                size="md"
                icon={ArrowUpRight}
                onClick={(e) => {
                  e.preventDefault();
                  if (onDiscussProject) onDiscussProject({});
                }}
              >
                Start a Conversation
              </Button>
            </div>
          </div>

          {/* Right Structured Corporate Differentiators */}
          <div
            data-why-grid
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 border-t border-[#EAEAEA]"
          >
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <div
                key={item.title}
                data-why-item
                className="py-7 border-b border-[#EAEAEA] flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-8 h-8 rounded-[10px] border border-[#EAEAEA] flex items-center justify-center text-[11px] font-semibold text-[#202020]"
                    style={{ backgroundColor: item.accent }}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-display text-[1.35rem] leading-[1.24] text-[#202020]">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[1.68] text-[#777777]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
