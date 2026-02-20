import { NextResponse } from "next/server";

import { getBusinessRecipients, getFromEmail, getResendClient } from "@/lib/email";

export const runtime = "nodejs";

function getTextValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const honeypot = getTextValue(formData.get("company"));
    if (honeypot) {
      return NextResponse.json({ message: "Thank you. Your message has been received." });
    }

    const name = getTextValue(formData.get("name"));
    const email = getTextValue(formData.get("email"));
    const phone = getTextValue(formData.get("phone"));
    const message = getTextValue(formData.get("message"));

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields before submitting." },
        { status: 400 }
      );
    }

    const resend = getResendClient();
    const recipients = getBusinessRecipients();

    if (!resend || recipients.length === 0) {
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    await resend.emails.send({
      from: getFromEmail(),
      to: recipients,
      replyTo: email,
      subject: `Website Contact Inquiry - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
      text: [
        "New Contact Form Submission",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "Message:",
        message
      ].join("\n")
    });

    return NextResponse.json({ message: "Thank you. Your message has been sent." });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
