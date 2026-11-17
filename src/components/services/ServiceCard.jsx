import React from "react";
import {
  BrainCircuit,
  Sparkles,
  BookOpenCheck,
  Code2,
  ScanEye,
  Workflow,
  Database,
  Compass,
  Plus,
  Minus,
  ArrowUpRight,
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

export default function ServiceCard({
  service,
  isExpanded,
  onToggle,
  onInquire,
}) {
  const IconComponent = ICON_MAP[service.icon] || Sparkles;
  const panelId = `service-panel-${service.id}`;
  const triggerId = `service-trigger-${service.id}`;

  return (
    <article
      id={`service-${service.id}`}
      data-service-card
      className={[
        "group min-w-0 rounded-[22px] border transition-[border-color,box-shadow] duration-300 bg-white flex flex-col",
        isExpanded
          ? "border-[#202020]/30 shadow-editorial"
          : "border-[#EAEAEA] hover:border-[#CFCFCB] hover:shadow-editorial-sm",
      ].join(" ")}
    >
      {/* Card Header & Interactive Expand Trigger */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => onToggle(service.id)}
        className="w-full text-left p-6 sm:p-7 flex flex-col gap-5 cursor-pointer"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span
              className="w-11 h-11 rounded-[14px] flex items-center justify-center border border-[#EAEAEA]/80 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
              style={{ backgroundColor: service.accent }}
              aria-hidden="true"
            >
              <IconComponent className="w-5 h-5 text-[#202020]" strokeWidth={1.7} />
            </span>
            <span className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-[#777777]">
              Service {service.number}
            </span>
          </div>

          <span
            className={[
              "w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300",
              isExpanded
                ? "bg-[#171717] text-white border-[#171717]"
                : "bg-[#F5F5F3] text-[#202020] border-[#EAEAEA] group-hover:border-[#202020]",
            ].join(" ")}
            aria-hidden="true"
          >
            {isExpanded ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </span>
        </div>

        <div>
          <h3 className="font-display text-[1.45rem] sm:text-[1.6rem] leading-[1.2] text-[#202020]">
            {service.title}
          </h3>
          <p className="mt-2.5 text-[14.5px] leading-[1.68] text-[#777777]">
            {service.shortSummary}
          </p>
        </div>

        {/* Compact Preview Pills When Collapsed */}
        {!isExpanded && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {service.capabilities.slice(0, 3).map((cap) => (
              <span
                key={cap}
                className="text-[12px] px-3 py-1 rounded-full bg-[#F5F5F3] text-[#4A4A4A] border border-[#EAEAEA]"
              >
                {cap}
              </span>
            ))}
            {service.capabilities.length > 3 && (
              <span className="text-[12px] font-medium text-[#777777] pl-1">
                +{service.capabilities.length - 3} more capabilities
              </span>
            )}
          </div>
        )}
      </button>

      {/* Expandable Full Capabilities List */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        data-open={isExpanded ? "true" : "false"}
        className="accordion-content"
      >
        <div className="accordion-inner">
          <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-[#EAEAEA]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777777] mt-4 mb-3.5">
              Included Capabilities ({service.capabilities.length})
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {service.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13.5px] text-[#202020] leading-snug"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{
                      backgroundColor:
                        service.accent === "#F5F5F3" ? "#202020" : service.accent,
                    }}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-[#F0F0EE] flex items-center justify-between gap-4">
              <span className="text-[12.5px] text-[#777777]">
                Customized around your project scope
              </span>
              <button
                type="button"
                onClick={() => onInquire(service.title)}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#202020] hover:text-[#555555] transition-colors cursor-pointer"
              >
                <span>Discuss Service</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
