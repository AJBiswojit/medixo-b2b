import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSection from "../components/hero/HeroSection";
import AboutSection from "../components/about/AboutSection";
import ServicesSection from "../components/services/ServicesSection";
import IndustriesSection from "../components/industries/IndustriesSection";
import TechnologiesSection from "../components/technologies/TechnologiesSection";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import ProcessSection from "../components/process/ProcessSection";
import WhyChooseSection from "../components/process/WhyChooseSection";
import BusinessSolutions from "../components/solutions/BusinessSolutions";
import ContactSection from "../components/contact/ContactSection";
import { scrollToSection } from "../utils/validation";
import { refreshScrollTriggers } from "../animations/scrollAnimations";

export default function Home() {
  const [inquiryPrefill, setInquiryPrefill] = useState(null);
  const [highlightedService, setHighlightedService] = useState(null);

  const { hash, key } = useLocation();
  const mainRef = useRef(null);
  const previousLocation = useRef({ hash, key });
  const inquiryFrame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(inquiryFrame.current), []);

  // Hash links support direct arrival and normal browser history navigation.
  useEffect(() => {
    const previous = previousLocation.current;
    previousLocation.current = { hash, key };
    if (!hash && previous.key === key && previous.hash === hash) return;
    const frame = requestAnimationFrame(() => scrollToSection(hash || "home"));
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);

  // Accordions, tabs, and inquiry feedback can move later scroll chapters.
  useEffect(() => {
    let active = true;
    let timer;
    const queueRefresh = () => {
      if (!active) return;
      clearTimeout(timer);
      timer = setTimeout(refreshScrollTriggers, 90);
    };
    const observer = new ResizeObserver(queueRefresh);
    observer.observe(mainRef.current);
    document.fonts?.ready.then(queueRefresh);
    window.addEventListener("load", queueRefresh);
    return () => {
      active = false;
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("load", queueRefresh);
    };
  }, []);

  const handleInitiateInquiry = useCallback((prefillData = {}) => {
    setInquiryPrefill({
      ...prefillData,
      timestamp: Date.now(),
    });
    cancelAnimationFrame(inquiryFrame.current);
    inquiryFrame.current = requestAnimationFrame(() => {
      document.getElementById("contact")?.focus({ preventScroll: true });
      scrollToSection("contact");
    });
  }, []);

  const handleSelectServiceFromFooter = useCallback((serviceId) => {
    setHighlightedService({ id: serviceId });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202020]">
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-[#171717] focus:text-white focus:text-[13px] focus:font-medium"
      >
        Skip to main content
      </a>

      <Navbar onDiscussProject={handleInitiateInquiry} />

      <main id="main-content" tabIndex={-1} ref={mainRef} className="flex-1">
        <HeroSection onDiscussProject={handleInitiateInquiry} />
        <AboutSection />
        <ServicesSection
          highlightedService={highlightedService}
          onInquireService={handleInitiateInquiry}
        />
        <IndustriesSection onInquireIndustry={handleInitiateInquiry} />
        <TechnologiesSection />
        <PortfolioSection onInquireProject={handleInitiateInquiry} />
        <ProcessSection />
        <WhyChooseSection onDiscussProject={handleInitiateInquiry} />
        <BusinessSolutions onSelectChallengeInquiry={handleInitiateInquiry} />
        <ContactSection inquiryPrefill={inquiryPrefill} />
      </main>

      <Footer onSelectService={handleSelectServiceFromFooter} />
    </div>
  );
}
