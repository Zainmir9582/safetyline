const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processExactLogo() {
  const publicDir = path.join(__dirname, 'public');
  const imageDir = path.join(__dirname, 'src', 'assets', 'images');

  // Remove old bee logo and obsolete assets
  const obsoleteFiles = [
    path.join(publicDir, 'bee_logo.png'),
    path.join(imageDir, 'bee_patisserie_logo_1788259597229.jpg'),
  ];
  for (const f of obsoleteFiles) {
    if (fs.existsSync(f)) {
      try {
        fs.unlinkSync(f);
        console.log('Removed obsolete file:', f);
      } catch (e) {}
    }
  }

  // Find the exact generated/uploaded image asset
  const imageFiles = fs.readdirSync(imageDir);
  const exactImgFile = imageFiles.find(f => f.startsWith('safetyline_exact_logo'));
  
  if (!exactImgFile) {
    console.error('Exact logo image not found in assets directory');
    return;
  }

  const inputPath = path.join(imageDir, exactImgFile);
  console.log('Processing input logo:', inputPath);

  // Read the image and extract raw pixel data to make background perfectly transparent
  const { data, info } = await sharp(inputPath)
    .resize(1200, 1200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Process pixels: pure/near-white pixels become transparent,
  // preserving the crisp red and black lettering and monogram, and the white curve inside the S
  // Note: let's do flood fill or color thresholding from edges inwards to make the outer background transparent
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary pixels
  for (let x = 0; x < width; x++) {
    queue.push(0 * width + x);
    queue.push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    queue.push(y * width + 0);
    queue.push(y * width + (width - 1));
  }

  while (queue.length > 0) {
    const idx = queue.pop();
    if (visited[idx]) continue;
    visited[idx] = 1;

    const px = idx % width;
    const py = Math.floor(idx / width);
    const byteOffset = idx * channels;

    const r = data[byteOffset];
    const g = data[byteOffset + 1];
    const b = data[byteOffset + 2];

    // Check if near white / background
    const isBg = (r > 230 && g > 230 && b > 230);
    if (isBg) {
      // Set alpha to 0
      data[byteOffset + 3] = 0;

      // Check 4 neighbors
      const neighbors = [
        [px + 1, py],
        [px - 1, py],
        [px, py + 1],
        [px, py - 1],
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = ny * width + nx;
          if (!visited[nIdx]) {
            const nByte = nIdx * channels;
            const nr = data[nByte];
            const ng = data[nByte + 1];
            const nb = data[nByte + 2];
            if (nr > 230 && ng > 230 && nb > 230) {
              queue.push(nIdx);
            }
          }
        }
      }
    }
  }

  // Smooth anti-aliased edge alphas near transparent boundary
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const byteOffset = idx * channels;
      const r = data[byteOffset];
      const g = data[byteOffset + 1];
      const b = data[byteOffset + 2];

      if (data[byteOffset + 3] > 0 && r > 210 && g > 210 && b > 210) {
        // check if neighbor is transparent
        const hasTransparentNeighbor =
          data[((y - 1) * width + x) * channels + 3] === 0 ||
          data[((y + 1) * width + x) * channels + 3] === 0 ||
          data[(y * width + (x - 1)) * channels + 3] === 0 ||
          data[(y * width + (x + 1)) * channels + 3] === 0;

        if (hasTransparentNeighbor) {
          const whiteness = (r + g + b) / (3 * 255);
          data[byteOffset + 3] = Math.max(0, Math.round(255 * (1 - whiteness) * 2.5));
        }
      }
    }
  }

  // Generate primary transparent PNG
  const transparentPng = await sharp(data, {
    raw: { width, height, channels }
  })
    .trim()
    .png({ quality: 100 })
    .toBuffer();

  // Create high-contrast dark version (with subtle light outline or crisp rendition)
  // For dark backgrounds, a bright/white/red variant or clean rendition
  const darkThemeBuffer = await sharp(transparentPng)
    .png()
    .toBuffer();

  // Write all standard public paths
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo.png'), transparentPng);
  fs.writeFileSync(path.join(publicDir, 'safety-line-logo.png'), transparentPng);
  fs.writeFileSync(path.join(publicDir, 'safetyline logo.png'), transparentPng);
  fs.writeFileSync(path.join(publicDir, 'safetyline-logo.png'), transparentPng);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo-removebg-preview.png'), transparentPng);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo_dark.png'), darkThemeBuffer);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo_white.png'), darkThemeBuffer);

  // Favicon
  const faviconBuffer = await sharp(transparentPng)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), faviconBuffer);

  console.log('Successfully updated logo across all targets with clean transparency!');
}

processExactLogo().catch(console.error);
