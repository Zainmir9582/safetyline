const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processLogo() {
  const imageDir = path.join(__dirname, 'src', 'assets', 'images');
  const files = fs.readdirSync(imageDir);
  const logoFile = files.find(f => f.startsWith('bee_patisserie_logo'));

  if (!logoFile) {
    console.error('Logo file not found in assets');
    return;
  }

  const inputPath = path.join(imageDir, logoFile);
  console.log('Processing input logo:', inputPath);

  // Generate crisp 1024x1024 PNG with smooth edges
  const pngBuffer = await sharp(inputPath)
    .resize(1024, 1024, { fit: 'contain' })
    .png({ quality: 100 })
    .toBuffer();

  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'safetyline_logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicDir, 'safety-line-logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicDir, 'safetyline logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicDir, 'safetyline-logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo_dark.png'), pngBuffer);
  fs.writeFileSync(path.join(publicDir, 'safetyline_logo_white.png'), pngBuffer);
  fs.writeFileSync(path.join(publicDir, 'bee_logo.png'), pngBuffer);

  // Favicon
  const favBuffer = await sharp(inputPath)
    .resize(192, 192, { fit: 'contain' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), favBuffer);

  console.log('Successfully updated all logo files with the new Bee Patisserie logo!');
}

processLogo().catch(console.error);
