# Text Analyzer (ITP)

A fast, accessible text analyzer built with React + TypeScript + Vite. It counts words, sentences, grapheme characters (incl. emoji clusters), paragraphs, and estimates reading time. It supports i18n (incl. RTL), Tailwind theming with dark-mode, PWA offline support, optional analytics and error reporting, and worker offloading for large inputs. CI runs typecheck, lint, unit and E2E tests, builds artifacts, audits security, and enforces performance budgets.

Highlights
- React + TypeScript + Vite + SWC
- Tailwind CSS with focus-visible styles and dark mode
- Robust segmentation using Intl.Segmenter with regex fallback
- Grapheme-aware character counting (ZWJ/combining marks)
- Web Worker analysis with debounced input, memoization, and cancellation
- Optional local history; share via URL hash (compressed) or serverless API (KV)
- i18n via react-i18next; EN + sample RTL (Arabic)
- PWA: manifest + Workbox service worker via vite-plugin-pwa
- GitHub Actions CI, Dependabot, size-limit perf budget

Quick start
1) Requirements: Node 18+ (tested on Node 20). 
2) Install deps: npm ci
3) Start dev server: npm run dev
4) Run unit tests: npm test
5) Run E2E tests (headless): npm run test:e2e
6) Lint and format: npm run lint && npm run format
7) Typecheck: npm run typecheck
8) Build: npm run build; Preview: npm run preview

Environment variables
Create .env.local (not committed) if you want optional integrations:
- VITE_SENTRY_DSN= (optional) Sentry DSN. No PII is sent; payloads are scrubbed.
- VITE_PLAUSIBLE_DOMAIN= (optional) e.g. example.com — analytics only after explicit opt-in.
- VITE_SHARE_KV_URL= (optional) Base URL for KV REST (Upstash/Cloudflare). Example: https://.../set
- VITE_SHARE_KV_TOKEN= (optional) Bearer token for KV.
- VITE_CSP_REPORT_URI= (optional) CSP report-only endpoint.

Security & privacy
- Strict CSP headers configured for static hosting (Netlify/Vercel). See vercel.json and netlify.toml.
- Dependabot weekly updates. npm audit runs in CI.
- Privacy-first: No text content leaves the browser by default. Sharing is client-only via URL hash or optional KV API behind explicit consent.

Project structure
- src/components: Editor, Options, Metrics, Layout, ThemeToggle, ErrorBoundary
- src/lib: types, segment, counters, analyze, worker/
- src/i18n: i18n.ts and locales
- e2e: Playwright tests
- .github/workflows: CI pipelines

Share API (optional)
- Vercel function at /api/share.ts persists payloads to a KV with TTL. Disabled unless env vars are present.

License
MIT
