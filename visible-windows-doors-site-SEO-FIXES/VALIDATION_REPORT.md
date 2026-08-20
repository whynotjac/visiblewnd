# Validation Report — Responsive Redesign

Validated locally on August 18, 2026 against `origin/main` (`c13329e`).

| # | Check | Result |
|---|-------|--------|
| 1 | All public, specialty, utility, and error pages load | PASS — 12 HTML files tested |
| 2 | Every page has exactly one H1 | PASS — 12/12 |
| 3 | Desktop, tablet, mobile, and narrow-phone layouts stay within the viewport | PASS — tested at 1440, 1100, 981, 980, 768, 390, and 320 px |
| 4 | Header remains flush to the top while scrolling | PASS — top = 0 and dimensions remain fixed |
| 5 | Primary navigation is visible on desktop and becomes the labeled mobile menu below 1100 px | PASS |
| 6 | Existing titles, meta descriptions, canonicals, and H1 copy are preserved | PASS — compared page-by-page with `origin/main` |
| 7 | JSON-LD parses and declares the schema.org context | PASS — 27/27 blocks; missing Service contexts corrected |
| 8 | Internal routes/assets resolve and HTML IDs are unique | PASS — all 12 pages |
| 9 | Contact, service, and specialty forms post to `/api/submit` | PASS |
| 10 | Optional empty photo parts no longer crash the form handler | PASS — regression test included |
| 11 | Photo limits match the Vercel request-body ceiling | PASS — 3 MB enforced in the UI and API |
| 12 | Oversized and non-image uploads are rejected cleanly | PASS — 413 and 400 regression tests included |
| 13 | Failed enhanced submissions retain the visitor's field values and show an inline status | PASS — browser tested |
| 14 | JavaScript and serverless handler syntax is valid | PASS — `node --check` |
| 15 | Form handler regression suite passes | PASS — `npm run test:forms` |
| 16 | CSS/JS cannot remain stale for a year under mutable filenames | PASS — changed to `must-revalidate`; HTML references are versioned |
| 17 | Closed gallery lightbox is absent from the accessibility tree; open dialog locks scroll and restores focus | PASS |
| 18 | Mobile menu covers the viewport, locks background scroll, changes its label to Close, and contains keyboard focus | PASS |
| 19 | Service request form appears directly after the mobile hero instead of after all SEO content | PASS |
| 20 | Browser console is clean on the final preview | PASS — no warnings or errors |

## SEO preservation scope

The redesign does not rewrite indexed marketing copy. Titles, descriptions, canonicals,
H1s, FAQ content, reviews, specialty content, `robots.txt`, `sitemap.xml`, and `llms.txt`
remain in place. The only structured-data change adds the missing `@context` declaration
to three standalone Service JSON-LD blocks.

## Deployment checks still required

- Confirm the Vercel Root Directory is `visible-windows-doors-site-SEO-FIXES`.
- Confirm Production has `RESEND_API_KEY`, `TO_EMAIL` (or the supported legacy
  `BUSINESS_INBOX_EMAIL`), and a verified-domain `FROM_EMAIL`.
- After deployment, submit each form with and without a photo and confirm delivery in
  the intended inbox.
