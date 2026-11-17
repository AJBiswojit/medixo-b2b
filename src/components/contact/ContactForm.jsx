import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Info,
} from "lucide-react";
import { ALL_INDUSTRY_OPTIONS } from "../../data/industries";
import { SERVICES } from "../../data/services";
import {
  validateInquiryForm,
  validateSingleField,
} from "../../utils/validation";
import {
  submitProjectInquiry,
  isInquiryBackendConfigured,
  CONTACT_CONFIG,
} from "../../utils/inquiryService";
import Button from "../common/Button";

const INITIAL_VALUES = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  industry: "",
  serviceRequired: "",
  projectDescription: "",
  estimatedBudget: "",
};

const BUDGET_RANGES = [
  "Not yet defined / Need guidance",
  "Early-Stage Prototype / MVP",
  "Departmental / Mid-Scale Project",
  "Enterprise / Multi-Phase Engagement",
  "Ongoing AI Integration & Consulting",
];

function FieldError({ id, error }) {
  if (!error) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 text-[12px] text-[#9E382E] flex items-center gap-1.5"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{error}</span>
    </p>
  );
}

export default function ContactForm({ prefill }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  // Apply contextual prefill when visitor clicks service/industry/project/solution CTA
  useEffect(() => {
    if (!prefill) return;
    setValues((prev) => ({
      ...prev,
      industry: prefill.industry || prev.industry,
      serviceRequired: prefill.serviceRequired || prev.serviceRequired,
      projectDescription: prefill.projectNote
        ? prev.projectDescription
          ? prev.projectDescription
          : prefill.projectNote
        : prev.projectDescription,
    }));
    // Clear stale field errors for prefilled fields
    setErrors((prev) => ({
      ...prev,
      ...(prefill.industry ? { industry: "" } : {}),
      ...(prefill.serviceRequired ? { serviceRequired: "" } : {}),
      ...(prefill.projectNote ? { projectDescription: "" } : {}),
    }));
  }, [prefill]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = { ...values, [name]: value };
    setValues(updated);

    if (touched[name]) {
      const err = validateSingleField(name, value, updated);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateSingleField(name, value, values);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionResult(null);

    const validationErrors = validateInquiryForm(values);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      companyName: true,
      businessEmail: true,
      phoneNumber: true,
      industry: true,
      serviceRequired: true,
      projectDescription: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first invalid input for accessibility
      const firstInvalid = Object.keys(validationErrors)[0];
      const fieldEl = document.getElementById(`field-${firstInvalid}`);
      if (fieldEl) fieldEl.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitProjectInquiry(values);
      setSubmissionResult(result);
      if (result.status === "submitted") {
        setValues(INITIAL_VALUES);
        setTouched({});
        setErrors({});
      }
    } catch (error) {
      setSubmissionResult({
        status: "error",
        message:
          error.message ||
          "An unexpected network error occurred while sending your inquiry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBrief = async () => {
    if (!submissionResult?.formattedBrief) return;
    try {
      await navigator.clipboard.writeText(submissionResult.formattedBrief);
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(false);
    }
  };

  const inputBase = (fieldName) =>
    [
      "w-full rounded-[14px] bg-[#F8F8F6] border px-4 py-3 text-[14.5px] text-[#202020] placeholder:text-[#9A9A96] transition-colors duration-200 focus:bg-white focus:outline-none",
      errors[fieldName] && touched[fieldName]
        ? "border-[#C04A3E] focus:border-[#9E382E]"
        : "border-[#E4E4E0] focus:border-[#202020]",
    ].join(" ");

  const backendLive = isInquiryBackendConfigured();

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Project Inquiry Form"
      className="rounded-[26px] bg-white border border-[#EAEAEA] p-6 sm:p-9 lg:p-10 shadow-editorial"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-7 border-b border-[#EAEAEA]">
        <div>
          <h3 className="font-display text-[1.55rem] text-[#202020]">
            Project Inquiry
          </h3>
          <p className="text-[13px] text-[#777777] mt-0.5">
            Fields marked with <span className="text-[#202020]">*</span> are
            required.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-[#F5F5F3] border border-[#EAEAEA] text-[#666666] self-start sm:self-auto">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: backendLive ? "#5D877F" : "#D1B5A6" }}
            aria-hidden="true"
          />
          {backendLive ? "API Endpoint Connected" : "Configurable API Mode"}
        </span>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* 1. Full Name */}
        <div>
          <label
            htmlFor="field-fullName"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.fullName && touched.fullName)}
            aria-describedby={
              errors.fullName && touched.fullName ? "err-fullName" : undefined
            }
            placeholder="Your full name"
            className={inputBase("fullName")}
          />
          {touched.fullName && (
            <FieldError id="err-fullName" error={errors.fullName} />
          )}
        </div>

        {/* 2. Company Name */}
        <div>
          <label
            htmlFor="field-companyName"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Company Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            required
            value={values.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.companyName && touched.companyName)}
            aria-describedby={
              errors.companyName && touched.companyName
                ? "err-companyName"
                : undefined
            }
            placeholder="Company or organization"
            className={inputBase("companyName")}
          />
          {touched.companyName && (
            <FieldError id="err-companyName" error={errors.companyName} />
          )}
        </div>

        {/* 3. Business Email */}
        <div>
          <label
            htmlFor="field-businessEmail"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Business Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-businessEmail"
            name="businessEmail"
            type="email"
            autoComplete="email"
            required
            value={values.businessEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.businessEmail && touched.businessEmail)}
            aria-describedby={
              errors.businessEmail && touched.businessEmail
                ? "err-businessEmail"
                : undefined
            }
            placeholder="name@company.com"
            className={inputBase("businessEmail")}
          />
          {touched.businessEmail && (
            <FieldError id="err-businessEmail" error={errors.businessEmail} />
          )}
        </div>

        {/* 4. Phone Number */}
        <div>
          <label
            htmlFor="field-phoneNumber"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Phone Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            required
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.phoneNumber && touched.phoneNumber)}
            aria-describedby={
              errors.phoneNumber && touched.phoneNumber
                ? "err-phoneNumber"
                : undefined
            }
            placeholder="+1 (555) 000-0000"
            className={inputBase("phoneNumber")}
          />
          {touched.phoneNumber && (
            <FieldError id="err-phoneNumber" error={errors.phoneNumber} />
          )}
        </div>

        {/* 5. Industry */}
        <div>
          <label
            htmlFor="field-industry"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Industry <span aria-hidden="true">*</span>
          </label>
          <select
            id="field-industry"
            name="industry"
            required
            value={values.industry}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.industry && touched.industry)}
            aria-describedby={
              errors.industry && touched.industry ? "err-industry" : undefined
            }
            className={inputBase("industry")}
          >
            <option value="">Select your industry</option>
            {ALL_INDUSTRY_OPTIONS.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {touched.industry && (
            <FieldError id="err-industry" error={errors.industry} />
          )}
        </div>

        {/* 6. Service Required */}
        <div>
          <label
            htmlFor="field-serviceRequired"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Service Required <span aria-hidden="true">*</span>
          </label>
          <select
            id="field-serviceRequired"
            name="serviceRequired"
            required
            value={values.serviceRequired}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(
              errors.serviceRequired && touched.serviceRequired
            )}
            aria-describedby={
              errors.serviceRequired && touched.serviceRequired
                ? "err-serviceRequired"
                : undefined
            }
            className={inputBase("serviceRequired")}
          >
            <option value="">Select primary service</option>
            {SERVICES.map((srv) => (
              <option key={srv.id} value={srv.title}>
                {srv.title}
              </option>
            ))}
          </select>
          {touched.serviceRequired && (
            <FieldError
              id="err-serviceRequired"
              error={errors.serviceRequired}
            />
          )}
        </div>

        {/* 8. Estimated Budget (Optional) — full row */}
        <div className="sm:col-span-2">
          <label
            htmlFor="field-estimatedBudget"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Estimated Budget{" "}
            <span className="font-normal text-[#777777]">(Optional)</span>
          </label>
          <select
            id="field-estimatedBudget"
            name="estimatedBudget"
            value={values.estimatedBudget}
            onChange={handleChange}
            className={inputBase("estimatedBudget")}
          >
            <option value="">Select engagement scope (optional)</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* 7. Project Description */}
        <div className="sm:col-span-2">
          <label
            htmlFor="field-projectDescription"
            className="block text-[12.5px] font-semibold text-[#202020] mb-1.5"
          >
            Project Description <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="field-projectDescription"
            name="projectDescription"
            rows={4}
            required
            value={values.projectDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(
              errors.projectDescription && touched.projectDescription
            )}
            aria-describedby={
              errors.projectDescription && touched.projectDescription
                ? "err-projectDescription"
                : undefined
            }
            placeholder="Describe your business requirements, goals, key workflows, or the problem you want to solve..."
            className={`${inputBase("projectDescription")} resize-y min-h-[115px]`}
          />
          {touched.projectDescription && (
            <FieldError
              id="err-projectDescription"
              error={errors.projectDescription}
            />
          )}
        </div>
      </div>

      {/* Submit Action */}
      <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          icon={isSubmitting ? undefined : ArrowUpRight}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Processing Inquiry...</span>
            </span>
          ) : (
            "Discuss Your Project"
          )}
        </Button>

        <p className="text-[12px] text-[#777777]">
          Your details are used solely to evaluate your project inquiry.
        </p>
      </div>

      {/* Submission Feedback States */}
      {submissionResult && (
        <div
          role="status"
          aria-live="polite"
          className={[
            "mt-6 rounded-[18px] border p-5 space-y-3",
            submissionResult.status === "submitted"
              ? "bg-[#F2F7F6] border-[#ACC6C1]"
              : submissionResult.status === "unconfigured"
              ? "bg-[#FAF6F3] border-[#E5D3C9]"
              : "bg-[#FDF4F3] border-[#E6B8B3]",
          ].join(" ")}
        >
          {submissionResult.status === "submitted" && (
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="w-5 h-5 text-[#3E6B63] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-[14px] font-semibold text-[#202020]">
                  Inquiry Submitted
                </p>
                <p className="text-[13.5px] text-[#4A4A4A] mt-1 leading-relaxed">
                  {submissionResult.message}
                </p>
              </div>
            </div>
          )}

          {submissionResult.status === "unconfigured" && (
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <Info
                  className="w-5 h-5 text-[#7A5E4D] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1.5">
                  <p className="text-[14px] font-semibold text-[#202020]">
                    Development Fallback — Backend Endpoint Not Configured
                  </p>
                  <p className="text-[13px] text-[#555555] leading-relaxed">
                    {submissionResult.message}
                  </p>
                  <p className="text-[12px] text-[#777777] leading-relaxed">
                    <strong className="font-semibold text-[#4A4A4A]">
                      To enable live submissions:
                    </strong>{" "}
                    {submissionResult.setupInstructions}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-medium bg-white border border-[#DCDCD8] text-[#202020] hover:border-[#202020] transition-colors cursor-pointer"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Inquiry Brief Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Validated Inquiry Brief</span>
                    </>
                  )}
                </button>

                {CONTACT_CONFIG.businessEmail && (
                  <a
                    href={`mailto:${
                      CONTACT_CONFIG.businessEmail
                    }?subject=${encodeURIComponent(
                      `Project Inquiry — ${submissionResult.payload.companyName}`
                    )}&body=${encodeURIComponent(
                      submissionResult.formattedBrief
                    )}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-medium bg-[#171717] text-white hover:bg-[#2E2E2E] transition-colors"
                  >
                    <span>Send via Email Client</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          )}

          {submissionResult.status === "error" && (
            <div className="flex items-start gap-3">
              <AlertCircle
                className="w-5 h-5 text-[#9E382E] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-[14px] font-semibold text-[#202020]">
                  Submission Could Not Be Completed
                </p>
                <p className="text-[13px] text-[#555555] mt-1 leading-relaxed">
                  {submissionResult.message}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
