// Turns the source photographs in assets-source/photos into cropped, responsive
// WebP files in public/images and writes a manifest the <Photo> component reads.
// Run with: npm run images
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets-source/photos');
const outDir = path.join(root, 'public/images');
const WIDTHS = [640, 1000, 1500, 2200];

/**
 * Each output is one framing of one photograph. extract is in source pixels and keeps the
 * product whole. pad adds white space, so a square image matches a 3:2 row without cropping.
 */
const outputs = [
  // Smartphones
  { name: 'iphone-on-stone', src: 'smartphones/iphone-titanium-on-stone.png' },
  { name: 'iphone-16-pro', src: 'smartphones/apple-iphone-16-pro-titanium-table.jpg' },
  { name: 'samsung-galaxy', src: 'smartphones/samsung-galaxy-phone-buds-pen.jpg', extract: { left: 0, top: 640, width: 2400, height: 1640 } },
  { name: 'samsung-z-fold', src: 'smartphones/samsung-galaxy-z-fold-rear.jpg', extract: { left: 600, top: 0, width: 1079, height: 1349 } },
  { name: 'xiaomi-15-ultra', src: 'smartphones/xiaomi-15-ultra-with-box.jpg' },
  { name: 'oneplus-8-pro', src: 'smartphones/oneplus-8-pro-with-box.jpg', extract: { left: 0, top: 850, width: 2400, height: 2400 } },
  { name: 'redmi-note-10-pro', src: 'smartphones/redmi-note-10-pro.jpg', extract: { left: 0, top: 680, width: 2400, height: 2400 } },
  { name: 'phones-on-display', src: 'smartphones/smartphones-on-display-stands.jpg' },

  // Audio
  { name: 'airpods-pro', src: 'audio/apple-airpods-pro.jpg' },
  { name: 'galaxy-buds', src: 'audio/samsung-galaxy-buds.jpg' },
  { name: 'soundpeats-t3-pro', src: 'audio/soundpeats-t3-pro.jpg', pad: { left: 192, right: 192 } },
  { name: 'soundcore-space-one', src: 'audio/soundcore-space-one.jpg', pad: { left: 300, right: 300 } },
  { name: 'sony-headphones', src: 'audio/sony-headphones.jpg' },
  { name: 'jbl-headphones', src: 'audio/jbl-headphones.jpg', extract: { left: 0, top: 1240, width: 2400, height: 1600 } },

  // Power
  { name: 'baseus-70w-gan', src: 'power/baseus-70w-gan-adapter.jpg', extract: { left: 0, top: 230, width: 2400, height: 3000 } },
  { name: 'magsafe-charger', src: 'power/apple-magsafe-charger.jpg' },
  { name: 'anker-power-bank', src: 'power/anker-power-bank.jpg', extract: { left: 0, top: 1040, width: 2400, height: 1600 } },
  { name: 'usb-cable', src: 'power/usb-charging-cable.jpg', extract: { left: 0, top: 300, width: 2400, height: 3000 } },

  // Cases
  { name: 'iphone-leather-case', src: 'cases/iphone-11-pro-leather-case.jpg', extract: { left: 0, top: 150, width: 2400, height: 1600 } },
  { name: 'folio-cases', src: 'cases/leather-folio-cases.jpg', extract: { left: 240, top: 0, width: 1920, height: 2400 } },

  // Wearables
  { name: 'apple-watch-ultra', src: 'wearables/apple-watch-ultra.jpg' },
  { name: 'galaxy-watch', src: 'wearables/samsung-galaxy-watch.jpg' },
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const manifest = {};

for (const o of outputs) {
  let base = sharp(path.join(srcDir, o.src)).rotate();
  if (o.extract) base = base.extract(o.extract);
  if (o.pad) base = base.extend({ ...o.pad, background: '#ffffff' });
  const { data, info } = await base.png().toBuffer({ resolveWithObject: true });

  const top = Math.min(info.width, WIDTHS.at(-1));
  const widths = [...new Set([...WIDTHS.filter((w) => w < top), top])];

  for (const w of widths) {
    await sharp(data)
      .resize({ width: w })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(outDir, `${o.name}-${w}.webp`));
  }
  manifest[o.name] = { width: info.width, height: info.height, widths };
  console.log(`${o.name}: ${info.width}x${info.height} -> ${widths.join(', ')}`);
}

await writeFile(path.join(root, 'src/data/image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
