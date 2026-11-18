import React from "react";
import { ArrowUpRight } from "lucide-react";
import { industryAnchor } from "../../data/industries";
import { photoSrcSet } from "../../data/imagery";

export default function IndustryCard({
  industry,
  number,
  isLead,
  isActive,
  onSelect,
  onInquire,
}) {
  const anchor = industryAnchor(industry.id);

  return (
    <article
      id={anchor}
      className="industry-card"
      data-industry-card
      data-current={isActive}
      aria-labelledby={`${anchor}-title`}
      tabIndex={-1}
      style={{
        "--industry-accent": industry.accent,
        "--industry-crop": industry.imagePosition,
      }}
    >
      <figure className="industry-cover">
        <span
          className="industry-image"
          data-industry-image={isLead ? "lead" : undefined}
        >
          <img
            src={industry.image}
            srcSet={photoSrcSet(industry)}
            sizes="(max-width: 679px) 84vw, (max-width: 1099px) 67vw, 744px"
            width={industry.imageWidth}
            height={industry.imageHeight}
            alt={industry.alt}
            loading="lazy"
            decoding="async"
            data-image-layer
          />
        </span>
        <button
          type="button"
          className="industry-cover-control"
          onClick={onSelect}
          tabIndex={isActive ? 0 : -1}
          aria-pressed={isActive}
        >
          <span className="industry-photo-tag editorial-label">
            <span aria-hidden="true">{number} /</span> Sector focus{" "}
            <span className="sr-only">: {industry.title}</span>
          </span>
        </button>
        <span className="industry-photo-corner" aria-hidden="true">
          +
        </span>
      </figure>
      <div className="industry-copy">
        <h3 id={`${anchor}-title`} className="font-display">
          {industry.title}
        </h3>
        <p className="industry-summary">{industry.summary}</p>
        <div className="industry-solutions">
          <p className="editorial-label">Solution capabilities</p>
          <ul>
            {industry.solutions.map((solution) => (
              <li key={solution}>{solution}</li>
            ))}
          </ul>
        </div>
        <a
          href="#contact"
          className="industry-inquiry"
          tabIndex={isActive ? 0 : -1}
          onClick={(event) => {
            if (
              !onInquire ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return;
            event.preventDefault();
            onInquire({ industry: industry.title });
          }}
        >
          Explore Solutions
          <span className="sr-only"> for {industry.title}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
