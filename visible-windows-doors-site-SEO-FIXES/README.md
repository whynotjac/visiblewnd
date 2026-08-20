# Visible Windows & Doors — Website (multi-page)

Static, multi-page marketing site (HTML, CSS, vanilla JS) for a family-owned window and
door installation, sales, and service company in Southern California. No build step.

## Pages (each is its own indexable URL)
```
/                     index.html              Home
/sales                sales.html              Windows & Doors for sale
/installation         installation.html       Installation services
/service-maintenance  service-maintenance.html Repair & maintenance
/projects             projects.html           Project gallery (with lightbox)
/about                about.html              About / meet the family
/contact              contact.html            Contact form
/large-opening-screens                 large-opening-screens.html
/lift-and-slide-door-installation      lift-and-slide-door-installation.html
/specialty-window-door-repair          specialty-window-door-repair.html
```
Clean URLs (`/sales` instead of `/sales.html`) are handled by `vercel.json`.

## Structure
```
*.html                one file per page
robots.txt, sitemap.xml
vercel.json           clean URLs, caching, security headers
favicon.png
assets/
  css/styles.css
  js/app.js           menu, gallery lightbox, team showcase, FAQ
  images/             site images incl. og-image.jpg
```

## Per-page SEO
- Each page has its own <title>, meta description, canonical, and Open Graph/Twitter tags
- LocalBusiness (HomeAndConstructionBusiness) JSON-LD with detailed window/door service
  catalog + reviews on every indexable page; relevant specialty pages also include Service schema
- `sitemap.xml` lists every indexable URL

## Canonical domain
The production domain is `https://www.visiblewindowsanddoors.com`. If it changes, update
the canonical/OG/JSON-LD URLs in `*.html` plus `robots.txt` and `sitemap.xml` together.

## Local preview
```bash
npm run dev
```

The local server mirrors Vercel's clean URL behavior, so navigation links such
as `/sales`, `/installation`, and `/service-maintenance` work exactly as they
do in production. It also mounts the form handler at `/api/submit`; delivery
still requires the environment variables described below.

The local preview executes the same `/api/submit` handler used in production. Email
delivery requires the Resend environment variables below; without them, the handler
returns its expected configuration error instead of sending mail.

Run the form-handler regression suite with `npm run test:forms`.

## Form delivery

The contact and service forms post to `api/submit.js`, which sends mail through Resend.
Set these variables for the **Production** environment in Vercel:

```text
RESEND_API_KEY=re_...
TO_EMAIL=contact@visiblewindowsanddoors.com
FROM_EMAIL=Visible Windows & Doors Website <website@visiblewindowsanddoors.com>
```

- `RESEND_API_KEY` is required.
- `TO_EMAIL` accepts one address or a comma-separated list. The legacy
  `BUSINESS_INBOX_EMAIL` variable is also supported during migration.
- `FROM_EMAIL` accepts either a bare address or a formatted sender. Its domain must be
  verified in Resend. The `onboarding@resend.dev` fallback is restricted by Resend and
  is not a production sender for arbitrary recipients.
- Optional images are limited to 3 MB so the complete multipart request remains below
  Vercel Functions' 4.5 MB request-body limit.

After changing environment variables, redeploy and smoke-test all three paths: contact,
service request, and specialty repair—with and without an optional image.

## Deploy to Vercel
Push to GitHub -> import in Vercel -> Framework preset **Other** (no build command) -> Deploy.

Set the Vercel Root Directory to `visible-windows-doors-site-SEO-FIXES` when importing
this repository.
