import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Replace with the real domain before deploy (sitemap and canonical URLs use it).
  site: 'https://portfolio.arkienzkun.workers.dev',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
