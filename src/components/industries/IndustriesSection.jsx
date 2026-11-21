import React from "react";
import { INDUSTRIES, industryAnchor } from "../../data/industries";
import IndustryRing from "./IndustryRing";
import "../../styles/industries.css";

export default function IndustriesSection({ onInquireIndustry }) {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="industries-section"
    >
      {/* Stable hash targets: the moving portraits are not scroll anchors. */}
      {INDUSTRIES.map(({ id }) => (
        <span
          key={id}
          id={industryAnchor(id)}
          className="industry-anchor"
          aria-hidden="true"
        />
      ))}
      <header className="industry-heading mx-auto px-4 text-center">
        <h2 id="industries-heading">Industry Ecosystem</h2>
        <p>
          Explore custom software, AI, and automation for the needs of 18
          industries.
        </p>
      </header>
      <IndustryRing
        industries={INDUSTRIES}
        onInquireIndustry={onInquireIndustry}
      />
    </section>
  );
}
