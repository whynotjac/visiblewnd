# Changelog — Surgical PPC Landing Page Update

Source package: `visiblewindows-site-fixed-v7.zip`

## Modified files

- **contact.html** — Domain replaced to www in head metadata/JSON-LD. Form block replaced with a Netlify-compliant form (`name="contact"`, `method="POST"`, `data-netlify="true"`, hidden `form-name`, honeypot field, `action="/thank-you.html"`, every field named). No other content, layout, H1, title, meta description, header, or footer changed.
- **service-maintenance.html** — Domain replaced to www in head metadata/JSON-LD. Form block replaced with a Netlify-compliant form (`name="service-request"`, `enctype="multipart/form-data"` for the photo upload field, same Netlify requirements as above). Service Type changed from a 6-option checkbox group to an 11-option `<select>` with the exact choices specified (Lift-and-Slide Door Repair, Lift-and-Slide Roller Replacement, Sliding Door Roller Replacement, Heavy Sliding Glass Door Repair, European Window Repair, European Door Repair, Albertini Window or Door Service, Glass Replacement, Hardware or Alignment, Large Opening Screen Service, Other). No other content, layout, H1, title, meta description, header, or footer changed.
- **index.html, about.html, projects.html, sales.html, installation.html** — Domain string replacement only (`https://visiblewindowsanddoors.com` → `https://www.visiblewindowsanddoors.com`) in canonical, OG/Twitter tags, and JSON-LD. No visible text, layout, section, image, CTA, menu, or footer changes. Confirmed via diff against the source package — only the domain-string lines changed.
- **robots.txt** — Sitemap line updated to the www domain.
- **sitemap.xml** — All 7 existing URLs converted to www; 3 new landing page URLs appended. `thank-you` intentionally not included.

## Created files

- **large-opening-screens.html** — Duplicated from `sales.html`. Head metadata, page-specific Service JSON-LD, hero, the 3-card section (expanded to 4 cards using the existing `cards c3` class already present in the template — the 4th card wraps to a second row; no new CSS class introduced), the process section, and the final CTA replaced per the supplied copy. Sales remains the active nav item. No form added (the `sales.html` template has no form; the CTA links to `contact.html`, matching the template pattern).
- **lift-and-slide-door-installation.html** — Duplicated from `installation.html`. Head metadata, page-specific Service JSON-LD, hero, the 4-card section (reused the existing `cards c2` class, matching the template's card count exactly), FAQ questions/answers, and the final CTA replaced per the supplied copy. Installation remains the active nav item. No form added (the `installation.html` template has no form; the CTA links to `contact.html`).
- **lift-and-slide-door-repair.html** — Duplicated from `service-maintenance.html`. Head metadata, page-specific Service JSON-LD, eyebrow, H1, lead paragraph, coverage heading/list, helper paragraph, and form block replaced per the supplied copy. This page has its own dedicated Netlify form (`name="lift-slide-door-repair"`) with a hidden `service_type` field pre-set to "Lift-and-Slide Door Repair" rather than the full 11-option dropdown, since the ad group intent is already known. Service & Maintenance remains the active nav item.
- **thank-you.html** — Duplicated from `contact.html`. Form removed and replaced with a confirmation message ("Thank You" / "Your request has been received..." / "Return Home" button to `index.html`). `<meta name="robots" content="noindex, follow"/>` added. Canonical set to `https://www.visiblewindowsanddoors.com/thank-you`. Not added to the main nav or sitemap, per spec.
- **CHANGELOG.md**, **VALIDATION_REPORT.md**, **PAGE_ALIGNMENT_REPORT.csv** — this delivery documentation.

## Unmodified (verified byte-identical via SHA-256)

- `assets/css/styles.css`
- `assets/js/app.js`
- `favicon.png`
- every file in `assets/images/`

## Notes / assumptions flagged for review

1. **FAQ content on `lift-and-slide-door-installation.html`**: the prompt referenced "the exact questions supplied in the prompt" for this page's FAQ, but no distinct FAQ question/answer list was actually included in the materials provided. To avoid inventing unsupported claims, the 4 FAQ items were written by adapting language already present and approved on `installation.html` (lift-and-slide/multi-slide/bifold/European door installation, service area), reframed as page-specific questions. No new factual claims were introduced. Flagging this for your review in case you have exact FAQ copy to substitute.
2. **`large-opening-screens.html` and `lift-and-slide-door-installation.html` do not have dedicated quote forms.** The copy CSV listed a "Form Name" / "Form Service Value" for these two pages, but the New Page Construction Rules for both (section A and B) only authorize replacing hero/cards/process/FAQ/CTA content — not adding a form — since their templates (`sales.html`, `installation.html`) don't contain a `<form>` element to begin with. Their CTA buttons link to `contact.html`, matching the existing template pattern. Only `lift-and-slide-door-repair.html` (templated from `service-maintenance.html`, which does have a form) received a dedicated form. Let me know if you actually want dedicated quote forms added to the other two pages — that would need sign-off since it's outside the strict change list.
3. **4-card grid on `large-opening-screens.html`** uses the existing 3-column `cards c3` class (matching what's already used in `sales.html`) with a 4th card, so the last row shows one card alone. This avoids introducing the unused `cards c4` class into a page where the template didn't already reference it.
