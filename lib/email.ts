import "server-only";

import { Resend } from "resend";

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export function getBusinessRecipients(): string[] {
  return (process.env.BUSINESS_INBOX_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export function getFromEmail(): string {
  return process.env.FROM_EMAIL ?? "Visible Windows & Doors <onboarding@resend.dev>";
}
