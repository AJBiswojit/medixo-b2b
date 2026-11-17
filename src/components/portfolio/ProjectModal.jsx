import React, { useEffect } from "react";
import {
  X,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
} from "lucide-react";
import Button from "../common/Button";

export default function ProjectModal({
  project,
  projects,
  onClose,
  onSelectProject,
  onInquireProject,
}) {
  useEffect(() => {
    if (!project) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const prevProject =
    projects[(currentIdx - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-[#202020]/45 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-[26px] bg-white border border-[#EAEAEA] shadow-editorial-lg"
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.15em] text-[#777777]">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: project.badgeTone }}
              aria-hidden="true"
            />
            <span>
              Project {project.number} · {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project overview"
            className="w-9 h-9 rounded-full border border-[#EAEAEA] bg-[#F5F5F3] hover:bg-[#E8E8E8] flex items-center justify-center text-[#202020] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-9 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
            <div className="md:col-span-6 rounded-[20px] overflow-hidden border border-[#EAEAEA] bg-[#F5F5F3]">
              <img
                src={project.primaryImage}
                alt={project.primaryAlt}
                className="w-full aspect-[4/3] object-cover object-[50%_55%]"
              />
            </div>

            <div className="md:col-span-6 space-y-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#777777]">
                {project.industry}
              </p>
              <h3
                id="project-modal-title"
                className="font-display text-[2rem] sm:text-[2.35rem] leading-[1.1] text-[#202020]"
              >
                {project.displayName}
              </h3>
              <p className="font-display italic text-[1.15rem] text-[#555555]">
                &ldquo;{project.positioning}&rdquo;
              </p>
              <p className="text-[14.5px] leading-[1.72] text-[#4A4A4A]">
                {project.description}
              </p>
            </div>
          </div>

          {/* Capabilities & Solution Focus */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#EAEAEA]">
            <div className="md:col-span-7">
              <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-4">
                Delivered Capabilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13.5px] text-[#202020]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#F5F5F3] border border-[#EAEAEA] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#202020]" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 space-y-5">
              <div>
                <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-3.5">
                  Solution Architecture Notes
                </h4>
                <ul className="space-y-2.5">
                  {project.architectureHighlights.map((note) => (
                    <li
                      key={note}
                      className="text-[13.5px] leading-[1.62] text-[#555555] pl-3.5 border-l-2 border-[#E5D3C9]"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-2.5">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11.5px] px-2.5 py-1 rounded-full bg-[#F5F5F3] border border-[#EAEAEA] text-[#202020]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Configurable Public Access Status & Primary Inquiry Action */}
          <div
            style={{ backgroundColor: project.surfaceColor }}
            className="rounded-[20px] border border-[#EAEAEA] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <p className="text-[14px] font-semibold text-[#202020]">
                {project.projectUrl
                  ? "Live Environment Available"
                  : "Guided Walkthrough Available on Request"}
              </p>
              <p className="text-[13px] text-[#777777]">
                {project.projectUrl
                  ? "Explore the live deployment or discuss adapting a similar architecture for your organization."
                  : "A public link is not attached to this showcase. Connect with Medixo AI to request a project walkthrough or discuss a tailored solution."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {project.projectUrl && (
                <Button
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  icon={ExternalLink}
                >
                  Open Live Link
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                icon={ArrowUpRight}
                onClick={() => {
                  onClose();
                  onInquireProject(project);
                }}
              >
                Discuss Similar Project
              </Button>
            </div>
          </div>

          {/* Previous / Next Project Navigation */}
          <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555555] hover:text-[#202020] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{prevProject.displayName}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555555] hover:text-[#202020] transition-colors cursor-pointer"
            >
              <span>{nextProject.displayName}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
