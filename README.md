# SINAR Institute Website

**Stack:** Next.js 14 (App Router) + Sanity v3 + Tailwind CSS + TypeScript  
**Deploy:** Vercel (web) + Sanity CDN (studio) + Hostinger (domain DNS only)

---

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Sanity account (sanity.io — free)
- Vercel account (vercel.com — free)
- Resend account (resend.com — free tier: 3000 emails/month)

---

## Setup Steps

### 1. Sanity Project

```bash
# Create Sanity project
npx sanity@latest init --bare

# Note your projectId from the output
```

Or go to https://sanity.io/manage → New Project → note the Project ID.

### 2. Install Dependencies

```bash
cd sinar-institute
pnpm install
```

### 3. Environment Variables

```bash
cp apps/web/.env.example apps/web/.env.local
```

Fill in:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — from step 1
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `RESEND_API_KEY` — from resend.com → API Keys

Also fill `apps/studio/sanity.cli.ts` with your project ID (replace `process.env.SANITY_PROJECT_ID`).

### 4. Add CORS Origin to Sanity

Go to https://sanity.io/manage → your project → API → CORS Origins

Add:
- `http://localhost:3000` (development)
- `https://sinarinstitute.com` (production)
- `https://your-vercel-url.vercel.app` (preview)

### 5. Run Locally

```bash
# Run web (terminal 1)
pnpm dev:web

# Run studio (terminal 2)
pnpm dev:studio
```

Web: http://localhost:3000  
Studio: http://localhost:3333

---

## Adding Content

1. Open Sanity Studio (localhost:3333 or studio.sinarinstitute.com)
2. Start by adding **People** (Tim) first — referenced by other content types
3. Add **Research Project** (TIDE 2026)
4. Add **Insights** (set status to "published" to show on site)
5. Add **Partners** (for the network section on homepage)

---

## Deploy

### Studio (CMS Admin)

```bash
cd apps/studio
pnpm deploy
# Follow prompts → choose hostname (e.g., sinar-institute)
# Studio will be at: https://sinar-institute.sanity.studio
```

### Web (Frontend) — Vercel

1. Push to GitHub
2. Go to vercel.com → New Project → import repo
3. Set root directory: `apps/web`
4. Add environment variables (same as .env.local)
5. Deploy

### Domain Setup (Hostinger)

In Hostinger DNS panel:
1. Add A Record: `@` → Vercel IP (from Vercel dashboard)
2. Add CNAME: `www` → `csprod.vercel-dns.com`
3. In Vercel: Settings → Domains → add `sinarinstitute.com`

Wait 1-24 hours for DNS propagation.

---

## Content Governance Reminders

- All targets must be labelled (Estimated / Planned / Target / Achieved / Verified)
- `findingsPublished: false` hides "View Preliminary Findings" button
- Case Studies section is hidden until verified case studies exist in CMS
- Do not add Dr. prefix to names without confirmation
- Do not label institutions as "Official Partners" without formal agreement

---

## Project Structure

```
apps/
├── web/           # Next.js 14 frontend
│   ├── app/       # Pages (App Router)
│   ├── components/ # UI components
│   └── lib/       # Sanity client, queries, types
└── studio/        # Sanity Studio CMS
    └── schemas/   # Content type definitions
```
