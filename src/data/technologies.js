export const TECHNOLOGY_CATEGORIES = [
  {
    id: "languages",
    label: "Programming Languages",
    shortLabel: "Languages",
    description:
      "Core engineering languages powering AI pipelines, enterprise backends, relational querying, and responsive applications.",
    accent: "#E5D3C9",
    items: [
      {
        name: "Python",
        role: "AI, ML & Backend",
        iconUrl: "/marks/python.svg",
        monogram: "Py",
      },
      {
        name: "Java",
        role: "Enterprise Systems",
        iconUrl: "/marks/openjdk.svg",
        monogram: "Jv",
      },
      {
        name: "JavaScript",
        role: "Web Engineering",
        iconUrl: "/marks/javascript.svg",
        monogram: "JS",
      },
      {
        name: "TypeScript",
        role: "Typed Applications",
        iconUrl: "/marks/typescript.svg",
        monogram: "TS",
      },
      {
        name: "SQL",
        role: "Relational Data",
        iconUrl: "",
        monogram: "SQL",
      },
    ],
  },
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    shortLabel: "AI & ML",
    description:
      "Production libraries for deep learning, classical machine learning, real-time object detection, and visual perception.",
    accent: "#DCE9D5",
    items: [
      {
        name: "TensorFlow",
        role: "Deep Learning",
        iconUrl: "/marks/tensorflow.svg",
        monogram: "TF",
      },
      {
        name: "PyTorch",
        role: "Neural Networks",
        iconUrl: "/marks/pytorch.svg",
        monogram: "PT",
      },
      {
        name: "Scikit-learn",
        role: "Predictive Modeling",
        iconUrl: "/marks/scikitlearn.svg",
        monogram: "SK",
      },
      {
        name: "OpenCV",
        role: "Image Processing",
        iconUrl: "/marks/opencv.svg",
        monogram: "CV",
      },
      {
        name: "YOLO",
        role: "Object Detection",
        iconUrl: "/marks/ultralytics.svg",
        monogram: "YL",
      },
      {
        name: "Hugging Face",
        role: "Transformers & Models",
        iconUrl: "/marks/huggingface.svg",
        monogram: "HF",
      },
    ],
  },
  {
    id: "genai-llm",
    label: "Generative AI & LLM Frameworks",
    shortLabel: "Generative AI",
    description:
      "Orchestration frameworks, agentic graphs, retrieval architectures, model context protocols, and frontier LLM integrations.",
    accent: "#DCD5F5",
    items: [
      {
        name: "LangChain",
        role: "LLM Orchestration",
        iconUrl: "/marks/langchain.svg",
        monogram: "LC",
      },
      {
        name: "LangGraph",
        role: "Stateful Agents",
        iconUrl: "/marks/langgraph.svg",
        monogram: "LG",
      },
      {
        name: "CrewAI",
        role: "Multi-Agent Workflows",
        iconUrl: "/marks/crewai.svg",
        monogram: "CA",
      },
      {
        name: "MCP",
        role: "Model Context Protocol",
        iconUrl: "/marks/mcp.svg",
        monogram: "MCP",
      },
      {
        name: "RAG",
        role: "Knowledge Retrieval",
        iconUrl: "",
        monogram: "RAG",
      },
      {
        name: "OpenAI",
        role: "LLM APIs",
        iconUrl: "/marks/openai.svg",
        monogram: "OA",
      },
      {
        name: "Anthropic Claude",
        role: "Reasoning Models",
        iconUrl: "/marks/claude.svg",
        monogram: "AC",
      },
      {
        name: "Google Gemini",
        role: "Multimodal LLMs",
        iconUrl: "/marks/gemini.svg",
        monogram: "GM",
      },
      {
        name: "Groq",
        role: "Low-Latency Inference",
        iconUrl: "/marks/groq.svg",
        monogram: "GQ",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Technologies",
    shortLabel: "Backend",
    description:
      "High-throughput service frameworks, RESTful interfaces, and real-time communication layers built for reliability.",
    accent: "#F7E4B8",
    items: [
      {
        name: "FastAPI",
        role: "Async Python APIs",
        iconUrl: "/marks/fastapi.svg",
        monogram: "FA",
      },
      {
        name: "Django",
        role: "Full-Featured Backend",
        iconUrl: "/marks/django.svg",
        monogram: "DJ",
      },
      {
        name: "Spring Boot",
        role: "Java Microservices",
        iconUrl: "/marks/springboot.svg",
        monogram: "SB",
      },
      {
        name: "REST APIs",
        role: "Service Integration",
        iconUrl: "",
        monogram: "API",
      },
      {
        name: "WebSockets",
        role: "Real-Time Streams",
        iconUrl: "",
        monogram: "WS",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend Technologies",
    shortLabel: "Frontend",
    description:
      "Modern interface technologies delivering accessible, responsive, and refined web experiences across every device.",
    accent: "#D8E9F7",
    items: [
      {
        name: "React.js",
        role: "Component Interfaces",
        iconUrl: "/marks/react.svg",
        monogram: "Re",
      },
      {
        name: "Next.js",
        role: "Web Applications",
        iconUrl: "/marks/nextdotjs.svg",
        monogram: "Nx",
      },
      {
        name: "HTML5",
        role: "Semantic Markup",
        iconUrl: "/marks/html5.svg",
        monogram: "H5",
      },
      {
        name: "CSS3",
        role: "Visual Architecture",
        iconUrl: "/marks/css.svg",
        monogram: "C3",
      },
      {
        name: "Tailwind CSS",
        role: "Design Systems",
        iconUrl: "/marks/tailwindcss.svg",
        monogram: "TW",
      },
    ],
  },
  {
    id: "databases",
    label: "Databases & Storage",
    shortLabel: "Databases",
    description:
      "Relational stores, document engines, in-memory caches, and vector indexing layers supporting hybrid search and analytics.",
    accent: "#ACC6C1",
    items: [
      {
        name: "PostgreSQL",
        role: "Relational Database",
        iconUrl: "/marks/postgresql.svg",
        monogram: "PG",
      },
      {
        name: "MySQL",
        role: "Transactional SQL",
        iconUrl: "/marks/mysql.svg",
        monogram: "MY",
      },
      {
        name: "MongoDB",
        role: "Document Store",
        iconUrl: "/marks/mongodb.svg",
        monogram: "MG",
      },
      {
        name: "Redis",
        role: "Caching & Queues",
        iconUrl: "/marks/redis.svg",
        monogram: "RD",
      },
      {
        name: "FAISS",
        role: "Similarity Indexing",
        iconUrl: "",
        monogram: "FS",
      },
      {
        name: "Vector Databases",
        role: "Semantic Embeddings",
        iconUrl: "",
        monogram: "VDB",
      },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    shortLabel: "Cloud & DevOps",
    description:
      "Containerization, collaborative version control, automated delivery pipelines, and resilient cloud deployment workflows.",
    accent: "#F3D5C5",
    items: [
      {
        name: "Docker",
        role: "Containerization",
        iconUrl: "/marks/docker.svg",
        monogram: "DK",
      },
      {
        name: "Git",
        role: "Version Control",
        iconUrl: "/marks/git.svg",
        monogram: "GT",
      },
      {
        name: "GitHub",
        role: "Code Collaboration",
        iconUrl: "/marks/github.svg",
        monogram: "GH",
      },
      {
        name: "Linux",
        role: "Server Environments",
        iconUrl: "/marks/linux.svg",
        monogram: "LX",
      },
      {
        name: "CI/CD",
        role: "Automated Delivery",
        iconUrl: "/marks/githubactions.svg",
        monogram: "CI",
      },
      {
        name: "Cloud Infrastructure",
        role: "Scalable Hosting",
        iconUrl: "",
        monogram: "CLD",
      },
    ],
  },
];
