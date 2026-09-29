import node from '@astrojs/node';
import react from '@astrojs/react';
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import outputLayout from './scripts/output-layout.ts';
import { solitudeMarkdown, solitudeMath } from './scripts/markdown-plugin.ts';
import site from './src/site.config.ts';

const renderMode =
  process.env.SOLITUDE_RENDER_MODE === 'server' ? 'server' : 'static';
const outputDirectory = process.env.SOLITUDE_OUT_DIR ?? 'dist';

export default defineConfig({
  site: site.site,
  base: site.base,
  output: renderMode,
  outDir: outputDirectory,
  adapter: renderMode === 'server' ? node({ mode: 'standalone' }) : undefined,
  trailingSlash: 'ignore',
  integrations: [mdx(), react(), outputLayout()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    processor: satteri({
      features: { math: site.theme.katex.enable, headingAttributes: true },
      mdastPlugins: [solitudeMath(site)],
      hastPlugins: [solitudeMarkdown(site)],
    }),
    syntaxHighlight: site.theme.highlight.enable ? 'shiki' : false,
    shikiConfig: { themes: site.theme.highlight.themes, defaultColor: false },
  },
});
