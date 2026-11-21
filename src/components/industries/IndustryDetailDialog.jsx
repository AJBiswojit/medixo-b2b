import React, { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";

function DetailList({ title, entries }) {
  return (
    <section className="industry-detail-block">
      <h4>{title}</h4>
      <ul>
        {entries.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </section>
  );
}

export default function IndustryDetailDialog({
  industry,
  trigger,
  onClose,
  onInquire,
}) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const backdropDown = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const { documentElement: root, body } = document;
    const previousOverflow = root.style.overflowY;
    const previousPadding = body.style.paddingInlineEnd;
    const width = root.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingInlineEnd) || 0;
    root.style.overflowY = "hidden";
    // Reserve any removed classic scrollbar in the document, not in the
    // top layer: the ring holds its pose without a light gutter in the veil.
    const scrollbar = root.clientWidth - width;
    if (scrollbar > 0) body.style.paddingInlineEnd = `${padding + scrollbar}px`;

    dialog.showModal();
    closeRef.current.focus({ preventScroll: true });
    return () => {
      dialog.close();
      root.style.overflowY = previousOverflow;
      body.style.paddingInlineEnd = previousPadding;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  return (
    <dialog
      ref={dialogRef}
      className="industry-dialog"
      aria-labelledby="industry-detail-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropDown.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (backdropDown.current && event.target === event.currentTarget)
          onClose();
        backdropDown.current = false;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="industry-dialog-close"
        onClick={onClose}
      >
        Close <X size={15} aria-hidden="true" />
      </button>
      <article className="industry-detail">
        <figure className="industry-detail-cover">
          <img {...industry.cover} alt={industry.alt} />
          <figcaption>
            <h3 id="industry-detail-title">{industry.title}</h3>
          </figcaption>
        </figure>
        <div className="industry-detail-body">
          <section className="industry-detail-block">
            <h4>Industry overview</h4>
            <p>{industry.summary}</p>
          </section>
          <DetailList
            title="Business challenges"
            entries={industry.challenges}
          />
          <DetailList
            title="Technology capabilities"
            entries={industry.capabilities}
          />
          <DetailList
            title="Medixo AI solutions"
            entries={industry.solutions}
          />
          <button
            type="button"
            className="industry-discuss"
            onClick={onInquire}
          >
            Discuss Your Project <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </article>
    </dialog>
  );
}
