import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { portfolio } from './src/data/portfolio';

function escapeAttribute(input: string) {
  return input.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function normalizeBase(value: string) {
  return `/${value.split('/').filter(Boolean).join('/')}${value === '/' || value.trim() === '' ? '' : '/'}` || '/';
}

export default defineConfig(() => {
  const githubRepository = process.env.GITHUB_REPOSITORY || '';
  const [owner = '', repo = ''] = githubRepository.split('/');
  const autoBase = process.env.GITHUB_ACTIONS === 'true' && repo && !repo.toLowerCase().endsWith('.github.io')
    ? `/${repo}/` : '/';
  const base = normalizeBase(process.env.VITE_BASE_PATH || autoBase);
  const publishedUrl = process.env.VITE_SITE_URL?.trim()
    || (owner && process.env.GITHUB_ACTIONS === 'true' ? `https://${owner}.github.io${base}` : '');

  const name = portfolio.identity.name;
  const title = `${name === 'YOUR NAME' ? 'Software Engineer' : name + ' — Software Engineer'} | Vienna, Austria`;
  const description = `Software engineer and IT graduate from the University of Vienna. Thoughtful digital experiences, clean engineering, and reliable software.`;
  const brandedName = name === 'YOUR NAME' ? 'Software Engineer Portfolio' : `${name}'s Portfolio`;

  const sitePlugin: Plugin = {
    name: 'portfolio-meta-and-404',
    transformIndexHtml(html) {
      const replacements: Record<string, string> = {
        '__SITE_TITLE__': title,
        '__SITE_DESCRIPTION__': description,
        '__SITE_NAME__': brandedName,
      };
      let output = html;
      for (const [key, value] of Object.entries(replacements)) output = output.replaceAll(key, escapeAttribute(value));
      const cleanUrl = publishedUrl.replace(/\/+$/, '') + '/';
      const socialImageUrl = publishedUrl ? new URL(`${base.replace(/^\//, '')}og-image.svg`, `${new URL(publishedUrl).origin}/`).href : '';
      output = output.replace('<!-- SOCIAL_IMAGE_META -->', socialImageUrl
        ? `<meta property="og:image" content="${escapeAttribute(socialImageUrl)}" />\n    <meta name="twitter:image" content="${escapeAttribute(socialImageUrl)}" />` : '');
      output = output.replace('<!-- CANONICAL_META -->', publishedUrl
        ? `<link rel="canonical" href="${escapeAttribute(cleanUrl)}" />\n    <meta property="og:url" content="${escapeAttribute(cleanUrl)}" />` : '');
      return output;
    },
    generateBundle() {
      const back = base;
      const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found — Portfolio</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#1e293b;background:#f6f9fc}.wrap{text-align:center;padding:2rem}span{color:#3b82f6;font-weight:750;letter-spacing:.15em}h1{font-size:clamp(2rem,6vw,3.5rem);letter-spacing:-.055em;margin:1rem 0}p{color:#64748b;line-height:1.7;margin-bottom:2rem}a{color:#fff;background:#3b82f6;text-decoration:none;padding:1rem 1.35rem;border-radius:14px;font-weight:650;display:inline-block}a:focus-visible{outline:3px solid #1e293b;outline-offset:3px}</style></head><body><main class="wrap"><span>404</span><h1>Looks like a wrong turn.</h1><p>That page isn't here. Let's get you back to the portfolio.</p><a href="${escapeAttribute(back)}">Back to homepage &rarr;</a></main></body></html>`;
      this.emitFile({ type: 'asset', fileName: '404.html', source: body });
    },
  };

  return { base, plugins: [react(), tailwindcss(), sitePlugin] };
});
