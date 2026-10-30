import { Product } from '../types';
import tacticalGlovesImg from '../assets/images/blank_tactical_glove_1792247540904.jpg';
import tacticalPoliceGlovesImg from '../assets/images/blank_police_glove_1792247591145.jpg';
import workGlovesImg from '../assets/images/blank_mechanic_glove_1792247541453.jpg';
import roadCyclingImg from '../assets/images/blank_road_cycling_1792247567857.jpg';
import cyclingGlovesImg from '../assets/images/blank_cycling_glove_1792247541304.jpg';
import motorcarsGlovesImg from '../assets/images/blank_racing_glove_1792247541163.jpg';
import carRacingImg from '../assets/images/blank_racing_glove_1792247541163.jpg';
import mechanicsGlovesImg from '../assets/images/blank_mechanic_glove_1792247541453.jpg';
import weightLiftingImg from '../assets/images/blank_weight_lifting_1792247542179.jpg';
import fishGlovesImg from '../assets/images/blank_fish_glove_1792247591287.jpg';
import golfGlovesImg from '../assets/images/blank_golf_glove_1792247520769.jpg';
import cg1Img from '../assets/images/cg1.png';
import cg3Img from '../assets/images/cg3.png';
import cg4Img from '../assets/images/cg4.png';
import cg5Img from '../assets/images/cg5.png';

