import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Button from "../common/Button";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({
  project,
  onOpenProject,
  onInquireProject,
}) {
  const reverse =
    project.layoutVariant === "gallery-showcase" ||
    project.layoutVariant === "clinical-system";
  return (
    <article
      id={`project-${project.id}`}
      data-project-card
      className={`project-card${reverse ? " project-card--reverse" : ""}`}
      style={{ "--project-tint": project.accentColor }}
    >
      <ProjectVisual project={project} />
      <div className="project-copy" data-project-copy>
        <p className="project-meta editorial-label">
          <span>Project {project.number}</span> {project.industry}
        </p>
        <p className="project-category">{project.category}</p>
        <h3 className="font-display">{project.displayName}</h3>
        <p className="project-positioning font-display">
          <em>{project.positioning}</em>
        </p>
        <p className="project-description">{project.description}</p>
        <div className="project-capabilities">
          <h4 className="editorial-label">Key Capabilities</h4>
          <ul>
            {project.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>
        <ul className="project-tech" aria-label="Technology stack">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-actions">
          <Button
            icon={ArrowUpRight}
            size="sm"
            onClick={() => onOpenProject(project)}
          >
            View Project
          </Button>
          {project.projectUrl && (
            <Button
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              icon={ExternalLink}
            >
              Visit Platform
            </Button>
          )}
          <Button
            variant="ghost"
            icon={ArrowUpRight}
            onClick={() => onInquireProject(project)}
          >
            Build something similar
          </Button>
        </div>
      </div>
    </article>
  );
}
