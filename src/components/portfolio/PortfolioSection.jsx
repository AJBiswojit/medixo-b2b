import React, { useCallback, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";
import { useGsap } from "../../hooks/useGsap";
import {
  revealStagger,
  revealImageMask,
  applySubtleParallax,
} from "../../animations/scrollAnimations";
import { scrollToSection } from "../../utils/validation";
import SectionHeading from "../common/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import "../../styles/portfolio.css";

export default function PortfolioSection({ onInquireProject }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope);
    revealImageMask("[data-project-card] [data-project-image]", scope);
    revealStagger("[data-project-copy]", scope, { y: 21 });
    return applySubtleParallax(
      "[data-project-card] [data-parallax-layer]",
      scope,
      12,
    );
  });

  const handleProjectInquiry = (project) =>
    onInquireProject?.({
      industry: project.inquiryIndustry,
      serviceRequired: project.inquiryService,
      projectNote: `Interested in building a solution similar to ${project.displayName} (${project.category}).`,
    });

  return (
    <section
      id="our-work"
      ref={sectionRef}
      aria-labelledby="portfolio-heading"
      className="section-shell portfolio-section"
    >
      <div className="editorial-container">
        <SectionHeading
          id="portfolio-heading"
          index="05"
          eyebrow="Our Work"
          title="Real Solutions. Real Industries."
          subtitle="From digital commerce to intelligent healthcare and education platforms, explore how Medixo AI translates business requirements into technology solutions."
        />
        <nav
          aria-label="Jump to featured project"
          data-reveal
          className="project-index"
        >
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => scrollToSection(`project-${project.id}`)}
            >
              <span>{project.number}</span> {project.displayName}
              <ArrowDownRight size={13} aria-hidden="true" />
            </button>
          ))}
        </nav>
        <div>
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenProject={setSelectedProject}
              onInquireProject={handleProjectInquiry}
            />
          ))}
        </div>
      </div>
      <ProjectModal
        project={selectedProject}
        projects={PROJECTS}
        onClose={closeProject}
        onSelectProject={setSelectedProject}
        onInquireProject={handleProjectInquiry}
      />
    </section>
  );
}
