# Josiah Ewumi — Linktree and Portfolio

The repository contains two independent applications. Frontend/ is the Next.js site for Vercel. Backend/ is the Express API for Render. Read each folder's README for commands.

## MongoDB and private settings

Create a MongoDB Atlas cluster and a database user. Copy the connection string into Render's MONGODB_URI setting. In Atlas Network Access, allow the outbound IP ranges shown on the Render service page under Connect, Outbound. Use a strong database password, and URL-encode special characters inside the connection string.

Render also needs OWNER_EMAIL (josiahewumi097@gmail.com), a unique strong ADMIN_PASSWORD, a random SESSION_SECRET of at least 32 characters, and FRONTEND_ORIGIN (the exact Vercel site origin). Set NODE_ENV to production on Render; Render supplies PORT. Vercel needs BACKEND_URL, set to the Render service URL. Keep these values in the hosting dashboards or ignored local environment files; never commit real secrets.

## First deployment order

1. Create the Render service from Backend/. For the initial deploy, set FRONTEND_ORIGIN to a valid temporary URL such as https://example.vercel.app.
2. Create the Vercel project from Frontend/, choose Next.js, use npm install and npm run build, and leave the output directory at Next.js default. Initially set BACKEND_URL to the Render service URL. Vercel gives the project its vercel.app address.
3. Set Render's FRONTEND_ORIGIN to that exact Vercel address and redeploy Render.
4. Verify owner sign-in, public links, private links, editing, and click tracking. Then share your new Vercel address.

The new database seeds LinkedIn, GitHub, and TikTok if those entries are missing. It does not copy custom links, visibility settings, or click counts from the former Sites D1 database. Export those records before switching if you want to retain them. The owner dashboard now uses a separate admin password and signed session.

The former Express prototype remains under Backend/legacy with its old browser files in Frontend/legacy; neither folder powers the new deployment.
