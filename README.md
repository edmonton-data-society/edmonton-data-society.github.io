# Edmonton Data Society — website

Static site built with [Astro](https://astro.build) and Tailwind CSS v4, deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
npm run check    # type-check .astro files
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
| `public/` | Logo, favicon, `CNAME`. |

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

1. **Custom domain.** Optional — the site is live on GitHub Pages already. See
   "Domain" below; `edmontondatasociety.ca` currently serves a different site.
2. **Luma embed URL.** `LumaCalendar.astro` builds
   `https://lu.ma/embed/calendar/<id>/events`. Verify it renders; if Luma has
   changed the embed format, copy the current snippet from the calendar's
   "Share → Embed" panel.
3. **Newsletter.** Not built. GitHub Pages can't process forms; use Buttondown,
   Mailchimp, or a Luma subscribe link if you want one. The GoDaddy site being
   replaced had a signup form, so any existing subscriber list should be
   exported from GoDaddy before that site is torn down.
4. **Analytics.** None wired in. Add a privacy-friendly option (Plausible,
   GoatCounter) in `BaseLayout.astro` if organizers want numbers.

## Where it's served

<https://edmonton-data-society.github.io> — a GitHub Pages **organization
site**, which is why the repo is named `edmonton-data-society.github.io`. That
naming is what makes Pages serve it at the domain root; renaming the repo would
move it to a `/subpath` and break every absolute asset URL.

## Domain

`edmontondatasociety.ca` is registered through GoDaddy (nameservers
`ns23/ns24.domaincontrol.com`) and, as of 2026-08-13, still serves a **GoDaddy
Website Builder** "Coming soon" page — not this site.

Pointing it here is optional and not done yet. When you want it:

1. Export anything worth keeping from the GoDaddy site first (contact-form
   submissions, email signups) — repointing DNS makes it unreachable.
2. In GoDaddy DNS, replace the apex `A` records with GitHub Pages':

   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   edmonton-data-society.github.io.
   ```

   Add the matching `AAAA` records (`2606:50c0:8000::153` through `8003::153`)
   for IPv6. Verify all of these against
   <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
   first — GitHub has changed them before.
3. Recreate `public/CNAME` containing `edmontondatasociety.ca` (it was removed
   so it couldn't hijack the Pages URL before DNS was ready).
4. Change `site:` in `astro.config.mjs` to `https://edmontondatasociety.ca` so
   canonical and Open Graph URLs follow.
5. Repo Settings → Pages: set the custom domain and tick **Enforce HTTPS**.

Propagation can take up to an hour, during which some visitors still see the
GoDaddy page.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Pages source is already set to **GitHub Actions**.

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
