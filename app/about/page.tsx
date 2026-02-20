import { Container } from "@/components/ui/container";
import { LightboxImage } from "@/components/ui/lightbox-image";
import { buildMetadata } from "@/lib/metadata";
import { projectPhotos } from "@/lib/projects";

export const metadata = buildMetadata(
  "About",
  "Learn about Visible Windows & Doors, our construction experience, European system expertise, and quality-first installation approach in Southern California.",
  "/about"
);

const aboutSections = [
  {
    title: "Experience",
    description:
      "Our team brings decades of combined construction and project delivery experience, supporting homeowners, architects, builders, and design teams from planning to completion."
  },
  {
    title: "European specialization",
    description:
      "We routinely work with European window and door systems and understand the precision, detailing, and sequencing needed to maintain their performance standards."
  },
  {
    title: "Approach to quality and weatherproofing",
    description:
      "We focus on durability and long-term operation through careful installation practice, disciplined weatherproofing, and service support that continues after project turnover."
  }
] as const;

export default function AboutPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="space-y-12">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">About</p>
            <h1 className="text-4xl sm:text-5xl">About Visible Windows & Doors</h1>
            <p className="text-base leading-8 text-ink">
              Visible Windows & Doors was built to bring together product expertise, precision installation, and long-term service under one brand. With decades of combined experience in construction and specialized knowledge of high-performance window and door systems, our team supports homeowners, builders, architects, and designers throughout the entire lifecycle of a project — from product selection to installation and ongoing service.
            </p>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-line shadow-soft sm:min-h-[420px]">
            <LightboxImage
              src={projectPhotos[5].src}
              alt={projectPhotos[5].alt}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {aboutSections.map((section) => (
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
