# Deploying UCU Lost & Found on Vercel

One Vercel project serves both parts:
- the React (Vite) frontend, built to `frontend/dist`
- the Express backend, running as a serverless function (`api/index.js` -> `backend/app.js`) under `/api/*`

Because both live on the same domain, the frontend calls `/api` with no CORS or URL settings needed.

## 1. Create a hosted MySQL database
Vercel has no MySQL. Use any hosted MySQL (TiDB Cloud, Aiven, Railway, Clever Cloud...).
Note its host, port, user, password and database name. The app creates its own tables on first request
(`backend/schema.sql` is only for reference).

## 2. Push to GitHub and import into Vercel
Push this folder (the one containing `vercel.json`) as the repo root, then "Add New > Project" in Vercel.
Leave Root Directory empty. The settings come from `vercel.json`.

## 3. Add a Blob store (for photos)
Vercel project > Storage > Create > Blob > connect to the project.
This adds `BLOB_READ_WRITE_TOKEN` automatically.

## 4. Environment variables
Vercel project > Settings > Environment Variables (see `.env.example`):
`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL=true`, `JWT_SECRET`.
Do NOT set `VITE_API_URL`. Redeploy after adding variables.

## 5. Create the admin account (once, from your computer)
```
cp .env.example .env      # fill in the same DB values + ADMIN_* values
npm install
npm run admin:create
```
(Optional demo students: `npm run seed`.)
Open the site and log in with the admin email/password.

## Local development
```
npm install && npm --prefix frontend install
npm run dev:backend       # http://localhost:5000  (photos saved in backend/uploads)
npm run dev:frontend      # http://localhost:5173  (proxies /api to the backend)
```

## Notes
- Photo limit is now 4 MB (Vercel rejects request bodies above 4.5 MB).
- Old items whose `photo_url` starts with `/uploads/` will show a broken image; re-upload those photos.
