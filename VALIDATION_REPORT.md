# Validation Report

| # | Check | Result |
|---|-------|--------|
| 1 | The original seven public pages still exist | PASS — index, about, projects, sales, installation, service-maintenance, contact all present |
| 2 | The three new landing pages exist | PASS — large-opening-screens.html, lift-and-slide-door-installation.html, lift-and-slide-door-repair.html |
| 3 | thank-you.html exists and is noindex | PASS — `<meta name="robots" content="noindex, follow"/>` |
| 4 | No CSS, JS, image or favicon hash changed | PASS — `sha256sum -c` against baseline hashes of all 42 protected files returns no mismatches |
| 5 | No existing main navigation item changed | PASS — identical 7-item nav (Home/Sales/Installation/Service & Maintenance/Gallery/About/Contact) on all 11 pages |
| 6 | No existing footer navigation item changed | PASS — footer Explore list identical across all pages |
| 7 | No visible copy changed on index, about, projects, sales or installation | PASS — diff against source package shows only the domain-string lines changed on each file |
| 8 | The only visible service-maintenance change is the repaired form | PASS — diff confirms only the form block and domain strings changed |
| 9 | Contact and service forms no longer contain onsubmit="return false" | PASS |
| 10 | Every form field has a name | PASS — verified on contact, service-maintenance, and lift-and-slide-door-repair forms (6, 10, 9 fields respectively) |
| 11 | Netlify form attributes are present | PASS — method="POST", data-netlify="true", hidden form-name, honeypot field on all 3 forms |
| 12 | Every new page has one H1 | PASS — 1 each on large-opening-screens, lift-and-slide-door-installation, lift-and-slide-door-repair, thank-you |
| 13 | Every new page has a unique title, meta description and canonical | PASS |
| 14 | All canonical, OG and sitemap URLs use www | PASS |
| 15 | No internal link is broken | PASS — every internal .html href resolves to an existing file |
| 16 | No new commercial page exists | PASS — no commercial-*.html or office-building-*.html created |
| 17 | No city landing pages exist | PASS |
| 18 | No new CSS classes were added | PASS — every class used on the 4 new pages already exists in assets/css/styles.css |
| 19 | No new JavaScript was added | PASS — assets/js/app.js hash unchanged, no new page-level scripts |
| 20 | All supplied single-keyword ad groups map to one of the three approved landing pages | PASS — see PAGE_ALIGNMENT_REPORT.csv |

## Additional checks performed

- Banned marketing language ("best," "top-rated," "#1," "premium solutions," "unmatched," "transform," "elevate," "authorized") scanned across new page copy — the only match was the word "best" inside the pre-existing, untouched customer review JSON-LD (carried over from the template's HomeAndConstructionBusiness schema, not new copy) and "bestRating" (a schema field name). No banned language appears in any new visible copy.
- Each new page contains exactly one standalone Service JSON-LD block.
- No new AggregateRating or Review markup was added — the HomeAndConstructionBusiness schema block was copied as-is from each template (domain updated to www only).
- No new office locations or "authorized Albertini" claims appear anywhere in the new content.
- Email address and phone number were not altered anywhere in the site.

## Flagged assumptions (see CHANGELOG.md for detail)

- FAQ copy on lift-and-slide-door-installation.html was adapted from existing installation.html content since no distinct FAQ list was supplied.
- large-opening-screens.html and lift-and-slide-door-installation.html do not have dedicated forms (their templates don't have one); CTAs link to contact.html.
