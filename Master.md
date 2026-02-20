# Visible Windows & Doors – Website Build Spec (MASTER.md)

## 1. Brand & Positioning

**Brand Name:** Visible Windows & Doors  
**Industry:** Windows & Doors Sales, Installation, Service & Maintenance  
**Positioning:**  
Visible Windows & Doors is a premium contractor brand specializing in the sales, installation, and service of high-quality windows and doors for residential and select commercial projects. We are known for precision installation, proper weatherproofing, long-term service, and specialization in European window and door systems while supporting a wide range of modern manufacturers.

**Tone & Feel:**  
Premium contractor. Modern. Sophisticated. Clean but not cold. Trustworthy. High-end residential feel.  
Not playful, not cheap, not overly techy. This is a professional construction + design-oriented brand.

**Core Differentiators to Highlight:**
- Sales + Installation + Service under one brand  
- Specialization in European windows & doors (Italian, French, German systems)  
- Strong focus on proper weatherproofing and long-term performance  
- Experience in new construction and high-end retrofit projects  
- Ongoing maintenance and after-sale service programs  

---

## 2. Tech Stack

- Framework: Next.js (App Router) + TypeScript  
- Styling: Tailwind CSS  
- UI: Custom components (optionally shadcn/ui for form and layout primitives)  
- Forms: Server Actions or API Routes with Resend (email delivery)  
- Hosting: Vercel  
- SEO: Server-rendered pages, metadata, OpenGraph, sitemap  
- Performance: Image optimization with next/image  
- No payments or e-commerce for now  

---

## 3. Sitemap / Routes

- `/` – Home  
- `/sales` – Windows & Doors Sales  
- `/installation` – Installation  
- `/service-maintenance` – Service & Maintenance (form + yearly maintenance interest)  
- `/projects` – Projects / Gallery  
- `/about` – About  
- `/contact` – Contact  

Header nav: Home, Sales, Installation, Service & Maintenance, Projects, About, Contact  
Sticky header on scroll. Mobile hamburger menu.

---

## 4. Global UI Components

### Header
- Logo (text placeholder initially: “Visible Windows & Doors”)  
- Navigation links  
- Primary CTA button: “Request a Quote” → links to Contact  

### Footer
- Brand name  
- Short description: “Premium sales, installation, and service of windows and doors. Based in Southern California, available nationwide.”  
- Contact info placeholders  
- Service area text  
- Copyright  

### Primary CTA Button
Text: “Request a Quote”  
Style: Solid, high-contrast, premium feel  

---

## 5. Homepage Content & Copy

### Hero Section
**Headline:**  
Precision Windows & Doors, Installed to Perform

**Subheadline:**  
Premium sales, expert installation, and long-term service for modern homes and high-end projects. Specialists in European window and door systems.

**Primary CTA:**  
Request a Quote

**Secondary CTA:**  
View Our Work

---

### Trust / Credibility Row
- 30+ years combined construction experience  
- European window & door specialists  
- Based in Southern California, available nationwide  

---

### Services Grid
Three primary service cards:

**Windows & Doors Sales**  
High-quality window and door systems sourced for performance, aesthetics, and longevity. We help you select the right product for your project.

**Installation**  
Professional installation for new construction and retrofit projects, with proper flashing, waterproofing, and detailing.

**Service & Maintenance**  
Repairs, adjustments, glass replacement, hardware service, and ongoing maintenance to keep your windows and doors performing like new.

Each card links to its page.

---

### European Specialization Section
**Headline:**  
European Windows & Doors, Expertly Installed

**Body Copy:**  
We specialize in European window and door systems known for their performance, craftsmanship, and design. Our team has extensive experience working with high-end European manufacturers and understands the installation standards required to ensure long-term performance in Southern California climates.

---

### Projects Preview
Grid of project images (placeholder images initially).  
CTA: View Projects

---

