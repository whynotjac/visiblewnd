"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { projectPhotos } from "@/lib/projects";
import { cn } from "@/lib/utils";

type LightboxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function LightboxImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imageClassName
}: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initialGalleryIndex = useMemo(() => projectPhotos.findIndex((photo) => photo.src === src), [src]);
  const hasGalleryNavigation = initialGalleryIndex >= 0;
  const [selectedIndex, setSelectedIndex] = useState(initialGalleryIndex >= 0 ? initialGalleryIndex : 0);

  const displayedPhoto =
    hasGalleryNavigation && projectPhotos.length > 0
      ? projectPhotos[selectedIndex] ?? projectPhotos[initialGalleryIndex]
      : { src, alt };

  const goToPrevious = useCallback(() => {
    if (!hasGalleryNavigation || projectPhotos.length < 2) {
      return;
    }

    setSelectedIndex((current) => (current === 0 ? projectPhotos.length - 1 : current - 1));
  }, [hasGalleryNavigation]);

  const goToNext = useCallback(() => {
    if (!hasGalleryNavigation || projectPhotos.length < 2) {
      return;
    }

    setSelectedIndex((current) => (current === projectPhotos.length - 1 ? 0 : current + 1));
  }, [hasGalleryNavigation]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToNext, goToPrevious, isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSelectedIndex(initialGalleryIndex >= 0 ? initialGalleryIndex : 0);
          setIsOpen(true);
        }}
        className={cn("group absolute inset-0 block overflow-hidden text-left", className)}
        aria-label={`Open image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition duration-500 group-hover:scale-[1.03]",
            imageClassName
          )}
        />
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-[#0e1b24]/95 p-4 sm:p-8"
          onClick={() => setIsOpen(false)}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="truncate text-sm uppercase tracking-[0.14em] text-white/80">{displayedPhoto.alt}</p>
              <button
                type="button"
                className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/20 bg-black/30">
              <Image src={displayedPhoto.src} alt={displayedPhoto.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            {hasGalleryNavigation && projectPhotos.length > 1 ? (
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
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
