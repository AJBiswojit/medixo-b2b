import React from "react";
import { ArrowUpRight } from "lucide-react";
import { photoSrcSet } from "../../data/imagery";

export function CaptureImage({ capture, sizes, className, onError }) {
  return (
    <img
      className={className}
      src={capture.image}
      srcSet={photoSrcSet(capture)}
      sizes={sizes}
      width={capture.imageWidth}
      height={capture.imageHeight}
      alt={capture.alt}
      loading="lazy"
      decoding="async"
      onError={onError}
      data-image-layer
    />
  );
}

export default function ProjectCapture({ project }) {
  if (!project.additionalCaptures?.length) return null;

  return (
    <details className="project-capture-gallery">
      <summary>More product views</summary>
      <p className="project-capture-note">{project.captureNote}</p>
      <div className="project-capture-grid">
        {project.additionalCaptures.map((capture) => (
          <figure key={capture.image}>
            <CaptureImage
              capture={capture}
              sizes="(max-width: 639px) 85vw, 390px"
            />
            <figcaption>
              <a href={capture.image} target="_blank" rel="noopener noreferrer">
                {capture.label}
                <ArrowUpRight size={13} aria-hidden="true" />
                <span className="sr-only"> — full-size image in a new tab</span>
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </details>
  );
}
