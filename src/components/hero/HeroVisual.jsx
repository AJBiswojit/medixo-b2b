import React from "react";
import { scrollToSection } from "../../utils/validation";

const FLANK_CARDS = [
  {
    id: "ai-sculpture",
    title: "Generative & Agentic AI",
    category: "Intelligence",
    targetSection: "services",
    image: "/images/hero-ai-sculpture.jpg",
    alt: "Minimalist sculptural porcelain and frosted glass forms symbolizing generative and agentic AI",
    accent: "#E5D3C9",
    wrapperClass:
      "hidden lg:block absolute top-[120px] xl:top-[116px] left-[1.75%] xl:left-[3.25%] w-[138px] xl:w-[172px] -rotate-[7deg] z-10",
    aspectClass: "aspect-[3/4]",
    fromX: -54,
    fromY: 26,
    fromRotate: -7,
    floatAmp: 10,
    floatRot: 1.3,
    floatDur: 4.6,
    depth: 14,
  },
  {
    id: "healthcare-ai",
    title: "Healthcare Systems",
    category: "Medical AI",
    targetSection: "industries",
    image: "/images/hero-healthcare.jpg",
    alt: "Precision laboratory glass vessels on muted mint stone symbolizing intelligent healthcare applications",
    accent: "#ACC6C1",
    wrapperClass:
      "hidden lg:block absolute top-[128px] xl:top-[122px] right-[1.75%] xl:right-[3.25%] w-[138px] xl:w-[172px] rotate-[6.5deg] z-10",
    aspectClass: "aspect-[3/4]",
    fromX: 56,
    fromY: 26,
    fromRotate: 7,
    floatAmp: 11,
    floatRot: -1.2,
    floatDur: 4.9,
    depth: -14,
  },
];

const ARC_CARDS = [
  {
    id: "fashion-commerce",
    title: "Fashion & Jewellery",
    category: "Digital Commerce",
    targetSection: "our-work",
    image: "/images/hero-fashion.jpg",
    alt: "Draped silk and woven textiles on warm travertine symbolizing digital fashion and retail platforms",
    accent: "#F6EAEA",
    transformClass: "-rotate-[5.5deg] translate-y-3 hover:rotate-[-2deg] hover:z-30",
    fromX: -40,
    fromY: 48,
    fromRotate: -5,
    floatAmp: 8,
    floatRot: 1.0,
    floatDur: 4.4,
    depth: 10,
  },
  {
    id: "computer-vision",
    title: "Vision & Deep Learning",
    category: "Optical AI",
    targetSection: "services",
    image: "/images/hero-vision.jpg",
    alt: "Precision optical glass lenses casting soft pastel light refractions symbolizing computer vision",
    accent: "#E5D3C9",
    transformClass: "-translate-y-2 z-20 scale-[1.03] hover:scale-[1.05]",
    fromX: 0,
    fromY: 54,
    fromRotate: 2,
    floatAmp: 9,
    floatRot: -0.7,
    floatDur: 5.0,
    depth: 16,
  },
  {
    id: "software-architecture",
    title: "Enterprise Engineering",
    category: "Architecture",
    targetSection: "technologies",
    image: "/images/hero-architecture.jpg",
    alt: "Curved white contemporary architectural arches against a pale sage sky symbolizing scalable software engineering",
    accent: "#ACC6C1",
    transformClass: "rotate-[5.5deg] translate-y-3 hover:rotate-[2deg] hover:z-30",
    fromX: 40,
    fromY: 48,
    fromRotate: 5,
    floatAmp: 8,
    floatRot: -1.0,
    floatDur: 4.7,
    depth: -10,
  },
];

const MOBILE_GALLERY = [
  {
    id: "m-ai",
    label: "Generative AI",
    targetSection: "services",
    image: "/images/hero-ai-sculpture.jpg",
    alt: "Sculptural porcelain and glass artwork representing artificial intelligence",
    accent: "#E5D3C9",
    tilt: "-rotate-[2.5deg]",
  },
  {
    id: "m-health",
    label: "Healthcare",
    targetSection: "industries",
    image: "/images/hero-healthcare.jpg",
    alt: "Minimalist glass composition on muted mint stone representing healthcare solutions",
    accent: "#ACC6C1",
    tilt: "rotate-[2.5deg] translate-y-3",
  },
  {
    id: "m-commerce",
    label: "Commerce",
    targetSection: "our-work",
    image: "/images/hero-fashion.jpg",
    alt: "Organic draped silk textiles representing fashion and retail commerce",
    accent: "#F6EAEA",
    tilt: "rotate-[1.8deg]",
  },
  {
    id: "m-arch",
    label: "Engineering",
    targetSection: "technologies",
    image: "/images/hero-architecture.jpg",
    alt: "Minimalist white curved architecture symbolizing scalable software systems",
    accent: "#ACC6C1",
    tilt: "-rotate-[1.8deg] translate-y-3",
  },
];

