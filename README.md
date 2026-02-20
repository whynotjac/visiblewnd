# Visible Windows & Doors Website

Production-ready Next.js App Router website for Visible Windows & Doors, built from `Master.md`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Resend email delivery for forms

## Routes

- `/`
- `/sales`
- `/installation`
- `/service-maintenance`
- `/projects`
- `/about`
- `/contact`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm run dev
```

## Form Delivery

Both the Contact form and Service & Maintenance form submit to API routes and deliver messages via Resend. Configure:

- `RESEND_API_KEY`
- `BUSINESS_INBOX_EMAIL`
- `FROM_EMAIL`

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```
