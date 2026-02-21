import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://sapojnik.netlify.app',
  integrations: [tailwind()],
  output: 'static',
  adapter: netlify(),
});
