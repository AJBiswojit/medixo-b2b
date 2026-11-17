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
        iconUrl: "https://cdn.simpleicons.org/python/202020",
        monogram: "Py",
      },
      {
        name: "Java",
        role: "Enterprise Systems",
        iconUrl: "https://cdn.simpleicons.org/openjdk/202020",
        monogram: "Jv",
      },
      {
        name: "JavaScript",
        role: "Web Engineering",
        iconUrl: "https://cdn.simpleicons.org/javascript/202020",
        monogram: "JS",
      },
      {
        name: "TypeScript",
        role: "Typed Applications",
        iconUrl: "https://cdn.simpleicons.org/typescript/202020",
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
    accent: "#ACC6C1",
    items: [
      {
        name: "TensorFlow",
        role: "Deep Learning",
        iconUrl: "https://cdn.simpleicons.org/tensorflow/202020",
        monogram: "TF",
      },
      {
        name: "PyTorch",
        role: "Neural Networks",
        iconUrl: "https://cdn.simpleicons.org/pytorch/202020",
        monogram: "PT",
      },
      {
        name: "Scikit-learn",
        role: "Predictive Modeling",
        iconUrl: "https://cdn.simpleicons.org/scikitlearn/202020",
        monogram: "SK",
      },
      {
        name: "OpenCV",
        role: "Image Processing",
        iconUrl: "https://cdn.simpleicons.org/opencv/202020",
        monogram: "CV",
      },
      {
        name: "YOLO",
        role: "Object Detection",
        iconUrl: "https://cdn.simpleicons.org/ultralytics/202020",
        monogram: "YL",
      },
      {
        name: "Hugging Face",
        role: "Transformers & Models",
        iconUrl: "https://cdn.simpleicons.org/huggingface/202020",
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
    accent: "#F6EAEA",
    items: [
      {
        name: "LangChain",
        role: "LLM Orchestration",
        iconUrl: "https://cdn.simpleicons.org/langchain/202020",
        monogram: "LC",
      },
      {
        name: "LangGraph",
        role: "Stateful Agents",
        iconUrl: "https://cdn.simpleicons.org/langgraph/202020",
        monogram: "LG",
      },
      {
        name: "CrewAI",
        role: "Multi-Agent Workflows",
        iconUrl: "",
        monogram: "CA",
      },
      {
        name: "MCP",
        role: "Model Context Protocol",
        iconUrl: "https://cdn.simpleicons.org/modelcontextprotocol/202020",
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
        iconUrl: "",
        monogram: "OA",
      },
      {
        name: "Anthropic Claude",
        role: "Reasoning Models",
        iconUrl: "https://cdn.simpleicons.org/anthropic/202020",
        monogram: "AC",
      },
      {
        name: "Google Gemini",
        role: "Multimodal LLMs",
        iconUrl: "https://cdn.simpleicons.org/googlegemini/202020",
        monogram: "GM",
      },
      {
        name: "Groq",
        role: "Low-Latency Inference",
        iconUrl: "",
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
    accent: "#F5F5F3",
    items: [
      {
        name: "FastAPI",
        role: "Async Python APIs",
        iconUrl: "https://cdn.simpleicons.org/fastapi/202020",
        monogram: "FA",
      },
      {
        name: "Django",
        role: "Full-Featured Backend",
        iconUrl: "https://cdn.simpleicons.org/django/202020",
        monogram: "DJ",
      },
      {
        name: "Spring Boot",
        role: "Java Microservices",
        iconUrl: "https://cdn.simpleicons.org/springboot/202020",
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
    accent: "#E5D3C9",
    items: [
      {
        name: "React.js",
        role: "Component Interfaces",
        iconUrl: "https://cdn.simpleicons.org/react/202020",
        monogram: "Re",
      },
      {
        name: "Next.js",
        role: "Web Applications",
        iconUrl: "https://cdn.simpleicons.org/nextdotjs/202020",
        monogram: "Nx",
      },
      {
        name: "HTML5",
        role: "Semantic Markup",
        iconUrl: "https://cdn.simpleicons.org/html5/202020",
        monogram: "H5",
      },
      {
        name: "CSS3",
        role: "Visual Architecture",
        iconUrl: "https://cdn.simpleicons.org/css/202020",
        monogram: "C3",
      },
      {
        name: "Tailwind CSS",
        role: "Design Systems",
        iconUrl: "https://cdn.simpleicons.org/tailwindcss/202020",
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
        iconUrl: "https://cdn.simpleicons.org/postgresql/202020",
        monogram: "PG",
      },
      {
        name: "MySQL",
        role: "Transactional SQL",
        iconUrl: "https://cdn.simpleicons.org/mysql/202020",
        monogram: "MY",
      },
      {
        name: "MongoDB",
        role: "Document Store",
        iconUrl: "https://cdn.simpleicons.org/mongodb/202020",
        monogram: "MG",
      },
      {
        name: "Redis",
        role: "Caching & Queues",
        iconUrl: "https://cdn.simpleicons.org/redis/202020",
        monogram: "RD",
      },
      {
        name: "FAISS",
        role: "Similarity Indexing",
        iconUrl: "https://cdn.simpleicons.org/meta/202020",
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
    accent: "#F6EAEA",
    items: [
      {
        name: "Docker",
        role: "Containerization",
        iconUrl: "https://cdn.simpleicons.org/docker/202020",
        monogram: "DK",
      },
      {
        name: "Git",
        role: "Version Control",
        iconUrl: "https://cdn.simpleicons.org/git/202020",
        monogram: "GT",
      },
      {
        name: "GitHub",
        role: "Code Collaboration",
        iconUrl: "https://cdn.simpleicons.org/github/202020",
        monogram: "GH",
      },
      {
        name: "Linux",
        role: "Server Environments",
        iconUrl: "https://cdn.simpleicons.org/linux/202020",
        monogram: "LX",
      },
      {
        name: "CI/CD",
        role: "Automated Delivery",
        iconUrl: "https://cdn.simpleicons.org/githubactions/202020",
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