export const gearwearProducts: Product[] = [
  // 1. Tactical Gloves Category
  {
    id: 'prod-tg-01',
    name: 'Operator Tactical Hard-Knuckle Gloves',
    slug: 'operator-tactical-hard-knuckle-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'tactical-gloves',
    shortDescription: 'Combat-grade tactical gloves with molded composite knuckle guards, anti-abrasion goat leather palms, and touchscreen conductivity.',
    longDescription: 'Engineered for military operators, tactical units, and law enforcement personnel. Spun with cut-resistant Kevlar® inner lining and heavy-duty double-stitched goat leather palms. Meets EN 388 Level 4 abrasion resistance.',
    material: 'Goat Leather, Kevlar® Lining & Thermal TPR Knuckles',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Molded thermal TPR impact knuckle guards',
      'EN 388 Level 4 abrasion-resistant goat leather palm',
      'Touchscreen conductive thumb and index fingertips',
      'Hook-and-loop adjustable neoprene wrist closure'
    ],
    productCode: 'GW-TG-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: tacticalGlovesImg,
    galleryImages: [tacticalGlovesImg],
    seoTitle: 'Operator Tactical Hard-Knuckle Gloves | Safety Line',
    seoDescription: 'Combat-ready tactical gloves with molded knuckle guards and Kevlar palm reinforcement.',
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'prod-tg-02',
    name: 'Combat Recon High-Dexterity Tactical Gloves',
    slug: 'combat-recon-high-dexterity-tactical-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'tactical-gloves',
    shortDescription: 'Ultra-lightweight tactical gloves designed for extreme trigger dexterity, weapon manipulation, and rapid ventilation.',
    longDescription: 'Designed for precision marksmanship and patrol duties. Features a 0.5mm synthetic micro-suede palm for barehand trigger sensitivity combined with 4-way stretch breathable Cordura® backing.',
    material: 'Synthetic Micro-Suede & 4-Way Stretch Cordura®',
    sizes: ['S', 'M', 'L', 'XL'],
    features: [
      '0.5mm ultra-thin high-dexterity trigger sensitivity palm',
      'Breathable moisture-wicking backhand ventilation mesh',
      'Reinforced thumb saddle for rapid weapon cycling',
      'Integrated nylon pull loop for fast deployment'
    ],
    productCode: 'GW-TG-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: tacticalPoliceGlovesImg,
    galleryImages: [tacticalPoliceGlovesImg],
    seoTitle: 'Combat Recon High-Dexterity Tactical Gloves | Safety Line',
    seoDescription: 'High-dexterity patrol and combat gloves with micro-suede palm and Cordura back.',
    createdAt: '2026-03-02T08:00:00.000Z'
  },
  {
    id: 'prod-tg-03',
    name: 'Desert Storm Heavy Duty Combat Gloves',
    slug: 'desert-storm-heavy-duty-combat-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'tactical-gloves',
    shortDescription: 'Heavy-duty arid operational tactical handwear with reinforced palm padding and thermal knuckle shielding.',
    longDescription: 'Built to withstand high-friction arid terrain, fast-roping, and extreme operational maneuvers. Double reinforced palm overlays prevent friction burns while ergonomic finger articulation prevents fatigue.',
    material: 'Full-Grain Goat Leather & Reinforced Kevlar® Stitching',
    sizes: ['M', 'L', 'XL', 'XXL'],
    features: [
      'Double-layer leather palm reinforced for fast-roping operations',
      'Split-knuckle design for maximum natural hand curvature',
      'High-tensile Kevlar® thread stitching across all high-wear points',
      'Breathable air-mesh finger sidewalls'
    ],
    productCode: 'GW-TG-03',
    status: 'Active',
    displayOrder: 3,
    coverImage: workGlovesImg,
    galleryImages: [workGlovesImg],
    seoTitle: 'Desert Storm Heavy Duty Combat Gloves | Safety Line',
    seoDescription: 'Rugged combat operational handwear with double-layer leather palms and Kevlar stitching.',
    createdAt: '2026-03-03T08:00:00.000Z'
  },

  // 2. Road & Cycling Apparel Category
  {
    id: 'prod-rc-01',
    name: 'AeroSpeed Pro Road Cycling Jersey',
    slug: 'aerospeed-pro-road-cycling-jersey',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'road-cycling-apparel',
    shortDescription: 'Ultra-lightweight aerodynamic road cycling jersey with textured drag-reducing sleeves and micro-mesh ventilation.',
    longDescription: 'Engineered for high-cadence road racing and gravel riding. Incorporates wind-tunnel tested textured shoulder fabric that trips the boundary layer of air, dramatically decreasing aerodynamic drag at high speeds.',
    material: '80% Performance Poly-Microfiber, 20% Elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Aerodynamic textured boundary-layer sleeve fabric',
      'Full-length YKK semi-autolock front ventilation zipper',
      'Triple reinforced rear cargo pockets with hidden zip security pocket',
      'Laser-cut silicone elastic gripper hem preventing jersey ride-up',
      'UPF 50+ UV solar protection'
    ],
    productCode: 'GW-RC-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: roadCyclingImg,
    galleryImages: [roadCyclingImg],
    seoTitle: 'AeroSpeed Pro Road Cycling Jersey | Safety Line Cycling',
    seoDescription: 'Aerodynamic road cycling jersey with textured sleeves, YKK zipper, and UV 50+ protection.',
    createdAt: '2026-03-04T08:00:00.000Z'
  },
  {
    id: 'prod-rc-02',
    name: 'Velocity Carbon 3D Gel Chamois Bib Shorts',
    slug: 'velocity-carbon-3d-gel-chamois-bib-shorts',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'road-cycling-apparel',
    shortDescription: 'Premium endurance road cycling bib shorts featuring a multi-density 3D gel chamois and Italian Lycra compression.',
    longDescription: 'Crafted for 6+ hour epic road endurance rides. Features anatomical multi-density foam and gel chamois inserts treated with anti-bacterial silver ions to alleviate perineal pressure points.',
    material: 'Italian Warp Knit Lycra (220 GSM) & High-Density Gel Chamois',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Multi-density 120kg/m³ perforated anatomical 3D gel chamois',
      'Graduated vascular compression Lycra stabilizing thigh muscles',
      'Seamless flat-stitched breathable mesh shoulder braces',
      '7cm wide laser-cut silicone printed leg bands for secure lock'
    ],
    productCode: 'GW-RC-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: cyclingGlovesImg,
    galleryImages: [cyclingGlovesImg],
    seoTitle: 'Velocity Carbon 3D Gel Chamois Bib Shorts | Safety Line Cycling',
    seoDescription: 'Endurance cycling bib shorts with multi-density 3D gel chamois and Italian compression Lycra.',
    createdAt: '2026-03-05T08:00:00.000Z'
  },
  {
    id: 'prod-rc-03',
    name: 'WindBarrier Lightweight Packable Cycling Gilet',
    slug: 'windbarrier-lightweight-packable-cycling-gilet',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'road-cycling-apparel',
    shortDescription: 'Ultra-compact windproof and water-resistant cycling vest designed for mountain descents and brisk mornings.',
    longDescription: 'Weighing only 85 grams, this cycling vest packs down into its own jersey pocket pouch. Features a dual-slider front zipper for easy mid-ride ventilation and rear reach-through jersey pocket slits.',
    material: '100% Ultralight Ripstop Hydrophobic Polyamide',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Total wind-blocking chest and shoulder barrier',
      'High-stretch breathable mesh rear panel for heat dumping',
      'Dual-slider two-way YKK front zipper for quick jersey access',
      'High-visibility 3M Scotchlite™ reflective rear safety strips'
    ],
    productCode: 'GW-RC-03',
    status: 'Active',
    displayOrder: 3,
    coverImage: roadCyclingImg,
    galleryImages: [roadCyclingImg],
    seoTitle: 'WindBarrier Packable Cycling Gilet | Safety Line Cycling',
    seoDescription: 'Featherlight 85g windproof packable cycling vest for road racing and descents.',
    createdAt: '2026-03-06T08:00:00.000Z'
  },

  // 3. Car Racing Category (Featuring Official Safety Line CG1 to CG5 Lineup)
  {
    id: 'prod-cr-01',
    name: 'Safety Line Signature Flame FIA Racing Gloves (Purple / Black)',
    slug: 'safety-line-signature-flame-fia-racing-gloves-purple-black',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'car-racing',
    shortDescription: 'Official Safety Line FIA-compliant fireproof racing gloves with iconic purple tiger flame Nomex® backing, suede reinforced grip, and embroidered SL insignia.',
    longDescription: 'Engineered in Safety Line’s Sialkot facility to meet FIA 8856-2018 and SFI 3.3/5 international motorsport safety benchmarks. Constructed with genuine double-layer Nomex® aramid knit certified to withstand direct flame contact for over 15 seconds. Features 100% external reverse-seam finger construction to eliminate blisters and pressure points, durable black suede palm reinforcements with padded metacarpal shielding, and official embroidered Safety Line branding on the wrist closure and gauntlet cuff.',
    material: 'Double-Layer Nomex® Aramid Matrix, Fire-Retardant Suede Leather & Padded Knuckle Shields',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Purple / Black Tiger Flame', 'Custom Team Livery'],
    features: [
      'Iconic Safety Line purple tiger flame high-definition Nomex® backhand',
      'FIA 8856-2018 & SFI 3.3/5 benchmark certified fire & thermal flash protection (15s+ rating)',
      '100% external reverse-seam finger construction eliminating blisters during long stints',
      'Reinforced fireproof black suede palm with anti-slip steering wheel grip',
      'Extended safety gauntlet featuring the embroidered official Safety Line SL racing emblem',
      'Adjustable hook-and-loop velcro wrist tab ensuring firm cockpit security'
    ],
    productCode: 'GW-CR-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: cg1Img,
    galleryImages: [cg1Img],
    seoTitle: 'Safety Line Signature Flame FIA Racing Gloves | Purple & Black',
    seoDescription: 'Official Safety Line FIA 8856 certified flame-retardant Nomex racing gloves in signature purple flame livery.',
    createdAt: '2026-03-07T08:00:00.000Z'
  },
  {
    id: 'prod-cr-03',
    name: 'Safety Line Veloce High-Visibility Endurance Racing Gloves (Signal Yellow / Black)',
    slug: 'safety-line-veloce-high-visibility-endurance-racing-gloves-yellow',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'car-racing',
    shortDescription: 'FIA 8856 certified high-visibility fluorescent yellow Nomex® racing gloves with black palm reinforcements, velcro safety cuff, and embroidered SL racing emblem.',
    longDescription: 'Optimized for night stints, 24-hour endurance GT racing, and rally stages where visual signaling in dark cockpits is vital. Spun with fluorescent high-visibility signal yellow Nomex® aramid that stands out under cockpit ambient lighting. Features full-palm abrasion-resistant traction padding, ergonomic thumb saddle reinforcement, and a dedicated Safety Line hook-and-loop wrist security closure with embroidered SL racing insignia.',
    material: 'Fluorescent Signal Yellow Nomex® Fabric, Fire-Retardant Black Suede & Reinforced Seams',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Signal Neon Yellow / Black', 'Fluorescent Neon'],
    features: [
      'Ultra-high visibility signal yellow backhand for night cockpit clarity and rapid driver signaling',
      'FIA 8856-2000 and SFI 3.3/5 dual safety certified aramid construction',
      'Reinforced black leather palm inserts resisting high steering wheel friction and vibration',
      'Official Safety Line rubberized wrist strap with adjustable micro-velcro closure',
      'Embroidered multi-color SL emblem on extended protective gauntlet',
      'Breathable fire-retardant aramid inner liner preventing slippage during multi-hour endurance stints'
    ],
    productCode: 'GW-CR-03',
    status: 'Active',
    displayOrder: 2,
    coverImage: cg3Img,
    galleryImages: [cg3Img],
    seoTitle: 'Safety Line Veloce High-Visibility Racing Gloves | Signal Yellow',
    seoDescription: 'High-visibility fluorescent yellow endurance racing gloves with Safety Line emblem and FIA safety certification.',
    createdAt: '2026-03-09T08:00:00.000Z'
  },
  {
    id: 'prod-cr-04',
    name: 'Safety Line Pro-Circuit Two-Tone Racing Gloves (Stealth Black / Pure White)',
    slug: 'safety-line-pro-circuit-two-tone-racing-gloves-black-white',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'car-racing',
    shortDescription: 'Classic high-contrast two-tone black and white Nomex® racing gloves with padded knuckles, reverse-stitched palm, and embroidered SL safety gauntlet.',
    longDescription: 'Engineered specifically for single-seaters, formula regional, and sprint championships where clean visual lines and maximum wheel sensitivity are paramount. Constructed with deep black fireproof Nomex® aramid, high-contrast pure white leather palm and finger reinforcements, integrated white metacarpal impact padding, and clean white wrist patch bearing the embroidered Safety Line SL emblem.',
    material: 'Deep Black Nomex® Fireproof Aramid & Pure White Full-Grain Fire-Treated Leather',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Monochrome Stealth Black / Pure White', 'Speed White'],
    features: [
      'Timeless high-contrast black and pure white motorsport livery',
      'Supple white fire-treated leather palm providing telepathic feedback on Alcantara and suede wheels',
      'Padded white knuckle crossbar deflecting cockpit kicks and wheel vibrations',
      '100% external reverse-seam finger framing eliminating friction points',
      'Extended black safety gauntlet with embroidered SL emblem on white patch',
      'FIA 8856-2018 benchmark flame-tested aramid composition'
    ],
    productCode: 'GW-CR-04',
    status: 'Active',
    displayOrder: 3,
    coverImage: cg4Img,
    galleryImages: [cg4Img],
    seoTitle: 'Safety Line Pro-Circuit Two-Tone Racing Gloves | Black & White',
    seoDescription: 'Classic high-contrast black and white Nomex racing gloves with leather palm and embroidered SL insignia.',
    createdAt: '2026-03-10T08:00:00.000Z'
  },
  {
    id: 'prod-cr-05',
    name: 'Safety Line Grand Prix Monza Flame-Retardant Racing Gloves (Championship Red / White)',
    slug: 'safety-line-grand-prix-monza-flame-retardant-racing-gloves-red',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'car-racing',
    shortDescription: 'Championship-grade fire-retardant racing gloves in radiant Monza Red with white finger sidewalls, extended Nomex safety gauntlet, and iconic SL insignia.',
    longDescription: 'Crafted for Formula racing, historic touring cars, and competitive GT drivers. Features striking championship Monza Red Nomex® fire-retardant aramid with white finger inserts, soft white leather palm reinforcements, white metacarpal protective crossbar, and an oversized white embroidered Safety Line SL emblem across the wide slash-cut gauntlet.',
    material: 'Championship Monza Red Nomex® Interlock Knit & Pure White Fire-Treated Leather',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Championship Monza Red / White', 'Formula Red'],
    features: [
      'Radiant Monza Red fireproof Nomex® construction with pure white contrasting accents',
      'Soft white leather palm and finger linings for anti-fatigue grip during high-G cornering',
      'Extended slash gauntlet with prominent white embroidered Safety Line SL racing emblem',
      'Integrated white metacarpal bar and finger impact dampening',
      'FIA 8856-2018 & SFI safety approved for all international circuit and rally series',
      'Full fire-suit sleeve overlap compliance with black piped safety trim'
    ],
    productCode: 'GW-CR-05',
    status: 'Active',
    displayOrder: 4,
    coverImage: cg5Img,
    galleryImages: [cg5Img],
    seoTitle: 'Safety Line Grand Prix Monza Racing Gloves | Championship Red',
    seoDescription: 'Championship-grade Monza Red fireproof racing gloves with white leather palm and embroidered SL emblem.',
    createdAt: '2026-03-11T08:00:00.000Z'
  },

  // 4. Weight Lifting Category
  {
    id: 'prod-wl-01',
    name: 'Titan Buffalo Leather Powerlifting Lever Belt (10mm)',
    slug: 'titan-buffalo-leather-powerlifting-lever-belt-10mm',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'weight-lifting',
    shortDescription: 'Heavy-duty 10mm genuine buffalo leather powerlifting belt equipped with a precision matte black stainless steel quick-release lever.',
    longDescription: 'Crafted for heavy barbell squats, deadlifts, and overhead presses. Spun from top-grain buffalo leather with uniform 10mm thickness, non-stretch suede interior, and heavy industrial bonded nylon four-row perimeter stitching.',
    material: '100% Genuine Top-Grain Buffalo Leather & Matte Stainless Steel Lever',
    sizes: ['S (26-32")', 'M (30-36")', 'L (34-40")', 'XL (38-44")', 'XXL (42-48")'],
    features: [
      'Uniform 10mm competition-grade thickness (4-inch width)',
      'Heavy-duty quick-release zinc-alloy lever buckle tested to 500kg+',
      'Non-slip genuine suede inner lining preventing belt shifting',
      'Four-row high-density bonded nylon structural stitching'
    ],
    productCode: 'GW-WL-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: weightLiftingImg,
    galleryImages: [weightLiftingImg],
    seoTitle: 'Titan 10mm Buffalo Leather Lever Belt | Safety Line Strength',
    seoDescription: 'Competition 10mm genuine buffalo leather powerlifting lever belt tested to 500kg barbell loads.',
    createdAt: '2026-03-10T08:00:00.000Z'
  },
  {
    id: 'prod-wl-02',
    name: 'IronGrip Padded Barbell Weightlifting Gloves',
    slug: 'irongrip-padded-barbell-weightlifting-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'weight-lifting',
    shortDescription: 'Heavy-duty gym training gloves featuring silicone honeycomb padded palms, integrated wrist wrap support, and quick-pull finger tabs.',
    longDescription: 'Engineered for bodybuilding, high-rep pull-ups, kettlebell swings, and dumbbell complexes. Features high-density silicone micro-cushioning that prevents calluses while the integrated 16-inch wrist wrap stabilizes joints.',
    material: 'Breathable Mesh, Microfiber Suede & Silicone Honeycomb Cushioning',
    sizes: ['S', 'M', 'L', 'XL'],
    features: [
      'Honeycomb silicone palm cushioning absorbing knurling barbell friction',
      'Integrated 16-inch elastic wrist wrap with hook-and-loop stabilization',
      'Breathable lycra mesh back preventing hand overheating',
      'Dual quick-release finger tabs for effortless glove removal post-workout'
    ],
    productCode: 'GW-WL-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: fishGlovesImg,
    galleryImages: [fishGlovesImg],
    seoTitle: 'IronGrip Padded Weightlifting Gloves | Safety Line Strength',
    seoDescription: 'Gym lifting gloves with honeycomb silicone palm padding and integrated 16-inch wrist wrap.',
    createdAt: '2026-03-11T08:00:00.000Z'
  },
  {
    id: 'prod-wl-03',
    name: 'Heavy-Duty Elastic Thumb-Loop Wrist Wraps (18-Inch)',
    slug: 'heavy-duty-elastic-thumb-loop-wrist-wraps-18-inch',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'weight-lifting',
    shortDescription: 'Industrial-strength powerlifting wrist wraps with reinforced thumb loops and military-grade Velcro closure.',
    longDescription: 'Provides cast-like immobilization for heavy bench presses, overhead squats, and Olympic clean & jerks. Woven with heavy-gauge elastodiene and premium cotton blend that maintains stiffness under maximal loads.',
    material: '60% Heavy-Gauge Cotton, 40% Rubberized Elastodiene',
    sizes: ['18-Inch Standard', '24-Inch Heavy Competition'],
    features: [
      'Heavy-gauge woven elastic providing maximum wrist joint casting',
      'Reinforced thumb loop with flatlock seam to eliminate thumb pinch',
      'Extra-wide 2-inch industrial hook-and-loop fastening',
      'Left and right anatomical wrist orientation labeling'
    ],
    productCode: 'GW-WL-03',
    status: 'Active',
    displayOrder: 3,
    coverImage: weightLiftingImg,
    galleryImages: [weightLiftingImg],
    seoTitle: 'Heavy-Duty 18-Inch Powerlifting Wrist Wraps | Safety Line',
    seoDescription: 'Maximum stiffness 18-inch powerlifting wrist wraps for heavy bench press and overhead lifts.',
    createdAt: '2026-03-12T08:00:00.000Z'
  },
  {
    id: 'prod-wl-04',
    name: '7mm Neoprene Competition Knee Sleeves',
    slug: '7mm-neoprene-competition-knee-sleeves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'weight-lifting',
    shortDescription: 'High-density 7mm neoprene compression knee sleeves providing joint warmth, rebound assistance, and lateral knee stabilization.',
    longDescription: 'Spun from competition-grade 7mm SCR neoprene with ergonomic contoured cut that stays locked in place through deep squat sets. Promotes blood flow, joint warmth, and explosive rebound power out of the squat hole.',
    material: '7mm High-Density SCR Neoprene with Bonded Nylon Seams',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      '7mm competition-grade high-density SCR neoprene core',
      'Anatomical 3D contour preventing slippage and bunching behind the knee',
      'Reinforced zig-zag double flatlock stitching resisting tensile rupture',
      'Graduated compression boosting patellar tracking and joint lubrication'
    ],
    productCode: 'GW-WL-04',
    status: 'Active',
    displayOrder: 4,
    coverImage: golfGlovesImg,
    galleryImages: [golfGlovesImg],
    seoTitle: '7mm Neoprene Competition Knee Sleeves | Safety Line Strength',
    seoDescription: 'High-density 7mm neoprene compression knee sleeves for heavy squats and powerlifting.',
    createdAt: '2026-03-13T08:00:00.000Z'
  }
];
