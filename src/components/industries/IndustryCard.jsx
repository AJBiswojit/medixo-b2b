import React from "react";

export default function IndustryCard({
  industry,
  index,
  selected,
  tabbable,
  onActivate,
  ref,
}) {
  return (
    <button
      ref={ref}
      type="button"
      className="industry-portrait"
      data-orbit-card={index}
      aria-label={industry.title}
      aria-current={selected ? "true" : undefined}
      aria-haspopup="dialog"
      tabIndex={tabbable ? 0 : -1}
      onClick={(event) => onActivate(index, event)}
    >
      <img
        {...industry.portrait}
        alt={industry.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </button>
  );
}
