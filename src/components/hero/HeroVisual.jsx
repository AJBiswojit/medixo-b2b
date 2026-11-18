import React from "react";
import { HERO_GALLERY } from "../../data/heroGallery";
import { photoSrcSet } from "../../data/imagery";

// Size for the portrait at its foreground stop, not the width of the stage.
const IMAGE_SIZES = "(max-width: 370px) calc(100vw - 40px), 330px";

export default function HeroVisual() {
  return (
    <div className="hero-camera">
      <ol
        className="hero-track"
        aria-label="Medixo AI services and industries"
        role="list"
      >
        {HERO_GALLERY.map((card, index) => (
          <li key={card.id} className="hero-plane" data-hero-card={card.id}>
            <figure>
              <div className="hero-frame">
                <img
                  src={card.image}
                  srcSet={photoSrcSet(card)}
                  sizes={IMAGE_SIZES}
                  width={card.imageWidth}
                  height={card.imageHeight}
                  alt={card.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                  decoding="async"
                />
              </div>
              <figcaption className="hero-caption">
                <h2>{card.title}</h2>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  );
}
