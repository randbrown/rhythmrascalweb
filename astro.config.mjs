// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://rhythmrascal.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Emit /features/index.html so both /features and /features/ resolve on any static host.
    format: 'directory',
  },
});
