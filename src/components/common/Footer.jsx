import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import BrandMark from "./BrandMark";
import { BRAND, FOOTER_COLUMNS } from "../../data/navigation";
import { CONTACT_CONFIG } from "../../utils/inquiryService";
import { scrollToSection } from "../../utils/validation";
import "../../styles/footer.css";

export default function Footer({ onSelectService }) {
  const handleAnchor = (event, targetId, serviceId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    if (serviceId) onSelectService?.(serviceId);
    // Services are a pinned sequence: the section handles the exact position.
    scrollToSection(serviceId ? "services" : targetId);
  };

  return (
    <footer className="site-footer">
      <div className="editorial-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a
              href="#home"
              onClick={(event) => handleAnchor(event, "home")}
              className="brand-link"
              aria-label="Medixo AI — Back to home"
            >
              <BrandMark onDark />
              <span>{BRAND.name}</span>
            </a>
            <p className="font-display">{BRAND.tagline}</p>
            <p>
              AI-driven software development, generative and agentic systems,
              computer vision, and custom digital engineering for modern
              organizations.
            </p>
          </div>
          <nav className="footer-link-grid" aria-label="Footer navigation">
            {Object.entries(FOOTER_COLUMNS).map(([group, items]) => (
              <div key={group}>
                <h3 className="editorial-label">{group}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={
                          item.serviceId
                            ? `#service-${item.serviceId}`
                            : item.href
                        }
                        onClick={(event) =>
                          handleAnchor(event, item.href, item.serviceId)
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="editorial-label">Connect</h3>
              <ul>
                <li>
                  <a
                    href="#contact"
                    onClick={(event) => handleAnchor(event, "contact")}
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
                    >
                      LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    <a
                      href="#contact-channels"
                      onClick={(event) =>
                        handleAnchor(event, "contact-channels")
                      }
                    >
                      LinkedIn
                    </a>
                  )}
                </li>
                <li>
                  {CONTACT_CONFIG.businessEmail ? (
                    <a href={`mailto:${CONTACT_CONFIG.businessEmail}`}>Email</a>
                  ) : (
                    <a
                      href="#contact"
                      onClick={(event) => handleAnchor(event, "contact")}
                    >
                      Email
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="footer-base">
          <p>
            {BRAND.copyright}{" "}
            <a className="footer-image-credits" href="/image-credits.html">
              Image credits
            </a>
          </p>
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            aria-label="Scroll back to top"
          >
            Back to top{" "}
            <span>
              <ArrowUp size={15} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
