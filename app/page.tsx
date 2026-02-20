import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/primary-cta";
import { ProjectPreviewGrid } from "@/components/projects/project-preview-grid";
import { LightboxImage } from "@/components/ui/lightbox-image";
import { buildMetadata } from "@/lib/metadata";
import { projectPhotos } from "@/lib/projects";

export const metadata = buildMetadata(
  "Home",
  "Premium sales, expert installation, and long-term service for modern homes and high-end projects throughout Southern California.",
  "/"
);

const trustItems = [
  "30+ years combined construction experience",
  "European window & door specialists",
  "Based in Southern California, available worldwide"
] as const;

const services = [
  {
    title: "Windows & Doors Sales",
    description:
      "High-quality window and door systems sourced for performance, aesthetics, and longevity. We help you select the right product for your project.",
    href: "/sales"
  },
  {
    title: "Installation",
    description:
      "Professional installation for new construction and retrofit projects, with proper flashing, waterproofing, and detailing.",
    href: "/installation"
  },
  {
    title: "Service & Maintenance",
    description:
      "Repairs, adjustments, glass replacement, hardware service, and ongoing maintenance to keep your windows and doors performing like new.",
    href: "/service-maintenance"
  }
] as const;

export default function HomePage() {
  const heroPrimaryPhoto = projectPhotos[8];
  const europeanFeaturePhoto = projectPhotos[1];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_top_left,_#fdfaf2,_#f3efe7_65%,_#ece6db)]">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="space-y-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              Premium Window and Door Contractor
            </p>
            <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Visible Windows & Doors - Installed to Perform
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#1e2f3a]">
              Premium sales, expert installation, and long-term service for modern homes and high-end projects. Specialists in complex window and door systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <CtaLink href="/contact">Request a Quote</CtaLink>
              <CtaLink href="/projects" variant="secondary">
                View Our Work
              </CtaLink>
            </div>
          </div>

          <div className="relative h-[320px] sm:h-[420px] lg:h-[460px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-line shadow-soft">
              <LightboxImage
                src={heroPrimaryPhoto.src}
                alt={heroPrimaryPhoto.alt}
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="grid gap-4 py-8 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item} className="rounded-xl border border-line bg-[#faf8f2] p-5 text-center shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{item}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl">Core Services</h2>
            <p className="max-w-3xl text-base leading-7 text-[#243744]">
              End-to-end support for sales, installation, and long-term service in Southern California.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card"
              >
                <h3 className="mb-4 text-2xl">{service.title}</h3>
                <p className="mb-6 text-sm leading-7 text-[#243744]">{service.description}</p>
                <CtaLink href={service.href} variant="secondary" className="mt-auto w-full text-center sm:w-auto">
                  Learn More
                </CtaLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5 rounded-2xl bg-white p-6 text-ink shadow-card sm:p-8">
            <h2 className="text-3xl !text-ink sm:text-4xl">
            Expertly Installed Windows & Doors
            </h2>
            <p className="text-base leading-8 !text-ink">
              We specialize in quality window and door systems known for their performance, craftsmanship, and design. Our team has extensive experience working with high-end European and domestic manufacturers, we understand the installation standards required to ensure long-term performance in a variety of climates.
            </p>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-line shadow-soft sm:min-h-[380px]">
            <LightboxImage
              src={europeanFeaturePhoto.src}
              alt={europeanFeaturePhoto.alt}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl">Gallery Preview</h2>
              <p className="max-w-2xl text-base leading-7 !text-ink">
                Recent installations and service work completed across Southern California.
              </p>
            </div>
            <CtaLink href="/projects" variant="secondary">
              View Gallery
            </CtaLink>
          </div>
          <ProjectPreviewGrid count={8} />
        </Container>
      </section>

      <section className="border-t border-line bg-[#e9e3d7] py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-4xl">Let&apos;s Talk About Your Project</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#223540]">
            From product selection to long-term service, we&apos;re here to help.
          </p>
          <CtaLink href="/contact" className="mt-8">
            Request a Quote
          </CtaLink>
        </Container>
      </section>
    </>
  );
}
