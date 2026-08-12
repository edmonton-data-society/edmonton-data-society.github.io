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

Requires Node 20+.

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

1. **Domain.** `public/CNAME` and `site:` in `astro.config.mjs` both say
   `edmontondatasociety.ca` — replace with the real domain in both places, then
   point a `CNAME` DNS record at `<org>.github.io` (or four `A` records to the
   GitHub Pages IPs for an apex domain) and enable HTTPS in repo Settings → Pages.
2. **Contact email.** `SITE.email` in `src/consts.ts` is a guess — set a real inbox.
3. **Luma embed URL.** `LumaCalendar.astro` builds
   `https://lu.ma/embed/calendar/<id>/events`. Verify it renders; if Luma has
   changed the embed format, copy the current snippet from the calendar's
   "Share → Embed" panel.
4. **Code of Conduct.** `/code-of-conduct` is a draft — organizers should review
   and adopt it (or point at an existing one) and remove the draft notice.
5. **Newsletter.** Not built. GitHub Pages can't process forms; use Buttondown,
   Mailchimp, or a Luma subscribe link if you want one.
6. **Analytics.** None wired in. Add a privacy-friendly option (Plausible,
   GoatCounter) in `BaseLayout.astro` if organizers want numbers.

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
