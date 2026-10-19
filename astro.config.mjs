import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Sitemap and canonical URLs use this; change it if a custom domain is added.
  site: 'https://portfolio.arkienzkun.workers.dev',
  integrations: [sitemap()],
  // Emits a CSP meta tag with hashes for every inline script and style Astro outputs.
  security: { csp: true },
  vite: { plugins: [tailwindcss()] },
});
