import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  Cross,
  Dot,
  Layers3,
  ScanLine,
  ShoppingBag,
} from "lucide-react";
import { HERO_FLOATING_CARDS } from "../../data/navigation";
import { scrollToSection } from "../../utils/validation";

function TileArt({ card }) {
  if (card.image) {
    return (
      <div className="hero-art">
        <img
          src={card.image}
          alt=""
          width={card.width}
          height={card.height}
          decoding="async"
          loading={card.id === "ai" ? undefined : "lazy"}
          fetchPriority={card.id === "ai" ? "high" : undefined}
        />
        {card.id === "vision" && (
          <span className="hero-detection">
            <span>Lens</span>
            <ScanLine size={13} />
          </span>
        )}
      </div>
    );
  }

  if (card.id === "healthcare") {
    return (
      <div className="hero-art care-mini">
        <div className="hero-mini-header">
          <span className="hero-mini-icon">
            <Cross size={17} strokeWidth={1.65} />
          </span>
          <div>
            <span className="hero-mini-kicker">Care workspace</span>
            <strong>Clinical overview</strong>
          </div>
        </div>
        <svg viewBox="0 0 160 44" fill="none" className="hero-ecg">
          <path
            d="M0 10h160M0 22h160M0 34h160"
            stroke="currentColor"
            strokeOpacity=".13"
          />
          <path
            d="M1 25h29l6-5 7 5h9l8-16 8 30 8-18 6 4h18l5-6 6 6h48"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mini-status">
          <Dot size={14} /> Knowledge assistant
        </span>
      </div>
    );
  }

  if (card.id === "education") {
    return (
      <div className="hero-art study-mini">
        <div className="hero-mini-header">
          <span className="hero-mini-icon">
            <BookOpen size={16} strokeWidth={1.65} />
          </span>
          <div>
            <span className="hero-mini-kicker">Learning studio</span>
            <strong>Course dashboard</strong>
          </div>
        </div>
        <div className="study-mini-row">
          <span>Curriculum</span>
          <i />
        </div>
        <div className="study-mini-row">
          <span>Assessments</span>
          <i />
        </div>
      </div>
    );
  }

  if (card.id === "commerce") {
    return (
      <div className="hero-art commerce-mini">
        <img
          src="/images/fashion-tile.webp"
          alt=""
          width="240"
          height="320"
          decoding="async"
        />
        <div>
          <ShoppingBag size={15} strokeWidth={1.65} />
          <span className="hero-mini-kicker">Storefront</span>
          <strong>
            New
            <br />
            collection
          </strong>
          <span className="commerce-swatches">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    );
  }

  if (card.id === "automation") {
    return (
      <div className="hero-art flow-mini">
        <span className="hero-mini-kicker">Workflow builder</span>
        <svg viewBox="0 0 132 42" fill="none">
          <path
            d="M31 20h21m26 0h19"
            stroke="#6B8160"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <rect
            x="7"
            y="9"
            width="26"
            height="23"
            rx="6"
            fill="#fff"
            stroke="#acbd9f"
          />
          <rect
            x="52"
            y="9"
            width="26"
            height="23"
            rx="6"
            fill="#dce9d5"
            stroke="#9fb090"
          />
          <rect
            x="97"
            y="9"
            width="26"
            height="23"
            rx="6"
            fill="#fff"
            stroke="#acbd9f"
          />
          <path
            d="M17 17h7m-7 4h7m-7 4h5m43-10v12m-6-6h12m34 0 4 4 6-8"
            stroke="#495e42"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="hero-art analytics-mini">
      <div className="hero-mini-header">
        <Layers3 size={14} strokeWidth={1.65} /> <strong>Operations</strong>
      </div>
      <svg viewBox="0 0 123 61" fill="none">
        <path
          d="M3 52h117M3 36h117M3 20h117"
          stroke="#8B6B56"
          strokeOpacity=".22"
        />
        <path
          d="M12 52V38h10v14M33 52V31h10v21M54 52V36h10v16M75 52V22h10v30M96 52V13h10v39"
          fill="#bea493"
        />
        <path
          d="m10 37 28-13 20 5 22-15 24-7"
          stroke="#543D32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
      {HERO_FLOATING_CARDS.map((card) => (
        <div
          key={card.id}
          className={`hero-card hero-card--${card.id}`}
          data-compact={card.compact ? "true" : undefined}
          data-tablet={card.tablet ? "true" : undefined}
          data-hero-entry
          data-from-x={card.from[0]}
          data-from-y={card.from[1]}
          data-depth={card.depth}
          style={{
            "--tile-color": `var(--pastel-${card.tone})`,
            "--tile-tilt": `${card.tilt}deg`,
          }}
        >
          <div data-hero-drift>
            <a
              className="hero-tile"
              href={`#${card.target}`}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                scrollToSection(card.target);
              }}
            >
              <div className="hero-tile-body" aria-hidden="true">
                <TileArt card={card} />
              </div>
              <div className="hero-tile-caption">
                <span>{card.title}</span>
                <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
