const fs = require('fs');
const sharp = require('sharp');

function createSvg(lColor = '#1D1D1D') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 580" width="100%" height="100%">
  <defs>
    <style>
      .sl-red { fill: #E51821; }
      .sl-l-stem { fill: ${lColor}; }
    </style>
  </defs>

  <g id="official-safetyline-monogram" transform="translate(10, 10)">
    
    <!-- 1. L - TOP SERIF & UPPER DIAGONAL STEM -->
    <path class="sl-l-stem" d="
      M 288 34
      L 456 34
      L 450 52
      L 408 52
      L 326 262
      L 268 230
      L 344 52
      L 294 52
      Z
    " />

    <!-- 2. RED S - FULL BODY RIBBON -->
    <path class="sl-red" d="
      M 408 86
      C 448 102 474 134 468 184
      C 462 220 440 244 406 264
      L 376 278
      C 368 248 366 224 374 202
      C 382 176 374 156 352 142
      C 330 126 298 124 262 132
      C 212 144 180 172 174 208
      C 170 242 188 268 230 288
      L 316 326
      C 394 358 430 404 422 462
      C 412 520 360 566 282 578
      C 218 588 164 570 126 532
      C 104 508 94 478 98 438
      L 156 440
      C 152 468 162 494 184 512
      C 208 528 240 534 272 526
      C 320 518 346 490 352 452
      C 358 416 336 392 286 368
      L 212 334
      C 144 302 112 264 118 204
      C 126 142 178 100 250 90
      C 306 82 362 84 408 86
      Z
    " />

    <!-- Upper Teardrop Terminal Accent for Red S -->
    <path class="sl-red" d="
      M 468 184
      C 468 202 456 216 436 224
      L 428 204
      C 436 196 440 188 438 180
      C 436 166 420 152 396 146
      L 402 126
      C 434 132 462 154 468 184
      Z
    " />

    <!-- 3. L - LOWER STEM, LEFT SERIF, BASE AND RIGHT CORNER -->
    <path class="sl-l-stem" d="
      M 138 548
      C 114 548 98 544 88 538
      C 78 530 72 520 78 512
      C 84 504 98 500 118 500
      C 154 500 176 490 198 422
      L 266 228
      L 330 264
      L 252 486
      C 234 532 250 548 298 548
      L 502 548
      C 542 548 558 532 566 488
      L 582 488
      L 562 594
      L 78 594
      C 92 566 114 548 138 548
      Z
    " />

    <!-- Lower Horizontal Feathered Tail of Red S -->
    <path class="sl-red" d="
      M 184 512
      C 202 524 224 530 252 528
      L 200 528
      C 170 528 134 518 108 498
      L 98 438
      C 98 462 110 486 132 504
      C 150 518 170 526 196 528
      Z
    " />

  </g>
</svg>
`;
}

async function generate() {
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }

  const darkSvg = createSvg('#1D1D1D');
  const lightSvg = createSvg('#FFFFFF');

  fs.writeFileSync('public/safetyline_logo.svg', darkSvg);
  fs.writeFileSync('public/safetyline_logo_white.svg', lightSvg);

  const pngDarkBuffer = await sharp(Buffer.from(darkSvg), { density: 300 })
    .trim()
    .extend({ top: 15, bottom: 15, left: 15, right: 15, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const pngWhiteBuffer = await sharp(Buffer.from(lightSvg), { density: 300 })
    .trim()
    .extend({ top: 15, bottom: 15, left: 15, right: 15, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('public/safetyline_logo.png', pngDarkBuffer);
  fs.writeFileSync('public/safety-line-logo.png', pngDarkBuffer);
  fs.writeFileSync('public/safetyline_logo_white.png', pngWhiteBuffer);

  // Favicon
  const favBuffer = await sharp(Buffer.from(darkSvg), { density: 150 })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon.png', favBuffer);
  console.log('Finished transparent logo assets.');
}

generate().catch(console.error);
