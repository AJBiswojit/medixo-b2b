export const INDUSTRY_GROUPS = [
  { id: "people", title: "People & services" },
  { id: "commerce", title: "Commerce & experiences" },
  { id: "industrial", title: "Industrial systems" },
  { id: "infrastructure", title: "Infrastructure & utilities" },
  { id: "finance-property", title: "Finance & property" },
];

function study(name) {
  return {
    image: `/images/industry-study-${name}.webp`,
    smallImage: `/images/industry-study-${name}-520.webp`,
  };
}

// The catalogue and inquiry form share this list. Only entries with a hero
// slot join the desktop scroll scene; industry cards never imply project work.
export const INDUSTRIES = [
  {
    id: "healthcare",
    group: "people",
    title: "Healthcare & Medical",
    summary:
      "Intelligent digital platforms, clinical document retrieval, and workflow systems designed for clarity and dependability across healthcare environments.",
    image: "/images/project-medixo-health.webp",
    smallImage: "/images/project-medixo-health-520.webp",
    imagePosition: "center 54%",
    alt: "Serene contemporary healthcare environment with soft mint architectural details",
    accent: "#ACC6C1",
    solutions: [
      "Healthcare Management Applications",
      "AI Healthcare Assistants",
      "Medical Document Intelligence",
      "Medical Workflow Automation",
      "Healthcare Data Management",
    ],
  },
  {
    id: "education",
    group: "people",
    title: "Education & EdTech",
    summary:
      "Modern academic platforms enabling automated question generation, examination workflows, structured assessment, and guided learning experiences.",
    image: "/images/project-edux.webp",
    smallImage: "/images/project-edux-520.webp",
    imagePosition: "center 58%",
    alt: "Sunlit educational workspace with digital tablet and study materials",
    accent: "#E5D3C9",
    solutions: [
      "AI-Powered Learning Platforms",
      "Question Generation Systems",
      "Examination Management",
      "Student Assessment Systems",
      "Intelligent Educational Assistants",
    ],
  },
  {
    id: "retail-ecommerce",
    group: "commerce",
    title: "Retail & E-commerce",
    summary:
      "End-to-end digital storefronts paired with inventory control, catalog orchestration, AI shopping guidance, and automated customer assistance.",
    // Locally optimized Pexels photograph 9218540.
    image: "/images/industry-retail.webp",
    alt: "Minimalist retail packaging and a curated boutique display",
    accent: "#F6EAEA",
    solutions: [
      "E-commerce Platforms",
      "Product Management Systems",
      "AI Shopping Assistants",
      "Inventory Management",
      "Customer Support Automation",
    ],
  },
  {
    id: "jewellery-fashion",
    group: "commerce",
    title: "Jewellery & Fashion",
    summary:
      "Editorial digital commerce experiences, curated collection showcases, and integrated back-office systems tailored to fashion houses and jewellery brands.",
    image: "/images/project-swarnova.webp",
    imagePosition: "center 56%",
    alt: "Gold jewellery arranged on cream travertine in soft sunlight",
    accent: "#E5D3C9",
    solutions: [
      "Jewellery E-commerce Platforms",
      "Product Catalog Management",
      "Online Shopping Experiences",
      "Customer Management",
      "Inventory and Order Management",
    ],
  },
  {
    id: "human-resources",
    group: "people",
    title: "Human Resources",
    summary:
      "Smart people-operations platforms automating candidate screening, resume intelligence, structured evaluation, and internal HR administration.",
    // Locally optimized Pexels photograph 16585156.
    image: "/images/industry-people.webp",
    alt: "A team in discussion in a bright, glass-walled office",
    accent: "#DCE9D5",
    solutions: [
      "Recruitment Automation",
      "Candidate Assessment",
      "Resume Processing",
      "HR Management Systems",
      "AI-Powered Candidate Insights",
    ],
  },
  {
    id: "manufacturing",
    group: "industrial",
    title: "Manufacturing & Industrial",
    summary:
      "Real-time visual inspection, YOLO-driven object detection, operational monitoring, and automated workflows for industrial facilities.",
    ...study("manufacturing"),
    alt: "Editorial model of a sage conveyor carrying precision-machined parts",
    accent: "#DCE9D5",
    hero: { slot: "automation", label: "Manufacturing" },
    solutions: [
      "Quality Inspection",
      "Predictive Maintenance",
      "Production Monitoring",
      "Industrial Automation",
      "Computer Vision Applications",
      "Object Detection",
    ],
  },
  {
    id: "robotics",
    group: "industrial",
    title: "Robotics & Intelligent Automation",
    summary:
      "Software that connects robotic equipment, vision systems, and operational workflows, from visual recognition to repetitive task automation.",
    ...study("robotics"),
    alt: "Lavender robotic arm holding a ceramic sphere above a circular pedestal",
    accent: "#DCD5F5",
    hero: { slot: "ai", label: "Robotics" },
    spotlight: true,
    solutions: [
      "Robotics Software Integration",
      "Computer Vision",
      "Intelligent Automation",
      "Robotic Process Automation",
      "Object Detection and Tracking",
    ],
  },
  {
    id: "construction",
    group: "infrastructure",
    title: "Construction & Infrastructure",
    summary:
      "Project and site software that brings progress, field observations, and safety reporting into a shared view for construction teams.",
    ...study("construction"),
    alt: "Warm-toned architectural model of a building under construction with a slender crane",
    accent: "#F3D5C5",
    hero: { slot: "creative", label: "Construction" },
    spotlight: true,
    solutions: [
      "Construction Management Systems",
      "Project Monitoring Applications",
      "AI-Powered Site Inspection",
      "Construction Safety Monitoring",
      "Computer Vision Integration",
    ],
  },
  {
    id: "finance-fintech",
    group: "finance-property",
    title: "Finance & FinTech",
    summary:
      "Document intelligence, predictive analytics, automated reporting, and secure custom financial software.",
    ...study("finance"),
    alt: "Stacks of brass tokens with sculpted paper and lavender glass",
    accent: "#E5D3C9",
    hero: { slot: "enterprise", label: "Finance" },
    spotlight: true,
    solutions: [
      "Financial Analytics",
      "Intelligent Document Processing",
      "Financial Workflow Automation",
      "Business Intelligence",
    ],
  },
  {
    id: "real-estate",
    group: "finance-property",
    title: "Real Estate & Property Technology",
    summary:
      "Property portfolio platforms, intelligent inquiry assistants, client management, and workflow automation.",
    ...study("real-estate"),
    alt: "Cream plaster model of a contemporary residence with a landscaped courtyard",
    accent: "#E5D3C9",
    solutions: [
      "Property Portfolio Platforms",
      "Intelligent Inquiry Assistants",
      "Client Management",
      "Property Workflow Automation",
    ],
  },
  {
    id: "agriculture",
    group: "industrial",
    title: "Agriculture & AgriTech",
    summary:
      "Digital tools that combine field observations, imagery, and operational data to help agricultural teams monitor crops and plan work.",
    ...study("agriculture"),
    alt: "Miniature farmland with sculpted sage and golden crop rows",
    accent: "#F7E4B8",
    hero: { slot: "education", label: "Agriculture" },
    solutions: [
      "Smart Farming Applications",
      "Crop Monitoring",
      "Agricultural Analytics",
      "Drone-Based Image Analysis",
    ],
  },
  {
    id: "automotive",
    group: "industrial",
    title: "Automotive & Mobility",
    summary:
      "Vehicle, fleet, and inspection software for teams coordinating moving assets, maintenance workflows, and operational reporting.",
    ...study("automotive"),
    alt: "Powder-blue concept vehicle displayed on a cream oval plinth",
    accent: "#D8E9F7",
    hero: { slot: "vision", label: "Automotive" },
    solutions: [
      "Vehicle Management Systems",
      "Fleet Management",
      "Intelligent Inspection",
      "Computer Vision Applications",
    ],
  },
  {
    id: "energy",
    group: "infrastructure",
    title: "Energy & Utilities",
    summary:
      "Monitoring, analytics, and automation for teams tracking energy use and the condition of distributed infrastructure.",
    ...study("energy"),
    alt: "Miniature wind turbines and solar panels on a rounded green terrain model",
    accent: "#D6E8E3",
    hero: { slot: "healthcare", label: "Energy" },
    solutions: [
      "Energy Monitoring",
      "Predictive Analytics",
      "Infrastructure Monitoring",
      "Workflow Automation",
    ],
  },
  {
    id: "logistics",
    group: "industrial",
    title: "Logistics & Supply Chain",
    summary:
      "Operational visibility, data processing pipelines, automated tracking workflows, and computer vision systems.",
    ...study("logistics"),
    alt: "Miniature blush shipping containers and parcels arranged on a loading platform",
    accent: "#F6EAEA",
    hero: { slot: "commerce", label: "Logistics" },
    solutions: [
      "Warehouse Management",
      "Inventory Management",
      "Fleet Tracking",
      "Supply Chain Applications",
    ],
  },
  {
    id: "hospitality-travel",
    group: "commerce",
    title: "Hospitality & Travel",
    summary:
      "Booking, guest service, and operations software for hospitality and travel teams that need coordinated customer and back-office workflows.",
    ...study("hospitality"),
    alt: "Illustrated resort courtyard with a terracotta arch and a turquoise plunge pool",
    accent: "#F3D5C5",
    solutions: [
      "Booking and Reservation Systems",
      "Guest Service Assistants",
      "Travel Inventory Management",
      "Service and Demand Analytics",
    ],
  },
  {
    id: "telecommunications",
    group: "infrastructure",
    title: "Telecommunications",
    summary:
      "Data and software systems for service operations, network reporting, and automated support workflows.",
    ...study("telecommunications"),
    imagePosition: "center 44%",
    alt: "Miniature cellular tower with panel antennas and a small dish, mounted on a powder-blue base",
    accent: "#D8E9F7",
    solutions: [
      "Service Operations Portals",
      "Network Performance Analytics",
      "Customer Support Automation",
      "Knowledge Retrieval Systems",
    ],
  },
  {
    id: "media-entertainment",
    group: "commerce",
    title: "Media & Entertainment",
    summary:
      "Tools for organizing creative assets, coordinating production work, and helping audiences discover relevant content.",
    ...study("media-entertainment"),
    imagePosition: "center 62%",
    alt: "Apricot cinema camera beside a cream film reel and a curling amber filmstrip",
    accent: "#F3D5C5",
    solutions: [
      "Media Asset Management",
      "Content Discovery and Indexing",
      "Production Workflow Automation",
      "Audience Analytics",
    ],
  },
  {
    id: "professional-services",
    group: "people",
    title: "Professional Services",
    summary:
      "Enterprise RAG knowledge assistants, automated research and reporting, and bespoke client portals.",
    ...study("professional-services"),
    alt: "Open sage folio with cream papers, a brass pen, and a sea-glass paperweight",
    accent: "#D6E8E3",
    solutions: [
      "Enterprise Knowledge Assistants",
      "Research and Reporting Automation",
      "Custom Client Portals",
      "Document Intelligence",
    ],
  },
];

export const industryAnchor = (id) => `industry-${id}`;

export const ALL_INDUSTRY_OPTIONS = [
  ...INDUSTRIES.map(({ title }) => title),
  "Technology / SaaS Startup",
  "Other Business Sector",
];
