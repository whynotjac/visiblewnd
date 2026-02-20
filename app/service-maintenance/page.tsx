import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Service & Maintenance",
  "Professional service, adjustments, hardware support, and maintenance plans to keep windows and doors performing over time in Southern California.",
  "/service-maintenance"
);

export default function ServiceMaintenancePage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <section className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">Service & Maintenance</p>
          <h1 className="text-4xl sm:text-5xl">Service & Maintenance for Long-Term Performance</h1>
          <p className="text-base leading-8 text-ink">
            We provide professional service and maintenance for windows and doors, including adjustments, glass replacement, hardware service, and performance tuning. Ongoing maintenance helps extend the life of your systems and preserve performance over time.
          </p>

          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-card">
            <h2 className="text-2xl">Service Coverage</h2>
            <ul className="space-y-2 text-sm leading-7 text-[#223540]">
              <li>Repair and operational troubleshooting</li>
              <li>Adjustment for alignment and smooth performance</li>
              <li>Glass replacement and hardware service</li>
              <li>Weatherproofing checks and maintenance planning</li>
            </ul>
            <p className="text-sm text-[#2f4450]">
              Submit the form to request service or to indicate interest in a yearly maintenance plan.
            </p>
          </div>
        </section>

        <section aria-label="Service request form">
          <ServiceRequestForm />
        </section>
      </Container>
    </div>
  );
}
