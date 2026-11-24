# Edmonton Data Society — website

Static site built with [Astro](https://astro.build) and Tailwind CSS v4, served
from Cloudflare Workers at <https://edmontondatasociety.ca>.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
npm run check    # type-check .astro files
npm run deploy   # build and deploy to Cloudflare (see "Deploy")
```

Requires Node 22.12+ (Astro 7's floor).

## Layout

| Path | What it is |
| --- | --- |
| `src/consts.ts` | Site name, contact email, social links, nav. Edit here first. |
| `src/pages/` | One file per route. `index.astro` holds the homepage copy and FAQ. |
| `src/components/` | Header, Footer, EventCard, Faq, LumaCalendar. |
| `src/content/events/` | Markdown events (schema in `src/content.config.ts`). |
| `src/styles/global.css` | Brand colours, fonts, base styles. |
| `public/` | Logo, favicon. |
| `wrangler.jsonc` | Cloudflare Worker config: name, account, custom domain. |

## Adding an event

Drop a Markdown file in `src/content/events/`:

```yaml
---
title: 'Intro to DuckDB'
date: 2026-10-15T18:00:00-06:00   # local time, -06:00 MDT / -07:00 MST
location: 'Startup TNT, Edmonton'
summary: 'One or two sentences shown on the card.'
speaker: 'Optional Name'
rsvpUrl: 'https://lu.ma/...'      # optional
---
```

Upcoming vs. past is derived from `date` at build time. Because the site is
statically built, **an event only moves to "past" on the next deploy** — see
"Scheduled rebuilds" below.

The Luma calendar embed on `/events` is the live source; the Markdown files are
the fallback and archive. Delete `2026-09-example-meetup.md` once real events exist.

## Before this goes live

1. **Domain cutover.** `edmontondatasociety.ca` serves the old GoDaddy site
   until the steps in "Domain" below are done.
2. **Luma embed URL.** `LumaCalendar.astro` builds
   `https://lu.ma/embed/calendar/<id>/events`. Verify it renders; if Luma has
   changed the embed format, copy the current snippet from the calendar's
   "Share → Embed" panel.
3. **Newsletter.** Not built. The site is static with no form handling; use Buttondown,
   Mailchimp, or a Luma subscribe link if you want one. The GoDaddy site being
   replaced had a signup form, so any existing subscriber list should be
   exported from GoDaddy before that site is torn down.
4. **Analytics.** None wired in. Add a privacy-friendly option (Plausible,
   GoatCounter) in `BaseLayout.astro` if organizers want numbers.

## Where it's served

<https://edmontondatasociety.ca>, by the Cloudflare Worker
`edmonton-data-society`. It is an assets-only Worker: no script, just `dist/`
served as static files, with `dist/404.html` for unknown paths. Config is in
`wrangler.jsonc`.

`www.edmontondatasociety.ca` redirects to the apex with a Cloudflare Redirect
Rule. A Worker Custom Domain matches only its exact hostname, so `www` is not
in `wrangler.jsonc`.

The repo name `edmonton-data-society.github.io` is left over from the earlier
GitHub Pages hosting.

## Domain

`edmontondatasociety.ca` is registered through GoDaddy; its DNS is on
Cloudflare (nameservers `rommy/heather.ns.cloudflare.com`). Cutover from the
old GoDaddy Website Builder site:

1. Export anything worth keeping from the GoDaddy site first (contact-form
   submissions, email signups); the cutover makes it unreachable.
2. Delete the existing apex DNS record that points at GoDaddy. Cloudflare will
   not attach a Custom Domain to a hostname that already has a CNAME record,
   and the deploy fails. On deploy, Cloudflare creates the record for the
   Worker itself.
3. Deploy (below).
4. For `www`: keep a proxied DNS record for `www` (Cloudflare's docs use
   `A www 192.0.2.0`, a placeholder that is never reached) and add a Redirect
   Rule sending `www.edmontondatasociety.ca/*` to `https://edmontondatasociety.ca/`
   with the path and query kept (301).

## Deploy

`.github/workflows/deploy.yml` builds and runs `wrangler deploy` on every push
to `main`, and on manual dispatch. It needs one repo secret,
`CLOUDFLARE_API_TOKEN`: a Cloudflare API token from the **Edit Cloudflare
Workers** template, scoped to this account and the `edmontondatasociety.ca`
zone (Workers Scripts Edit on the account, Workers Routes Edit on the zone).
The account ID is in `wrangler.jsonc`, so no account secret is needed.

From a laptop: `npx wrangler login`, then `npm run deploy`.
`npx wrangler deploy --dry-run` checks the config without uploading.

### Scheduled rebuilds

A static site's "upcoming events" list is frozen at build time. If you rely on
the Markdown events rather than the Luma embed, add a nightly rebuild:

```yaml
on:
  schedule:
    - cron: '0 9 * * *' # 03:00 MDT
```

## Content sources

Copy, palette (`#ea6a33`), logo, and links were carried over from the interim
soloist.ai page at <https://soloist.ai/edmontondatasociety>. That page can be
retired once this one is live.
