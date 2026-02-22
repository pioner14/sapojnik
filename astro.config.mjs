import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  // GitHub Pages URL (для preview)
  // При деплое на Netlify заменить на https://sapojnik.netlify.app
  site: 'https://pioner14.github.io/sapojnik',
  integrations: [tailwind()],
  output: 'static',
  adapter: netlify(),
});
