import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tuzlalastikci.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
