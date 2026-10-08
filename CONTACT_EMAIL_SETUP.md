# Contact form email delivery

Contact submissions are emailed by Django; provider credentials stay on the backend. A `201 Created` response is returned only after the selected provider accepts the email. On delivery failure, the API returns a `503` response and the message isn't saved as a successful submission.

## Local development

The default local provider is SMTP. Configure these values in the root `.env` (the Google password must be an App Password):

- `EMAIL_PROVIDER=smtp`
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS`
- `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`
- `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO`

Never put these values in `frontend/.env` or any `VITE_*` variable. The API key/password belongs only on Django.

## Production

Use Resend as the transactional email provider:

- Set `EMAIL_PROVIDER=resend`.
- Set `RESEND_API_KEY` in the backend host's secret manager.
- Set `CONTACT_EMAIL_FROM` to a sender on a domain verified in Resend.
- Set `CONTACT_EMAIL_TO` to the inbox that should receive contact enquiries.
- Keep `DJANGO_DEBUG=false` and set `CORS_ALLOWED_ORIGINS` and `VITE_API_URL` for the deployed origins.

Resend accepts email through its server-side `POST /emails` API. Verify the sending domain before deployment and check provider delivery logs if a message is accepted but later bounced. See the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email) and [domain verification](https://resend.com/docs/dashboard/domains/introduction).
