# Linktree backend (Render)

Node.js + Express API with MongoDB storage and password-protected owner sessions.

1. Create a MongoDB Atlas cluster and a database user. In Atlas Network Access, allow the outbound IP ranges shown in your Render service dashboard under Connect, Outbound. Do not open the cluster to every IP address.
2. Copy `.env.example` to `.env` for local work and enter real values only in your local ignored file or Render's Environment settings.
3. Run `npm install`, then `npm start`. The server connects to MongoDB, creates the collection and indexes through Mongoose, and seeds missing public social links at startup.
4. Health check: `GET /health`.

Render settings: Root Directory `Backend`; Build Command `npm ci`; Start Command `npm start`. Set `MONGODB_URI`, `OWNER_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` (32+ characters), and `FRONTEND_ORIGIN`. Set NODE_ENV to production on Render; Render supplies PORT.

For the first deployment, set FRONTEND_ORIGIN temporarily to a valid placeholder such as https://example.vercel.app; replace it with your Vercel address after the first Vercel deployment, then redeploy Render. The schema starts empty apart from LinkedIn, GitHub, and TikTok. It cannot read or import the former Sites D1 database automatically. Export any links, visibility settings, and click counts you want to preserve before switching providers.
