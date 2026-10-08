# OTP login setup

The frontend sends the mobile number to Django. Django handles both OTP delivery and verification:

- With `DJANGO_DEBUG=true` and `SMS_PROVIDER=console`, Django creates a five-minute development OTP and returns it to the local UI for testing.
- With `DJANGO_DEBUG=false` and `SMS_PROVIDER=twilio`, Django sends and checks the OTP through Twilio Verify. The code is never returned to the deployed browser or stored in the application database.

## Local setup

Create `.env` from `.env.example` (or add the example's settings to an existing `.env` without replacing existing secrets), keep `DJANGO_DEBUG=true` and `SMS_PROVIDER=console`, then run Django and Vite. Local login accepts Indian mobile numbers in 10 digit form; the development OTP is shown on the login page. To send real SMS while developing locally, set `SMS_PROVIDER=twilio` and provide the three Twilio variables below.

## Production setup

1. Create a Twilio account and a Verify Service. For a Twilio trial account, recipient numbers must be verified with Twilio before sending.
2. Configure deployment secrets/environment variables on the Django host:

   - `DJANGO_DEBUG=false`
   - `DJANGO_SECRET_KEY` with a new random secret
   - `DJANGO_ALLOWED_HOSTS` with the Django API hostname
   - `DB_ENGINE=django.db.backends.mysql`, plus `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_PORT` for a persistent production database
   - `SMS_PROVIDER=twilio`
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_VERIFY_SERVICE_SID`
   - `CORS_ALLOWED_ORIGINS` with the exact deployed frontend origin(s)
3. Set the frontend build variable `VITE_API_URL` to the deployed Django API origin when the frontend and API use different origins. For a same-origin deployment, it can be empty.
4. Run Django database migrations during deployment. Keep the Twilio credentials in the hosting provider's secret store; do not put them in frontend variables or commit them.
5. For Indian destinations, complete the provider/carrier registration and approved sender/template requirements before launch. Configure appropriate verification rate limits in the Verify Service.

The provider sends to Indian numbers by converting the submitted 10 digits to E.164 (`+91...`). The login form currently supports Indian numbers only.
