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

Frontend and backend live together at the repository root.

| Folder | Purpose |
| --- | --- |
| app | Pages, authentication, contact actions, and API routes |
| lib | Link storage, owner checks, and URL validation |
| public | CV and graduation photos |
| drizzle | Database schema migrations |
| tests | Local backend integration checks |
| scripts | Development commands and CV generation |
| legacy | Previous Express application, preserved for reference |

## Run locally

Requires Node.js 22.13 or newer.

1. Run npm ci.
2. Set OWNER_EMAIL=seedy@sites.test in an ignored .env file for the local simulated owner.
3. Run npm run dev and open http://127.0.0.1:5173.
4. Open /admin to manage local links.

The local preview has its own D1 database. Production uses verified ChatGPT sign-in and a secret OWNER_EMAIL setting. Never enable the development identity on a public deployment.

## Checks

- Type check: node node_modules/typescript/bin/tsc --noEmit
- Production build: npm run build
- Backend checks, with the local preview running: node tests/integration.mjs

Backend checks cover owner access, visibility, click counting, URL validation, and request protection. They create a disposable private link in the local database.

## Make changes

- Introduction and experience: app/page.tsx
- Projects: app/projects.tsx
- Contact details: app/contact.tsx
- Appearance: app/globals.css
- Social links: owner dashboard

To rebuild the CV, install reportlab and pypdf, then run python scripts/build_cv.py. Inspect both PDF pages before publishing.

## Hosting and data

Sites hosts the website using a Cloudflare Worker and D1 database. Configuration lives in .openai/hosting.json. Deployment requires authorized access to this existing Sites project.

The application stores link records and aggregate click counts. Counts include repeat visits and bots and do not measure unique people. CV and contact actions do not use this counter.

Changing hosts requires a database transfer and replacement for Sites authentication. This host assigns the .chatgpt.site address. A custom domain requires a domain the owner controls.
