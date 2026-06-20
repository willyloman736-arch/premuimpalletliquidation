// Optimises the brand imagery migrated from the reference site.
// Source: _source/assets/images  ->  Output: public/images
// The originals are very heavy (Nike.jpg ~12.7MB); we resize + recompress so
// Next.js can serve fast, responsive AVIF/WebP from sensible source files.
import sharp from 'sharp';
import { mkdir, copyFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, '_source', 'assets', 'images');
const OUT = join(root, 'public', 'images');

const exists = async (p) => access(p).then(() => true).catch(() => false);

/** [source file, output relative path, max width, quality] */
const jobs = [
  // Hero backgrounds (full-bleed, decorative)
  ['fond.jpg', 'backgrounds/fond.jpg', 1920, 70],
  ['fond2.jpg', 'backgrounds/fond2.jpg', 1920, 70],
  ['fond3.jpg', 'backgrounds/fond3.jpg', 1920, 70],
  ['fond4.jpg', 'backgrounds/fond4.jpg', 1920, 70],
  // Video posters
  ['Nike.jpg', 'posters/nike.jpg', 900, 76],
  ['montre.jpg', 'posters/montre.jpg', 900, 76],
  ['vetement.jpg', 'posters/vetement.jpg', 900, 76],
  ['crampon.jpg', 'posters/crampon.jpg', 900, 76],
  // Product catalogue images (representative brand stock)
  ['Nike.jpg', 'products/sneakers-nike.jpg', 900, 78],
  ['crampon.jpg', 'products/crampons-football.jpg', 900, 78],
  ['montre.jpg', 'products/montres-luxe.jpg', 900, 78],
  ['vetement.jpg', 'products/vetements-femme.jpg', 900, 78],
  ['fond2.jpg', 'products/high-tech.jpg', 900, 78],
  ['fond3.jpg', 'products/maison-deco.jpg', 900, 78],
  ['fond4.jpg', 'products/jouets-jeux.jpg', 900, 78],
  ['fond.jpg', 'products/beaute-cosmetiques.jpg', 900, 78],
  ['vetement.jpg', 'products/mode-homme.jpg', 900, 78],
  ['fond.jpg', 'products/placeholder.jpg', 900, 78],
];

async function run() {
  if (!(await exists(SRC))) {
    console.error(`Source folder not found: ${SRC}`);
    console.error('Optimised images already committed under public/images — skipping.');
    return;
  }

  for (const [src, rel, width, quality] of jobs) {
    const input = join(SRC, src);
    const output = join(OUT, rel);
    await mkdir(dirname(output), { recursive: true });
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(output);
    console.log(`✓ ${rel}`);
  }

  // Small assets copied as-is.
  await mkdir(OUT, { recursive: true });
  for (const f of ['whatsapp.png']) {
    if (await exists(join(SRC, f))) {
      await copyFile(join(SRC, f), join(OUT, f));
      console.log(`✓ ${f}`);
    }
  }
  console.log('Done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
