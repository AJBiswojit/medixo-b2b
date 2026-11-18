import React, { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardList,
  FileText,
  LayoutGrid,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { photoSrcSet } from "../../data/imagery";
import { CaptureImage } from "./ProjectCapture";

function ReferencePhoto({ photo, sizes }) {
  return (
    <img
      src={photo.image}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      width={photo.imageWidth}
      height={photo.imageHeight}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

function WindowBar({ children }) {
  return (
    <div className="product-window-bar">
      <span className="product-window-dots">
        <i />
        <i />
        <i />
      </span>
      <span>{children}</span>
      <ArrowUpRight />
    </div>
  );
}

function FashionPreview({ project }) {
  return (
    <>
      <div className="product-window fashion-window" data-image-layer>
        <WindowBar>Store concept</WindowBar>
        <div className="store-nav">
          <strong>Pratikshya.</strong>
          <span>Collections &nbsp; / &nbsp; The Atelier</span>
          <ShoppingBag />
        </div>
        <div className="fashion-feature">
          <div>
            <span className="mock-kicker">The textile edit</span>
            <strong>Woven with intention.</strong>
            <span className="mock-pill">
              Shop the edit <ArrowRight />
            </span>
          </div>
          <ReferencePhoto
            photo={project.conceptPhoto}
            sizes="(max-width: 929px) 44vw, 330px"
          />
        </div>
        <div className="fashion-catalog">
          <span className="mock-kicker">Browse by collection</span>
          <strong>Textiles &amp; apparel</strong>
        </div>
      </div>
      <div className="product-overlay fashion-overlay" data-parallax-layer>
        <div className="product-overlay-title">
          <LayoutGrid /> Commerce console
        </div>
        {project.interfacePreview.modules.slice(0, 3).map((module) => (
          <div key={module} className="mock-row">
            <span>{module}</span>
            <ArrowUpRight />
          </div>
        ))}
      </div>
    </>
  );
}

function JewelleryPreview({ project }) {
  return (
    <>
      <div className="product-window jewellery-window" data-image-layer>
        <WindowBar>Collection concept</WindowBar>
        <div className="jewel-nav">
          <Menu />
          <strong>SWARNOVA</strong>
          <ShoppingBag />
        </div>
        <div className="jewel-feature">
          <div>
            <span className="mock-kicker">Fine jewellery</span>
            <strong>
              Modern
              <br /> heirlooms.
            </strong>
            <span className="mock-jewel-link">
              Discover the collection <ArrowUpRight />
            </span>
          </div>
          <ReferencePhoto
            photo={project.collectionPhoto}
            sizes="(max-width: 929px) 43vw, 320px"
          />
        </div>
        <div className="jewel-collection-strip">
          {project.interfacePreview.collections.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
      <div className="product-overlay jewel-mobile" data-parallax-layer>
        <div>
          <strong>S</strong>
          <Menu />
        </div>
        <ReferencePhoto
          photo={project.detailPhoto}
          sizes="(max-width: 929px) 19vw, 140px"
        />
        <span className="mock-kicker">Collection</span>
        <strong>Heritage Gold</strong>
      </div>
    </>
  );
}

const EDUCATION_MENU = [
  [LayoutGrid, "Overview"],
  [Sparkles, "Question studio"],
  [CalendarDays, "Examinations"],
  [BookOpen, "Faculty & students"],
];
const HEALTH_MENU = [
  [LayoutGrid, "Overview"],
  [FileText, "Knowledge library"],
  [Stethoscope, "Care workflows"],
  [Sparkles, "AI assistant"],
];

function DashboardShell({ brand, menu, className, icon: Icon, children }) {
  return (
    <div
      className={`product-window dashboard-window ${className}`}
      data-image-layer
    >
      <WindowBar>{brand} workspace concept</WindowBar>
      <div className="mock-dashboard">
        <div className="mock-sidebar">
          <div className="mock-dashboard-brand">
            <Icon /> <strong>{brand}</strong>
          </div>
          {menu.map(([ItemIcon, label]) => (
            <span key={label}>
              <ItemIcon /> {label}
            </span>
          ))}
        </div>
        <div className="mock-dashboard-main">{children}</div>
      </div>
    </div>
  );
}

function EducationPreview({ project }) {
  return (
    <>
      <DashboardShell
        brand="EduX"
        menu={EDUCATION_MENU}
        icon={BookOpen}
        className="education-window"
      >
        <div className="mock-dashboard-top">
          <strong>Learning workspace</strong>
          <Search />
        </div>
        <div className="mock-dashboard-banner">
          <span className="mock-kicker">Assessment tools</span>
          <strong>AI Question Studio</strong>
          <span>
            Build from your syllabus <ArrowRight />
          </span>
        </div>
        <div className="mock-chapter">
          <strong>Chapter-wise analysis</strong>
          <span>
            Foundations
            <i />
          </span>
          <span>
            Applications
            <i />
          </span>
          <span>
            Revision
            <i />
          </span>
        </div>
      </DashboardShell>
      <div className="product-overlay education-overlay" data-parallax-layer>
        <div className="product-overlay-title">
          <ClipboardList /> Paper composer
        </div>
        <span className="mock-kicker">Examination setup</span>
        {project.interfacePreview.workflows.slice(0, 3).map(({ step }, i) => (
          <div key={step} className="mock-row">
            <span>{step}</span>
            {i === 0 ? <Check /> : <ArrowDownRight />}
          </div>
        ))}
        <span className="mock-pill">
          Review assessment <ArrowRight />
        </span>
      </div>
    </>
  );
}

function HealthcarePreview({ project }) {
  return (
    <>
      <DashboardShell
        brand="Medixo Care"
        menu={HEALTH_MENU}
        icon={Stethoscope}
        className="health-window"
      >
        <div className="mock-dashboard-top">
          <strong>Clinical knowledge hub</strong>
          <Search />
        </div>
        <div className="mock-dashboard-banner mock-clinical-feature">
          <div>
            <span className="mock-kicker">Knowledge library</span>
            <strong>Search medical documents</strong>
          </div>
          <ReferencePhoto
            photo={project.referencePhoto}
            sizes="(max-width: 929px) 22vw, 145px"
          />
        </div>
        <div className="mock-documents">
          <strong>Reference workspace</strong>
          {[
            "Medical document library",
            "Care workflow resources",
            "Document review queue",
          ].map((label) => (
            <span key={label}>
              <FileText /> {label}
              <ArrowUpRight />
            </span>
          ))}
        </div>
      </DashboardShell>
      <div className="product-overlay health-overlay" data-parallax-layer>
        <div className="product-overlay-title">
          <Sparkles /> Knowledge assistant
        </div>
        <span className="mock-chat-prompt">
          Find a document in the knowledge library.
        </span>
        <span className="mock-chat-answer">
          Start with approved references in the document index.
        </span>
        <span className="mock-row">
          <FileText /> View sources <ArrowUpRight />
        </span>
      </div>
    </>
  );
}

const PREVIEWS = {
  "atelier-split": FashionPreview,
  "gallery-showcase": JewelleryPreview,
  "academic-interface": EducationPreview,
  "clinical-system": HealthcarePreview,
};

export function InterfaceOutline({ project }) {
  const preview = project.interfacePreview;
  const items =
    preview.modules ||
    preview.collections ||
    preview.workflows ||
    preview.layers;
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: project.surfaceColor }}
    >
      <h4 className="editorial-label mb-3">{preview.label}</h4>
      <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2 text-[13px]">
        {items.map((item) =>
          typeof item === "string" ? (
            <li key={item}>• {item}</li>
          ) : (
            <li key={item.step}>
              <strong>{item.step}:</strong> {item.detail}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default function ProjectVisual({ project }) {
  const [failedScreenshot, setFailedScreenshot] = useState(false);
  const [failedCapture, setFailedCapture] = useState(false);
  const Preview = PREVIEWS[project.layoutVariant];
  const hasScreenshot = project.screenshot && !failedScreenshot;
  const capture = failedCapture ? null : project.capture;
  const visualLabel = hasScreenshot
    ? "Product screenshot"
    : capture
      ? "Local build · Sample data"
      : "Concept preview";
  return (
    <figure
      className="project-visual"
      style={{ "--project-tint": project.accentColor }}
      data-parallax-frame
    >
      <div
        className={`project-stage project-stage--${project.layoutVariant}`}
        data-project-image
      >
        {hasScreenshot ? (
          <img
            className="project-screenshot"
            src={project.screenshot}
            alt={`${project.displayName} product screenshot`}
            loading="lazy"
            decoding="async"
            onError={() => setFailedScreenshot(true)}
            data-image-layer
          />
        ) : capture ? (
          <CaptureImage
            className="project-screenshot project-screenshot--capture"
            capture={capture}
            sizes="(max-width: 929px) 90vw, 700px"
            onError={() => setFailedCapture(true)}
          />
        ) : (
          <div className="product-composition" aria-hidden="true">
            <Preview project={project} />
          </div>
        )}
      </div>
      <figcaption className="project-visual-caption">
        <span className="editorial-label">
          <span className="project-caption-dot" aria-hidden="true" />
          {visualLabel}
        </span>
        <span>
          {hasScreenshot
            ? project.interfacePreview.label
            : capture?.label ||
              project.conceptLabel ||
              project.interfacePreview.label}
        </span>
      </figcaption>
    </figure>
  );
}
