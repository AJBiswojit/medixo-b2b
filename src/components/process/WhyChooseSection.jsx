import React from "react";
import { ArrowRight, ArrowUpRight, Waypoints } from "lucide-react";
import { WHY_CHOOSE_ITEMS } from "../../data/navigation";
import { useGsap } from "../../hooks/useGsap";
import {
  revealCardGroups,
  revealStagger,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";

export default function WhyChooseSection({ onDiscussProject }) {
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    revealCardGroups("[data-why-item]", scope, { size: 2, y: 16 });
  });

  return (
    <section
      id="why-medixo"
      ref={sectionRef}
      aria-labelledby="why-heading"
      className="section-shell why-section"
    >
      <div className="editorial-container why-grid">
        <div className="why-story">
          <SectionHeading
            id="why-heading"
            index="07"
            eyebrow="Why Choose Medixo AI"
            title={
              <>
                More Than a Technology Provider.{" "}
                <em className="section-accent">Your Innovation Partner.</em>
              </>
            }
          />
          <p data-reveal className="section-intro">
            Our focus is not simply on delivering software. We focus on building
            reliable solutions that create meaningful business value.
          </p>
          <div className="partnership-card" data-reveal>
            <p className="editorial-label">
              <Waypoints size={18} strokeWidth={1.5} aria-hidden="true" />{" "}
              Partnership Model
            </p>
            <div className="partnership-flow">
              <span>Business Context</span>
              <ArrowRight size={13} aria-hidden="true" />
              <span>AI + Software</span>
              <ArrowRight size={13} aria-hidden="true" />
              <span>Scale</span>
            </div>
            <p>
              Every architecture decision, model integration, and interface
              detail is evaluated against long-term operational reliability.
            </p>
          </div>
          <div data-reveal>
            <Button
              href="#contact"
              icon={ArrowUpRight}
              onClick={
                onDiscussProject
                  ? (event) => {
                      if (
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.altKey
                      )
                        return;
                      event.preventDefault();
                      onDiscussProject({});
                    }
                  : undefined
              }
            >
              Start a Conversation
            </Button>
          </div>
        </div>

        <ol className="why-list">
          {WHY_CHOOSE_ITEMS.map((item, index) => (
            <li
              key={item.title}
              data-why-item
              className={index === 1 || index === 7 ? "why-insight" : ""}
              style={{
                "--why-accent":
                  index === 1
                    ? "var(--pastel-lavender)"
                    : index === 7
                      ? "var(--pastel-sage)"
                      : item.accent,
              }}
            >
              <span className="editorial-label" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
