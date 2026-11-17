import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function IndustryCard({
  industry,
  isActive,
  onSelect,
  onInquire,
}) {
  return (
    <article
      data-industry-card
      onClick={() => onSelect(industry.id)}
      className={[
        "group shrink-0 w-[86vw] max-w-full sm:w-[400px] lg:w-[430px] snap-start rounded-[24px] bg-white border transition-[border-color,box-shadow] duration-300 flex flex-col overflow-hidden cursor-pointer",
        isActive
          ? "border-[#202020]/35 shadow-editorial"
          : "border-[#EAEAEA] hover:border-[#CCCCCC] hover:shadow-editorial-sm",
      ].join(" ")}
    >
      {/* Editorial Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F3]">
        <img
          src={industry.image}
          alt={industry.alt}
          loading="lazy"
          className="w-full h-full object-cover object-[50%_55%] transition-transform duration-700 group-hover:scale-105"
        />
        {/* Minimal Number Tag */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/94 backdrop-blur-sm border border-[#EAEAEA]">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                industry.accent === "#F5F5F3" ? "#202020" : industry.accent,
            }}
            aria-hidden="true"
          />
          <span className="text-[11px] font-semibold tracking-[0.14em] text-[#202020]">
            {industry.number}
          </span>
        </div>
      </div>

      {/* Editorial Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
        <div>
          <h3 className="font-display text-[1.55rem] sm:text-[1.7rem] leading-[1.18] text-[#202020]">
            {industry.title}
          </h3>
          <p className="mt-2.5 text-[14px] leading-[1.68] text-[#777777]">
            {industry.summary}
          </p>

          <ul className="mt-5 pt-5 border-t border-[#EAEAEA] space-y-2">
            {industry.solutions.map((solution) => (
              <li
                key={solution}
                className="flex items-center gap-2.5 text-[13.5px] text-[#202020]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#202020]/50"
                  aria-hidden="true"
                />
                <span>{solution}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-[#F0F0EE] flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInquire(industry.title);
            }}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#202020] hover:text-[#555555] transition-colors cursor-pointer"
          >
            <span>Explore for {industry.title.split("&")[0].trim()}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
