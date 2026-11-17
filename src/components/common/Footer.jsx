import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { BRAND, FOOTER_COLUMNS } from "../../data/navigation";
import { CONTACT_CONFIG } from "../../utils/inquiryService";
import { scrollToSection } from "../../utils/validation";

export default function Footer({ onSelectService }) {
  const handleAnchor = (event, targetId, serviceId) => {
    event.preventDefault();
    if (serviceId && onSelectService) {
      onSelectService(serviceId);
    }
    scrollToSection(targetId);
  };

  const handleBackToTop = () => {
    scrollToSection("top");
  };

  return (
    <footer className="bg-[#F5F5F3] border-t border-[#EAEAEA] text-[#202020]">
      <div className="editorial-container pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#E2E2DE]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <a
              href="#home"
              onClick={(e) => handleAnchor(e, "home")}
              className="inline-flex items-center gap-2.5 group"
            >
              <span
                className="w-8 h-8 rounded-[9px] bg-[#171717] flex items-center justify-center relative"
                aria-hidden="true"
              >
                <span className="text-white text-[13px] font-bold leading-none">
                  M
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ACC6C1] absolute top-1.5 right-1.5" />
              </span>
              <span className="text-[15px] font-bold tracking-[0.15em] uppercase text-[#202020]">
                {BRAND.name}
              </span>
            </a>

            <p className="font-display text-[1.45rem] sm:text-[1.65rem] leading-[1.3] text-[#202020] max-w-sm">
              {BRAND.tagline}
            </p>

            <p className="text-[14px] leading-[1.7] text-[#777777] max-w-sm">
              AI-driven software development, generative and agentic systems,
              computer vision, and custom digital engineering for modern
              organizations.
            </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 sm:col-span-4">
            <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_COLUMNS.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchor(e, item.href)}
                    className="text-[14px] text-[#202020] hover:text-[#777777] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Links */}
          <div className="md:col-span-3 sm:col-span-4">
            <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-5">
              Technologies
            </h3>
            <ul className="space-y-3">
              {FOOTER_COLUMNS.technologies.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) =>
                      handleAnchor(e, item.href, item.serviceId)
                    }
                    className="text-[14px] text-[#202020] hover:text-[#777777] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-2 sm:col-span-4">
            <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-5">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleAnchor(e, "contact")}
                  className="text-[14px] text-[#202020] hover:text-[#777777] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                {CONTACT_CONFIG.linkedInUrl ? (
                  <a
                    href={CONTACT_CONFIG.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[14px] text-[#202020] hover:text-[#777777] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href="#contact-channels"
                    onClick={(e) => handleAnchor(e, "contact-channels")}
                    className="inline-flex items-center gap-1.5 text-[14px] text-[#202020] hover:text-[#777777] transition-colors"
                    title="View LinkedIn channel configuration in Contact section"
                  >
                    <span>LinkedIn</span>
                  </a>
                )}
              </li>
              <li>
                {CONTACT_CONFIG.businessEmail ? (
                  <a
                    href={`mailto:${CONTACT_CONFIG.businessEmail}`}
                    className="text-[14px] text-[#202020] hover:text-[#777777] transition-colors"
                  >
                    Email
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={(e) => handleAnchor(e, "contact")}
                    className="text-[14px] text-[#202020] hover:text-[#777777] transition-colors"
                    title="Send a project inquiry or view email configuration"
                  >
                    Email
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back-to-Top Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] text-[#777777]">{BRAND.copyright}</p>

          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Scroll back to top"
            className="group inline-flex items-center gap-2.5 text-[13px] font-medium text-[#202020] hover:text-[#555555] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <span className="w-8 h-8 rounded-full border border-[#DCDCD8] bg-white flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
