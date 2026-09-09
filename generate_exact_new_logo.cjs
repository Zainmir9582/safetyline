const fs = require('fs');
const sharp = require('sharp');

function createFullLogoSvg({ redColor = '#E51821', blackColor = '#1A1A1A', indColor = '#1A1A1A' }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 680" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&amp;family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&amp;display=swap');
      .sl-red { fill: ${redColor}; }
      .sl-black { fill: ${blackColor}; }
      .sl-ind { fill: ${indColor}; }
      .logo-font { font-family: "Cinzel", "Playfair Display", "Times New Roman", Georgia, serif; }
    </style>
  </defs>

  <g id="official-safetyline-logo" transform="translate(10, 10)">
    
    <!-- ==================== MONOGRAM: RED S & BLACK L ==================== -->
    <g id="monogram">
      <!-- 1. BLACK L - TOP SERIF & UPPER DIAGONAL STEM -->
      <path class="sl-black" d="
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

      <!-- 3. BLACK L - LOWER STEM, LEFT SERIF, BASE AND RIGHT FOOT -->
      <path class="sl-black" d="
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

    <!-- ==================== EXACT TYPOGRAPHY ==================== -->
    <g id="typography" transform="translate(40, 642)">
      <!-- SAFETY (Red with tracking) -->
      <text x="35" y="0" class="sl-red logo-font" font-size="44" font-weight="900" letter-spacing="0.22em">
        SAFETY
      </text>

      <!-- LINE (Black with tracking) -->
      <text x="280" y="0" class="sl-black logo-font" font-size="44" font-weight="900" letter-spacing="0.22em">
        LINE
      </text>

      <!-- IND (Subscript on right underneath LINE) -->
      <text x="460" y="38" text-anchor="end" class="sl-ind logo-font" font-size="34" font-weight="900" letter-spacing="0.12em">
        IND
      </text>
    </g>

  </g>
</svg>
`;
}

async function run() {
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }

  // 1. Light Theme Logo (Original Colors: Red S + Black L + Red SAFETY + Black LINE + Black IND)
  const lightSvg = createFullLogoSvg({
    redColor: '#E51821',
    blackColor: '#18181B',
    indColor: '#18181B'
  });

  // 2. Dark Theme Logo (For dark headers/portal: Red S + White L + Red SAFETY + White LINE + Light Gray IND)
  const darkSvg = createFullLogoSvg({
    redColor: '#FF2E38',
    blackColor: '#FFFFFF',
    indColor: '#E2E8F0'
  });

  // 3. Monochrome White Logo (All white/silver for special dark contrast)
  const monoWhiteSvg = createFullLogoSvg({
    redColor: '#FFFFFF',
    blackColor: '#F8FAFC',
    indColor: '#CBD5E1'
  });

  fs.writeFileSync('public/safetyline_logo.svg', lightSvg);
  fs.writeFileSync('public/safetyline_logo_dark.svg', darkSvg);
  fs.writeFileSync('public/safetyline_logo_white.svg', monoWhiteSvg);
  fs.writeFileSync('public/safety-line-logo.svg', lightSvg);

  const pngLight = await sharp(Buffer.from(lightSvg), { density: 300 })
    .trim()
    .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const pngDark = await sharp(Buffer.from(darkSvg), { density: 300 })
    .trim()
    .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const pngWhite = await sharp(Buffer.from(monoWhiteSvg), { density: 300 })
    .trim()
    .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('public/safetyline_logo.png', pngLight);
  fs.writeFileSync('public/safety-line-logo.png', pngLight);
  fs.writeFileSync('public/safetyline logo.png', pngLight);
  fs.writeFileSync('public/safetyline-logo.png', pngLight);
  fs.writeFileSync('public/safetyline_logo_dark.png', pngDark);
  fs.writeFileSync('public/safetyline_logo_white.png', pngWhite);
  fs.writeFileSync('public/safetyline_logo-removebg-preview.png', pngLight);

  // Favicon
  const favBuffer = await sharp(Buffer.from(lightSvg), { density: 150 })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon.png', favBuffer);

  console.log('Successfully generated all new logo formats with transparent background and theme adaptations!');
}

run().catch(console.error);
