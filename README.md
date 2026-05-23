# ImranX — Portfolio

A modern, animated portfolio website with a fully-loaded admin panel.

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion
- **CMS / Admin**: Payload CMS v3 (mounted at `/admin`)
- **Database**: PostgreSQL (Neon, Supabase, RDS, or local)
- **Email**: Resend (contact form)
- **UI primitives**: Radix UI + shadcn-style components

The original Bolby HTML template lives in [`./demo/`](./demo/) for reference.

---

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Then fill in:

- `DATABASE_URI` — Postgres connection string. Free Postgres options:
  - [Neon](https://neon.tech) (recommended)
  - [Supabase](https://supabase.com)
  - [Railway](https://railway.app)
  - Or local: `postgres://postgres:postgres@localhost:5432/iportfolio`
- `PAYLOAD_SECRET` — generate with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- `RESEND_API_KEY` — sign up at [resend.com](https://resend.com) for the contact form. Optional in dev (the form will log to console if missing).

### 3. Run the dev server

```bash
pnpm dev
```

- Frontend: http://localhost:3000
- Admin panel: http://localhost:3000/admin

The first time you visit `/admin`, Payload prompts you to **create the first admin user**.

### 4. Add your content

In the admin panel:

| Section          | Where to edit                       |
| ---------------- | ----------------------------------- |
| Hero             | Globals → Hero                      |
| About            | Globals → About                     |
| Contact info     | Globals → Contact                   |
| Site name / logo | Globals → Site Settings             |
| Services         | Collections → Services              |
| Portfolio        | Collections → Portfolio             |
| Experience       | Collections → Experience            |
| Education        | Collections → Education             |
| Skills           | Collections → Skills                |
| Testimonials     | Collections → Testimonials          |
| Media (uploads)  | Collections → Media                 |

The homepage uses ISR (`revalidate: 60`) so changes show within a minute.

---

## Scripts

| Command                     | Purpose                                         |
| --------------------------- | ----------------------------------------------- |
| `pnpm dev`                  | Run dev server                                  |
| `pnpm build`                | Production build                                |
| `pnpm start`                | Run production build                            |
| `pnpm typecheck`            | TypeScript check                                |
| `pnpm lint`                 | ESLint                                          |
| `pnpm generate:types`       | Generate `payload-types.ts` from your schema    |
| `pnpm generate:importmap`   | Regenerate Payload admin importMap              |

After making collection or global changes, run:

```bash
pnpm generate:types
```

---

## Deployment

### Vercel + Neon (recommended)

1. Push this repo to GitHub.
2. Create a Postgres database on [Neon](https://neon.tech).
3. Import the repo on Vercel.
4. Add the same env vars from `.env.example` in the Vercel project settings.
5. Deploy. Visit `https://your-domain.com/admin`.

### Media uploads

`Media` is currently set to local disk (`media/`). For production, switch to S3 / R2 / Vercel Blob using the Payload Cloud Storage plugin — see [Payload docs](https://payloadcms.com/docs/upload/storage-adapters).

---

## Project structure

```
src/
├─ app/
│  ├─ (frontend)/        ← public website
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ globals.css
│  ├─ (payload)/         ← admin panel + REST/GraphQL routes
│  │  ├─ admin/
│  │  ├─ api/
│  │  └─ layout.tsx
│  └─ api/contact/       ← contact form handler (Resend)
├─ collections/          ← Payload collections
├─ globals/              ← Payload globals
├─ components/
│  ├─ sections/          ← page sections (hero, services, …)
│  └─ ui/                ← shadcn-style primitives
├─ lib/                  ← helpers (payload client, utils, …)
└─ payload.config.ts
```
