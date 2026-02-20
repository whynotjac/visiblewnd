import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-200 hover:bg-[#0f2a38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent transition duration-200 hover:border-[#0f2a38] hover:text-[#0f2a38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function CtaLink({
  href,
  children,
  className,
  variant = "primary"
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(variant === "primary" ? primaryButtonClass : secondaryButtonClass, className)}
    >
      {children}
    </Link>
  );
}
