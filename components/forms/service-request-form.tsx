"use client";

import { FormEvent, useState } from "react";

import { primaryButtonClass } from "@/components/ui/primary-cta";
import { cn } from "@/lib/utils";

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialState: SubmissionState = {
  status: "idle",
  message: ""
};

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-[#72818b] focus:border-accent focus:ring-2 focus:ring-accent/20";

const serviceTypes = [
  "Repair",
  "Adjustment",
  "Glass Replacement",
  "Hardware",
  "Weatherproofing",
  "Other"
] as const;

export function ServiceRequestForm() {
  const [submission, setSubmission] = useState<SubmissionState>(initialState);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([serviceTypes[0]]);
  const [isYearlyPlanSelected, setIsYearlyPlanSelected] = useState(false);

  const toggleServiceType = (serviceType: string) => {
    setSelectedServiceTypes((currentSelection) => {
      if (currentSelection.includes(serviceType)) {
        if (currentSelection.length === 1) {
          return currentSelection;
        }

        return currentSelection.filter((value) => value !== serviceType);
      }

      return [...currentSelection, serviceType];
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmission({ status: "submitting", message: "Submitting your request..." });

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to submit your request.");
      }

      form.reset();
      setSelectedServiceTypes([serviceTypes[0]]);
      setIsYearlyPlanSelected(false);
      setSubmission({
        status: "success",
        message:
          payload.message ??
          "Thank you. Your service request has been received and we will follow up shortly."
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again in a moment."
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-line bg-[#f9f6f0] p-6 shadow-soft sm:p-8">
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company-service">Company</label>
        <input id="company-service" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="service-name" className="text-sm font-semibold text-[#243744]">
            Name
          </label>
          <input id="service-name" name="name" type="text" required className={fieldClass} />
        </div>

        <div className="space-y-2">
          <label htmlFor="service-email" className="text-sm font-semibold text-[#243744]">
            Email
          </label>
          <input id="service-email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="service-phone" className="text-sm font-semibold text-[#243744]">
            Phone
          </label>
          <input id="service-phone" name="phone" type="tel" className={fieldClass} />
        </div>

        <div className="space-y-2">
          <label htmlFor="service-address" className="text-sm font-semibold text-[#243744]">
            Address or Zip Code
          </label>
          <input id="service-address" name="addressOrZip" type="text" className={fieldClass} />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#243744]">Service Type (select all that apply)</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceTypes.map((type) => {
            const isSelected = selectedServiceTypes.includes(type);

            return (
              <label
                key={type}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition",
                  isSelected
                    ? "border-accent bg-accent/10 text-accent shadow-soft"
                    : "border-line bg-white text-[#1e2f3a] hover:border-accent/45 hover:bg-white"
                )}
              >
                <span>{type}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-md border text-xs font-bold transition",
                    isSelected
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-transparent text-transparent"
                  )}
                >
                  ✓
                </span>
                <input
                  type="checkbox"
                  name="serviceTypes"
                  value={type}
                  checked={isSelected}
                  onChange={() => toggleServiceType(type)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="service-notes" className="text-sm font-semibold text-[#243744]">
          Notes / Description
        </label>
        <textarea
          id="service-notes"
          name="notes"
          rows={5}
          className={cn(fieldClass, "resize-y")}
          placeholder="Share what you are noticing and any timing preferences."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="service-photo" className="text-sm font-semibold text-[#243744]">
          Photo Upload (optional)
        </label>
        <input
          id="service-photo"
          name="photo"
          type="file"
          accept="image/*"
          className="block w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white hover:file:bg-[#0f2a38]"
        />
        <p className="text-xs text-[#465964]">Maximum upload size: 5 MB.</p>
      </div>

      <label
        className={cn(
          "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition",
          isYearlyPlanSelected
            ? "border-accent bg-accent/10 text-accent shadow-soft"
            : "border-line bg-white text-[#1e2f3a] hover:border-accent/45"
        )}
      >
        <span>I&apos;m interested in a yearly maintenance plan</span>
        <span
          aria-hidden="true"
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-md border text-xs font-bold transition",
            isYearlyPlanSelected
              ? "border-accent bg-accent text-white"
              : "border-line bg-transparent text-transparent"
          )}
        >
          ✓
        </span>
        <input
          type="checkbox"
          name="yearlyMaintenancePlan"
          value="yes"
          checked={isYearlyPlanSelected}
          onChange={(event) => setIsYearlyPlanSelected(event.target.checked)}
          className="sr-only"
        />
      </label>

      <button
        type="submit"
        disabled={submission.status === "submitting"}
        className={cn(
          primaryButtonClass,
          "w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        )}
      >
        {submission.status === "submitting" ? "Sending..." : "Submit Service Request"}
      </button>

      {submission.status !== "idle" ? (
        <p
          className={cn(
            "text-sm",
            submission.status === "success" ? "text-green-700" : "text-red-700"
          )}
        >
          {submission.message}
        </p>
      ) : null}
    </form>
  );
}
