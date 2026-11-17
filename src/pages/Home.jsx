import React, { useCallback, useEffect, useState } from "react";
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
  const [highlightedServiceId, setHighlightedServiceId] = useState(null);

  // Refresh ScrollTrigger calculations cleanly after fonts and images settle
  useEffect(() => {
    const handleLoad = () => {
      refreshScrollTriggers();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        refreshScrollTriggers();
      });
    }

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const handleInitiateInquiry = useCallback((prefillData = {}) => {
    setInquiryPrefill({
      ...prefillData,
      timestamp: Date.now(),
    });
    scrollToSection("contact");
  }, []);

  const handleSelectServiceFromFooter = useCallback((serviceId) => {
    setHighlightedServiceId(serviceId);
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

      <main id="main-content" className="flex-1">
        <HeroSection onDiscussProject={handleInitiateInquiry} />
        <AboutSection />
        <ServicesSection
          highlightedServiceId={highlightedServiceId}
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
