import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Contact",
  "Get in touch with Visible Windows & Doors for consultations, site visits, and project quotes across Southern California.",
  "/contact"
);

export default function ContactPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <section className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">Contact</p>
          <h1 className="text-4xl sm:text-5xl">Get in Touch</h1>

          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-card">
            <h2 className="text-2xl">Based in Southern California, Available Nationwide</h2>
            <p className="text-sm leading-7 text-[#223540]">
              We work with homeowners, builders, architects, and designers throughout Southern California and on projects nationwide. Reach out to schedule a consultation or request a site visit for your project.
            </p>
            <p className="text-sm leading-7 text-[#223540]">
              Share details about your project goals, timing, and property location and our team will follow up with next steps.
            </p>
          </div>
        </section>

        <section aria-label="Contact form">
          <ContactForm />
        </section>
      </Container>
    </div>
  );
}
