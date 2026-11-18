import React, { useLayoutEffect, useRef } from "react";
import {
  X,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
} from "lucide-react";
import Button from "../common/Button";
import ProjectVisual, { InterfaceOutline } from "./ProjectVisual";
import ProjectCapture from "./ProjectCapture";

export default function ProjectModal({
  project,
  projects,
  onClose,
  onSelectProject,
  onInquireProject,
}) {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const isOpen = Boolean(project);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog.showModal();
    dialog.scrollTop = 0;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected)
        opener.focus({ preventScroll: true });
    };
  }, [isOpen]);

  if (!project) return <dialog ref={dialogRef} className="project-dialog" />;

  const select = (next) => {
    onSelectProject(next);
    dialogRef.current.scrollTop = 0;
    titleRef.current.focus({ preventScroll: true });
  };

  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const prevProject =
    projects[(currentIdx - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-modal-title"
      className="project-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div>
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
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
            autoFocus
            aria-label="Close project overview"
            className="w-9 h-9 shrink-0 rounded-full border border-[#EAEAEA] bg-[#F5F5F3] hover:bg-[#E8E8E8] flex items-center justify-center text-[#202020] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-9 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
            <div className="md:col-span-6 min-w-0">
              <ProjectVisual key={project.id} project={project} />
            </div>

            <div className="md:col-span-6 space-y-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                {project.industry}
              </p>
              <h3
                id="project-modal-title"
                ref={titleRef}
                tabIndex={-1}
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

          <ProjectCapture key={project.id} project={project} />
          <InterfaceOutline project={project} />

          {/* Capabilities & Solution Focus */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#EAEAEA]">
            <div className="md:col-span-7">
              <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)] mb-4">
                Delivered Capabilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13.5px] text-[#202020]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#F5F5F3] border border-[#EAEAEA] flex items-center justify-center shrink-0 mt-0.5">
                      <Check
                        className="w-3 h-3 text-[#202020]"
                        aria-hidden="true"
                      />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 space-y-5">
              <div>
                <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)] mb-3.5">
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
                <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)] mb-2.5">
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
              <p className="text-[13px] text-[var(--text-secondary)]">
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
              onClick={() => select(prevProject)}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555555] hover:text-[#202020] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{prevProject.displayName}</span>
            </button>

            <button
              type="button"
              onClick={() => select(nextProject)}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555555] hover:text-[#202020] transition-colors cursor-pointer"
            >
              <span>{nextProject.displayName}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
