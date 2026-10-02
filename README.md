# Josiah Ewumi — Personal Linktree & Portfolio

A personal website bringing together my Mechanical Engineering background, project/program management experience, software projects, CV, and contact links.

**[Visit the live website](https://josiah-ewumi-links.josiahewumi097.chatgpt.site)** · **[Download my CV](josiah-ewumi-website/public/documents/josiah-ewumi-cv.pdf)**

## Features

- Responsive blue-and-black design with dark/light mode and a saved theme preference.
- LinkedIn, GitHub, TikTok, and additional owner-managed links.
- Server-side social-link click counts.
- Owner-only dashboard for editing links and choosing public/private visibility.
- Five selected projects, professional experience, and a graduation photo gallery.
- Two-page CV with view/download actions.
- Direct WhatsApp and email contact, with a copy-email fallback.

## Selected projects

| Project | Role |
| --- | --- |
| 12 kVA solar power installation | Co-lead engineer |
| LASU student mental-health programme | Lead project/program manager; PMC co-founder |
| Personal link-tree website | Full-stack project |
| Supermarket management program | Full-stack project |
| Personal finance tracker | Project manager |

## Repository layout

The complete current application is in **[josiah-ewumi-website/](josiah-ewumi-website/)**. Frontend and backend are kept together in this directory.

- `app/`: public profile, project/gallery UI, owner dashboard, API routes, and tracked redirects.
- `lib/`: database operations, validation, and owner authorization.
- `db/` and `drizzle/`: database schema and migrations.
- `public/`: graduation photographs and the downloadable CV.
- `scripts/build_cv.py`: reproducible PDF CV generator.
- `tests/integration.mjs`: local backend checks.

Earlier repository files remain outside this application folder.

## Technology

React, TypeScript, Vinext/Vite, Cloudflare Workers-compatible server output, D1/SQLite, Drizzle ORM, Zod, and Sites hosting. The live owner dashboard uses Sites-provided ChatGPT authentication.

## Local setup

Requires Node.js 22.13 or newer.

```sh
cd josiah-ewumi-website
npm ci
```

Copy `.env.example` to an ignored `.env`. For the local preview only, set `OWNER_EMAIL=seedy@sites.test` to use the starter's simulated identity. Initialize the local D1 database using the application's migration setup, then run:

```sh
npm run dev
```

The usual development address is `http://127.0.0.1:5173`. See the [application README](josiah-ewumi-website/README.md) and included Sites setup scripts for database and runtime details. Never use the simulated identity in production.

## Checks

```sh
npx tsc --noEmit
npm run build
node tests/integration.mjs
```

Run integration tests with the local server and local D1 database running. The tests create a private local test record. They cover authorization, URL validation, visibility, persistence, and click-count behavior.

## Updating content

- Bio and graduation gallery: `app/page.tsx`.
- Projects and experience: `app/projects.tsx`.
- Colours, layout, and theme: `app/globals.css` and `app/theme.tsx`.
- Email and WhatsApp: `app/contact.tsx`.
- Social links and visibility: sign in to `/admin` on the live site.
- CV: edit `scripts/build_cv.py`, install Python's `reportlab` and `pypdf`, run `python scripts/build_cv.py`, and visually check both PDF pages.

## Deployment and privacy

The current live deployment is managed through Sites. GitHub is a source backup; pushing here alone does not publish the website. Keep secrets out of Git.

Owner permissions are checked on the server. Private links are excluded from public results and unauthorized redirects return 404. Counts represent social-link visits, not unique visitors. CV, email, WhatsApp, and gallery actions are direct links and are not included in social-link analytics.

Moving to another host requires configuring its database and replacing the Sites authentication integration securely.

## Contact

[LinkedIn](https://www.linkedin.com/in/josiah-ewumi-319879334) · [GitHub](https://github.com/Your-Boy-Josiah) · [WhatsApp](https://wa.me/2347015651489) · [Email](mailto:josiahewumi097@gmail.com)
