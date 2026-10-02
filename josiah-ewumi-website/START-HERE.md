# Start here: Josiah Ewumi Website

This is the complete frontend and backend in one folder.

Frontend: app/page.tsx, app/contact.tsx, app/globals.css
Owner interface: app/admin/
Backend: app/api/links/route.ts and app/go/[id]/route.ts
Database: db/schema.ts, drizzle/ and lib/link-store.ts
Authorization and validation: lib/owner.ts and lib/link-validation.ts
CV: public/documents/josiah-ewumi-cv.pdf
Tests: tests/integration.mjs

## Run locally

Install Node.js 22.13 or later, then open a terminal in this folder:

1. npm ci
2. Copy .env.example to .env and set OWNER_EMAIL=seedy@sites.test for local simulated sign-in only.
3. npm run build
4. Run the initial local migration once:
   node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_first_nekra.sql
5. npm run dev
6. Open the Local URL shown. Use Manage my links to test the owner interface.

Production uses real ChatGPT authentication, your configured owner email, and hosted D1 storage. No credentials or local test records are included in this folder.

A localhost address cannot be shared for phone testing. A successful deployment and confirmed public URL are still required.
