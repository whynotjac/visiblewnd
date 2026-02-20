import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/primary-cta";
import { LightboxImage } from "@/components/ui/lightbox-image";
import { buildMetadata } from "@/lib/metadata";
import { projectPhotos } from "@/lib/projects";

export const metadata = buildMetadata(
  "Sales",
  "Windows and doors sourced for performance, design, and long-term durability for residential and select commercial projects in Southern California.",
  "/sales"
);

const salesSections = [
  {
    title: "Product selection guidance",
    description:
      "We help align product choices with architectural intent, climate performance, opening sizes, hardware preferences, and long-term maintenance expectations."
  },
  {
    title: "European systems specialization",
    description:
      "Our team supports premium Italian, French, and German-influenced systems and understands the detailing these products require for reliable installation and operation."
  },
  {
    title: "Residential + select commercial",
    description:
      "From custom homes and luxury remodels to select small commercial applications, we source systems that meet performance goals while preserving design quality."
  }
] as const;

export default function SalesPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="space-y-12">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">Sales</p>
            <h1 className="text-4xl sm:text-5xl">Windows & Doors, Sourced for Performance and Design</h1>
            <p className="text-base leading-8 text-ink">
              We work with a range of high-quality window and door manufacturers to provide systems that meet both design and performance requirements. Whether you are building new or upgrading existing openings, we help guide product selection based on aesthetics, efficiency, and long-term durability.
            </p>
            <CtaLink href="/contact">Request a Quote</CtaLink>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-line shadow-soft sm:min-h-[420px]">
            <LightboxImage
              src={projectPhotos[4].src}
              alt={projectPhotos[4].alt}
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
            />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {salesSections.map((section) => (
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
