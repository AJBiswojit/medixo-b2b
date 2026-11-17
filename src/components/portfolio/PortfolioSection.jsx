import React, { useState } from "react";
import { PROJECTS } from "../../data/projects";
import { useGsap } from "../../hooks/useGsap";
import {
  revealStagger,
  revealImageMask,
  applySubtleParallax,
} from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function PortfolioSection({ onInquireProject }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
    revealImageMask("[data-project-image]", scope);
    applySubtleParallax("[data-parallax-layer]", scope, -18);

    const cards = scope.querySelectorAll("[data-project-card]");
    cards.forEach((card) => {
      revealStagger([card], card, { y: 34, duration: 0.9, start: "top 88%" });
    });
  }, []);

  const handleJumpToProject = (projectId) => {
    const el = document.getElementById(`project-${projectId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleProjectInquiry = (project) => {
    if (!onInquireProject) return;
    onInquireProject({
      industry: project.inquiryIndustry,
      serviceRequired: project.inquiryService,
      projectNote: `Interested in building a solution similar to ${project.displayName} (${project.category}).`,
    });
  };

  return (
    <section
      id="our-work"
      ref={sectionRef}
      aria-labelledby="portfolio-heading"
      className="bg-white py-20 sm:py-28 lg:py-32 border-b border-[#EAEAEA]"
    >
      <div className="editorial-container">
        {/* Portfolio Header & Project Selector Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div id="portfolio-heading">
            <SectionHeading
              eyebrow="Our Work"
              title="Real Solutions. Real Industries."
              subtitle="From digital commerce to intelligent healthcare and education platforms, explore how Medixo AI translates business requirements into technology solutions."
              accentColor="#E5D3C9"
            />
          </div>

          {/* Direct Project Anchor Selector */}
          <div
            data-reveal
            aria-label="Jump to featured project"
            className="flex flex-wrap gap-2"
          >
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => handleJumpToProject(proj.id)}
                className="px-3.5 py-2 rounded-full text-[12.5px] font-medium bg-[#F5F5F3] border border-[#EAEAEA] text-[#202020] hover:border-[#202020] hover:bg-white transition-all cursor-pointer"
              >
                <span className="text-[#777777] mr-1.5">{proj.number}</span>
                {proj.displayName}
              </button>
            ))}
          </div>
        </div>

        {/* Four Distinct Art-Directed Portfolio Showcases */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-14">
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

      {/* Accessible Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        projects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
        onInquireProject={handleProjectInquiry}
      />
    </section>
  );
}
