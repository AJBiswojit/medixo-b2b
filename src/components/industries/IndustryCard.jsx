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
      className="industry-card"
      data-industry-card
      data-current={isActive}
      style={{
        "--industry-accent": industry.accent,
        "--industry-crop": industry.imagePosition,
      }}
    >
      <figure className="industry-cover">
        <span className="industry-image" data-industry-image>
          <img
            src={industry.image}
            srcSet={
              industry.smallImage
                ? `${industry.smallImage} 520w, ${industry.image} 1000w`
                : undefined
            }
            sizes="(max-width: 679px) 84vw, (max-width: 1100px) 68vw, 760px"
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
          aria-pressed={isActive}
        >
          <span className="industry-photo-tag editorial-label">
            <span aria-hidden="true">{industry.number} /</span> Sector focus{" "}
            <span className="sr-only">: {industry.title}</span>
          </span>
        </button>
        <span className="industry-photo-corner" aria-hidden="true">
          +
        </span>
      </figure>
      <div className="industry-copy">
        <div>
          <h3 className="font-display">{industry.title}</h3>
          <p>{industry.summary}</p>
        </div>
        <ul>
          {industry.solutions.map((solution) => (
            <li key={solution}>{solution}</li>
          ))}
        </ul>
        <button className="industry-inquiry" type="button" onClick={onInquire}>
          Explore for {industry.title.split("&")[0].trim()}{" "}
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
