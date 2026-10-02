# Josiah Ewumi — Personal Links

Responsive public profile with LinkedIn, GitHub, and TikTok. `/admin` allows the owner to add/edit links, control public visibility, and view click totals. Additional links start private.

## Running locally

Node 22.13+ is required. Install locked dependencies with `npm ci`, then run `npm run dev`. Set `OWNER_EMAIL=seedy@sites.test` in an ignored `.env` for the starter's local-only simulated sign-in. Production uses real ChatGPT sign-in and a secret OWNER_EMAIL configured in Sites. Never enable a development identity in production.

Generate database migrations with `npm run db:generate`, build with `npm run build`, then apply new migrations to local D1 with the command described in the Sites starter documentation. The generated schema migration is `drizzle/0000_first_nekra.sql`.

## Security and behavior

- Public HTML contains public link IDs, titles, and descriptions only. Private links and destination URLs are not serialized there.
- Owner access is checked server-side against the authenticated email on every management read and mutation. It fails closed when configuration or identity is missing.
- Mutations require same-origin JSON, reject unknown fields, and validate URL schemes and length. SQL values use prepared parameters.
- The redirect query enforces visibility and increments clicks atomically. Hidden/private links return 404 for visitors, even if they know the ID.
- Click totals count GET visits, including repeat visits and bots. Known prefetch and HEAD requests do not count. Totals are not unique-human analytics and are not resistant to deliberate inflation.
- No visitor IP addresses, device identifiers, or event histories are stored by the application. Platform infrastructure may retain its own access logs.
- Default links are initialized idempotently; visibility and edits persist. There is no delete feature in this version.
- Public profile text is edited in source. Link content and visibility are edited in `/admin`.
- The updated two-page CV is publicly viewable/downloadable under `/documents/josiah-ewumi-cv.pdf`, with the user-approved phone and email contact details. Email buttons open a mail client; copy-email provides a fallback. There is no contact-form delivery service.

## Verification

`node tests/integration.mjs` targets only localhost:5173. It checks authorization, CSRF, URL validation, unknown fields, persistent visibility changes, hidden redirects, exact count increments, HEAD/prefetch exclusions, and link creation. It writes a disposable private test record to the local preview database only. Production starts with the three supplied links and zero clicks.

TypeScript and the production build passed. Mobile and desktop layouts and sign-in/management screens were reviewed in the browser. The WebMCP form helper passed valid and invalid-input checks.

A starter Next.js security advisory was addressed by updating to 16.3.8. The final production dependency audit has no high or critical findings and two moderate transitive findings in baseline-browser-mapping and fast-uri. They are not used by application URL validation or request authorization.

## Deployment

Sites project: appgprj_6abfa34a2ce08191a78553a3e5aa3b90. D1 binding: DB. No external database account is needed. The source feature branch is codex/josiah-links. The user authorized public publication and sharing. The hosting workflow pushes the finished feature branch to its designated remote main branch.

## Latest delivery status

Live at https://josiah-ewumi-links.josiahewumi097.chatgpt.site with public access and owner-only management. The public profile includes CV view/download, email/copy-email, WhatsApp (+234 701 565 1489), and two CV-backed project summaries. Blue and black are the primary palette. Dark mode is the default; the theme toggle remembers the visitor's choice locally. Projects are edited in app/projects.tsx and contact details in app/contact.tsx. These contact and CV actions are direct links, not part of social-link click analytics.

TypeScript, the production build, and the existing backend integration tests passed for this update. Desktop and mobile dark/light layouts and theme persistence were checked in the browser.

## Alternative address investigation

Cloudflare Workers offers a free workers.dev address (https://developers.cloudflare.com/workers/configuration/routing/workers-dev/), with the form worker-name.account-subdomain.workers.dev. Availability must be checked in the user's Cloudflare account; no alternate address is reserved yet. The requested .Josiah ending is not a delegated public top-level domain in IANA's list (https://data.iana.org/TLD/tlds-alpha-by-domain.txt).

A move requires a Cloudflare account, a new D1 database and transfer of existing records/counts, plus replacement of Sites-provided authentication with independently verified owner authentication. Never deploy the current trusted oai-authenticated-* header logic unchanged to an untrusted origin. Keep the current production site running until the replacement passes authorization and data-preservation checks. Migration remains subject to architectural approval and account access; this update does not migrate hosting.
