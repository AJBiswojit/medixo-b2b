import React from "react";
import { ArrowUpRight, ExternalLink, Layers, Sparkles, BookOpen, Activity } from "lucide-react";
import Button from "../common/Button";

function ActionRow({ project, onOpenProject, onInquireProject }) {
  return (
    <div className="pt-6 border-t border-[#202020]/10 flex flex-wrap items-center gap-3">
      <Button
        variant="primary"
        size="md"
        icon={ArrowUpRight}
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
          size="md"
          icon={ExternalLink}
        >
          Visit Platform
        </Button>
      )}

      <button
        type="button"
        onClick={() => onInquireProject(project)}
        className="text-[13px] font-medium text-[#555555] hover:text-[#202020] px-3 py-2 transition-colors cursor-pointer"
      >
        Build something similar →
      </button>
    </div>
  );
}

function TechTagRow({ technologies }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="text-[11.5px] font-medium px-3 py-1 rounded-full bg-white/90 border border-[#202020]/10 text-[#3A3A3A]"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

export default function ProjectCard({
  project,
  onOpenProject,
  onInquireProject,
}) {
  // 01 — PRATIKSHYA FASHION: Fashion Atelier Layered Split
  if (project.layoutVariant === "atelier-split") {
    return (
      <article
        id={`project-${project.id}`}
        data-project-card
        style={{ backgroundColor: project.surfaceColor }}
        className="rounded-[28px] border border-[#EAEAEA] p-6 sm:p-10 lg:p-12 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Layered Atelier Visual Composition */}
          <div className="lg:col-span-6 relative pb-6 sm:pb-10">
            <div
              data-project-image
              className="editorial-image-frame rounded-[22px] overflow-hidden bg-white p-2.5 border border-[#EAEAEA] shadow-editorial"
            >
              <img
                src={project.primaryImage}
                alt={project.primaryAlt}
                loading="lazy"
                className="w-full aspect-[4/3] rounded-[16px] object-cover"
              />
            </div>

            {/* Overlapping Secondary Fabric Card with Subtle Parallax */}
            <div
              data-parallax-layer
              className="hidden sm:block absolute -bottom-1 right-4 w-[175px] bg-white p-2 rounded-[18px] border border-[#EAEAEA] shadow-editorial-lg rotate-[3deg] z-20"
            >
              <img
                src={project.secondaryImage}
                alt={project.secondaryAlt}
                loading="lazy"
                className="w-full aspect-[4/3] rounded-[12px] object-cover"
              />
              <p className="text-[10.5px] font-medium text-[#555555] pt-1.5 px-1">
                Textile &amp; Apparel Catalog
              </p>
            </div>

            {/* Commerce Operations Strip */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-2 sm:left-4 sm:max-w-[250px] bg-white/95 backdrop-blur-sm rounded-[16px] border border-[#EAEAEA] p-4 shadow-editorial-sm z-10">
              <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#777777] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#202020]" aria-hidden="true" />
                <span>{project.interfacePreview.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {project.interfacePreview.modules.map((mod) => (
                  <span
                    key={mod}
                    className="text-[11px] text-[#202020] bg-[#FAF4F3] px-2 py-1 rounded-md border border-[#F0E2E0] truncate"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.15em] text-[#777777]">
              <span className="px-3 py-1 rounded-full bg-white border border-[#EAEAEA] text-[#202020]">
                Project {project.number}
              </span>
              <span>{project.industry}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
            </div>

            <div>
              <h3 className="font-display text-[2rem] sm:text-[2.5rem] leading-[1.1] text-[#202020]">
                {project.displayName}
              </h3>
              <p className="mt-2 font-display italic text-[1.15rem] sm:text-[1.28rem] text-[#555555]">
                &ldquo;{project.positioning}&rdquo;
              </p>
            </div>

            <p className="text-[15px] leading-[1.72] text-[#4A4A4A]">
              {project.description}
            </p>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-3">
                Key Capabilities
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {project.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2 text-[13.5px] text-[#202020]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#C9A698] mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <TechTagRow technologies={project.technologies} />
            <ActionRow
              project={project}
              onOpenProject={onOpenProject}
              onInquireProject={onInquireProject}
            />
          </div>
        </div>
      </article>
    );
  }

  // 02 — SWARNOVA: Luxury Jewellery Gallery Passe-Partout Presentation
  if (project.layoutVariant === "gallery-showcase") {
    return (
      <article
        id={`project-${project.id}`}
        data-project-card
        style={{ backgroundColor: project.surfaceColor }}
        className="rounded-[28px] border border-[#E7DDD3] p-6 sm:p-10 lg:p-12 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Refined Luxury Editorial Narrative */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DFD2C5] pb-4">
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#777777]">
                Project {project.number} — {project.industry}
              </span>
              <span className="text-[11.5px] font-medium text-[#6B5E53]">
                {project.category}
              </span>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#8B7768] mb-2">
                Digital Maison Showcase
              </p>
              <h3 className="font-display text-[2.2rem] sm:text-[2.75rem] tracking-[0.02em] leading-[1.08] text-[#202020]">
                {project.name}
              </h3>
            </div>

            <p className="text-[15px] leading-[1.75] text-[#4A4A4A]">
              {project.description}
            </p>

            {/* Jewellery Capabilities in Refined Editorial Columns */}
            <div className="bg-white/80 rounded-[20px] border border-[#EAE0D7] p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-3.5">
                Signature Capabilities
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-5">
                {project.capabilities.map((cap, idx) => (
                  <li
                    key={cap}
                    className="flex items-baseline gap-2.5 text-[13.5px] text-[#202020]"
                  >
                    <span className="text-[10.5px] font-semibold text-[#9E8878]">
                      0{idx + 1}
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <TechTagRow technologies={project.technologies} />
            <ActionRow
              project={project}
              onOpenProject={onOpenProject}
              onInquireProject={onInquireProject}
            />
          </div>

          {/* Right Museum Passe-Partout Jewellery Composition */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <div className="bg-white p-4 sm:p-6 rounded-[24px] border border-[#EAE0D7] shadow-editorial">
              <div
                data-project-image
                className="editorial-image-frame rounded-[16px] overflow-hidden bg-[#E5D3C9]/40"
              >
                <img
                  src={project.primaryImage}
                  alt={project.primaryAlt}
                  loading="lazy"
                  className="w-full aspect-[4/4] object-cover object-[50%_58%]"
                />
              </div>

              {/* Lookbook Caption & Collection Strip Inside Passe-Partout Frame */}
              <div className="pt-5 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="font-display italic text-[1.15rem] text-[#202020] leading-snug">
                    &ldquo;{project.positioning}&rdquo;
                  </p>
                  <span className="self-start sm:self-auto shrink-0 text-[10.5px] uppercase tracking-[0.18em] text-[#8B7768] px-3 py-1 rounded-full bg-[#F8F3EE] border border-[#E5D3C9]">
                    Lookbook UI
                  </span>
                </div>
                {project.interfacePreview?.collections && (
                  <div className="pt-3 border-t border-[#F0E8E0] flex flex-wrap gap-1.5">
                    {project.interfacePreview.collections.map((col) => (
                      <span
                        key={col}
                        className="text-[11px] text-[#6B5E53] px-2.5 py-1 rounded-full bg-[#FAF6F2] border border-[#ECE2D8]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 03 — EduX: Structured Modern Academic & EdTech Interface Layout
  if (project.layoutVariant === "academic-interface") {
    return (
      <article
        id={`project-${project.id}`}
        data-project-card
        style={{ backgroundColor: project.surfaceColor }}
        className="rounded-[28px] border border-[#EAEAEA] p-6 sm:p-10 lg:p-12 overflow-hidden"
      >
        {/* Top Architectural Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-[#E0E0DC]">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#ACC6C1]/40 text-[#202020] text-[11px] font-semibold uppercase tracking-[0.14em]">
                Project {project.number}
              </span>
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#777777]">
                {project.industry} · {project.category}
              </span>
            </div>
            <h3 className="font-display text-[2.2rem] sm:text-[2.7rem] leading-[1.08] text-[#202020]">
              {project.name}
            </h3>
          </div>

          <p className="font-display italic text-[1.15rem] sm:text-[1.3rem] text-[#4A4A4A] max-w-md lg:text-right">
            &ldquo;{project.positioning}&rdquo;
          </p>
        </div>

        {/* Lower Split: Visual + Academic Workflow UI Card / Capability Matrix */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div
              data-project-image
              className="editorial-image-frame rounded-[22px] overflow-hidden border border-[#EAEAEA] bg-white shadow-editorial-sm"
            >
              <img
                src={project.primaryImage}
                alt={project.primaryAlt}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>

            {/* Schematic EdTech Workflow Preview Card */}
            <div className="rounded-[20px] bg-white border border-[#EAEAEA] p-5">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#777777]">
                  <BookOpen className="w-3.5 h-3.5 text-[#202020]" aria-hidden="true" />
                  <span>{project.interfacePreview.label}</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ACC6C1]" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.interfacePreview.workflows.map((wf, idx) => (
                  <div
                    key={wf.step}
                    className="rounded-[13px] bg-[#F5F5F3] border border-[#EAEAEA] px-3.5 py-2.5"
                  >
                    <p className="text-[12px] font-semibold text-[#202020]">
                      {idx + 1}. {wf.step}
                    </p>
                    <p className="text-[11px] text-[#777777] mt-0.5">
                      {wf.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <p className="text-[15.5px] leading-[1.74] text-[#4A4A4A]">
              {project.description}
            </p>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-3.5">
                Academic &amp; AI Capabilities
              </p>
              <div className="divide-y divide-[#E4E4E0] border-y border-[#E4E4E0]">
                {project.capabilities.map((cap, idx) => (
                  <div
                    key={cap}
                    className="py-2.5 flex items-center justify-between text-[14px] text-[#202020]"
                  >
                    <span>{cap}</span>
                    <span className="text-[11px] font-medium text-[#777777]">
                      0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <TechTagRow technologies={project.technologies} />
            <ActionRow
              project={project}
              onOpenProject={onOpenProject}
              onInquireProject={onInquireProject}
            />
          </div>
        </div>
      </article>
    );
  }

  // 04 — MEDIXO HEALTHCARE SOLUTIONS: Serene Clinical & RAG Intelligence Architecture
  return (
    <article
      id={`project-${project.id}`}
      data-project-card
      style={{ backgroundColor: project.surfaceColor }}
      className="rounded-[28px] border border-[#DCE8E5] p-6 sm:p-10 lg:p-12 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Clinical Intelligence Details */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4E3DF] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#202020]">
              <Activity className="w-3.5 h-3.5 text-[#5D877F]" aria-hidden="true" />
              Project {project.number}
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#647572]">
              {project.industry}
            </span>
          </div>

          <div>
            <h3 className="font-display text-[2rem] sm:text-[2.45rem] leading-[1.12] text-[#202020]">
              {project.displayName}
            </h3>
            <p className="mt-2 font-display italic text-[1.15rem] sm:text-[1.28rem] text-[#4F6360]">
              &ldquo;{project.positioning}&rdquo;
            </p>
          </div>

          <p className="text-[15px] leading-[1.74] text-[#45504E]">
            {project.description}
          </p>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#647572] mb-3">
              Healthcare Capabilities
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-start gap-2.5 text-[13px] text-[#202020] bg-white/85 rounded-[12px] px-3.5 py-2.5 border border-[#DFEAE7]"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-[#ACC6C1] mt-1 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <TechTagRow technologies={project.technologies} />
          <ActionRow
            project={project}
            onOpenProject={onOpenProject}
            onInquireProject={onInquireProject}
          />
        </div>

        {/* Right Layered Clinical & RAG Architecture Visual */}
        <div className="lg:col-span-6 space-y-4 relative">
          <div
            data-project-image
            className="editorial-image-frame rounded-[22px] overflow-hidden bg-white p-2.5 border border-[#D8E5E2] shadow-editorial"
          >
            <img
              src={project.primaryImage}
              alt={project.primaryAlt}
              loading="lazy"
              className="w-full aspect-[16/11] rounded-[16px] object-cover"
            />
          </div>

          {/* Layered Secondary Detail + RAG Knowledge Stack Card */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-7 bg-white rounded-[18px] border border-[#D8E5E2] p-5 shadow-editorial-sm">
              <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[#647572] mb-3">
                <Layers className="w-3.5 h-3.5 text-[#202020]" aria-hidden="true" />
                <span>{project.interfacePreview.label}</span>
              </div>
              <ol className="space-y-1.5">
                {project.interfacePreview.layers.map((layer, index) => (
                  <li
                    key={layer}
                    className="flex items-center gap-2.5 text-[12px] text-[#202020]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#F2F7F6] border border-[#ACC6C1] flex items-center justify-center text-[10px] font-semibold shrink-0">
                      {index + 1}
                    </span>
                    <span>{layer}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div
              data-parallax-layer
              className="sm:col-span-5 editorial-image-frame rounded-[18px] overflow-hidden bg-white p-2 border border-[#D8E5E2]"
            >
              <img
                src={project.secondaryImage}
                alt={project.secondaryAlt}
                loading="lazy"
                className="w-full h-full min-h-[140px] rounded-[12px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
