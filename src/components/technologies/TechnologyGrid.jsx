import React, { useState } from "react";
import { useGsap } from "../../hooks/useGsap";
import {
  gsap,
  ANIMATION_CONFIG,
  prefersReducedMotion,
} from "../../animations/animationConfig";

function TechnologyLogo({ item, accent }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(item.iconUrl) && !imgFailed;

  return (
    <div
      className="w-11 h-11 rounded-[13px] flex items-center justify-center border border-[#EAEAEA] bg-[#F5F5F3] group-hover:bg-white transition-colors duration-300 shrink-0"
      style={
        !showImage
          ? { backgroundColor: `${accent}` }
          : undefined
      }
    >
      {showImage ? (
        <img
          src={item.iconUrl}
          alt={`${item.name} logo`}
          width="22"
          height="22"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="w-[22px] h-[22px] object-contain transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <span className="text-[11.5px] font-bold tracking-[0.04em] text-[#202020]">
          {item.monogram}
        </span>
      )}
    </div>
  );
}

export default function TechnologyGrid({ category }) {
  const gridRef = useGsap(
    (scope) => {
      if (prefersReducedMotion()) return;
      const items = scope.querySelectorAll("[data-tech-tile]");
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y: 18, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.045,
          ease: ANIMATION_CONFIG.ease.editorial,
          clearProps: "transform",
        }
      );
    },
    [category.id]
  );

  return (
    <div ref={gridRef} className="mt-8">
      {/* Category Header Context */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{
              backgroundColor:
                category.accent === "#F5F5F3" ? "#202020" : category.accent,
            }}
            aria-hidden="true"
          />
          <h3 className="font-display text-[1.45rem] sm:text-[1.6rem] text-[#202020]">
            {category.label}
          </h3>
        </div>
        <p className="text-[13.5px] text-[#777777] max-w-md sm:text-right">
          {category.description}
        </p>
      </div>

      {/* Responsive Logo Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {category.items.map((item) => (
          <div
            key={item.name}
            data-tech-tile
            className="group rounded-[18px] bg-white border border-[#EAEAEA] hover:border-[#202020]/30 hover:shadow-editorial-sm p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <TechnologyLogo item={item} accent={category.accent} />
            <div>
              <p className="text-[15px] font-semibold text-[#202020] leading-snug">
                {item.name}
              </p>
              <p className="mt-1 text-[12px] text-[#777777]">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
