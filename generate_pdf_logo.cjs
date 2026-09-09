const fs = require('fs');
const sharp = require('sharp');

// Exact vector reproduction of the PDF artwork
// Dimensions: 800 x 900
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 880" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,900;1,6..96,900&amp;family=Playfair+Display:ital,wght@0,900;1,900&amp;display=swap');
      .cls-red { fill: #E51821; }
      .cls-blk { fill: #1D1D1D; }
    </style>
  </defs>

  <g id="official-safety-line-ind-logo" transform="translate(0, 0)">
    
    <!-- ==================== MONOGRAM: S & L ==================== -->
    <g id="monogram" transform="translate(100, 40)">
      
      <!-- 1. BLACK L - TOP SERIF & UPPER STEM -->
      <path class="cls-blk" d="
        M 388 64
        L 556 64
        L 550 82
        L 508 82
        L 426 292
        L 368 260
        L 444 82
        L 394 82
        Z
      " />

      <!-- 2. RED S - FULL BODY CURVE -->
      <path class="cls-red" d="
        M 508 116
        C 548 132 574 164 568 214
        C 562 250 540 274 506 294
        L 476 308
        C 468 278 466 254 474 232
        C 482 206 474 186 452 172
        C 430 156 398 154 362 162
        C 312 174 280 202 274 238
        C 270 272 288 298 330 318
        L 416 356
        C 494 388 530 434 522 492
        C 512 550 460 596 382 608
        C 318 618 264 600 226 562
        C 204 538 194 508 198 468
        L 256 470
        C 252 498 262 524 284 542
        C 308 558 340 564 372 556
        C 420 548 446 520 452 482
        C 458 446 436 422 386 398
        L 312 364
        C 244 332 212 294 218 234
        C 226 172 278 130 350 120
        C 406 112 462 114 508 116
        Z
      " />

      <!-- Upper Teardrop Terminal Accent for Red S -->
      <path class="cls-red" d="
        M 568 214
        C 568 232 556 246 536 254
        L 528 234
        C 536 226 540 218 538 210
        C 536 196 520 182 496 176
        L 502 156
        C 534 162 562 184 568 214
        Z
      " />

      <!-- 3. BLACK L - LOWER STEM, LEFT SERIF, BASE AND RIGHT TERMINAL -->
      <path class="cls-blk" d="
        M 238 578
        C 214 578 198 574 188 568
        C 178 560 172 550 178 542
        C 184 534 198 530 218 530
        C 254 530 276 520 298 452
        L 366 258
        L 430 294
        L 352 516
        C 334 562 350 578 398 578
        L 602 578
        C 642 578 658 562 666 518
        L 682 518
        L 662 624
        L 178 624
        C 192 596 214 578 238 578
        Z
      " />

      <!-- Lower Tapered Tail of Red S (Feathered tip above L base) -->
      <path class="cls-red" d="
        M 284 542
        C 302 554 324 560 352 558
        L 300 558
        C 270 558 234 548 208 528
        L 198 468
        C 198 492 210 516 232 534
        C 250 548 270 556 296 558
        Z
      " />

    </g>

    <!-- ==================== TYPOGRAPHY SECTION ==================== -->
    <g id="brand-typography" transform="translate(400, 745)">
      <!-- Line 1: SAFETY (Red) LINE (Black) -->
      <text x="0" y="0" text-anchor="middle">
        <tspan class="cls-red" style="font-family: 'Bodoni Moda', 'Playfair Display', 'Times New Roman', serif; font-size: 52px; font-weight: 900; letter-spacing: 0.18em;">SAFETY </tspan>
        <tspan class="cls-blk" style="font-family: 'Bodoni Moda', 'Playfair Display', 'Times New Roman', serif; font-size: 52px; font-weight: 900; letter-spacing: 0.18em;">LINE</tspan>
      </text>

      <!-- Line 2: IND (Black, aligned under LINE on the right) -->
      <text x="216" y="44" text-anchor="end" class="cls-blk" style="font-family: 'Bodoni Moda', 'Playfair Display', 'Times New Roman', serif; font-size: 36px; font-weight: 900; letter-spacing: 0.14em;">IND</text>
    </g>

  </g>
</svg>
`;

async function build() {
  fs.writeFileSync('public/safetyline_logo.svg', svg);
  fs.writeFileSync('public/safety-line-logo.svg', svg);

  const pngBuffer = await sharp(Buffer.from(svg), { density: 300 })
    .trim()
    .extend({ top: 24, bottom: 24, left: 24, right: 24, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const fileList = [
    'public/safetyline_logo.png',
    'public/safety-line-logo.png',
    'public/safetyline logo.png',
    'public/safetyline-logo.png',
    'public/safetyline_logo-removebg-preview.png',
  ];

  for (const p of fileList) {
    fs.writeFileSync(p, pngBuffer);
    console.log(`Wrote ${p} (${pngBuffer.length} bytes)`);
  }

  // Also build a square / high-res favicon version
  const faviconBuffer = await sharp(Buffer.from(svg), { density: 150 })
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon.png', faviconBuffer);
  console.log('Finished updating all logo assets successfully!');
}

build().catch(console.error);
