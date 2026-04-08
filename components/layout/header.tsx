"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/primary-cta";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-all duration-300",
        isScrolled
          ? "border-line bg-base/95 shadow-soft backdrop-blur"
          : "bg-base/85 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Visible Windows & Doors home">
          <Image
            src="/images/brand/visiblelogonew.png"
            alt="Visible Windows & Doors logo"
            width={1200}
            height={309}
            sizes="(max-width: 639px) 155px, 186px"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide text-ink transition hover:text-accent",
                  active && "text-accent"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <CtaLink href="/contact" className="ml-2 text-xs">
            Request a Quote
          </CtaLink>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md border border-line p-2 text-ink lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-line bg-base px-4 py-4 sm:px-6 lg:hidden">
          <nav className="grid gap-3" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("text-sm font-medium text-ink", active && "text-accent")}
                >
                  {link.label}
                </Link>
              );
            })}
            <CtaLink href="/contact" className="mt-2 w-full text-xs">
              Request a Quote
            </CtaLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
