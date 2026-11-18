import React, { useState } from "react";
import { useGsap } from "../../hooks/useGsap";
import { gsap, ANIMATION_CONFIG } from "../../animations/animationConfig";

const PALETTE = [
  "lavender",
  "mint",
  "butter",
  "powder",
  "peach",
  "sage",
  "blush",
  "beige",
];

function TechnologyLogo({ item }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <span className="tech-logo" aria-hidden="true">
      {item.iconUrl && !imgFailed ? (
        <img
          src={item.iconUrl}
          alt=""
          width="26"
          height="26"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span>{item.monogram}</span>
      )}
    </span>
  );
}

export default function TechnologyGrid({ category }) {
  const gridRef = useGsap((scope) => {
    gsap.from(scope.querySelectorAll("[data-tech-enter]"), {
      y: 10,
      opacity: 0.38,
      duration: 0.43,
      stagger: 0.035,
      ease: ANIMATION_CONFIG.ease.editorial,
      clearProps: "opacity,transform",
    });
  });

  return (
    <div
      ref={gridRef}
      className="tech-grid-content"
      style={{ "--tech-category": category.accent }}
    >
      <div className="tech-category-intro" data-tech-enter>
        <div className="flex items-center gap-2">
          <span className="tech-category-dot" aria-hidden="true" />
          <p className="editorial-label">Selected category</p>
        </div>
        <h3 className="font-display">{category.label}</h3>
        <p>{category.description}</p>
      </div>
      <ul className="tech-grid">
        {category.items.map((item, index) => (
          <li
            key={item.name}
            data-tech-enter
            style={{
              "--tech-accent": `var(--pastel-${PALETTE[index % PALETTE.length]})`,
            }}
          >
            <TechnologyLogo item={item} />
            <div>
              <p className="tech-name">{item.name}</p>
              <p className="tech-role">{item.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
