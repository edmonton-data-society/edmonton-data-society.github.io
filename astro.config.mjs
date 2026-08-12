// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// `site` must match the custom domain in public/CNAME — it drives canonical
// URLs and the sitemap.
export default defineConfig({
  site: 'https://edmontondatasociety.ca',
  vite: {
    plugins: [tailwindcss()],
  },
});
