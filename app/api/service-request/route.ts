import { NextResponse } from "next/server";

import { getBusinessRecipients, getFromEmail, getResendClient } from "@/lib/email";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedServiceTypes = new Set([
  "Repair",
  "Adjustment",
  "Glass Replacement",
  "Hardware",
  "Weatherproofing",
  "Other"
]);

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
      return NextResponse.json({ message: "Thank you. Your request has been received." });
    }

    const name = getTextValue(formData.get("name"));
    const email = getTextValue(formData.get("email"));
    const phone = getTextValue(formData.get("phone"));
    const addressOrZip = getTextValue(formData.get("addressOrZip"));
    const requestedServiceTypes = formData
      .getAll("serviceTypes")
      .map((entry) => getTextValue(entry))
      .filter(Boolean);
    const legacyServiceType = getTextValue(formData.get("serviceType"));
    const notes = getTextValue(formData.get("notes"));
    const yearlyMaintenancePlan = getTextValue(formData.get("yearlyMaintenancePlan")) === "yes";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required before submitting." },
        { status: 400 }
      );
    }

    const normalizedServiceTypes = (requestedServiceTypes.length > 0 ? requestedServiceTypes : [legacyServiceType])
      .filter((serviceType) => allowedServiceTypes.has(serviceType));
    const serviceTypes = normalizedServiceTypes.length > 0 ? normalizedServiceTypes : ["Other"];
    const serviceTypeSummary = serviceTypes.join(", ");

    const resend = getResendClient();
    const recipients = getBusinessRecipients();

    if (!resend || recipients.length === 0) {
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    const rawPhoto = formData.get("photo");
    let attachments: Array<{ filename: string; content: string }> | undefined;

    if (rawPhoto instanceof File && rawPhoto.size > 0) {
      if (rawPhoto.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Photo upload exceeds the 5 MB size limit." },
          { status: 400 }
        );
      }

      if (rawPhoto.type && !rawPhoto.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image uploads are supported for photo attachments." },
          { status: 400 }
        );
      }

      const fileBytes = Buffer.from(await rawPhoto.arrayBuffer());
      attachments = [
        {
          filename: rawPhoto.name || "service-photo.jpg",
          content: fileBytes.toString("base64")
        }
      ];
    }

    await resend.emails.send({
      from: getFromEmail(),
      to: recipients,
      replyTo: email,
      subject: `Service Request - ${serviceTypeSummary} - ${name}`,
      html: `
        <h2>New Service & Maintenance Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Address or Zip Code:</strong> ${escapeHtml(addressOrZip || "Not provided")}</p>
        <p><strong>Service Types:</strong> ${escapeHtml(serviceTypeSummary)}</p>
        <p><strong>Yearly maintenance plan interest:</strong> ${yearlyMaintenancePlan ? "Yes" : "No"}</p>
        <p><strong>Notes / Description:</strong></p>
        <p>${escapeHtml(notes || "Not provided").replaceAll("\n", "<br />")}</p>
      `,
      text: [
        "New Service & Maintenance Request",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Address or Zip Code: ${addressOrZip || "Not provided"}`,
        `Service Types: ${serviceTypeSummary}`,
        `Yearly maintenance plan interest: ${yearlyMaintenancePlan ? "Yes" : "No"}`,
        "Notes / Description:",
        notes || "Not provided"
      ].join("\n"),
      attachments
    });

    return NextResponse.json({
      message: "Thank you. Your service request has been sent successfully."
    });
  } catch (error) {
    console.error("Service request submission failed", error);

    return NextResponse.json(
      { error: "Unable to submit your service request right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
