import { TeamPhotoShowcase } from "@/components/about/team-photo-showcase";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/primary-cta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "About / Meet the Family",
  "Meet the Visible Windows & Doors leadership team and learn how three partners deliver expert window and door solutions built for long-term performance.",
  "/about"
);

const companyHighlights = [
  "Three partner-led leadership for accountability on every project",
  "30+ years of complex window and door project experience",
  "Deep glass expertise and manufacturer-specific installation practices"
] as const;

const qualityPrinciples = [
  {
    title: "Technical planning",
    description:
      "We align product selection, opening conditions, and sequencing early so installs perform correctly from day one."
  },
  {
    title: "Precision execution",
    description:
      "Every detail matters. Our team follows disciplined methods for layout, weatherproofing, and final operation."
  },
  {
    title: "Long-term reliability",
    description:
      "Our goal is lasting performance, not quick turnover. We build trust through consistency, communication, and service."
  }
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_top_left,_#fdfaf2,_#f3efe7_65%,_#ece6db)]">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">About / Meet the Family</p>
            <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">The Team Behind Visible Windows & Doors</h1>
            <p className="max-w-3xl text-lg leading-8 text-[#1e2f3a]">
              Visible Windows & Doors is led by three partners who combine decades of field experience with a quality-first installation mindset. As a family-owned business, we bring continuity, accountability, and technical depth to every project.
            </p>
            <div className="flex flex-wrap gap-4">
              <CtaLink href="/contact">Start a Project Conversation</CtaLink>
              <CtaLink href="/projects" variant="secondary">
                View Recent Work
              </CtaLink>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl">Leadership Highlights</h2>
            <ul className="mt-5 space-y-4">
              {companyHighlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-7 text-[#243744]">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl">Meet the Family</h2>
            <p className="max-w-3xl text-base leading-7 text-[#243744]">
              Each project is partner-guided from planning through completion, with clear communication and workmanship standards that reflect our name. Click on any team member to learn more.
            </p>
          </div>
          <TeamPhotoShowcase />
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl">How We Work</h2>
            <p className="max-w-3xl text-base leading-7 text-[#243744]">
              Our process combines technical discipline with hands-on experience in complex installations and long-term service.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {qualityPrinciples.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-line bg-[#faf8f2] p-6 shadow-card">
                <h3 className="mb-3 text-2xl">{principle.title}</h3>
                <p className="text-sm leading-7 text-[#243744]">{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#e9e3d7] py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-4xl">Build with a Partner-Led Team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#223540]">
            We deliver premium window and door solutions with craftsmanship, clarity, and lasting performance.
          </p>
          <CtaLink href="/contact" className="mt-8">
            Request a Consultation
          </CtaLink>
        </Container>
      </section>
    </>
  );
}
