# Startech Communications — Website

Zambia's Motorola-Authorized Comms & Security Integrator.

Static site (no build step), deployed on Vercel. Bootstrap 4 base with a header
(top bar + nav), hero, trust indicators, about, why-us accordion, milestones,
impact counters, services, why-choose, industries, project process, CTA, quote
form, FAQ and footer. Also includes a custom 404 page, `robots.txt` and
`sitemap.xml`.

## Structure
- `index.html` — all page content
- `404.html` — custom not-found page (uses absolute `/assets/...` paths)
- `assets/css/style.css` — theme styling (Startech navy/blue/red palette)
- `assets/img/` — logo, favicon, section imagery, `og-image.jpg` (social share card)
- `assets/js/main.js` — nav, smooth scroll, scroll animations, progress bar
- `assets/js/contact.js` — quote form (opens WhatsApp or the visitor's email app)
- `assets/vendor/` — Bootstrap, jQuery, jQuery Easing, AOS, icofont
- `vercel.json` — security headers (CSP, HSTS, clickjacking/MIME protections)

## Before going live: replace the placeholder details
These values were in the original page and look like placeholders. Replace them
with the real ones (search for each string in `index.html`):

| Placeholder | Where it appears |
|---|---|
| `260977123456` / `+260 977 123 456` | top bar, contact section, footer, WhatsApp and call buttons, form (`data-whatsapp`) |
| `211123456` / `+260 211 123 456` | contact section, FAQ, footer |
| `Stand 1234, Great East Road` and `Plot 567, Kwacha Road` | contact section, footer |
| `info@` / `sales@startechcomms.co.zm` | top bar, contact section, FAQ, footer, form (`data-email`) |

Quick replace (run in this folder, adjust the new numbers first):

```sh
sed -i 's/260977123456/260XXXXXXXXX/g; s/+260 977 123 456/+260 XX XXX XXXX/g' index.html
sed -i 's/260211123456/260XXXXXXXXX/g; s/+260 211 123 456/+260 XX XXX XXXX/g' index.html
```

The WhatsApp number in `data-whatsapp` must be digits only, with country code
and no `+` (for example `260977123456`).

Also confirm these claims against the company profile: ZAF/ZMP compliance,
99.9% uptime SLA, 150+ enterprise clients, the 2012–2024 timeline and the
Kitwe/Ndola hubs. Once the real phone and street address are known, add them to
the `LocalBusiness` JSON-LD block in the `<head>` of `index.html`.

## How the quote form works
There is no backend. When a visitor fills in the form, the buttons build a
message from their answers and open either WhatsApp (`wa.me`) or their email
app (`mailto:`) with it ready to send. To receive submissions silently by email
instead, add a form service or a Vercel serverless function, then allow its
domain in `connect-src` / `form-action` in `vercel.json`.

## Security headers (`vercel.json`)
- `Content-Security-Policy` — scripts and styles only from this site, plus Google
  Fonts for styles/fonts. **Inline `<script>` and `style=""` attributes are
  blocked**, so keep JavaScript in `assets/js/` and styles in `assets/css/`.
  (JSON-LD data blocks are fine.)
- `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'` — clickjacking protection
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera, mic, geolocation, payment and USB disabled
- `Strict-Transport-Security` — HTTPS only

If you add error tracking (for example Sentry) later, add its script and
connection hosts to `script-src` and `connect-src`.

## Changelog (latest update)
- Removed unused files: client logos, Remix Icon, Boxicons, Owl Carousel,
  Isotope, Venobox, CounterUp, Waypoints, Bootstrap source maps and unminified
  builds, and the Sentry placeholder script. Dead CSS (clients, skills,
  breadcrumbs) removed too. The assets folder went from about 12 MB to about 2.5 MB.
- Added: top bar with the 24/7 SLA line, quote form, floating WhatsApp/call
  buttons, Industries and How a project runs sections, SEO and social-share tags,
  structured data, `robots.txt`, `sitemap.xml`, custom 404 page.
- Accessibility: skip link, visible keyboard focus, aria state on accordions,
  labelled icon links, reduced-motion support, fixed hero button hover contrast.
