import React from "react";
import { CORE_PRINCIPLES } from "../../data/navigation";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger, revealImageMask } from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";

export default function AboutSection() {
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
    revealImageMask("[data-image-mask]", scope);
    revealStagger("[data-principle-item]", scope, {
      trigger: scope.querySelector("[data-principles-list]"),
      stagger: 0.07,
      y: 22,
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="bg-white py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA]"
    >
      <div className="editorial-container">
        {/* Asymmetric Editorial Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div id="about-heading">
              <SectionHeading
                eyebrow="About Medixo AI"
                title="Engineering Intelligence. Delivering Innovation."
                accentColor="#E5D3C9"
              />
            </div>

            <div className="pt-2 space-y-5 text-[15.5px] sm:text-[16px] leading-[1.78] text-[#4A4A4A]">
              <p data-reveal className="text-[17px] sm:text-[18px] leading-[1.7] text-[#202020] font-normal">
                At Medixo AI, we bring together software engineering and
                artificial intelligence to develop solutions that make
                businesses smarter and more efficient.
              </p>

              <p data-reveal>
                We work across multiple technology domains, including AI,
                Generative AI, Agentic AI, Machine Learning, Computer Vision,
                RAG architectures, and full-stack application development.
              </p>

              <p data-reveal>
                We believe every business has unique challenges. Therefore, we
                focus on understanding business requirements and designing
                customized technology solutions rather than providing generic
                applications.
              </p>
            </div>

            {/* Subtle Editorial Pull Statement */}
            <div
              data-reveal
              className="pt-6 mt-6 border-t border-[#EAEAEA] flex items-start gap-4"
            >
              <span
                className="w-10 h-[2px] bg-[#E5D3C9] mt-3 shrink-0"
                aria-hidden="true"
              />
              <p className="font-display italic text-[1.25rem] sm:text-[1.4rem] leading-[1.45] text-[#202020]">
                Tailored engineering grounded in real operational clarity — from
                system architecture to intelligent automation.
              </p>
            </div>
          </div>

          {/* Right Curated Photographic Composition */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="relative">
              {/* Soft Pastel Editorial Offset Frame */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-4 -right-4 w-44 h-44 rounded-[24px] bg-[#F6EAEA] pointer-events-none"
              />

              {/* Primary Studio Image */}
              <figure
                data-image-mask
                className="editorial-image-frame relative z-10 rounded-[24px] overflow-hidden bg-[#F5F5F3] border border-[#EAEAEA] shadow-editorial"
              >
                <img
                  src="/images/about-studio.jpg"
                  alt="Minimalist contemporary Medixo AI software engineering and design studio bathed in natural morning daylight"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </figure>

              {/* Secondary Asymmetric Architectural Row */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-5 relative z-10">
                <div
                  data-reveal
                  className="sm:col-span-7 rounded-[20px] bg-[#F5F5F3] border border-[#EAEAEA] p-6 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777]">
                    Our Practice
                  </span>
                  <p className="mt-3 text-[14.5px] leading-[1.68] text-[#202020]">
                    Bridging research-informed AI capabilities — RAG pipelines,
                    agentic orchestration, and computer vision — with dependable
                    production software engineering.
                  </p>
                </div>

                <figure
                  data-image-mask
                  className="sm:col-span-5 editorial-image-frame rounded-[20px] overflow-hidden bg-[#E5D3C9]/40 border border-[#EAEAEA]"
                >
                  <img
                    src="/images/hero-architecture.jpg"
                    alt="Minimalist curved modern architecture representing structural clarity and scalable systems"
                    loading="lazy"
                    className="w-full h-full min-h-[160px] object-cover"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles — Editorial Numbered Ledger (non-card design) */}
        <div
          data-principles-list
          className="mt-20 sm:mt-24 pt-12 border-t border-[#EAEAEA]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#777777]">
                Core Principles
              </span>
              <h3 className="font-display text-[1.75rem] sm:text-[2.1rem] text-[#202020] mt-2 leading-tight">
                Standards That Guide Every Engagement
              </h3>
            </div>
            <p className="text-[13.5px] text-[#777777] max-w-sm">
              Six foundational commitments embedded into how we architect,
              build, validate, and evolve every digital product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0 border-t border-[#EAEAEA]">
            {CORE_PRINCIPLES.map((principle, idx) => {
              const dotColors = ["#E5D3C9", "#ACC6C1", "#F6EAEA"];
              const dot = dotColors[idx % dotColors.length];
              return (
                <div
                  key={principle.number}
                  data-principle-item
                  className="group py-7 border-b border-[#EAEAEA] flex flex-col justify-between transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-semibold tracking-[0.16em] text-[#777777]">
                      {principle.number}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{ backgroundColor: dot }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-semibold text-[#202020] tracking-[-0.01em] group-hover:translate-x-0.5 transition-transform duration-300">
                      {principle.title}
                    </h4>
                    <p className="mt-2.5 text-[14px] leading-[1.68] text-[#777777]">
                      {principle.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
