import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// GitHub Pages использует подпапку /sapojnik/
// Netlify деплоит в корень домена
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: 'https://pioner14.github.io',
  base: isGitHubPages ? '/sapojnik' : undefined,
  integrations: [tailwind()],
  output: 'static',
  adapter: netlify(),
});
