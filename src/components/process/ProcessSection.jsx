import React, { useState } from "react";
import { PROCESS_STAGES } from "../../data/process";
import { useGsap } from "../../hooks/useGsap";
import {
  revealStagger,
  initProcessTimeline,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";

export default function ProcessSection() {
  const [activeStage, setActiveStage] = useState("01");

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
    initProcessTimeline(scope);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="bg-[#F5F5F3] py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA]"
    >
      <div className="editorial-container">
        <div id="process-heading">
          <SectionHeading
            eyebrow="Development Process"
            title="From Vision to Production."
            subtitle="A disciplined six-stage engineering methodology that turns initial business ideas into secure, scalable, and production-ready digital systems."
            accentColor="#ACC6C1"
          />
        </div>

        {/* Desktop Horizontal Timeline (lg and above) */}
        <div data-process-desktop className="hidden lg:block mt-16 relative">
          {/* Base Track & Animated Progress Line */}
          <div
            aria-hidden="true"
            className="absolute top-[22px] left-0 right-0 h-[1.5px] bg-[#DCDCD7]"
          >
            <div
              data-process-line-desktop
              className="h-full w-full bg-[#202020]"
            />
          </div>

          <ol className="grid grid-cols-6 gap-5 relative z-10">
            {PROCESS_STAGES.map((stage) => {
              const isSelected = activeStage === stage.number;
              return (
                <li
                  key={stage.number}
                  data-process-stage
                  onMouseEnter={() => setActiveStage(stage.number)}
                  onFocus={() => setActiveStage(stage.number)}
                  className="group flex flex-col"
                >
                  {/* Timeline Step Node */}
                  <button
                    type="button"
                    onClick={() => setActiveStage(stage.number)}
                    aria-label={`Stage ${stage.number}: ${stage.displayTitle}`}
                    className={[
                      "w-11 h-11 rounded-full border flex items-center justify-center text-[12px] font-semibold tracking-[0.06em] transition-all duration-300 cursor-pointer",
                      isSelected
                        ? "bg-[#171717] text-white border-[#171717] scale-105 shadow-editorial-sm"
                        : "bg-white text-[#202020] border-[#D6D6D2] group-hover:border-[#202020]",
                    ].join(" ")}
                  >
                    {stage.number}
                  </button>

                  {/* Stage Card Body */}
                  <div
                    className={[
                      "mt-6 p-5 rounded-[20px] border transition-all duration-300 flex-1 flex flex-col justify-between gap-4",
                      isSelected
                        ? "bg-white border-[#202020]/25 shadow-editorial-sm"
                        : "bg-white/75 border-[#EAEAEA] group-hover:bg-white",
                    ].join(" ")}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#777777]">
                          {stage.title}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              stage.accent === "#F5F5F3"
                                ? "#202020"
                                : stage.accent,
                          }}
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="font-display text-[1.32rem] text-[#202020] leading-snug">
                        {stage.displayTitle}
                      </h3>

                      <p className="mt-2.5 text-[13.5px] leading-[1.64] text-[#777777]">
                        {stage.description}
                      </p>
                    </div>

                    <p className="pt-3 border-t border-[#F0F0EC] text-[11px] font-medium text-[#555555]">
                      {stage.deliverable}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div data-process-mobile className="lg:hidden mt-12 relative pl-9">
          <div
            aria-hidden="true"
            className="absolute left-[17px] top-2 bottom-2 w-[1.5px] bg-[#DCDCD7]"
          >
            <div
              data-process-line-mobile
              className="w-full h-full bg-[#202020]"
            />
          </div>

          <ol className="space-y-5 relative z-10">
            {PROCESS_STAGES.map((stage) => (
              <li
                key={stage.number}
                data-process-stage
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-9 top-4 w-9 h-9 rounded-full bg-[#171717] text-white text-[11px] font-semibold flex items-center justify-center border-4 border-[#F5F5F3]"
                >
                  {stage.number}
                </span>

                <div className="ml-2 p-5 sm:p-6 rounded-[20px] bg-white border border-[#EAEAEA]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777]">
                      {stage.number}. {stage.title}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          stage.accent === "#F5F5F3"
                            ? "#202020"
                            : stage.accent,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-[1.4rem] text-[#202020]">
                    {stage.displayTitle}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.68] text-[#777777]">
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
