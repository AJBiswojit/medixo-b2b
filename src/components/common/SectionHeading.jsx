import React from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  accentColor = "#ACC6C1",
  className = "",
  maxWidth = "max-w-3xl",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        maxWidth,
        isCenter ? "mx-auto text-center" : "text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <div
          data-reveal
          className={[
            "inline-flex items-center gap-2.5 mb-4",
            isCenter ? "justify-center" : "",
          ].join(" ")}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#777777]">
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        data-reveal
        className="font-display text-[2rem] sm:text-[2.6rem] lg:text-[3.15rem] leading-[1.12] text-[#202020] tracking-[-0.015em]"
      >
        {title}
      </h2>

      {subtitle && (
        <p
          data-reveal
          className={[
            "mt-5 text-[15.5px] sm:text-[16.5px] leading-[1.72] text-[#777777]",
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
