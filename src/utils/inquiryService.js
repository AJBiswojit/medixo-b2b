/**
 * Configurable corporate contact & inquiry endpoint configuration.
 * Populate environment variables in .env for production deployment:
 *
 *   VITE_INQUIRY_API_URL=https://api.yourdomain.com/v1/inquiries
 *   VITE_INQUIRY_API_KEY=optional_public_form_token
 *   VITE_CONTACT_EMAIL=official_email
 *   VITE_CONTACT_PHONE=official_phone
 *   VITE_LINKEDIN_URL=https://www.linkedin.com/company/...
 *   VITE_COMPANY_ADDRESS=official_registered_address
 *   VITE_GITHUB_URL=https://github.com/...
 *   VITE_SOCIAL_X_URL=https://x.com/...
 *
 * No unverified contact details are fabricated by default.
 */

const env = import.meta.env || {};

export const CONTACT_CONFIG = {
  inquiryEndpoint: (env.VITE_INQUIRY_API_URL || "").trim(),
  inquiryApiKey: (env.VITE_INQUIRY_API_KEY || "").trim(),
  businessEmail: (env.VITE_CONTACT_EMAIL || "").trim(),
  contactNumber: (env.VITE_CONTACT_PHONE || "").trim(),
  linkedInUrl: (env.VITE_LINKEDIN_URL || "").trim(),
  companyAddress: (env.VITE_COMPANY_ADDRESS || "").trim(),
  githubUrl: (env.VITE_GITHUB_URL || "").trim(),
  socialXUrl: (env.VITE_SOCIAL_X_URL || "").trim(),
};

export function isInquiryBackendConfigured() {
  return Boolean(CONTACT_CONFIG.inquiryEndpoint);
}

export function formatInquiryBrief(payload) {
  return [
    "MEDIXO AI — PROJECT INQUIRY BRIEF",
    "-----------------------------------",
    `Full Name: ${payload.fullName}`,
    `Company Name: ${payload.companyName}`,
    `Business Email: ${payload.businessEmail}`,
    `Phone Number: ${payload.phoneNumber}`,
    `Industry: ${payload.industry}`,
    `Service Required: ${payload.serviceRequired}`,
    `Estimated Budget: ${payload.estimatedBudget || "Not specified"}`,
    "",
    "Project Description:",
    payload.projectDescription,
  ].join("\n");
}

/**
 * Submits a validated project inquiry to the configured API endpoint.
 * When no endpoint is configured, returns an explicit `unconfigured` status
 * with the prepared payload so the UI never fakes a backend delivery.
 */
export async function submitProjectInquiry(formValues) {
  const payload = {
    fullName: formValues.fullName.trim(),
    companyName: formValues.companyName.trim(),
    businessEmail: formValues.businessEmail.trim(),
    phoneNumber: formValues.phoneNumber.trim(),
    industry: formValues.industry.trim(),
    serviceRequired: formValues.serviceRequired.trim(),
    projectDescription: formValues.projectDescription.trim(),
    estimatedBudget: (formValues.estimatedBudget || "").trim(),
    submittedAt: new Date().toISOString(),
    source: "medixo-ai-corporate-website",
  };

  if (!isInquiryBackendConfigured()) {
    // Brief processing pause for clean UI loading transition without simulating delivery
    await new Promise((resolve) => setTimeout(resolve, 350));
    return {
      status: "unconfigured",
      payload,
      formattedBrief: formatInquiryBrief(payload),
      message:
        "Your inquiry details have been validated locally, but no live backend endpoint is configured in this environment yet. No message has been transmitted to a server.",
      setupInstructions:
        "Set VITE_INQUIRY_API_URL in your deployment environment (.env) to a POST endpoint accepting JSON inquiries, and optionally set VITE_CONTACT_EMAIL for direct mailto fallback.",
    };
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (CONTACT_CONFIG.inquiryApiKey) {
    headers["X-Form-Key"] = CONTACT_CONFIG.inquiryApiKey;
  }

  const response = await fetch(CONTACT_CONFIG.inquiryEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorDetail = "";
    try {
      const errBody = await response.json();
      errorDetail = errBody?.message || errBody?.error || "";
    } catch {
      errorDetail = "";
    }
    throw new Error(
      errorDetail ||
        `Unable to submit your inquiry right now (HTTP ${response.status}). Please try again shortly.`
    );
  }

  return {
    status: "submitted",
    payload,
    message:
      "Thank you. Your project inquiry has been transmitted to the Medixo AI team. We will review your requirements and respond to your business email.",
  };
}
