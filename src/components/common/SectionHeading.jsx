import React from "react";

export default function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  action,
  spread = false,
}) {
  return (
    <header
      className={`section-heading${spread ? " section-heading--spread" : " max-w-3xl"}`}
    >
      {eyebrow && (
        <div data-reveal className="section-eyebrow editorial-label">
          {index && (
            <span className="section-chapter" aria-hidden="true">
              {index} /
            </span>
          )}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 id={id} data-reveal className="section-title">
        {title}
      </h2>
      {(subtitle || action) && (
        <div data-reveal className="section-heading-support">
          {subtitle && <p className="section-intro">{subtitle}</p>}
          {action && <div className="section-heading-action">{action}</div>}
        </div>
      )}
    </header>
  );
}
