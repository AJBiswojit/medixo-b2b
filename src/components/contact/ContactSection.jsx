import React from "react";
import {
  ArrowUpRight,
  ClipboardList,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";
import { CONTACT_CONFIG } from "../../utils/inquiryService";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger } from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import ContactForm from "./ContactForm";
import "../../styles/contact.css";

const CHANNELS = [
  {
    label: "Official Business Email",
    icon: Mail,
    value: CONTACT_CONFIG.businessEmail,
    href: CONTACT_CONFIG.businessEmail
      ? `mailto:${CONTACT_CONFIG.businessEmail}`
      : "",
    tone: "beige",
  },
  {
    label: "Contact Number",
    icon: Phone,
    value: CONTACT_CONFIG.contactNumber,
    href: CONTACT_CONFIG.contactNumber
      ? `tel:${CONTACT_CONFIG.contactNumber}`
      : "",
    tone: "mint",
  },
  {
    label: "LinkedIn",
    icon: Globe,
    value: CONTACT_CONFIG.linkedInUrl ? "Official Medixo AI Page" : "",
    href: CONTACT_CONFIG.linkedInUrl,
    external: true,
    tone: "blush",
  },
  {
    label: "Company Address",
    icon: MapPin,
    value: CONTACT_CONFIG.companyAddress,
    tone: "powder",
  },
  {
    label: "Social Media Links",
    icon: Share2,
    value:
      CONTACT_CONFIG.githubUrl || CONTACT_CONFIG.socialXUrl
        ? "Official Social Channels"
        : "",
    href: CONTACT_CONFIG.githubUrl || CONTACT_CONFIG.socialXUrl,
    external: true,
    tone: "lavender",
  },
];

export default function ContactSection({ inquiryPrefill }) {
  const sectionRef = useGsap((scope) => revealStagger("[data-reveal]", scope));

  return (
    <section
      id="contact"
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="section-shell contact-section"
    >
      <div className="editorial-container contact-grid">
        <div className="contact-story">
          <SectionHeading
            id="contact-heading"
            index="09"
            eyebrow="Contact & Project Inquiry"
            title={
              <>
                Let&apos;s Build Something{" "}
                <em className="section-accent">Intelligent Together.</em>
              </>
            }
          />
          <div data-reveal className="contact-intro">
            <p>
              Have an idea, a business challenge, or an upcoming technology
              project?
            </p>
            <p>
              Let&apos;s discuss how Medixo AI can help transform your
              requirements into scalable digital solutions.
            </p>
          </div>

          <div className="contact-brief-card" data-reveal>
            <div className="contact-brief-art" aria-hidden="true">
              <svg viewBox="0 0 175 144" fill="none">
                <path
                  d="M23 0v144M53 0v144M83 0v144M113 0v144M143 0v144M173 0v144M0 24h175M0 54h175M0 84h175M0 114h175M0 143h175"
                  stroke="#62867b"
                  strokeOpacity=".24"
                />
                <path
                  d="M26 112c24-7 34-22 42-42s19-33 49-40M35 126c24-7 38-22 46-42s23-36 53-43M12 96c24-7 34-22 42-42S75 21 105 14"
                  stroke="#62867b"
                  strokeOpacity=".5"
                />
                <circle cx="68" cy="70" r="4" fill="#6a9184" />
                <circle cx="117" cy="30" r="4" fill="#6a9184" />
                <circle cx="26" cy="112" r="4" fill="#6a9184" />
              </svg>
            </div>
            <span className="editorial-label">
              <ClipboardList size={17} strokeWidth={1.5} aria-hidden="true" />{" "}
              Project Brief
            </span>
            <p className="font-display">
              Start with the problem you want to solve.
            </p>
            <p>
              Share your goals, key workflows, and what you need the solution to
              do.
            </p>
          </div>

          <div id="contact-channels" data-reveal className="contact-channels">
            <h3 className="editorial-label mb-3">Business Contact Channels</h3>
            <ul>
              {CHANNELS.map(
                ({ label, icon: Icon, value, href, external, tone }) => (
                  <li key={label}>
                    <span
                      className="contact-channel-icon"
                      style={{ background: `var(--pastel-${tone})` }}
                      aria-hidden="true"
                    >
                      <Icon size={16} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p>{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                        >
                          {value}{" "}
                          {external && (
                            <ArrowUpRight size={13} aria-hidden="true" />
                          )}
                        </a>
                      ) : (
                        <span>{value || "Not listed"}</span>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div data-reveal className="contact-form-wrap">
          <ContactForm prefill={inquiryPrefill} />
        </div>
      </div>
    </section>
  );
}
