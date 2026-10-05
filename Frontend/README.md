# Linktree frontend (Vercel)

Next.js portfolio UI; its server calls the API, and same-origin route handlers proxy owner actions and tracked redirects.

For local use, copy `.env.example` to `.env.local`, set `BACKEND_URL=http://localhost:4000`, run `npm install`, and run `npm run dev`.

Vercel settings: Root Directory `Frontend`; Framework Preset `Next.js`; Install Command `npm install`; Build Command `npm run build`; leave Output Directory at the Next.js default. Add server-only `BACKEND_URL` pointing to the deployed Render API. Do not put database credentials or admin passwords in the frontend environment.
