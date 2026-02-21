import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

const defaultOgImage = "/images/projects/wndr.jpg";

export function buildMetadata(
  pageName: string,
  description: string,
  path: string
): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const title = `${siteConfig.name} | ${pageName}`;

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath
    },
    openGraph: {
      title,
      description,
      url: normalizedPath,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 900,
          alt: "Visible Windows & Doors project photo"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage]
    }
  };
}
