import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HERO_CARDS } from "../../data/navigation";
import { INDUSTRIES, industryAnchor } from "../../data/industries";
import { photoSrcSet } from "../../data/imagery";
import { scrollToSection } from "../../utils/validation";

const INDUSTRIES_BY_SLOT = new Map(
  INDUSTRIES.filter(({ hero }) => hero).map((industry) => [
    industry.hero.slot,
    industry,
  ]),
);

function FloatingCard({ card, industry }) {
  const anchor = industry ? industryAnchor(industry.id) : card.target;
  const label = industry ? industry.hero.label : card.title;
  const photo = industry || card;
  const tile = (
    <>
      <div className="hero-tile-body" aria-hidden="true">
        <img
          src={photo.image}
          srcSet={photoSrcSet(photo)}
          sizes={
            industry
              ? "260px"
              : "(min-width: 1550px) 208px, (min-width: 1100px) 14vw, (min-width: 680px) 21vw, 45vw"
          }
          alt=""
          width={photo.imageWidth}
          height={photo.imageHeight}
          loading={card.id === "ai" && !industry ? "eager" : "lazy"}
          fetchPriority={card.id === "ai" && !industry ? "high" : undefined}
          decoding="async"
        />
      </div>
      <div className="hero-tile-caption">
        <span>{label}</span>
        <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
      </div>
    </>
  );

  return (
    <div
      className={`hero-card hero-card--${card.id}`}
      data-compact={!industry && card.compact ? "true" : undefined}
      data-tablet={!industry && card.tablet ? "true" : undefined}
      data-hero-card={industry ? anchor : card.id}
      data-hero-industry={industry ? card.id : undefined}
      style={{
        "--tile-color": industry
          ? industry.accent
          : `var(--pastel-${card.tone})`,
        "--tile-tilt": `${card.tilt}deg`,
        "--tile-crop": photo.imagePosition,
      }}
    >
      {industry ? (
        <Link
          to={`#${anchor}`}
          className="hero-tile"
          aria-label={industry.title}
        >
          {tile}
        </Link>
      ) : (
        <a
          className="hero-tile"
          href={`#${anchor}`}
          title={card.imageCredit}
          onClick={(event) => {
            if (
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return;
            event.preventDefault();
            scrollToSection(anchor);
          }}
        >
          {tile}
        </a>
      )}
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div
      className="hero-gallery"
      aria-label="Explore Medixo AI's work and capabilities"
      role="group"
    >
      <svg
        className="hero-traces"
        viewBox="0 0 1440 640"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path d="M295 84C55 110 20 483 287 565M311 104C88 124 57 467 296 542M1139 84c246 26 281 399 12 481m-22-461c222 20 253 363 16 438" />
        <path
          d="M30 94h12m-6-6v12m333 52h12m-6-6v12m-38 392h12m-6-6v12m1048-456h12m-6-6v12m-331 43h12m-6-6v12m46 404h12m-6-6v12"
          className="hero-traces-marks"
        />
      </svg>
      {HERO_CARDS.map((card) => (
        <FloatingCard key={card.id} card={card} />
      ))}
      {HERO_CARDS.map((card) => {
        const industry = INDUSTRIES_BY_SLOT.get(card.id);
        return (
          industry && (
            <FloatingCard
              key={industryAnchor(industry.id)}
              card={card}
              industry={industry}
            />
          )
        );
      })}
    </div>
  );
}
