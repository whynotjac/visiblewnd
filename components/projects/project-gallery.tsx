"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { ProjectPhoto } from "@/lib/projects";

type ProjectGalleryProps = {
  photos: ProjectPhoto[];
};

export function ProjectGallery({ photos }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto = useMemo(() => {
    if (selectedIndex === null) {
      return null;
    }

    return photos[selectedIndex] ?? null;
  }, [photos, selectedIndex]);

  const close = useCallback(() => setSelectedIndex(null), []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      return current === 0 ? photos.length - 1 : current - 1;
    });
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      return current === photos.length - 1 ? 0 : current + 1;
    });
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, goToNext, goToPrevious, selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={index < 3}
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      {selectedPhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] bg-[#0e1b24]/95 p-4 sm:p-8"
          onClick={close}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                  {selectedPhoto.projectType}
                </p>
                <p className="font-display text-2xl">{selectedPhoto.location}</p>
              </div>

              <button
                type="button"
                className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
                onClick={close}
              >
                Close
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/20 bg-black/30">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={goToPrevious}
                className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
