# Josiah Ewumi — Portfolio & Link Tree

[Visit my website](https://yb-josiah-gy-projects.josiahewumi097.chatgpt.site)

My projects, experience, graduation photos, CV, and contact details in one place. Visitors can reach me through email or WhatsApp and find my LinkedIn, GitHub, and TikTok profiles.

## Features

- Blue and black design with dark and light themes.
- Project descriptions with my contributions and links to code.
- CV with view and download options.
- Owner dashboard at /admin to add links and change their visibility.
- Persistent social-link click counts and owner-only private links.

## Structure

The application code is separated by responsibility. Shared package and build configuration stays at the root so one install runs the whole application.

| Folder | Purpose |
| --- | --- |
| `Frontend/app` | Pages, styles, contact actions, and thin framework route connectors |
| `Frontend/components`, `Frontend/hooks`, `Frontend/lib` | UI components, hooks, and display utilities |
| `Frontend/public` | CV, graduation photos, and other public assets |
| `Backend/routes` | API handlers and tracked-link redirects |
| `Backend/auth`, `Backend/lib` | Authentication, owner checks, validation, storage, and connector services |
| `Backend/db`, `Backend/drizzle` | Database schema and migrations |
| `Backend/build` | Worker entry point and runtime build plugins |
| `Backend/tests` | Local integration checks |
| `config` | Hosting settings |
| `scripts` | Shared development commands and CV generation |
| `Backend/legacy`, `Frontend/legacy` | Previous Express server and browser files, preserved for reference |

The two `route.ts` files under `Frontend/app` only re-export handlers from `Backend/routes`. Vinext requires these files to discover URLs. Server-rendered pages call backend services, while database access and authentication remain on the server. This is one full-stack application, not two independently deployed services.

## Run locally

Requires Node.js 22.13 or newer.

1. Run npm ci.
2. Set OWNER_EMAIL=seedy@sites.test in an ignored .env file for the local simulated owner.
3. Run `npm run db:migrate:local` to initialize the local database.
4. Run npm run dev and open http://127.0.0.1:5173.
5. Open /admin to manage local links.

The local preview has its own D1 database. Production uses verified ChatGPT sign-in and a secret OWNER_EMAIL setting. Never enable the development identity on a public deployment.

## Checks

- Type check: npm run typecheck
- Production build: npm run build
- Backend checks, with the local preview running: npm run test:integration

Backend checks cover owner access, visibility, click counting, URL validation, and request protection. They create a disposable private link in the local database.

## Make changes

- Introduction and experience: Frontend/app/page.tsx
- Projects: Frontend/app/projects.tsx
- Contact details: Frontend/app/contact.tsx
- Appearance: Frontend/app/globals.css
- Social links: owner dashboard

To rebuild the CV, install reportlab and pypdf, then run python scripts/build_cv.py. Inspect both PDF pages before publishing.

## Hosting and data

Sites hosts the website using a Cloudflare Worker and D1 database. Configuration lives in `config/hosting.json`; builds copy it and the database migrations to `dist/config`. This repository does not create an OpenAI-named directory. The existing hosted website remains on its current deployment. The Sites publishing helper expects its original metadata layout, so it cannot directly publish this reorganized checkout without a deployment integration update. Building locally does not publish the website.

The application stores link records and aggregate click counts. Counts include repeat visits and bots and do not measure unique people. CV and contact actions do not use this counter.

Changing hosts requires a database transfer and replacement for Sites authentication. This host assigns the .chatgpt.site address. A custom domain requires a domain the owner controls.
