import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/primary-cta";
import { LightboxImage } from "@/components/ui/lightbox-image";
import { buildMetadata } from "@/lib/metadata";
import { projectPhotos } from "@/lib/projects";

export const metadata = buildMetadata(
  "Installation",
  "Professional window and door installation emphasizing waterproofing, flashing, alignment, and long-term performance in Southern California.",
  "/installation"
);

const installationSections = [
  {
    title: "New construction",
    description:
      "Collaborative installation planning with builders and design teams to align opening prep, sequencing, and finish details with your construction schedule."
  },
  {
    title: "Retrofit installation",
    description:
      "Careful replacement and upgrade work that respects finished surfaces while improving energy performance, operation, and weather resistance."
  },
  {
    title: "Weatherproofing coordination",
    description:
      "We prioritize flashing, moisture management, and sealant strategy to protect against intrusion and preserve long-term system performance."
  },
  {
    title: "Post-install adjustments",
    description:
      "Final tuning and hardware adjustments ensure smooth operation, proper alignment, and clean finish quality after installation is complete."
  }
] as const;

export default function InstallationPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="space-y-12">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">Installation</p>
            <h1 className="text-4xl sm:text-5xl">Professional Installation, Done Right</h1>
            <p className="text-base leading-8 text-ink">
              Proper installation is critical to the performance and longevity of any window or door system. Our installation process emphasizes correct flashing, waterproofing, alignment, and finishing to ensure long-term durability and performance.
            </p>
            <CtaLink href="/contact">Request a Quote</CtaLink>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-line shadow-soft sm:min-h-[420px]">
            <LightboxImage
              src={projectPhotos[3].src}
              alt={projectPhotos[3].alt}
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
            />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {installationSections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <h2 className="mb-3 text-2xl">{section.title}</h2>
              <p className="text-sm leading-7 text-[#243744]">{section.description}</p>
            </article>
          ))}
        </section>
      </Container>
    </div>
  );
}
