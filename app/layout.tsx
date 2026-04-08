import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const organizationId = `${siteConfig.url}#organization`;
const websiteId = `${siteConfig.url}#website`;
const iconUrl = new URL(siteConfig.iconPath, siteConfig.url).toString();
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: iconUrl,
    image: iconUrl,
    description: siteConfig.description,
    areaServed: "Southern California"
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@id": organizationId
    }
  }
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4ef"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/images/brand/visible-icon-32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/images/brand/visible-icon-48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        url: "/images/brand/visible-icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        url: siteConfig.iconPath,
        sizes: "512x512",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: siteConfig.appleTouchIconPath,
        sizes: "180x180",
        type: "image/png"
      }
    ],
    shortcut: [
      {
        url: "/images/brand/visible-icon-48.png",
        type: "image/png"
      }
    ]
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/projects/wndr.jpg",
        width: 1200,
        height: 900,
        alt: "Visible Windows & Doors project photo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/projects/wndr.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-base text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
