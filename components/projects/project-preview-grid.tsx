"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { projectPhotos } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectPreviewGridProps = {
  count?: number;
};

export function ProjectPreviewGrid({ count = 6 }: ProjectPreviewGridProps) {
  const previewPhotos = projectPhotos.slice(0, count);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = useMemo(
    () => (selectedIndex === null ? null : previewPhotos[selectedIndex] ?? null),
    [previewPhotos, selectedIndex]
  );

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4">
        {previewPhotos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "preview-card group relative min-h-[240px] overflow-hidden rounded-2xl border border-line text-left shadow-card transition duration-300 sm:min-h-[260px]",
              "hover:z-10 hover:scale-[1.03] hover:shadow-soft"
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <p className="text-sm font-medium">{photo.location}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-white/80">{photo.projectType}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedPhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-[#0e1b24]/95 p-4 sm:p-8"
          onClick={() => setSelectedIndex(null)}
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
                onClick={() => setSelectedIndex(null)}
              >
                Close
              </button>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/20 bg-black/30">
              <Image src={selectedPhoto.src} alt={selectedPhoto.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
