# Deploy Laptopify on Render

The root `render.yaml` defines the Django API and persistent Render Postgres database. The React/Vite frontend is deployed separately on Vercel; see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md). Create a Blueprint from this repository in Render and sync it. The API and Postgres plans are paid plans because production migrations run in the API's pre-deploy command. Review the plan and billing shown by Render before creating resources.

## Required production credentials

Set the Blueprint's `sync: false` variables in the Render Dashboard before the first successful deploy:

- `CORS_ALLOWED_ORIGINS`: the exact production Vercel origin, such as `https://laptopify.vercel.app` (no trailing slash). Add any custom/preview origins you will use, separated by commas.
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID`: Twilio Verify credentials. The Verify service must be enabled for SMS and configured for the countries you support. OTP login has no production fallback that reveals a code in the browser.
- `RESEND_API_KEY`: Resend API key.
- `CONTACT_EMAIL_FROM`: sender address on a domain verified in Resend. The recipient is preconfigured as `cherishbywedknotcraft@gmail.com` in the Blueprint.
- `AWS_STORAGE_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: a private S3-compatible bucket and restricted IAM credentials for KYC document persistence. Set the bucket's region in `AWS_S3_REGION_NAME` if it is not `ap-south-1`.

Keep these credentials in Render's backend environment only. Do not add them to Vite variables or commit them. KYC documents are private and use signed object URLs. Configure lifecycle/retention for identity documents according to your privacy and legal requirements.

## First deployment

1. Push the repository to GitHub.
2. Create the Vercel project from the GitHub repository with `frontend` as its root directory. Set `VITE_API_URL` to `https://laptopify-api.onrender.com` (or the actual API hostname) before the first production build.
3. Create the private S3 bucket and verify the Twilio and Resend accounts/sender domain.
4. In Render, create a Blueprint from the repository. Enter all `sync: false` values when prompted, including the Vercel production origin for `CORS_ALLOWED_ORIGINS`, before the first deploy. Set `CONTACT_EMAIL_FROM` to the verified Resend sender. Review the service hostnames and paid plans before confirming resource creation.
5. Sync/deploy the Render Blueprint. It runs Django migrations before starting the API. Confirm `/api/health/` returns `{"status":"ok"}` on the API host, then deploy the Vercel frontend.
6. Create an admin account from the API service Shell with `python manage.py createsuperuser`. Admin staff must review KYC documents and set their status to Verified before sellers can submit inspection details.
7. Verify a real SMS, contact email, KYC upload, and end-to-end buyback flow using provider-approved test numbers and data.

For a custom domain, update `DJANGO_ALLOWED_HOSTS` to include the API host/custom domain and include the exact frontend origin in `CORS_ALLOWED_ORIGINS`; update the frontend's `VITE_API_URL` to the API origin and redeploy it. Django deliberately fails to start in production when the persistent database URL or private KYC storage bucket is missing.

Local development continues to use the root `.env`, SQLite, local media, and the development OTP provider. To use a real SMS provider locally, add the Twilio Verify variables to the backend `.env`; the production frontend never receives provider credentials.
