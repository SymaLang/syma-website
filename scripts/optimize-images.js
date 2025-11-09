import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = 'public';
const IMAGES = ['debugger.png', 'repl.png', 'notebook.png', 'browser-debug-panel.png'];
const TEXTURE_IMAGES = ['bg-noise.avif'];
const WIDTHS = [800, 1200, 1600];
const TEXTURE_SIZE = 512; // Small repeating texture

async function optimizeImages() {
  const optimizedDir = join(PUBLIC_DIR, 'optimized');

  if (!existsSync(optimizedDir)) {
    await mkdir(optimizedDir, { recursive: true });
  }

  for (const image of IMAGES) {
    const inputPath = join(PUBLIC_DIR, image);
    const baseName = image.replace('.png', '');

    console.log(`Optimizing ${image}...`);

    // Generate WebP versions at different widths
    for (const width of WIDTHS) {
      const outputPath = join(optimizedDir, `${baseName}-${width}.webp`);
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log(`  Generated ${baseName}-${width}.webp`);
    }

    // Generate AVIF versions at different widths
    for (const width of WIDTHS) {
      const outputPath = join(optimizedDir, `${baseName}-${width}.avif`);
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: 75 })
        .toFile(outputPath);

      console.log(`  Generated ${baseName}-${width}.avif`);
    }

    // Generate fallback PNG at 1200px
    const fallbackPath = join(optimizedDir, `${baseName}.png`);
    await sharp(inputPath)
      .resize(1200, null, { withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(fallbackPath);

    console.log(`  Generated ${baseName}.png (fallback)`);
  }

  // Optimize texture images (small repeating patterns)
  for (const image of TEXTURE_IMAGES) {
    const inputPath = join(PUBLIC_DIR, image);
    const baseName = image.replace('.avif', '');

    console.log(`\nOptimizing texture ${image}...`);

    // Generate optimized AVIF at small size for tiling
    const outputPath = join(optimizedDir, `${baseName}.avif`);
    await sharp(inputPath)
      .resize(TEXTURE_SIZE, TEXTURE_SIZE, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .avif({ quality: 75 })
      .toFile(outputPath);

    console.log(`  Generated ${baseName}.avif (${TEXTURE_SIZE}x${TEXTURE_SIZE})`);
  }

  console.log('\nOptimization complete!');
}

optimizeImages().catch(console.error);
