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

### 🚀 Deploy to Vercel (recommended)

#### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimranext%2Fiportfolio&env=DATABASE_URI,PAYLOAD_SECRET,NEXT_PUBLIC_SERVER_URL,RESEND_API_KEY,CONTACT_FROM_EMAIL,CONTACT_TO_EMAIL&envDescription=See%20.env.example%20for%20details&envLink=https%3A%2F%2Fgithub.com%2Fimranext%2Fiportfolio%2Fblob%2Fmain%2F.env.example&project-name=iportfolio&repository-name=iportfolio)

#### Manual deploy (5 minutes)

**1. Push the branch to `main`** (or import the `feat/nextjs-payload-rebuild` branch directly):

```bash
git checkout feat/nextjs-payload-rebuild
git push origin feat/nextjs-payload-rebuild
```

**2. Create a Postgres database**

Easiest options:

- [**Neon**](https://neon.tech) — free tier, generous, recommended.
- [**Vercel Postgres**](https://vercel.com/storage/postgres) — integrated, one-click from the project dashboard.
- [**Supabase**](https://supabase.com) — free tier with extras.

Copy the **connection string** (e.g. `postgres://user:pass@host/db?sslmode=require`).

**3. Generate a Payload secret**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**4. Import the repo on Vercel**

1. Go to [vercel.com/new](https://vercel.com/new) → import `imranext/iportfolio`.
2. **Framework preset**: Next.js (auto-detected).
3. **Build command**: `pnpm build` (auto-detected).
4. **Install command**: `pnpm install` (auto-detected).
5. Skip "Deploy" for now — add env vars first.

**5. Set environment variables**

In **Project Settings → Environment Variables**, add:

| Variable                | Value                                                             |
| ----------------------- | ----------------------------------------------------------------- |
| `DATABASE_URI`          | Your Postgres connection string from step 2                       |
| `PAYLOAD_SECRET`        | The 64-char hex string from step 3                                |
| `NEXT_PUBLIC_SERVER_URL`| `https://<your-project>.vercel.app` (update after first deploy)   |
| `RESEND_API_KEY`        | API key from [resend.com](https://resend.com) — optional in dev   |
| `CONTACT_FROM_EMAIL`    | `"ImranX <hello@your-verified-domain.com>"`                       |
| `CONTACT_TO_EMAIL`      | `imranlabs@yahoo.com`                                             |

**6. Add Vercel Blob storage for media uploads** *(important — Vercel has no persistent disk)*

1. **Project → Storage → Connect Store → Blob → Create**.
2. This automatically adds `BLOB_READ_WRITE_TOKEN` to your env vars — no copy/paste needed.
3. Redeploy.

Without this step, admin-uploaded images would be lost on every redeploy. The Payload config auto-detects the token and switches to Blob storage when present.

**7. Deploy & create your admin user**

1. Click **Deploy**.
2. Visit `https://<your-project>.vercel.app/admin`.
3. Create your first admin user.
4. Update `NEXT_PUBLIC_SERVER_URL` to your real domain and redeploy.

**8. (Optional) Connect a custom domain**

**Project Settings → Domains** → add your domain. Update `NEXT_PUBLIC_SERVER_URL` accordingly.

---

### Schema migrations

The Postgres adapter auto-syncs schema in development. For production, generate proper migrations once your schema is stable:

```bash
pnpm payload migrate:create
pnpm payload migrate
```

Then change `postgresAdapter({ pool, push: false })` in `payload.config.ts` to disable auto-push in production.

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
