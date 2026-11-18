// Presentation data for the one-service-at-a-time showcase. Titles, summaries,
// accents and full capability lists stay in services.js; this file adds the
// five headline capabilities shown in the showcase and the visual for each
// service. Every photograph is taken from the approved library in
// public/images/photography and is credited in docs/image-inventory.md.

const photo = (name) => `/images/photography/${name}.webp`;

export const SERVICE_SHOWCASE = {
  "ai-ml": {
    points: [
      "Predictive Analytics",
      "Deep Learning",
      "Natural Language Processing",
      "Recommendation Systems",
      "Intelligent Classification",
    ],
    image: {
      src: photo("hero-ai-infrastructure"),
      width: 480,
      height: 320,
      alt: "Rows of server racks in an AI computing facility",
    },
  },
  "gen-agentic-ai": {
    points: [
      "AI Chatbots",
      "Multi-Agent Systems",
      "LLM Applications",
      "Workflow Automation",
      "Tool-Calling Agents",
    ],
    image: {
      src: photo("hero-creative-workstation"),
      width: 480,
      height: 320,
      alt: "Creative professional working at a multi-monitor digital workstation",
    },
  },
  "rag-knowledge": {
    points: [
      "RAG Architecture",
      "Semantic Search",
      "Hybrid Search",
      "Vector Databases",
      "Knowledge Assistants",
    ],
    image: {
      src: photo("screens/edux-paper-studio"),
      width: 1280,
      height: 825,
      alt: "Document authoring interface for building structured question papers",
    },
  },
  "custom-software": {
    points: [
      "Full-Stack Development",
      "SaaS Applications",
      "E-commerce",
      "Business Applications",
      "REST APIs",
    ],
    image: {
      src: photo("screens/edux-faculty"),
      width: 1280,
      height: 825,
      alt: "Faculty teaching dashboard of a production web application",
    },
  },
  "computer-vision": {
    points: [
      "Object Detection",
      "YOLO",
      "Image Classification",
      "Video Analytics",
      "OCR",
    ],
    image: {
      src: photo("hero-vision-camera"),
      width: 480,
      height: 320,
      alt: "Optical inspection of a circuit board",
    },
  },
  "process-automation": {
    points: [
      "HR Automation",
      "Recruitment Automation",
      "Workflow Automation",
      "Intelligent Data Extraction",
    ],
    image: {
      src: photo("industry-human-resources"),
      width: 1000,
      height: 667,
      alt: "Candidate interview across a desk during a recruitment review",
    },
  },
  "data-engineering": {
    points: [
      "ETL Pipelines",
      "Data Processing",
      "Business Intelligence",
      "Predictive Analytics",
    ],
    image: {
      src: photo("hero-analytics-dashboard"),
      width: 480,
      height: 320,
      alt: "Business analytics dashboard with charts and operational metrics",
    },
  },
  "ai-consulting": {
    points: [
      "AI Strategy",
      "LLM Integration",
      "MCP Integration",
      "API Integration",
      "AI Optimization",
    ],
    image: {
      src: photo("industry-professional-services"),
      width: 1000,
      height: 667,
      alt: "Advisers reviewing documents together in a professional consulting session",
    },
  },
};
