import { editorialPhoto } from "./imagery.js";
import { SERVICES } from "./services.js";

// Every asset is already composed as a 3:4 portrait. The small and large
// versions share a crop. These illustrate capabilities, not client projects.
function portrait(stem, alt, width = 480) {
  return {
    ...editorialPhoto(`hero/${stem}`, {
      width,
      height: (width * 4) / 3,
      smallWidth: 288,
    }),
    alt,
  };
}

const SERVICE_PORTRAITS = {
  "ai-ml": portrait(
    "summit-supercomputer",
    "Blue and black cabinets of the Summit supercomputer at Oak Ridge National Laboratory",
    570,
  ),
  "gen-agentic-ai": portrait(
    "creative-workflow",
    "A video editor working with footage and colour controls on two monitors",
  ),
  "rag-knowledge": portrait(
    "document-workflow",
    "A professional reviewing a paper document beside a desktop computer",
  ),
  "custom-software": portrait(
    "code-workstation",
    "Hands typing at a laptop with source code on the screen",
  ),
  "computer-vision": portrait(
    "optical-inspection",
    "A technician looking through a microscope at a circuit board",
    420,
  ),
  "process-automation": portrait(
    "canning-line",
    "Aluminium cans travelling through an automated production line",
  ),
  "data-engineering": portrait(
    "analytics-workspace",
    "An analyst at a laptop in front of projected financial charts",
  ),
  "ai-consulting": portrait(
    "integration-workshop",
    "Colleagues mapping ideas together on a glass board",
  ),
};

// These four scenes demonstrate industries without adding entries to the
// service catalogue, industry directory or project/inquiry choices.
const INDUSTRY_PORTRAITS = [
  {
    id: "robotics-systems",
    title: "Robotics & Intelligent Systems",
    ...portrait(
      "robotic-welding",
      "A blue robotic arm at a welding station",
      456,
    ),
  },
  {
    id: "construction-infrastructure",
    title: "Construction & Infrastructure",
    ...portrait(
      "tower-construction",
      "Tower cranes above a high-rise building under construction",
    ),
  },
  {
    id: "healthcare-technology",
    title: "Healthcare & Medical Technology",
    ...portrait(
      "clinical-imaging",
      "A medical practitioner preparing a patient at an MRI scanner",
    ),
  },
  {
    id: "fashion-commerce",
    title: "Retail, Fashion & Digital Commerce",
    ...portrait(
      "fashion-editorial",
      "A model in a red dress in a fashion studio",
    ),
  },
];

export const HERO_GALLERY = [
  ...SERVICES.map(({ id, title }) => ({ id, title, ...SERVICE_PORTRAITS[id] })),
  ...INDUSTRY_PORTRAITS,
];
