// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sgtmarmite.github.io',
  base: '/wtfcesko',
  vite: {
    plugins: [tailwindcss()],
  },
});
