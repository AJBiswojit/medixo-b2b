const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;

export function validateInquiryForm(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  }

  if (!values.companyName || values.companyName.trim().length < 2) {
    errors.companyName = "Please enter your company or organization name.";
  }

  if (!values.businessEmail || !values.businessEmail.trim()) {
    errors.businessEmail = "Please enter your business email address.";
  } else if (!EMAIL_REGEX.test(values.businessEmail.trim())) {
    errors.businessEmail =
      "Please enter a valid email address (e.g., name@company.com).";
  }

  if (!values.phoneNumber || !values.phoneNumber.trim()) {
    errors.phoneNumber = "Please enter a contact phone number.";
  } else {
    const cleaned = values.phoneNumber.trim();
    const digitsOnly = cleaned.replace(/\D/g, "");
    if (
      !PHONE_REGEX.test(cleaned) ||
      digitsOnly.length < 7 ||
      digitsOnly.length > 15
    ) {
      errors.phoneNumber =
        "Please enter a valid phone number including country or area code.";
    }
  }

  if (!values.industry || !values.industry.trim()) {
    errors.industry = "Please select your industry.";
  }

  if (!values.serviceRequired || !values.serviceRequired.trim()) {
    errors.serviceRequired = "Please select the primary service required.";
  }

  if (
    !values.projectDescription ||
    values.projectDescription.trim().length < 20
  ) {
    errors.projectDescription =
      "Please share a brief overview of your project requirements (at least 20 characters).";
  }

  return errors;
}

export function validateSingleField(name, value, allValues = {}) {
  const merged = { ...allValues, [name]: value };
  const allErrors = validateInquiryForm(merged);
  return allErrors[name] || "";
}

export function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollToSection(sectionId, { block = "start" } = {}) {
  if (typeof window === "undefined") return;
  const cleanId = sectionId.replace(/^#/, "");
  const behavior = scrollBehavior();
  if (cleanId === "top" || cleanId === "home") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(cleanId)?.scrollIntoView({ behavior, block });
}
