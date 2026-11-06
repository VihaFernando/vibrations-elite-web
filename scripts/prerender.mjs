// Renders every route to static HTML with its own title and metadata, so pages
// are fully readable by search engines and share previews without running JS.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, pages, notFoundMeta, site, structuredData } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function head(meta) {
  const url = `${site.url}${meta.path === '/' ? '' : meta.path}`;
  const lines = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.shortName)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.url}/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (meta.path === '/') {
    const json = JSON.stringify(structuredData).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }
  return lines.join('\n    ');
}

const page = (meta, html) =>
  template
    .replace(/<!--head-start-->[\s\S]*<!--head-end-->/, () => head(meta))
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);

for (const meta of pages) {
  const html = page(meta, render(meta.path));
  if (meta.path === '/') {
    await writeFile(path.join(dist, 'index.html'), html);
  } else {
    // Both forms, so /about resolves on hosts that map clean URLs either way.
    const name = meta.path.slice(1);
    await mkdir(path.join(dist, name), { recursive: true });
    await writeFile(path.join(dist, name, 'index.html'), html);
    await writeFile(path.join(dist, `${name}.html`), html);
  }
  console.log(`prerendered ${meta.path}`);
}

await writeFile(path.join(dist, '404.html'), page(notFoundMeta, render('/404')));
await rm(ssrDir, { recursive: true, force: true });
