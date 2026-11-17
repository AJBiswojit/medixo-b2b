export const BRAND = {
  name: "MEDIXO AI",
  tagline: "Building Intelligent Solutions. Engineering the Future.",
  copyright: "© 2026 Medixo AI. All Rights Reserved.",
};

export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "industries", label: "Industries", href: "#industries" },
  { id: "technologies", label: "Technologies", href: "#technologies" },
  { id: "our-work", label: "Our Work", href: "#our-work" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const HERO_FLOATING_CARDS = [
  {
    id: "ai-intelligence",
    title: "Generative & Agentic AI",
    domain: "Intelligence",
    image: "/images/hero-ai-sculpture.jpg",
    alt: "Minimalist sculptural porcelain and glass forms representing generative artificial intelligence",
    accent: "#E5D3C9",
    // Upper-left editorial floating card
    positionClass:
      "top-[11%] left-[1.5%] xl:left-[3%] w-[150px] xl:w-[178px] aspect-[4/5] -rotate-[7deg]",
    fromX: -56,
    fromY: 28,
    fromRotate: -6,
    floatAmp: 10,
    floatRot: 1.3,
    floatDur: 4.5,
  },
  {
    id: "healthcare-systems",
    title: "Healthcare Intelligence",
    domain: "Medical AI",
    image: "/images/hero-healthcare.jpg",
    alt: "Precision laboratory glass vessels on a muted mint stone surface representing healthcare technology",
    accent: "#ACC6C1",
    // Upper-right editorial floating card
    positionClass:
      "top-[10%] right-[1.5%] xl:right-[3%] w-[152px] xl:w-[180px] aspect-[4/5] rotate-[6.5deg]",
    fromX: 58,
    fromY: 24,
    fromRotate: 6,
    floatAmp: 11,
    floatRot: -1.2,
    floatDur: 4.8,
  },
  {
    id: "digital-commerce",
    title: "Fashion & Commerce",
    domain: "Digital Retail",
    image: "/images/hero-fashion.jpg",
    alt: "Draped silk and linen textiles over warm travertine representing digital fashion and retail commerce",
    accent: "#F6EAEA",
    // Lower-left arc card
    positionClass:
      "bottom-[8%] left-[4%] xl:left-[6.5%] w-[162px] xl:w-[192px] aspect-[5/4] rotate-[4.5deg]",
    fromX: -48,
    fromY: 52,
    fromRotate: 5,
    floatAmp: 9,
    floatRot: -1.1,
    floatDur: 4.2,
  },
  {
    id: "vision-systems",
    title: "Computer Vision",
    domain: "Optical AI",
    image: "/images/hero-vision.jpg",
    alt: "Optical crystal lenses casting subtle pastel light refractions representing computer vision and machine learning",
    accent: "#F5F5F3",
    // Bottom-center-left arc bridge card (shown on wide screens in lower visual gallery)
    positionClass:
      "bottom-[3%] left-1/2 -translate-x-1/2 w-[184px] xl:w-[214px] aspect-[16/10] -rotate-[1.5deg]",
    fromX: 0,
    fromY: 60,
    fromRotate: -3,
    floatAmp: 8,
    floatRot: 0.8,
    floatDur: 5.1,
  },
  {
    id: "scalable-architecture",
    title: "Software Architecture",
    domain: "Engineering",
    image: "/images/hero-architecture.jpg",
    alt: "Curved white modern architectural arches against a pale sage sky symbolizing scalable software systems",
    accent: "#ACC6C1",
    // Lower-right arc card
    positionClass:
      "bottom-[8%] right-[4%] xl:right-[6.5%] w-[162px] xl:w-[192px] aspect-[5/4] -rotate-[5deg]",
    fromX: 50,
    fromY: 50,
    fromRotate: -5,
    floatAmp: 10,
    floatRot: 1.2,
    floatDur: 4.6,
  },
];

export const CORE_PRINCIPLES = [
  {
    number: "01",
    title: "Innovation-Driven Development",
    summary:
      "Applying practical advances in AI, automation, and software engineering to address concrete operational needs.",
  },
  {
    number: "02",
    title: "Scalable Architecture",
    summary:
      "Designing modular systems built to handle evolving workflows, expanding datasets, and long-term organizational growth.",
  },
  {
    number: "03",
    title: "Security-Focused Engineering",
    summary:
      "Embedding data protection, structured access controls, and validation discipline into every layer of delivery.",
  },
  {
    number: "04",
    title: "Client-Centric Solutions",
    summary:
      "Aligning every technical decision with your specific business model, users, and operational environment.",
  },
  {
    number: "05",
    title: "Continuous Learning and Improvement",
    summary:
      "Refining models, architectures, and engineering practices alongside emerging frameworks and business feedback.",
  },
  {
    number: "06",
    title: "Long-Term Business Value",
    summary:
      "Prioritizing maintainability, clarity, and dependable performance well beyond initial deployment.",
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: "Business-Oriented Engineering",
    description:
      "Technology choices are grounded in real operational workflows, clarity of purpose, and measurable utility.",
    accent: "#E5D3C9",
  },
  {
    title: "AI-First Development Approach",
    description:
      "Native integration of LLMs, RAG pipelines, agentic orchestration, machine learning, and vision models where they add value.",
    accent: "#ACC6C1",
  },
  {
    title: "Scalable and Maintainable Architecture",
    description:
      "Clean, modular codebases and resilient service boundaries prepared for future capabilities and integrations.",
    accent: "#F6EAEA",
  },
  {
    title: "Security-Focused Applications",
    description:
      "Thoughtful handling of enterprise documents, application permissions, API authentication, and quality assurance.",
    accent: "#F5F5F3",
  },
  {
    title: "Customized Technology Solutions",
    description:
      "Purpose-engineered platforms crafted around your exact domain requirements rather than rigid off-the-shelf templates.",
    accent: "#ACC6C1",
  },
  {
    title: "Modern Development Practices",
    description:
      "Structured software engineering lifecycles, containerized workflows, version control discipline, and reliable API design.",
    accent: "#E5D3C9",
  },
  {
    title: "Continuous Innovation",
    description:
      "Ongoing adoption of modern generative frameworks, retrieval strategies, and intelligent automation patterns.",
    accent: "#F5F5F3",
  },
  {
    title: "Long-Term Technical Support",
    description:
      "Sustained partnership after launch to optimize performance, evolve capabilities, and keep systems dependable.",
    accent: "#F6EAEA",
  },
];

export const FOOTER_COLUMNS = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Our Projects", href: "#our-work" },
  ],
  technologies: [
    {
      label: "Artificial Intelligence",
      href: "#services",
      serviceId: "ai-ml",
    },
    {
      label: "Generative AI",
      href: "#services",
      serviceId: "gen-agentic-ai",
    },
    {
      label: "Software Development",
      href: "#services",
      serviceId: "custom-software",
    },
    {
      label: "Computer Vision",
      href: "#services",
      serviceId: "computer-vision",
    },
  ],
};
