# Startech Communications — Landing Page

Zambia's Motorola-Authorized Comms & Security Integrator.

Static site (no build step) — Bootstrap-based template with header, hero,
trust indicators, about, why-us accordion, milestones, impact counters,
services, CTA, FAQ, and footer.

## Structure
- `index.html` — all page content
- `assets/css/style.css` — theme styling (Startech navy/blue/red palette)
- `assets/img/` — logo, favicon, and section imagery
- `assets/js/main.js` — scroll animations, accordion, counters, mobile nav
- `assets/js/sentry-init.js` — Sentry configuration callback (see below)
- `assets/vendor/` — third-party libraries (Bootstrap, AOS, icofont, etc.)
- `vercel.json` — security headers (CSP, HSTS, clickjacking/MIME protections)

## Security review (done before this handoff)
- Removed the unused `php-email-form` vendor script — the page has no
  contact form, and that script pointed at a PHP backend that doesn't exist
  here (dead code / unnecessary third-party surface).
- Removed the one inline `style=""` attribute (moved to CSS) so the site
  can run without `unsafe-inline` in its script/style policy.
- Verified no `eval()` / `new Function()` in any vendor library, no
  `<iframe>`, no `javascript:` URIs, no mixed HTTP content, no hardcoded
  secrets/keys anywhere in the code.
- jQuery 3.5.1 and Bootstrap 4.6.0 (bundled) are both patched against the
  known historical XSS CVEs for those libraries (fixed upstream in 3.5.0
  and 4.3.1/4.1.2 respectively).
- Added `vercel.json` with response headers:
  - `Content-Security-Policy` — restricts scripts/styles/fonts/images to
    this site, Google Fonts, and Sentry only; blocks framing entirely.
  - `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'` — prevents
    clickjacking (site can't be embedded in another page's iframe).
  - `X-Content-Type-Options: nosniff` — stops MIME-sniffing attacks.
  - `Referrer-Policy: strict-origin-when-cross-origin` — limits what's
    leaked to other sites via the Referer header.
  - `Permissions-Policy` — disables camera/mic/geolocation/payment APIs
    the site never uses.
  - `Strict-Transport-Security` — forces HTTPS on every future visit.

This is a fully static site with no server, database, or form submission
endpoint, so classic backend risks (SQL injection, auth bypass, server
RCE) don't apply — the headers above cover the realistic client-side risks
(XSS via headers/framing, clickjacking, MIME confusion).

## Sentry (error tracking) setup
The loader script is already wired into `index.html` <head>, but it needs
**your** project's key to actually send events:

1. In Sentry: create (or open) a project, then go to
   **Settings → Projects → (your project) → SDK Setup → Loader Script**.
2. Copy the `<script src="https://js.sentry-cdn.com/XXXXXXXX.min.js">` tag
   they give you.
3. In `index.html`, replace the placeholder line:
   ```html
   src="https://js.sentry-cdn.com/YOUR_SENTRY_LOADER_PUBLIC_KEY.min.js"
   ```
   with the real `src` value from step 2.
4. Optional: adjust sample rates / environment tag in
   `assets/js/sentry-init.js`.
5. Optional but recommended: in `vercel.json`, narrow the CSP `connect-src`
   Sentry entries down to just your actual ingest host (shown in your
   Sentry DSN, e.g. `https://o123456.ingest.us.sentry.io`) instead of the
   broader wildcards currently there.

No separate `dsn` needs to go in `sentry-init.js` — the Loader Script URL
already encodes your project, so `Sentry.init()` there only needs to carry
extra options (it works fine with none at all).

## Deploying to Vercel
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket), or run
   `vercel` from inside this folder with the Vercel CLI.
2. Vercel auto-detects it as a static site — no build command needed,
   output directory is the project root.
3. `vercel.json` headers apply automatically on deploy.
4. Once live, do a quick check at https://securityheaders.com and
   https://developer.mozilla.org/en-US/observatory against your deployed
   URL to confirm headers are landing as expected.

## To customize further
- Replace placeholder phone/email/address details in the Contact/FAQ/Footer
  sections of `index.html` with final verified details.
- Swap `assets/img/about.png` and `assets/img/why-us.png` for real project
  or team photography when available.
- Social media links in the footer are currently placeholders — update once
  official Startech Communications social accounts are confirmed, and if
  you add real external social links, keep `rel="noopener noreferrer"` on
  any that open in a new tab.
