const fs = require('fs');
const sharp = require('sharp');

// 600 x 500 coordinate system matching exact proportions:
// Monogram occupies (90 to 510 in X, 50 to 390 in Y)
// SAFETY LINE is in Modern Bodoni/Didot Bold serif with high contrast
// S: Bright Red (#E41B23)
// L: Jet Black (#1A1A1A)
// SAFETY: Red (#E41B23)
// LINE: Jet Black (#1A1A1A)
// IND: Jet Black (#1A1A1A) indented right under LINE

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,900;1,6..96,900&amp;family=Playfair+Display:ital,wght@0,900;1,900&amp;display=swap');
      .c-red { fill: #E41B23; }
      .c-black { fill: #1D1D1D; }
    </style>
  </defs>

  <g id="logo">
    <!-- ==================== L & S INTERLOCKING MONOGRAM ==================== -->
    <g id="monogram">
      
      <!-- 1. BLACK L UPPER: Top horizontal bracket & upper diagonal stem -->
      <path class="c-black" d="
        M 314 52
        L 436 52
        L 432 63
        L 398 63
        L 326 230
        L 282 208
        L 348 63
        L 314 63
        Z
      " />

      <!-- 2. RED S: Continuous ribbon curving around top, crossing center, swooping bottom right & left tail -->
      <path class="c-red" d="
        M 406 87
        C 434 98 448 120 443 148
        C 438 170 422 186 398 198
        L 378 208
        C 372 188 370 172 376 158
        C 380 142 372 130 358 120
        C 344 110 324 108 302 114
        C 268 122 246 142 242 166
        C 238 188 250 206 280 220
        L 340 248
        C 396 272 422 304 416 344
        C 408 386 372 418 316 426
        C 270 432 232 420 204 394
        C 188 378 180 358 184 330
        L 224 331
        C 220 352 228 368 244 382
        C 260 394 282 398 306 392
        C 342 384 360 364 366 338
        C 370 312 354 296 318 280
        L 266 254
        C 216 230 194 204 198 162
        C 204 118 240 88 290 82
        C 332 76 374 77 406 87
        Z
      " />

      <!-- Red S Upper Bulb Detail -->
      <path class="c-red" d="
        M 443 148
        C 443 160 435 170 420 176
        L 415 162
        C 420 157 422 152 420 147
        C 418 138 408 128 392 123
        L 396 110
        C 418 113 438 128 443 148
        Z
      " />

      <!-- 3. BLACK L LOWER: Stem from under S, left serif, base and right serif -->
      <path class="c-black" d="
        M 188 388
        C 172 388 160 385 153 380
        C 146 375 142 368 145 363
        C 150 357 160 354 174 354
        C 198 354 214 348 230 300
        L 272 196
        L 316 218
        L 272 342
        C 258 376 270 388 304 388
        L 418 388
        C 446 388 456 377 461 346
        L 472 346
        L 458 418
        L 146 418
        C 156 399 170 388 188 388
        Z
      " />

      <!-- Red S Lower Tail Sweep -->
      <path class="c-red" d="
        M 244 382
        C 258 390 274 394 294 392
        L 256 392
        C 234 392 210 384 192 370
        L 184 330
        C 184 346 192 362 206 374
        C 218 382 230 386 244 382
        Z
      " />
    </g>

    <!-- ==================== TYPOGRAPHY ==================== -->
    <g id="text-lockup" transform="translate(300, 465)">
      <!-- Line 1: SAFETY (Red) LINE (Black) -->
      <text x="-5" y="0" text-anchor="middle">
        <tspan class="c-red" style="font-family: 'Bodoni Moda', 'Playfair Display', 'Times New Roman', serif; font-size: 35px; font-weight: 900; letter-spacing: 0.22em;">SAFETY </tspan>
        <tspan class="c-black" style="font-family: 'Bodoni Moda', 'Playfair Display', 'Times New Roman', serif; font-size: 35px; font-weight: 900; letter-spacing: 0.22em;">LINE</tspan>
      </text>

      <!-- Line 2: IND (Black, right aligned under LINE) -->
      <text x="160" y="30" text-anchor="end" class="c-black" style="font-family: 'Bodoni Moda', 'Playfair Display', 'Times New Roman', serif; font-size: 25px; font-weight: 900; letter-spacing: 0.16em;">IND</text>
    </g>
  </g>
</svg>
`;

async function run() {
  fs.writeFileSync('public/safetyline_logo.svg', svg);
  fs.writeFileSync('public/safety-line-logo.svg', svg);
  
  const pngBuffer = await sharp(Buffer.from(svg), { density: 300 })
    .trim()
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('public/safetyline_logo.png', pngBuffer);
  fs.writeFileSync('public/safety-line-logo.png', pngBuffer);
  fs.writeFileSync('public/safetyline logo.png', pngBuffer);
  fs.writeFileSync('public/safetyline-logo.png', pngBuffer);
  fs.writeFileSync('public/safetyline_logo-removebg-preview.png', pngBuffer);

  console.log('Finished rendering exact vector & PNG logo assets!');
}

run().catch(console.error);
