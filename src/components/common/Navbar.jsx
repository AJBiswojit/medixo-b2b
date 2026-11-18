import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_ITEMS } from "../../data/navigation";
import { scrollToSection } from "../../utils/validation";
import Button from "./Button";
import BrandMark from "./BrandMark";

export default function Navbar({ onDiscussProject }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const anchorSections = [
      ...document.querySelectorAll("main > section[id]"),
    ].reverse();
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 16);
      const marker = Math.min(220, window.innerHeight * 0.32);
      const section = anchorSections.find(
        (el) => el.getBoundingClientRect().top <= marker,
      );
      setActiveSection(section?.id || "home");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => {
      if (desktop.matches) drawerRef.current?.close();
    };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    drawerRef.current?.close();
    setMobileMenuOpen(false);
  };

  const handlePrimaryCta = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    closeMenu();
    if (onDiscussProject) onDiscussProject({});
    else scrollToSection("contact");
  };

  return (
    <>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
        <div className="editorial-container site-header-inner">
          <Link
            to="#home"
            className="brand-link"
            aria-label="Medixo AI — Back to home"
          >
            <BrandMark />
            <span>{BRAND.name}</span>
          </Link>

          <nav aria-label="Primary navigation" className="site-navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-navigation-cta">
            <Button
              href="#contact"
              size="sm"
              icon={ArrowUpRight}
              onClick={handlePrimaryCta}
            >
              Discuss Your Project
            </Button>
          </div>

          <button
            type="button"
            onClick={() => {
              drawerRef.current?.showModal();
              setMobileMenuOpen(true);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label="Open navigation menu"
            className="site-menu-trigger icon-button"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <dialog
        id="mobile-navigation-drawer"
        ref={drawerRef}
        aria-label="Mobile navigation"
        className="site-drawer"
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="editorial-container py-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#e8e6e1]">
            <span className="editorial-label">Explore Medixo AI</span>
            <button
              type="button"
              className="icon-button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              autoFocus
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
          <nav
            aria-label="Mobile navigation links"
            className="divide-y divide-[#e8e6e1]"
          >
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.id}
                to={item.href}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
                onClick={closeMenu}
                className="flex items-center justify-between gap-3 py-3.5"
              >
                <span className="flex items-baseline gap-4">
                  <span className="editorial-label">0{index + 1}</span>
                  <span className="font-display text-2xl">{item.label}</span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="pt-6 mt-2 border-t border-[#e8e6e1] space-y-4">
            <p className="text-[13px] text-[var(--text-secondary)]">
              {BRAND.tagline}
            </p>
            <Button
              href="#contact"
              icon={ArrowUpRight}
              onClick={handlePrimaryCta}
            >
              Discuss Your Project
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