export function HeroFlankingVisuals() {
  return (
    <>
      {/* Subtle pastel ambient backdrop shapes (quiet, non-distracting) */}
      <div
        data-hero-accent
        aria-hidden="true"
        className="hidden lg:block absolute top-[96px] left-[0.8%] w-[165px] h-[165px] rounded-full bg-[#F6EAEA] opacity-85 pointer-events-none"
      />
      <div
        data-hero-accent
        aria-hidden="true"
        className="hidden lg:block absolute top-[248px] right-[1%] w-[145px] h-[145px] rounded-full bg-[#ACC6C1]/30 pointer-events-none"
      />

      {FLANK_CARDS.map((card) => (
        <div
          key={card.id}
          data-hero-card
          data-from-x={card.fromX}
          data-from-y={card.fromY}
          data-from-rotate={card.fromRotate}
          data-float-amp={card.floatAmp}
          data-float-rot={card.floatRot}
          data-float-dur={card.floatDur}
          data-parallax-depth={card.depth}
          className={`hero-float-card ${card.wrapperClass}`}
        >
          <button
            type="button"
            onClick={() => scrollToSection(card.targetSection)}
            aria-label={`Explore ${card.title}`}
            className="group block w-full text-left bg-white p-2 rounded-[20px] border border-[#EAEAEA] shadow-editorial-lg transition-transform duration-500 hover:scale-[1.03] cursor-pointer"
          >
            <div
              className={`w-full ${card.aspectClass} rounded-[14px] overflow-hidden bg-[#F5F5F3]`}
            >
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pt-2.5 pb-1 px-1 flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-[#202020] truncate">
                {card.title}
              </span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: card.accent }}
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      ))}
    </>
  );
}

export function HeroBottomGallery() {
  return (
    <div className="relative mt-12 sm:mt-14 lg:mt-16">
      {/* Desktop Layered Editorial Arc */}
      <div className="hidden lg:flex items-center justify-center relative max-w-[820px] xl:max-w-[900px] mx-auto pt-2 pb-4">
        {/* Soft warm beige editorial plinth accent */}
        <div
          data-hero-accent
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[78%] h-[110px] rounded-full bg-[#E5D3C9]/30 pointer-events-none"
        />

        <div className="grid grid-cols-3 gap-0 items-center w-full relative z-10">
          {ARC_CARDS.map((card, index) => (
            <div
              key={card.id}
              data-hero-card
              data-from-x={card.fromX}
              data-from-y={card.fromY}
              data-from-rotate={card.fromRotate}
              data-float-amp={card.floatAmp}
              data-float-rot={card.floatRot}
              data-float-dur={card.floatDur}
              data-parallax-depth={card.depth}
              className={[
                "hero-float-card transition-all duration-500",
                index === 0 ? "mr-[-14px]" : "",
                index === 2 ? "ml-[-14px]" : "",
                card.transformClass,
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => scrollToSection(card.targetSection)}
                aria-label={`Explore ${card.title}`}
                className="group block w-full text-left bg-white p-2.5 rounded-[22px] border border-[#EAEAEA] shadow-editorial-lg cursor-pointer"
              >
                <div className="w-full aspect-[16/11] rounded-[15px] overflow-hidden bg-[#F5F5F3]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-2.5 pb-1 px-1.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#777777]">
                      {card.category}
                    </p>
                    <p className="text-[12.5px] font-semibold text-[#202020] leading-snug">
                      {card.title}
                    </p>
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: card.accent }}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet & Mobile Reorganized Curated Composition */}
      <div className="lg:hidden max-w-xl mx-auto px-1 pb-4">
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
          {MOBILE_GALLERY.map((item) => (
            <div
              key={item.id}
              data-hero-mobile-card
              className={`transition-transform duration-300 ${item.tilt}`}
            >
              <button
                type="button"
                onClick={() => scrollToSection(item.targetSection)}
                aria-label={`Explore ${item.label}`}
                className="block w-full text-left bg-white p-2 rounded-[18px] border border-[#EAEAEA] shadow-editorial cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#F5F5F3]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 pb-0.5 px-1 flex items-center justify-between">
                  <span className="text-[11.5px] font-medium text-[#202020]">
                    {item.label}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.accent }}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
