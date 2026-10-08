# Deploy the Laptopify frontend on Vercel

1. Import `https://github.com/praveena036/Laptopify.git` into Vercel.
2. Set the project Root Directory to `frontend`. Vercel detects Vite; the build command is `npm run build` and the output directory is `dist`.
3. Add the production environment variable `VITE_API_URL` with the full Render API origin, for example `https://laptopify-api.onrender.com`. Use the actual API URL shown by Render. Vite variables are public, so this value must be only the API URL; never put provider keys or private credentials in a `VITE_*` variable.
4. Deploy the production branch. `frontend/vercel.json` rewrites client-side routes to the SPA entry point.
5. Copy the production Vercel origin (for example `https://laptopify.vercel.app`) into Render's `CORS_ALLOWED_ORIGINS`, with no trailing slash. Add any custom frontend domain or Vercel preview origins that should be allowed, separated by commas, then redeploy the API.

The API URL is embedded at frontend build time. Redeploy the frontend after changing `VITE_API_URL`.
