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

export function ContactForm() {
  const [submission, setSubmission] = useState<SubmissionState>(initialState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmission({ status: "submitting", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to submit the form right now.");
      }

      form.reset();
      setSubmission({
        status: "success",
        message: payload.message ?? "Thank you. Your message has been sent successfully."
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
        <label htmlFor="company-contact">Company</label>
        <input id="company-contact" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-semibold text-[#243744]">
            Name
          </label>
          <input id="contact-name" name="name" type="text" required className={fieldClass} />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-semibold text-[#243744]">
            Email
          </label>
          <input id="contact-email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-phone" className="text-sm font-semibold text-[#243744]">
          Phone
        </label>
        <input id="contact-phone" name="phone" type="tel" className={fieldClass} />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-semibold text-[#243744]">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={cn(fieldClass, "resize-y")}
          placeholder="Tell us about your project, timeline, and goals."
        />
      </div>

      <button
        type="submit"
        disabled={submission.status === "submitting"}
        className={cn(
          primaryButtonClass,
          "w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        )}
      >
        {submission.status === "submitting" ? "Sending..." : "Send Message"}
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
