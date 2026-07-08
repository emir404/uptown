/**
 * Grades the real UPTOWN photos (Google Maps / Tripadvisor exports in
 * knowledge-base/reference-images/venue/) into a unified warm set for the
 * gallery: gentle lift + warm cast + soft contrast, max 1600 px wide,
 * EXIF stripped (sharp default). Content is never altered — the dishes
 * stay exactly as photographed.
 *
 * Run: bun run images:prep
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "knowledge-base/reference-images/venue";
const OUT = "public/images/real";

/** @type {{ in: string, out: string, crop?: { left: number, top: number, width: number, height: number } }[]} */
const PHOTOS = [
  { in: `${SRC}/01-dining-arch.png`, out: `${OUT}/dining-arch.jpg` },
  { in: `${SRC}/02-facade-sign.png`, out: `${OUT}/facade-sign.jpg` },
  { in: `${SRC}/03-window-dining.png`, out: `${OUT}/window-dining.jpg` },
  { in: `${SRC}/04-food-medaillons.png`, out: `${OUT}/food-medaillons.jpg` },
  // crop trims the third-party "© LUT" watermark in the bottom-right corner
  {
    in: `${SRC}/05-entrance-day.png`,
    out: `${OUT}/entrance-day.jpg`,
    crop: { left: 0, top: 0, width: 700, height: 448 },
  },
  { in: `${SRC}/06-bar-red.png`, out: `${OUT}/bar-red.jpg` },
  { in: `${SRC}/07-food-burger.png`, out: `${OUT}/food-burger.jpg` },
  { in: `${SRC}/08-food-bbq.png`, out: `${OUT}/food-bbq.jpg` },
  { in: `${SRC}/09-facade-dusk.png`, out: `${OUT}/facade-dusk.jpg` },
];

await mkdir(OUT, { recursive: true });

for (const photo of PHOTOS) {
  let img = sharp(photo.in).rotate();
  if (photo.crop) img = img.extract(photo.crop);
  const { width, height } = await img
    .resize({ width: 1600, withoutEnlargement: true })
    .modulate({ brightness: 1.03, saturation: 1.08 })
    // warm white-balance shift (near-identity channel matrix) — unlike
    // sharp's tint() this keeps every original colour, so dishes stay true
    .recomb([
      [1.04, 0, 0],
      [0, 1.0, 0],
      [0, 0, 0.94],
    ])
    .linear(1.08, -10.2)
    .toColorspace("srgb")
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(photo.out)
    .then((info) => info);
  console.log(`${photo.out} — ${width}×${height}`);
}
