import { editorialPhoto } from "./imagery";

export const INDUSTRY_GROUPS = [
  { id: "people", title: "People & services" },
  { id: "commerce", title: "Commerce & experiences" },
  { id: "industrial", title: "Industrial systems" },
  { id: "infrastructure", title: "Infrastructure & utilities" },
  { id: "finance-property", title: "Finance & property" },
];

const cover = (id, position) => editorialPhoto(`industry-${id}`, { position });

// The catalogue and inquiry form share this list. Industry cards never imply
// project work.
export const INDUSTRIES = [
  {
    id: "healthcare",
    group: "people",
    title: "Healthcare & Medical",
    summary:
      "Intelligent digital platforms, clinical document retrieval, and workflow systems designed for clarity and dependability across healthcare environments.",
    ...cover("healthcare", "center 48%"),
    alt: "Diagnostic imaging scanner and patient table in a hospital room",
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
    ...cover("education", "center 47%"),
    alt: "Teacher leading a class with laptops open on the desks",
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
    ...cover("retail-ecommerce", "center 54%"),
    alt: "Clothing racks and a central display in a boutique",
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
    ...cover("jewellery-fashion", "center 58%"),
    alt: "Gold earrings, ring and bracelet displayed together on a pale stand",
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
    ...cover("human-resources", "center 40%"),
    alt: "Two professionals talking across a desk during an interview",
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
    ...cover("manufacturing", "center 46%"),
    alt: "Workers assembling equipment along a factory production line",
    accent: "#DCE9D5",
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
    ...cover("robotics", "center 54%"),
    alt: "Yellow industrial robotic arm inside a production cell",
    accent: "#DCD5F5",
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
    ...cover("construction", "center 47%"),
    alt: "Crane beside a building frame and scaffolding under construction",
    accent: "#F3D5C5",
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
    ...cover("finance-fintech", "center 43%"),
    alt: "Financial charts displayed across a workstation and tablet",
    accent: "#E5D3C9",
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
    ...cover("real-estate", "center 47%"),
    alt: "Contemporary house with a brick driveway and trees",
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
    ...cover("agriculture", "center 55%"),
    alt: "Aerial view of long crop rows and farm machinery in a field",
    accent: "#F7E4B8",
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
    ...cover("automotive", "center 55%"),
    alt: "Electric car connected to a charging station",
    accent: "#D8E9F7",
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
    ...cover("energy", "center 52%"),
    alt: "Wind turbines standing across green hills",
    accent: "#D6E8E3",
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
    ...cover("logistics", "center 58%"),
    alt: "Forklift and worker between tall racks in a distribution warehouse",
    accent: "#F6EAEA",
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
    ...cover("hospitality-travel", "center 44%"),
    alt: "Uniformed receptionist standing behind a hotel check-in desk",
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
    ...cover("telecommunications", "62% 36%"),
    alt: "Lattice telecommunications tower with antennas and dishes against the sky",
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
    ...cover("media-entertainment", "center 48%"),
    alt: "Cinema camera with a large lens and mounted production accessories",
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
    ...cover("professional-services", "center 41%"),
    alt: "Advisers reviewing documents together at a table",
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
