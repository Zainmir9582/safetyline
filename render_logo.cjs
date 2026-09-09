const fs = require('fs');
const sharp = require('sharp');

// Exact vector artwork mirroring the uploaded photo with precision bezier curves
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 780" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&amp;family=Cinzel:wght@700;900&amp;display=swap');
      .sl-red { fill: #E51821; }
      .sl-black { fill: #1D1D1D; }
    </style>
  </defs>

  <g id="safetyline-monogram-lockup">
    <!-- ================= MONOGRAM EMBLEM ================= -->
    <g id="interlocking-monogram" transform="translate(110, 30)">
      
      <!-- 1. BLACK 'L' - Top bracket and upper diagonal stem -->
      <path class="sl-black" d="
        M 380 48
        L 540 48
        L 535 74
        L 490 74
        L 428 248
        L 374 216
        L 438 74
        L 386 74
        Z
      " />

      <!-- 2. RED 'S' - Sweeping Italic Ribbon -->
      <path class="sl-red" d="
        M 495 88
        C 530 102 552 130 546 170
        C 540 200 522 220 494 235
        L 468 248
        C 460 224 458 204 464 186
        C 470 166 462 150 444 138
        C 426 126 400 124 372 131
        C 330 141 302 165 296 195
        C 292 224 308 246 344 262
        L 418 295
        C 486 324 518 362 510 412
        C 502 462 458 502 390 512
        C 334 520 288 506 254 472
        C 235 452 226 426 230 392
        L 280 393
        C 276 418 284 440 304 456
        C 324 470 352 475 380 468
        C 422 460 444 436 450 404
        C 454 372 436 352 392 332
        L 328 302
        C 268 274 240 240 246 190
        C 252 136 298 100 360 92
        C 410 85 458 86 495 88
        Z
      " />

      <!-- Upper Teardrop Terminal Accent for Red S -->
      <path class="sl-red" d="
        M 546 170
        C 546 185 536 197 518 204
        L 512 188
        C 518 182 520 176 518 170
        C 516 158 504 146 484 140
        L 488 124
        C 516 128 540 146 546 170
        Z
      " />

      <!-- 3. BLACK 'L' - Lower stem, left foot serif, and horizontal base -->
      <path class="sl-black" d="
        M 226 524
        C 206 524 192 520 184 514
        C 176 508 170 498 174 492
        C 180 484 192 480 208 480
        C 238 480 258 472 278 412
        L 352 210
        L 416 244
        L 334 466
        C 318 508 332 524 374 524
        L 570 524
        C 604 524 618 510 624 472
        L 638 472
        L 620 562
        L 174 562
        C 186 538 204 524 226 524
        Z
      " />

      <!-- Lower Horizontal Sharp Tail of Red S (Feathered tip above L base) -->
      <path class="sl-red" d="
        M 304 456
        C 320 466 340 472 364 470
        L 318 470
        C 292 470 262 460 240 444
        L 230 392
        C 230 412 240 432 258 446
        C 272 456 288 462 304 456
        Z
      " />

    </g>

    <!-- ================= TYPOGRAPHY SECTION ================= -->
    <g id="typography" transform="translate(450, 645)">
      <!-- Line 1: SAFETY (Red) LINE (Black) -->
      <text x="0" y="0" text-anchor="middle">
        <tspan class="sl-red" style="font-family: 'Playfair Display', 'Bodoni MT', 'Didot', 'Times New Roman', serif; font-size: 52px; font-weight: 900; letter-spacing: 0.16em;">SAFETY </tspan>
        <tspan class="sl-black" style="font-family: 'Playfair Display', 'Bodoni MT', 'Didot', 'Times New Roman', serif; font-size: 52px; font-weight: 900; letter-spacing: 0.16em;">LINE</tspan>
      </text>

      <!-- Line 2: IND (Black, positioned directly under LINE on the right) -->
      <text x="210" y="52" text-anchor="end" class="sl-black" style="font-family: 'Playfair Display', 'Bodoni MT', 'Didot', 'Times New Roman', serif; font-size: 36px; font-weight: 900; letter-spacing: 0.14em;">IND</text>
    </g>
  </g>
</svg>
`;

async function generateAllAssets() {
  fs.writeFileSync('public/safetyline_logo.svg', svgContent);
  fs.writeFileSync('public/safety-line-logo.svg', svgContent);
  console.log('Saved SVG files.');

  const pngBuffer = await sharp(Buffer.from(svgContent), { density: 300 })
    .trim()
    .extend({ top: 30, bottom: 30, left: 30, right: 30, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const files = [
    'public/safetyline_logo.png',
    'public/safety-line-logo.png',
    'public/safetyline logo.png',
    'public/safetyline-logo.png',
    'public/safetyline_logo-removebg-preview.png',
  ];

  for (const f of files) {
    fs.writeFileSync(f, pngBuffer);
    console.log(`Saved ${f} (${pngBuffer.length} bytes)`);
  }

  // Also verify metadata
  const meta = await sharp(pngBuffer).metadata();
  console.log('PNG Dimensions:', meta.width, 'x', meta.height);
}

generateAllAssets().catch(console.error);
