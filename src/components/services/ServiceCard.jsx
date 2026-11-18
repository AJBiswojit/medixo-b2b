import React from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  BrainCircuit,
  Code2,
  Compass,
  Database,
  Minus,
  Plus,
  ScanEye,
  Sparkles,
  Workflow,
} from "lucide-react";

const ICON_MAP = {
  BrainCircuit,
  Sparkles,
  BookOpenCheck,
  Code2,
  ScanEye,
  Workflow,
  Database,
  Compass,
};

function ServiceMotif({ service }) {
  const Icon = ICON_MAP[service.icon] || Sparkles;
  return (
    <div className="service-motif" aria-hidden="true">
      <span className="editorial-label">
        Service <span className="service-number">{service.number}</span>
      </span>
      <span className="service-symbol">
        <Icon size={24} strokeWidth={1.5} />
      </span>
      <svg
        className="service-orbit"
        viewBox="0 0 212 108"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {service.id === "ai-ml" ? (
          <path d="M216 66c-43 55-123 47-161 10C23 45 56 15 101 15s94 36 65 68C132 122 68 89 77 51c9-38 81-40 107-5s-12 65-38 53s-22-51 4-60s54 9 54 28" />
        ) : service.id === "gen-agentic-ai" ? (
          <path d="M218 25C173 0 162 103 116 92S97 8 49 19 7 91-8 86M218 44c-48-26-54 69-100 60S98 28 50 37 10 108-9 101M215 8C170-14 162 84 113 73S94-10 47 1 7 73-8 69" />
        ) : (
          <path d="M171-16a67 67 0 1 0 0 134 67 67 0 0 0 0-134Zm0 15a52 52 0 1 0 0 104 52 52 0 0 0 0-104Zm0 15a37 37 0 1 0 0 74 37 37 0 0 0 0-74ZM144 51h54m-27-27v54" />
        )}
      </svg>
    </div>
  );
}

export default function ServiceCard({
  service,
  signature,
  isExpanded,
  onToggle,
  onInquire,
}) {
  const panelId = `service-panel-${service.id}`;
  const triggerId = `service-trigger-${service.id}`;

  return (
    <article
      id={`service-${service.id}`}
      data-service-card
      data-expanded={isExpanded}
      style={{ "--service-accent": service.accent }}
      className={`service-card${signature ? " service-card--signature" : ""}`}
    >
      <div className="service-header">
        <ServiceMotif service={service} />
        <div className="service-copy">
          <h3 className="font-display">
            <button
              id={triggerId}
              type="button"
              className="service-trigger"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => onToggle(service.id)}
            >
              <span>{service.title}</span>
              <span className="service-toggle" aria-hidden="true">
                {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
          </h3>
          <p>{service.shortSummary}</p>
          {!isExpanded && (
            <div className="service-preview">
              {service.capabilities.slice(0, 3).map((capability) => (
                <span key={capability} className="service-tag">
                  {capability}
                </span>
              ))}
              {service.capabilities.length > 3 && (
                <span className="text-[12px] text-[var(--text-secondary)]">
                  +{service.capabilities.length - 3} more capabilities
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        id={panelId}
        aria-labelledby={triggerId}
        data-open={isExpanded}
        inert={!isExpanded}
        className="accordion-content"
      >
        <div className="accordion-inner">
          <div className="service-detail">
            <p className="editorial-label mb-3">
              Included Capabilities ({service.capabilities.length})
            </p>
            <ul>
              {service.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="service-inquiry">
              <span>Customized around your project scope</span>
              <button type="button" onClick={() => onInquire(service.title)}>
                Discuss Service <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
