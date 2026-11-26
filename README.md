# Developer CV and portfolio

A full-stack CV and portfolio site built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Motion**, **Prisma** and **PostgreSQL**. Ready to deploy on Vercel.

- Hero with an animated name (variable-font weight wave that follows the pointer), rotating titles and a tilting profile photo
- About, Experience (scroll-drawn timeline), Skills (animated bars), Projects (filterable cards), Education, Certifications and Awards, Contact
- Light and dark theme (follows the system, switchable, no flash on load)
- Contact form with client and server validation, honeypot, rate limiting and database storage, plus optional email notifications
- CV downloads as a PDF generated from the same data as the website (`/cv.pdf`)
- SEO: metadata, Open Graph image, sitemap, robots, JSON-LD. Accessibility: skip link, keyboard focus, reduced-motion support

## 1. Put your own details in

Everything on the site and in the PDF comes from **one file**: `src/data/profile.ts`.

1. Replace the sample name, titles, experience, skills, projects, education, certifications and awards.
2. Replace `public/profile.svg` with your photo (for example `public/profile.jpg`, about 800 x 1000 px) and update `photo.src`.
3. Optionally add a screenshot to a project with `image: { src: "/projects/orbit.jpg", alt: "..." }`. Without one, a generated preview is shown.
4. Set `sampleContent` to `false` when you're done.

The site title, social links, PDF and share image all update automatically.

## 2. Run it locally

Requirements: Node.js 20.9 or newer, and Docker (or any PostgreSQL database).

```bash
npm install
cp .env.example .env            # then edit the values (Windows PowerShell: Copy-Item .env.example .env)
docker compose up -d            # starts a local PostgreSQL (skip if using Neon or Supabase)
npx prisma migrate deploy       # creates the ContactMessage table
npm run dev                     # http://localhost:3000
```

Prisma reads `.env` (not `.env.local`), so keep all values in `.env`. No Docker? Create a free database at neon.tech and paste its connection string into `DATABASE_URL`. Generate `IP_HASH_SALT` with `openssl rand -hex 32`, or in PowerShell: `-join ((48..57)+(97..122) | Get-Random -Count 40 | % {[char]$_})`.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the Prisma client and build for production |
| `npm run typecheck` | Check TypeScript without building |
| `npm run db:studio` | Browse stored contact messages in a web UI |

## 3. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `IP_HASH_SALT` | Yes in production | Random secret used to hash visitor IPs for rate limiting (raw IPs are never stored) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your public URL, for SEO tags and the sitemap. Falls back to the Vercel domain |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Optional | Email yourself when someone sends a message ([Resend](https://resend.com)) |

Secrets are read only on the server and are never sent to the browser. `.env*` files are git-ignored.

## 4. Deploy to Vercel

1. **Create a database.** Any hosted PostgreSQL works. The quickest route is Vercel: open your project, then **Storage**, then add a **Neon** (Postgres) database from the Marketplace. It adds `DATABASE_URL` for you. Supabase works too: copy its connection string.
2. **Push the code to GitHub** and import the repository at [vercel.com/new](https://vercel.com/new). Framework preset: Next.js (detected automatically).
3. **Add environment variables** under Project Settings, then Environment Variables: `DATABASE_URL` (if not added already), `IP_HASH_SALT` and `NEXT_PUBLIC_SITE_URL`.
4. **Create the table once**, from your own computer, pointing at the production database:

   ```bash
   DATABASE_URL="your-production-connection-string" npx prisma migrate deploy
   ```

5. **Deploy.** Every push to your main branch redeploys automatically.
6. Open your live site, send a test message and confirm it appears in the database (`npm run db:studio` with the production `DATABASE_URL`).

If the contact form says it "isn't set up yet", `DATABASE_URL` or `IP_HASH_SALT` is missing in Vercel. Add it and redeploy.

## 5. Project structure

```
prisma/                  Database schema and migration
src/
  app/
    api/contact/route.ts Contact API (validation, rate limit, storage)
    cv.pdf/route.ts      Generates the downloadable CV
    layout.tsx           Fonts, metadata, theme, structured data
    page.tsx             Page assembled from section components
  components/
    sections/            Hero, About, Experience, Skills, Projects, Education, Awards, Contact
    ui/                  Reusable pieces: buttons, icons, skill bar, project card
  data/profile.ts        All of your content
  lib/                   Database client, env validation, validation schema, PDF builder
```

## 6. How the contact form is protected

- The same Zod schema validates in the browser and on the server, and the server is the source of truth
- Hidden honeypot field catches simple bots
- Max 3 messages per visitor per 10 minutes, tracked by a salted hash of the IP
- Requests from other websites are rejected, and the body size is capped
- Security headers are set in `next.config.ts`
