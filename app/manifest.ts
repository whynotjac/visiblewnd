import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f4ef",
    theme_color: "#f6f4ef",
    icons: [
      {
        src: "/images/brand/visible-icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: siteConfig.iconPath,
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
