import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-[#efe9de]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-ink">{siteConfig.name}</h2>
          <p className="max-w-md text-sm leading-7 text-[#1e2f3a]">{siteConfig.description}</p>
          <p className="text-sm text-[#243744]">{siteConfig.serviceArea}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Contact</h3>
          <p className="text-sm text-[#243744]">Phone: (858)-334-9071</p>
          <p className="text-sm text-[#243744]">Email: contact@visiblewindowsanddoors.com</p>
          <p className="text-sm text-[#243744]">Mon - Sat: 8:00 AM - 5:00 PM</p>
          <p className="text-sm text-[#243744]">CSL # 1150682</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Explore</h3>
          <div className="grid gap-2 text-sm text-[#243744]">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 text-center text-xs uppercase tracking-wide text-[#3a4e59] sm:px-6 lg:px-8">
        Copyright {new Date().getFullYear()} Visible Windows & Doors. All rights reserved.
      </div>
    </footer>
  );
}
