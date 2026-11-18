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

// Source order is also the reading order of the stacked editorial gallery.
export const HERO_CARDS = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    target: "services",
    tone: "lavender",
    image: "/images/hero-lavender.webp",
    width: 490,
    height: 480,
    compact: true,
    tilt: -8,
  },
  {
    id: "healthcare",
    title: "Healthcare",
    target: "industries",
    tone: "mint",
    compact: true,
    tilt: 8,
  },
  {
    id: "education",
    title: "Education",
    target: "industries",
    tone: "butter",
    tablet: true,
    tilt: -7,
  },
  {
    id: "commerce",
    title: "E-commerce",
    target: "our-work",
    tone: "blush",
    compact: true,
    tilt: 7,
  },
  {
    id: "vision",
    title: "Computer Vision",
    target: "services",
    tone: "powder",
    image: "/images/hero-optics.webp",
    width: 420,
    height: 235,
    tablet: true,
    tilt: 6,
  },
  {
    id: "creative",
    title: "Generative AI",
    target: "services",
    tone: "peach",
    image: "/images/hero-creative.webp",
    width: 400,
    height: 370,
    tilt: 10,
  },
  {
    id: "automation",
    title: "Automation",
    target: "services",
    tone: "sage",
    tilt: 9,
  },
  {
    id: "enterprise",
    title: "Enterprise Software",
    target: "technologies",
    tone: "beige",
    compact: true,
    tilt: -8,
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
