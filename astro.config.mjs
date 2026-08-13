// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// `site` must match wherever the build is actually served from — it drives
// canonical URLs and Open Graph tags. Currently the GitHub Pages org site;
// see "Domain" in the README for the switch to edmontondatasociety.ca.
export default defineConfig({
  site: 'https://edmonton-data-society.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