### Final CTA
**Headline:**  
Let’s Talk About Your Project  
**Subheadline:**  
From product selection to long-term service, we’re here to help.  
**CTA Button:** Request a Quote

---

## 6. Sales Page (/sales)

**Headline:**  
Windows & Doors, Sourced for Performance and Design

**Body Copy:**  
We work with a range of high-quality window and door manufacturers to provide systems that meet both design and performance requirements. Whether you are building new or upgrading existing openings, we help guide product selection based on aesthetics, efficiency, and long-term durability.

**Sections:**
- Product selection guidance  
- European systems specialization  
- Residential + select commercial  
- CTA: Request a Quote  

---

## 7. Installation Page (/installation)

**Headline:**  
Professional Installation, Done Right

**Body Copy:**  
Proper installation is critical to the performance and longevity of any window or door system. Our installation process emphasizes correct flashing, waterproofing, alignment, and finishing to ensure long-term durability and performance.

**Sections:**
- New construction  
- Retrofit installation  
- Weatherproofing coordination  
- Post-install adjustments  
- CTA: Request a Quote  

---

## 8. Service & Maintenance Page (/service-maintenance)

**Headline:**  
Service & Maintenance for Long-Term Performance

**Body Copy:**  
We provide professional service and maintenance for windows and doors, including adjustments, glass replacement, hardware service, and performance tuning. Ongoing maintenance helps extend the life of your systems and preserve performance over time.

### Service Request Form Fields
- Name (required)  
- Email (required)  
- Phone (optional)  
- Address or Zip Code  
- Service Type (dropdown: Repair, Adjustment, Glass Replacement, Hardware, Weatherproofing, Other)  
- Notes / Description  
- Photo Upload (optional)  
- Checkbox: “I’m interested in a yearly maintenance plan”

On submit:
- Send email to business inbox via Resend  
- Show success and error states  
- Include honeypot field for spam protection  

---

## 9. Projects Page (/projects)

**Headline:**  
Selected Projects

Grid gallery layout.  
Simple image grid with optional captions (location, type of project).  
Modern lightbox modal for viewing images.

---

## 10. About Page (/about)

**Headline:**  
About Visible Windows & Doors

**Body Copy:**  
Visible Windows & Doors was built to bring together product expertise, precision installation, and long-term service under one brand. With decades of combined experience in construction and specialized knowledge of high-performance window and door systems, our team supports homeowners, builders, architects, and designers throughout the entire lifecycle of a project — from product selection to installation and ongoing service.

**Sections:**
- Experience  
- European specialization  
- Approach to quality and weatherproofing  

---

## 11. Contact Page (/contact)

**Headline:**  
Get in Touch

**Form Fields:**
- Name  
- Email  
- Phone  
- Message  

**Additional Info:**
- Service Area: Based in Southern California, available nationwide  
- Text block encouraging consultations and site visits  

---

## 12. SEO & Metadata

Each page should include:
- Title: “Visible Windows & Doors | [Page Name]”  
- Meta description aligned with page content  
- OpenGraph tags  
- Structured headings (H1, H2, H3)  

Local SEO:
- Mention “Southern California” throughout  
- Prepare for later schema.org LocalBusiness markup  

---

## 13. Visual Style Guidelines

- Light background with dark text  
- Strong typography hierarchy  
- Subtle borders and soft shadows  
- High-quality project imagery  
- Plenty of whitespace  
- Modern grid-based layout  
- Premium contractor aesthetic (not tech startup, not DIY handyman)

---

## 14. Non-Goals (Do NOT build yet)

- No online payments  
- No e-commerce  
- No client portal  
- No CMS (static content for now)  

---

## 15. Deployment

- Prepare for Vercel deployment  
- Environment variables for email service  
- Basic analytics hook (optional)  

---

## 16. Future Enhancements (Out of Scope for v1)

- CMS for content editing  
- Online booking  
- Maintenance plan subscription management  
- Reviews/testimonials integration  
- CRM integration  
