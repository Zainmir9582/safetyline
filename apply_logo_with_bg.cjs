const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processLogoWithBackground() {
  const publicDir = path.join(__dirname, 'public');
  const imageDir = path.join(__dirname, 'src', 'assets', 'images');

  const imageFiles = fs.readdirSync(imageDir);
  const exactImgFile = imageFiles.find(f => f.startsWith('safetyline_exact_logo'));
  
  if (!exactImgFile) {
    console.error('Exact logo image not found in assets directory');
    return;
  }

  const inputPath = path.join(imageDir, exactImgFile);
  console.log('Processing input logo with its original background:', inputPath);

  // Generate crisp high-res 1200x1200 image preserving the original background
  const fullImageWithBg = await sharp(inputPath)
    .resize(1200, 1200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ quality: 100 })
    .toBuffer();

  // Also create a rounded badge variant if needed, but primary is the full image with background
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo.png'), fullImageWithBg);
  fs.writeFileSync(path.join(publicDir, 'safety-line-logo.png'), fullImageWithBg);
  fs.writeFileSync(path.join(publicDir, 'safetyline logo.png'), fullImageWithBg);
  fs.writeFileSync(path.join(publicDir, 'safetyline-logo.png'), fullImageWithBg);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo-removebg-preview.png'), fullImageWithBg);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo_dark.png'), fullImageWithBg);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo_white.png'), fullImageWithBg);

  // Favicon with background
  const faviconBuffer = await sharp(fullImageWithBg)
    .resize(256, 256, { fit: 'contain' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), faviconBuffer);

  console.log('Successfully saved logo with its original background intact across all targets!');
}

processLogoWithBackground().catch(console.error);
