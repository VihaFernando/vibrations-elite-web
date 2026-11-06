// Builds the site logos, icons and link-preview image from assets-source/brand.
// Run after scripts/prepare-logos.py: node scripts/generate-brand-assets.mjs
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const brand = (f) => path.join(root, 'assets-source/brand', f);
const pub = (f) => path.join(root, 'public', f);
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

await mkdir(pub('brand'), { recursive: true });

// Logos used in the page itself
await sharp(brand('logo-horizontal.png')).webp({ quality: 90, alphaQuality: 95, effort: 6 }).toFile(pub('brand/logo-horizontal.webp'));
await sharp(brand('logo-stacked.png')).webp({ quality: 90, alphaQuality: 95, effort: 6 }).toFile(pub('brand/logo-stacked.webp'));

// Square icons from the VE mark
const icon = (size, pad) =>
  sharp(brand('logo-mark.png'))
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: transparent })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: transparent });

await icon(32, 1).png().toFile(pub('favicon-32.png'));
await icon(192, 12).png().toFile(pub('brand/logo-mark-192.png'));
await icon(512, 24).png().toFile(pub('brand/logo-mark-512.png'));
await icon(180, 18).flatten({ background: '#ffffff' }).png().toFile(pub('apple-touch-icon.png'));

// Link preview: full company logo beside the hero photograph
const logo = await sharp(brand('logo-stacked.png')).resize({ width: 430 }).toBuffer({ resolveWithObject: true });
const photo = await sharp(path.join(root, 'assets-source/photos/smartphones/iphone-titanium-on-stone.png'))
  .extract({ left: 880, top: 30, width: 760, height: 855 })
  .resize(560, 630)
  .toBuffer();

await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([
    { input: logo.data, left: Math.round((640 - logo.info.width) / 2), top: Math.round((630 - logo.info.height) / 2) },
    { input: photo, left: 640, top: 0 },
  ])
  .jpeg({ quality: 85 })
  .toFile(pub('og-image.jpg'));
