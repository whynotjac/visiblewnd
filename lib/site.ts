export const siteConfig = {
  name: "Visible Windows & Doors",
  description:
    "Premium sales, installation, and service of windows and doors.",
  serviceArea: "Based in Southern California",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://visiblewindowsdoors.com"
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sales", label: "Sales" },
  { href: "/installation", label: "Installation" },
  { href: "/service-maintenance", label: "Service & Maintenance" },
  { href: "/projects", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;
