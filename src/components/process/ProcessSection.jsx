import React, { useState } from "react";
import { PROCESS_STAGES } from "../../data/process";
import { useGsap } from "../../hooks/useGsap";
import {
  revealStagger,
  initProcessTimeline,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import "../../styles/process.css";

export default function ProcessSection() {
  const [activeStage, setActiveStage] = useState(PROCESS_STAGES[0].number);
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    return initProcessTimeline(scope);
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="section-shell process-section"
    >
      <div className="editorial-container">
        <SectionHeading
          id="process-heading"
          index="06"
          eyebrow="Development Process"
          title="From Vision to Production."
          subtitle="A disciplined six-stage engineering methodology that turns initial business ideas into secure, scalable, and production-ready digital systems."
        />
        <div className="process-timeline" data-process-timeline>
          <div className="process-track" aria-hidden="true">
            <div data-process-line />
          </div>
          <ol className="process-stages">
            {PROCESS_STAGES.map((stage) => {
              const active = activeStage === stage.number;
              return (
                <li
                  key={stage.number}
                  data-process-stage
                  data-active={active}
                  style={{ "--stage-accent": stage.accent }}
                  onMouseEnter={() => setActiveStage(stage.number)}
                >
                  <button
                    type="button"
                    className="process-node"
                    onClick={() => setActiveStage(stage.number)}
                    onFocus={() => setActiveStage(stage.number)}
                    aria-pressed={active}
                    aria-label={`Stage ${stage.number}: ${stage.displayTitle}`}
                  >
                    {stage.number}
                  </button>
                  <div className="process-stage-copy">
                    <p className="editorial-label">{stage.title}</p>
                    <h3 className="font-display">{stage.displayTitle}</h3>
                    <p>{stage.description}</p>
                    <p className="process-deliverable">{stage.deliverable}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
