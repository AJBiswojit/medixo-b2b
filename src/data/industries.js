const photos = (id) => {
  const stem = `/images/photography/industry-${id}`;
  return {
    portrait: { src: `${stem}-324.webp`, width: 324, height: 432 },
    cover: { src: `${stem}.webp`, width: 1000, height: 667 },
  };
};

// The catalogue and inquiry form share this list. Industry cards do not imply project work.
export const INDUSTRIES = [
  {
    id: "healthcare",
    title: "Healthcare & Medical",
    summary:
      "Intelligent digital platforms, clinical document retrieval, and workflow systems designed for clarity and dependability across healthcare environments.",
    subtitle: "Clinical records and care workflows",
    challenges: [
      "Care teams spend time searching referrals, discharge notes, and policy documents stored in different systems.",
      "Intake, follow-up, and administrative handoffs can lose context as a case moves between departments.",
    ],
    capabilities: [
      "Document extraction and source-linked search for approved records and procedures, with staff reviewing answers before use.",
      "Role-based access, audit trails, and task routing for intake and follow-up, integrated with existing systems where interfaces are available.",
    ],
    alt: "Diagnostic imaging scanner and patient table in a hospital room",
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
    title: "Education & EdTech",
    summary:
      "Modern academic platforms enabling automated question generation, examination workflows, structured assessment, and guided learning experiences.",
    subtitle: "Assessment and guided learning",
    challenges: [
      "Educators must refresh question banks while keeping questions aligned with a syllabus and its difficulty levels.",
      "Exam scheduling, marking, and feedback often run through separate tools, making progress difficult to trace.",
    ],
    capabilities: [
      "Educator-reviewed question drafting from approved material, tagged by topic and difficulty before publication.",
      "Assessment workflows for timed delivery, rubric-based marking, and reports by learning outcome.",
    ],
    alt: "Teacher leading a class with laptops open on the desks",
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
    title: "Retail & E-commerce",
    summary:
      "End-to-end digital storefronts paired with inventory control, catalog orchestration, AI shopping guidance, and automated customer assistance.",
    subtitle: "Connected stores and inventory",
    challenges: [
      "Price, variant, and stock changes can go out of sync across the storefront, fulfilment system, and physical locations.",
      "Customers abandon purchases when a product is hard to find or a delivery or returns question goes unanswered.",
    ],
    capabilities: [
      "A shared product catalogue and inventory events to keep listings, available quantities, and order status in sync.",
      "Product search and shopping assistants grounded in catalogue and policy data, with support handoff for exceptions.",
    ],
    alt: "Clothing racks and a central display in a boutique",
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
    title: "Jewellery & Fashion",
    summary:
      "Editorial digital commerce experiences, curated collection showcases, and integrated back-office systems tailored to fashion houses and jewellery brands.",
    subtitle: "Collection-led digital commerce",
    challenges: [
      "Each collection needs editorial presentation without losing structured information such as material, size, or stone specifications.",
      "Limited stock, custom orders, and high-value purchases require clear availability and approval steps.",
    ],
    capabilities: [
      "Collection publishing and media management with variant-level specifications, pricing rules, and inventory.",
      "Made-to-order inquiry and approval flows that keep customer, order, and fulfilment records together.",
    ],
    alt: "Gold earrings, ring and bracelet displayed together on a pale stand",
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
    title: "Human Resources",
    summary:
      "Smart people-operations platforms automating candidate screening, resume intelligence, structured evaluation, and internal HR administration.",
    subtitle: "Structured hiring and people operations",
    challenges: [
      "Recruiters manually extract experience and qualifications from inconsistent CV formats.",
      "Interview evidence and approval decisions can become scattered across notes, inboxes, and spreadsheets.",
    ],
    capabilities: [
      "Resume parsing and evidence-linked candidate summaries against role criteria, with hiring decisions kept with people.",
      "Configurable review stages, shared scorecards, and restricted access to applicant records.",
    ],
    alt: "Two professionals talking across a desk during an interview",
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
    title: "Manufacturing & Industrial",
    summary:
      "Real-time visual inspection, YOLO-driven object detection, operational monitoring, and automated workflows for industrial facilities.",
    subtitle: "Visual inspection and production visibility",
    challenges: [
      "Intermittent defects are hard to catch at line speed and harder to trace back to a shift or batch.",
      "Downtime logs and equipment measurements often sit apart, slowing diagnosis and maintenance planning.",
    ],
    capabilities: [
      "Camera-based defect detection at inspection stations, with uncertain results queued for operator review.",
      "Machine telemetry and batch records linked in a production dashboard with downtime and maintenance alerts.",
    ],
    alt: "Workers assembling equipment along a factory production line",
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
    title: "Robotics & Intelligent Automation",
    summary:
      "Software that connects robotic equipment, vision systems, and operational workflows, from visual recognition to repetitive task automation.",
    subtitle: "Machine vision and connected equipment",
    challenges: [
      "Changes in part position, lighting, or packaging can make fixed vision rules unreliable.",
      "Operators need to know which device caused a cell fault without piecing together logs from each component.",
    ],
    capabilities: [
      "Calibrated vision pipelines for recognition and tracking, tested on representative parts and operating conditions.",
      "Supervisory software to coordinate job status, collect device events, and surface exceptions without replacing safety controls.",
    ],
    alt: "Yellow industrial robotic arm inside a production cell",
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
    title: "Construction & Infrastructure",
    summary:
      "Project and site software that brings progress, field observations, and safety reporting into a shared view for construction teams.",
    subtitle: "Site progress, quality, and safety",
    challenges: [
      "Field photographs and site reports are difficult to reconcile with the latest drawing, location, or schedule revision.",
      "Unresolved defects and safety observations lose their history when responsibility passes between contractors.",
    ],
    capabilities: [
      "Mobile site records with timestamps, marked-up photos, assigned owners, and links to drawing versions.",
      "Image-assisted inspections that flag observations for qualified review, with issue closure and progress reporting.",
    ],
    alt: "Crane beside a building frame and scaffolding under construction",
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
    title: "Finance & FinTech",
    summary:
      "Document intelligence, predictive analytics, automated reporting, and secure custom financial software.",
    subtitle: "Document processing and reporting",
    challenges: [
      "Statements, applications, and reconciliation files arrive in many formats and require repeated manual checks.",
      "Reporting teams need to trace a figure to the source data and know who resolved exceptions.",
    ],
    capabilities: [
      "Document extraction with field validation, source references, and an exception queue for human review.",
      "Controlled data pipelines and reporting with access permissions, reconciliation checks, and approval history.",
    ],
    alt: "Financial charts displayed across a workstation and tablet",
    solutions: [
      "Financial Analytics",
      "Intelligent Document Processing",
      "Financial Workflow Automation",
      "Business Intelligence",
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate & Property Technology",
    summary:
      "Property portfolio platforms, intelligent inquiry assistants, client management, and workflow automation.",
    subtitle: "Property listings and lead workflows",
    challenges: [
      "Availability, floor plans, and pricing change while multiple sales teams and channels publish listings.",
      "Inquiries can stall between the first question, a viewing, and a handoff to the right agent.",
    ],
    capabilities: [
      "A property catalogue with reusable media, unit-level availability, and controlled publishing across channels.",
      "Inquiry assistants backed by approved listing data, with routing, viewing requests, and shared client history.",
    ],
    alt: "Contemporary house with a brick driveway and trees",
    solutions: [
      "Property Portfolio Platforms",
      "Intelligent Inquiry Assistants",
      "Client Management",
      "Property Workflow Automation",
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture & AgriTech",
    summary:
      "Digital tools that combine field observations, imagery, and operational data to help agricultural teams monitor crops and plan work.",
    subtitle: "Field intelligence and crop monitoring",
    challenges: [
      "Scouting notes and aerial imagery are collected at different times and can be difficult to compare by plot.",
      "Teams need to prioritise areas for inspection without treating an image signal as a diagnosis.",
    ],
    capabilities: [
      "Geotagged field records and imagery linked by plot and date, including offline capture where connectivity is limited.",
      "Image comparison and anomaly flags that direct scouts to specific areas for ground verification.",
    ],
    alt: "Aerial view of long crop rows and farm machinery in a field",
    solutions: [
      "Smart Farming Applications",
      "Crop Monitoring",
      "Agricultural Analytics",
      "Drone-Based Image Analysis",
    ],
  },
  {
    id: "automotive",
    title: "Automotive & Mobility",
    summary:
      "Vehicle, fleet, and inspection software for teams coordinating moving assets, maintenance workflows, and operational reporting.",
    subtitle: "Fleet operations and inspection",
    challenges: [
      "Fleet teams struggle to see vehicle availability when usage, work orders, and maintenance live in different systems.",
      "Condition photos are collected inconsistently, making damage and repair history hard to compare.",
    ],
    capabilities: [
      "Vehicle records connected to telemetry, maintenance schedules, and repair tasks.",
      "Guided inspection capture with visual checks and a review queue for suspected defects.",
    ],
    alt: "Electric car connected to a charging station",
    solutions: [
      "Vehicle Management Systems",
      "Fleet Management",
      "Intelligent Inspection",
      "Computer Vision Applications",
    ],
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    summary:
      "Monitoring, analytics, and automation for teams tracking energy use and the condition of distributed infrastructure.",
    subtitle: "Asset monitoring and energy analytics",
    challenges: [
      "Meters and assets report at different intervals, complicating comparisons across sites and equipment.",
      "Repeated alerts and incomplete maintenance history make it hard to distinguish routine variation from a problem.",
    ],
    capabilities: [
      "Normalised time-series data and dashboards that compare usage and performance by asset, site, and baseline.",
      "Alert grouping and anomaly detection combined with maintenance records to help operators prioritise follow-up.",
    ],
    alt: "Wind turbines standing across green hills",
    solutions: [
      "Energy Monitoring",
      "Predictive Analytics",
      "Infrastructure Monitoring",
      "Workflow Automation",
    ],
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    summary:
      "Operational visibility, data processing pipelines, automated tracking workflows, and computer vision systems.",
    subtitle: "Stock and shipment visibility",
    challenges: [
      "Missing handoff scans leave warehouse teams and customers with conflicting shipment statuses.",
      "Stock discrepancies go unnoticed until picking or dispatch when inventory systems and carrier feeds do not agree.",
    ],
    capabilities: [
      "Shipment timelines that combine scan events, carrier updates, and proof of delivery, with exceptions routed to an owner.",
      "Barcode or image-assisted checks for receiving and picking, tied to stock reconciliation and warehouse records.",
    ],
    alt: "Forklift and worker between tall racks in a distribution warehouse",
    solutions: [
      "Warehouse Management",
      "Inventory Management",
      "Fleet Tracking",
      "Supply Chain Applications",
    ],
  },
  {
    id: "hospitality-travel",
    title: "Hospitality & Travel",
    summary:
      "Booking, guest service, and operations software for hospitality and travel teams that need coordinated customer and back-office workflows.",
    subtitle: "Booking and guest operations",
    challenges: [
      "Inventory and rate changes must reach booking channels without creating duplicate reservations or stale offers.",
      "Guest requests can lose context between booking, reception, and service teams.",
    ],
    capabilities: [
      "Reservation workflows that reconcile availability, amendments, and cancellations across connected systems.",
      "Guest assistants grounded in current property information, with unresolved requests handed to staff with context.",
    ],
    alt: "Uniformed receptionist standing behind a hotel check-in desk",
    solutions: [
      "Booking and Reservation Systems",
      "Guest Service Assistants",
      "Travel Inventory Management",
      "Service and Demand Analytics",
    ],
  },
  {
    id: "telecommunications",
    title: "Telecommunications",
    summary:
      "Data and software systems for service operations, network reporting, and automated support workflows.",
    subtitle: "Network visibility and service support",
    challenges: [
      "A single outage can generate alarms across several systems, obscuring the affected sites and services.",
      "Support agents have to search changeable service guides while handling incidents and customer requests.",
    ],
    capabilities: [
      "Network telemetry and incident correlation that connect alarms to sites, services, and open tickets.",
      "Permission-aware search over versioned support material with citations and escalation to the relevant team.",
    ],
    alt: "Lattice telecommunications tower with antennas and dishes against the sky",
    solutions: [
      "Service Operations Portals",
      "Network Performance Analytics",
      "Customer Support Automation",
      "Knowledge Retrieval Systems",
    ],
  },
  {
    id: "media-entertainment",
    title: "Media & Entertainment",
    summary:
      "Tools for organizing creative assets, coordinating production work, and helping audiences discover relevant content.",
    subtitle: "Production workflows and content libraries",
    challenges: [
      "Teams cannot easily find the right clip or approved cut when assets, versions, and rights metadata are separated.",
      "Review rounds slow down when feedback is not attached to a specific frame or version.",
    ],
    capabilities: [
      "Searchable media libraries with transcript indexing, rights metadata, and access controls.",
      "Timecoded review and approval workflows that preserve the history of each cut and its release status.",
    ],
    alt: "Cinema camera with a large lens and mounted production accessories",
    solutions: [
      "Media Asset Management",
      "Content Discovery and Indexing",
      "Production Workflow Automation",
      "Audience Analytics",
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    summary:
      "Enterprise RAG knowledge assistants, automated research and reporting, and bespoke client portals.",
    subtitle: "Knowledge retrieval and client delivery",
    challenges: [
      "Research and precedent material are spread across project folders, and not every team can access every client file.",
      "Recurring reports and client updates require repeated copying, review, and version checks.",
    ],
    capabilities: [
      "Permission-aware document retrieval with citations so advisers can verify source material before using it.",
      "Template-driven reporting and client portals with approval steps, document versions, and a delivery history.",
    ],
    alt: "Advisers reviewing documents together at a table",
    solutions: [
      "Enterprise Knowledge Assistants",
      "Research and Reporting Automation",
      "Custom Client Portals",
      "Document Intelligence",
    ],
  },
].map((industry) => ({ ...industry, ...photos(industry.id) }));

export const industryAnchor = (id) => `industry-${id}`;

export const ALL_INDUSTRY_OPTIONS = [
  ...INDUSTRIES.map(({ title }) => title),
  "Technology / SaaS Startup",
  "Other Business Sector",
];
