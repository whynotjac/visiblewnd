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
  catalog + reviews on every page; extra Service schema on Installation, Sales, and Service pages
- sitemap.xml lists all 7 URLs

## Before going live
Replace `https://visiblewindowsanddoors.com` in every `*.html` (canonical/OG/JSON-LD),
`robots.txt`, and `sitemap.xml` with your real domain.

## Local preview
```bash
npx serve .        # or: python3 -m http.server 8000
```
Note: with a plain static server, use `/sales.html`; on Vercel, `/sales` works via cleanUrls.

## Deploy to Vercel
Push to GitHub -> import in Vercel -> Framework preset **Other** (no build command) -> Deploy.
