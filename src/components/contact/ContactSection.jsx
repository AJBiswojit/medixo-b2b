import React from "react";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Share2,
  ArrowUpRight,
} from "lucide-react";
import { CONTACT_CONFIG } from "../../utils/inquiryService";
import { useGsap } from "../../hooks/useGsap";
import { revealStagger } from "../../animations/scrollAnimations";
import SectionHeading from "../common/SectionHeading";
import ContactForm from "./ContactForm";

export default function ContactSection({ inquiryPrefill }) {
  const sectionRef = useGsap((scope) => {
    revealStagger("[data-reveal]", scope, { stagger: 0.08 });
  }, []);

  const channels = [
    {
      label: "Official Business Email",
      icon: Mail,
      value: CONTACT_CONFIG.businessEmail,
      href: CONTACT_CONFIG.businessEmail
        ? `mailto:${CONTACT_CONFIG.businessEmail}`
        : "",
      placeholder: "Configurable via VITE_CONTACT_EMAIL",
      accent: "#E5D3C9",
    },
    {
      label: "Contact Number",
      icon: Phone,
      value: CONTACT_CONFIG.contactNumber,
      href: CONTACT_CONFIG.contactNumber
        ? `tel:${CONTACT_CONFIG.contactNumber}`
        : "",
      placeholder: "Configurable via VITE_CONTACT_PHONE",
      accent: "#ACC6C1",
    },
    {
      label: "LinkedIn",
      icon: Globe,
      value: CONTACT_CONFIG.linkedInUrl ? "Official Medixo AI Page" : "",
      href: CONTACT_CONFIG.linkedInUrl,
      external: true,
      placeholder: "Configurable via VITE_LINKEDIN_URL",
      accent: "#F6EAEA",
    },
    {
      label: "Company Address",
      icon: MapPin,
      value: CONTACT_CONFIG.companyAddress,
      href: "",
      placeholder: "Configurable via VITE_COMPANY_ADDRESS",
      accent: "#F5F5F3",
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
      placeholder: "Configurable via VITE_GITHUB_URL / VITE_SOCIAL_X_URL",
      accent: "#E5D3C9",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Corporate Heading & Configurable Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div id="contact-heading">
              <SectionHeading
                eyebrow="Contact & Project Inquiry"
                title="Let's Build Something Intelligent Together."
                accentColor="#ACC6C1"
              />
              <div
                data-reveal
                className="mt-5 space-y-3 text-[15.5px] leading-[1.72] text-[#666666]"
              >
                <p>
                  Have an idea, a business challenge, or an upcoming technology
                  project?
                </p>
                <p>
                  Let&apos;s discuss how Medixo AI can help transform your
                  requirements into scalable digital solutions.
                </p>
              </div>
            </div>

            {/* Configurable Corporate Contact Details */}
            <div
              id="contact-channels"
              data-reveal
              className="rounded-[24px] bg-[#F5F5F3] border border-[#EAEAEA] p-6 sm:p-7"
            >
              <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#777777] mb-5">
                Business Contact Channels
              </h3>

              <ul className="divide-y divide-[#E4E4E0]">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <li
                      key={channel.label}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5"
                    >
                      <span
                        className="w-9 h-9 rounded-[11px] border border-[#E4E4E0] flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: channel.accent }}
                        aria-hidden="true"
                      >
                        <Icon
                          className="w-4 h-4 text-[#202020]"
                          strokeWidth={1.75}
                        />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-semibold text-[#202020]">
                          {channel.label}
                        </p>
                        {channel.value ? (
                          channel.href ? (
                            <a
                              href={channel.href}
                              target={channel.external ? "_blank" : undefined}
                              rel={
                                channel.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="mt-0.5 inline-flex items-center gap-1 text-[13.5px] text-[#4A4A4A] hover:text-[#202020] break-all"
                            >
                              <span>{channel.value}</span>
                              {channel.external && (
                                <ArrowUpRight
                                  className="w-3.5 h-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                            </a>
                          ) : (
                            <p className="mt-0.5 text-[13.5px] text-[#4A4A4A]">
                              {channel.value}
                            </p>
                          )
                        ) : (
                          <p className="mt-0.5 text-[12px] text-[#777777]">
                            {channel.placeholder}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Interactive Inquiry Form */}
          <div data-reveal className="lg:col-span-7">
            <ContactForm prefill={inquiryPrefill} />
          </div>
        </div>
      </div>
    </section>
  );
}
