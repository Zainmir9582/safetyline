const fs = require('fs');
const sharp = require('sharp');

// Let's create an exact high fidelity SVG matching the uploaded image
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 850" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&amp;family=Prata&amp;family=Cinzel:wght@700;900&amp;family=Cormorant+Garamond:wght@700&amp;display=swap');
      
      .red-stroke { fill: #E51821; }
      .black-stroke { fill: #1D1D1D; }
    </style>
  </defs>

  <!-- Clean transparent canvas -->
  <g id="safety-line-ind-logo" transform="translate(0, 0)">
    
    <!-- MONOGRAM SECTION -->
    <g id="monogram" transform="translate(100, 20)">
      
      <!-- 1. BLACK 'L' - Top Portion (Serif and Upper Diagonal Stem) -->
      <!-- The top serif is horizontal at top right, stem comes down diagonally behind S top loop -->
      <path class="black-stroke" d="
        M 460 72
        L 660 72
        L 652 108
        L 598 108
        L 508 340
        L 438 298
        L 522 108
        L 468 108
        Z
      " />

      <!-- 2. RED 'S' - The Full Flowing Ribbon Monogram -->
      <!-- Curves around top of L, crosses over L stem in center, loops bottom right and tapers left -->
      <path class="red-stroke" d="
        M 570 128
        C 610 144 636 178 630 226
        C 624 262 604 286 572 304
        L 542 318
        C 534 288 532 264 540 242
        C 548 216 540 196 518 182
        C 496 166 464 164 428 172
        C 378 184 346 212 340 248
        C 336 282 354 308 396 328
        L 482 366
        C 560 398 596 444 588 502
        C 578 560 526 606 448 618
        C 384 628 330 610 292 572
        C 270 548 260 518 264 478
        L 322 480
        C 318 508 328 534 350 552
        C 374 568 406 574 438 566
        C 486 558 512 530 518 492
        C 524 456 502 432 452 408
        L 378 374
        C 310 342 278 304 284 244
        C 292 182 344 140 416 130
        C 472 122 528 124 570 128
        Z
      " />

      <!-- Red S Upper Teardrop Terminal Accent -->
      <path class="red-stroke" d="
        M 630 226
        C 630 244 618 258 598 266
        L 590 246
        C 598 238 602 230 600 222
        C 598 208 582 194 558 188
        L 564 168
        C 596 174 624 196 630 226
        Z
      " />

      <!-- 3. BLACK 'L' - Lower Portion (Diagonal Stem emerging from under S, curving into Base & Serifs) -->
      <path class="black-stroke" d="
        M 264 628
        C 240 628 224 624 214 618
        C 204 610 198 600 204 592
        C 210 584 224 580 244 580
        C 280 580 302 570 324 502
        L 412 258
        L 486 298
        L 392 560
        C 374 610 390 628 438 628
        L 662 628
        C 702 628 718 612 726 568
        L 742 568
        L 722 674
        L 204 674
        C 218 646 240 628 264 628
        Z
      " />

      <!-- Lower sharp horizontal tail point of S -->
      <path class="red-stroke" d="
        M 350 552
        C 368 564 390 570 418 568
        L 366 568
        C 336 568 300 558 274 538
        L 264 478
        C 264 502 276 526 298 544
        C 316 558 336 566 362 568
        Z
      " />

    </g>

    <!-- TYPOGRAPHY SECTION -->
    <g transform="translate(500, 735)">
      <!-- SAFETY LINE -->
      <text x="0" y="0" text-anchor="middle">
        <tspan fill="#E51821" style="font-family: 'Playfair Display', 'Bodoni MT', 'Didot', 'Times New Roman', Georgia, serif; font-size: 54px; font-weight: 900; letter-spacing: 0.16em;">SAFETY </tspan>
        <tspan fill="#1D1D1D" style="font-family: 'Playfair Display', 'Bodoni MT', 'Didot', 'Times New Roman', Georgia, serif; font-size: 54px; font-weight: 900; letter-spacing: 0.16em;">LINE</tspan>
      </text>

      <!-- IND (Aligned exactly underneath LINE on the right) -->
      <text x="215" y="52" text-anchor="end" fill="#1D1D1D" style="font-family: 'Playfair Display', 'Bodoni MT', 'Didot', 'Times New Roman', Georgia, serif; font-size: 36px; font-weight: 900; letter-spacing: 0.14em;">IND</text>
    </g>

  </g>
</svg>
`;

fs.writeFileSync('test.svg', svg);
console.log('Saved test.svg');
