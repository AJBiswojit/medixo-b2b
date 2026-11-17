import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_ITEMS } from "../../data/navigation";
import { scrollToSection } from "../../utils/validation";
import Button from "./Button";

export default function Navbar({ onDiscussProject }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compact sticky state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section across all anchored sections
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.45],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keyboard Escape + body scroll lock for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (event, itemId) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(itemId);
    scrollToSection(itemId);
  };

  const handlePrimaryCta = (event) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    if (onDiscussProject) {
      onDiscussProject({});
    } else {
      scrollToSection("contact");
    }
  };

  return (
    <>
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/92 backdrop-blur-md border-b border-[#EAEAEA] py-3"
          : "bg-white/75 backdrop-blur-sm border-b border-transparent py-4",
      ].join(" ")}
    >
      <div className="editorial-container flex items-center justify-between gap-4">
        {/* Brand Monogram & Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="inline-flex items-center gap-2.5 group shrink-0"
          aria-label="Medixo AI — Back to home"
        >
          <span
            className="w-8 h-8 rounded-[9px] bg-[#171717] flex items-center justify-center relative transition-transform duration-300 group-hover:scale-[1.03]"
            aria-hidden="true"
          >
            <span className="text-white text-[13px] font-bold tracking-tight leading-none">
              M
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ACC6C1] absolute top-1.5 right-1.5" />
          </span>
          <span className="text-[14.5px] font-bold tracking-[0.14em] text-[#202020] uppercase">
            {BRAND.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative px-3 py-1.5 text-[13.5px] font-medium transition-colors duration-200 rounded-full",
                  isActive
                    ? "text-[#202020]"
                    : "text-[#777777] hover:text-[#202020]",
                ].join(" ")}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[3px] rounded-full transition-all duration-300 bg-[#202020]",
                    isActive ? "w-3.5 opacity-100" : "w-0 opacity-0",
                  ].join(" ")}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop Primary CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <Button
            href="#contact"
            size="sm"
            variant="primary"
            icon={ArrowUpRight}
            onClick={handlePrimaryCta}
          >
            Discuss Your Project
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#EAEAEA] bg-white text-[#202020] hover:bg-[#F5F5F3] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

    </header>

      {/* Mobile Navigation Drawer (rendered outside blurred header for full-viewport coverage) */}
      <div
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "lg:hidden fixed inset-x-0 top-[64px] bottom-0 bg-white z-50 transition-all duration-300 overflow-y-auto",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <div className="editorial-container py-8 flex flex-col justify-between min-h-[calc(100dvh-64px)]">
          <nav aria-label="Mobile navigation links" className="divide-y divide-[#EAEAEA]">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="flex items-center justify-between py-4 group"
                >
                  <div className="flex items-baseline gap-3.5">
                    <span className="text-[11px] font-medium tracking-[0.14em] text-[#777777]">
                      0{idx + 1}
                    </span>
                    <span
                      className={[
                        "font-display text-[1.65rem] leading-tight transition-colors",
                        isActive ? "text-[#202020]" : "text-[#555555] group-hover:text-[#202020]",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#ACC6C1]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="pt-8 mt-6 border-t border-[#EAEAEA] space-y-4">
            <p className="text-[13px] text-[#777777] leading-relaxed">
              {BRAND.tagline}
            </p>
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              icon={ArrowUpRight}
              onClick={handlePrimaryCta}
              className="w-full"
            >
              Discuss Your Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
