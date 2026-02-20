import { ProjectGallery } from "@/components/projects/project-gallery";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/metadata";
import { projectPhotos } from "@/lib/projects";

export const metadata = buildMetadata(
  "Gallery",
  "Gallery of window and door projects featuring premium installations and service work across Southern California.",
  "/projects"
);

export default function ProjectsPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">Gallery</p>
          <h1 className="text-4xl sm:text-5xl">Project Gallery</h1>
          <p className="max-w-3xl text-base leading-8 text-ink">
            A curated gallery of residential installations and service work throughout Southern California.
          </p>
        </section>

        <ProjectGallery photos={projectPhotos} />
      </Container>
    </div>
  );
}
