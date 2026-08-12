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

1. **DNS cutover.** See "Domain" below — `edmontondatasociety.ca` currently
   serves a different site.
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

## Domain

`edmontondatasociety.ca`, registered through GoDaddy (nameservers
`ns23/ns24.domaincontrol.com`). It is set in two places that must stay in sync:
`public/CNAME` and `site:` in `astro.config.mjs`.

As of 2026-08-12 the domain still points at a **GoDaddy Website Builder**
"Coming soon" page. Cutting over means repointing DNS away from it — the
GoDaddy site stops being reachable, so export anything worth keeping first
(the contact-form submissions and email signups).

In GoDaddy DNS, replace the existing apex `A` records with GitHub Pages':

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   <org>.github.io.
```

Add the matching `AAAA` records (`2606:50c0:8000::153` through
`8003::153`) if you want IPv6. Verify these against
<https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
before applying — GitHub has changed them before.

Then in repo Settings → Pages set the custom domain and tick **Enforce HTTPS**
(the certificate takes a few minutes to issue). Propagation can take up to an
hour, during which the old GoDaddy page may still appear for some visitors.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Enable it once: repo Settings → Pages → Source → **GitHub Actions**.

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
