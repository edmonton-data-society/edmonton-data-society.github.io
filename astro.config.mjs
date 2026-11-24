// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// `site` must match wherever the build is actually served from — it drives
// canonical URLs and Open Graph tags. Served by Cloudflare Workers at the
// apex domain; see "Domain" in the README.
export default defineConfig({
  site: 'https://edmontondatasociety.ca',
  vite: {
    plugins: [tailwindcss()],
  },
});
