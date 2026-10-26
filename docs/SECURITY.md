# Security

- Content Security Policy (CSP) is applied via hosting configs (Vercel/Netlify). Adjust as needed for analytics or Sentry – prefer nonces/hashes in production if you add inline scripts.
- Dependencies are scanned weekly by Dependabot; npm audit runs in CI (high severity gate).
- No text is sent to servers by default. Sharing is client-only via URL hash; optional KV API is opt-in and time-limited (TTL), and should avoid storing PII.
