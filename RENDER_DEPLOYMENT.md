# Deploy Laptopify on Render

The root `render.yaml` defines the Django API and persistent Render Postgres database. The React/Vite frontend is deployed separately on Vercel; see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md). Create a Blueprint from this repository in Render and sync it. The API and Postgres plans are paid plans because production migrations run in the API's pre-deploy command. Review the plan and billing shown by Render before creating resources.

## Required production credentials

Set the Blueprint's `sync: false` variables in the Render Dashboard before the first successful deploy:

- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID`: Twilio Verify credentials. The Verify service must be enabled for SMS and configured for the countries you support. OTP login has no production fallback that reveals a code in the browser.
- `RESEND_API_KEY`: Resend API key.
- `CONTACT_EMAIL_FROM`: sender address on a domain verified in Resend. The recipient is preconfigured as `cherishbywedknotcraft@gmail.com` in the Blueprint.
- `AWS_STORAGE_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: a private S3-compatible bucket and restricted IAM credentials for KYC document persistence. Set the bucket's region in `AWS_S3_REGION_NAME` if it is not `ap-south-1`.

Keep these credentials in Render's backend environment only. Do not add them to Vite variables or commit them. KYC documents are private and use signed object URLs. Configure lifecycle/retention for identity documents according to your privacy and legal requirements.

## First deployment

1. Push the repository to the Git provider connected to Render.
2. In Render, create a new Blueprint and select this repository. Check the service names/URLs and the paid web/Postgres plans before confirming resource creation.
3. Add the required provider and bucket credentials above to the API service. Set `CONTACT_EMAIL_FROM` to your verified Resend sender.
4. Create the Vercel project and set `VITE_API_URL` to the Render API origin as described in `VERCEL_DEPLOYMENT.md`. Copy the Vercel production origin into the Render API's `CORS_ALLOWED_ORIGINS` variable.
5. Sync/deploy the Render Blueprint. Render runs Django migrations before the API deploy. Then deploy the frontend from Vercel.
6. Create an admin account from the API service Shell with `python manage.py createsuperuser`. Admin staff must review KYC documents and set their status to Verified before sellers can submit inspection details.
7. Open the deployed site and confirm `/api/health/` returns `{"status":"ok"}` on the API host. Verify a real SMS, contact email, KYC upload, and end-to-end buyback flow using provider-approved test numbers and data.

For a custom domain, update `DJANGO_ALLOWED_HOSTS` to include the API host/custom domain and include the exact frontend origin in `CORS_ALLOWED_ORIGINS`; update the frontend's `VITE_API_URL` to the API origin and redeploy it. Django deliberately fails to start in production when the persistent database URL or private KYC storage bucket is missing.

Local development continues to use the root `.env`, SQLite, local media, and the development OTP provider. To use a real SMS provider locally, add the Twilio Verify variables to the backend `.env`; the production frontend never receives provider credentials.
