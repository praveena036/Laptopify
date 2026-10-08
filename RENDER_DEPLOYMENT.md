# Laptopify free demo backend on Render

The root `render.yaml` creates the Django API and a free Render Postgres database. The React frontend stays on Vercel. This setup is for a temporary demo, not a production buyback service: Render's free web service sleeps when idle, its filesystem is temporary, and its free Postgres database has a limited lifetime. Do not collect real identity documents or rely on the demo to retain requests.

## Create the backend

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint**, connect `praveena036/Laptopify`, and select the `main` branch. Do not create a separate Django web service from the New Web Service form; the Blueprint reads the root `render.yaml` and creates the API and database on the free plans.
3. When Render asks for environment values, set `CORS_ALLOWED_ORIGINS` to the exact Vercel origin, for example `https://laptopify-vert.vercel.app` (no trailing slash). Set `DJANGO_ADMIN_USERNAME`, `DJANGO_ADMIN_EMAIL`, and a unique `DJANGO_ADMIN_PASSWORD` of at least 12 characters. Keep the password private. The startup command creates the first admin once so you can review KYC at `/admin/` without Render Shell access.
4. Confirm the resource plan says **Free** before creating/syncing. Wait for the API to deploy, then open `https://laptopify-api.onrender.com/api/health/`; it should return `{"status":"ok","demo_mode":true}`.
5. In Vercel, set `VITE_API_URL` to the actual Render API origin and redeploy the frontend.

## Optional integrations

- **SMS OTP:** add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_VERIFY_SERVICE_SID` to the Render API environment. A Twilio trial may restrict recipients to verified numbers and has trial limits. Without these values, OTP sending correctly reports that SMS is not configured; it does not reveal or fabricate a code.
- **Contact email:** add `RESEND_API_KEY` and `CONTACT_EMAIL_FROM` to Render. The sender must be verified in Resend. The recipient is set to `cherishbywedknotcraft@gmail.com`.
- **Persistent private KYC files:** for a real production deployment, configure a private S3-compatible bucket and `AWS_STORAGE_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_S3_REGION_NAME`. Render Free's filesystem does not persist uploads.

The database can expire and be deleted on the free plan; back up anything you need. For production, turn off `DEMO_MODE`, use a persistent paid database and private object storage, and add the real SMS and email providers. Keep all provider credentials in Render, never in Vite or Git.
