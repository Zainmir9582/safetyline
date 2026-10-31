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

// Cycling Gloves Assets
import cy1Img from '../assets/images/cycling_glove_safetyline_1.png';
import cy2Img from '../assets/images/cycling_glove_safetyline_2.png';
import cy3Img from '../assets/images/cycling_glove_safetyline_3.jpeg';
import cy4Img from '../assets/images/cycling_glove_safetyline_4.jpeg';
import cy5Img from '../assets/images/cycling_glove_safetyline_5.png';
import cy6Img from '../assets/images/cycling_glove_safetyline_6.png';
import cy9Img from '../assets/images/cycling_glove_safetyline_9.jpeg';

// Golf Gloves Assets
import gg1Img from '../assets/images/golf_glove_1.jpeg';
import gg2Img from '../assets/images/golf_glove_2.jpeg';
import gg3Img from '../assets/images/golf_glove_3.jpeg';
import gg4Img from '../assets/images/golf_glove_4.jpeg';
import gg5Img from '../assets/images/golf_glove_5.jpeg';
import gg6Img from '../assets/images/golf_glove_6.jpeg';
import gg7Img from '../assets/images/golf_glove_7.jpeg';
import gg8Img from '../assets/images/golf_glove_8.jpeg';

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

  // Cycling Gloves Category (GW-CG)
  {
    id: 'prod-cg-01',
    name: 'Safety Line Pro-Aero Carbon Cycling Gloves',
    slug: 'safety-line-pro-aero-carbon-cycling-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'cycling-gloves',
    shortDescription: 'Professional aerodynamic road cycling gloves featuring multi-density 5mm shock-absorbing gel palm pads, moisture-wicking micro-mesh, and Safety Line pull-tab release.',
    longDescription: 'Professional aerodynamic road cycling gloves engineered for high-cadence road racing, time trials, and criteriums. Built with multi-density 5mm shock-absorbing gel palm pads to eliminate ulnar nerve pressure, 4-way stretch breathable micro-mesh backhand, and embroidered Safety Line SL emblem.',
    material: 'Microfiber Synthetic Leather, Gel Padding & Breathable Aero Mesh',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Carbon Black / Neon Yellow Aero', 'Team Edition'],
    features: [
      'Multi-zone anatomical silicone gel pads shielding the ulnar nerve',
      '4-way stretch aerodynamic micro-mesh back for continuous cooling',
      'Finger pull-loops and wrist tab for effortless removal',
      'Absorbent micro-fleece thumb panel for sweat clearance'
    ],
    productCode: 'GW-CG-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: cy1Img,
    galleryImages: [cy1Img],
    seoTitle: 'Safety Line Pro-Aero Carbon Cycling Gloves | UCI Pro',
    seoDescription: 'Professional aerodynamic road cycling gloves with shock-absorbing gel palm and aero mesh.',
    createdAt: '2026-03-14T08:00:00.000Z'
  },
  {
    id: 'prod-cg-02',
    name: 'Safety Line Veloce Signal Aero Cycling Gloves',
    slug: 'safety-line-veloce-signal-aero-cycling-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'cycling-gloves',
    shortDescription: 'High-visibility aerodynamic cycling gloves engineered with fluorescent signal accents, shock-absorbing gel palm pads, and breathable stretch airflow mesh.',
    longDescription: 'High-performance aerodynamic cycling gloves engineered with anti-shock gel palm pads, high-breathability mesh backing, quick-release finger loops, and embroidered Safety Line insignia.',
    material: 'Reinforced Microfiber Suede, Gel Cushioning & Airflow Mesh',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Signal Neon Yellow / Carbon Black'],
    features: [
      'Reinforced microfiber suede with anti-shock gel cushioning',
      'High-visibility fluorescent signal accents for road visibility',
      'Breathable air-mesh finger framing with quick release tabs',
      'Adjustable wrist velcro strap with embroidered Safety Line logo'
    ],
    productCode: 'GW-CG-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: cy2Img,
    galleryImages: [cy2Img],
    seoTitle: 'Safety Line Veloce Signal Aero Cycling Gloves | Neon Yellow',
    seoDescription: 'High-visibility aerodynamic cycling gloves with gel palm pads and air-mesh backing.',
    createdAt: '2026-03-14T10:00:00.000Z'
  },
  {
    id: 'prod-cg-03',
    name: 'Safety Line Stealth Pro Road Cycling Gloves',
    slug: 'safety-line-stealth-pro-road-cycling-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'cycling-gloves',
    shortDescription: 'Sleek stealth black cycling gloves featuring high-traction silicone hex palm grip, ergonomic ulnar pressure relief, and absorbent thumb sweat wipe.',
    longDescription: 'Sleek stealth black cycling gloves featuring high-traction silicone hex palm grip, ergonomic ulnar pressure relief, padded metacarpal cushions, and Terry thumb sweat wipe.',
    material: 'Synthetic Suede, Silicone Hex Traction & Flex Vent Mesh',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Stealth Black / Reflex White'],
    features: [
      'Anatomical silicon hex grip palm with foam protection',
      'Low-profile flatlock aero seams with terry sweat wipe',
      'Padded metacarpal cushion & air vents for zero fatigue',
      'Ergonomic ulnar nerve relief structure'
    ],
    productCode: 'GW-CG-03',
    status: 'Active',
    displayOrder: 3,
    coverImage: cy3Img,
    galleryImages: [cy3Img],
    seoTitle: 'Safety Line Stealth Pro Road Cycling Gloves | Black',
    seoDescription: 'Stealth black road cycling gloves with silicone hex grip palm and ulnar protection.',
    createdAt: '2026-03-14T12:00:00.000Z'
  },
  {
    id: 'prod-cg-04',
    name: 'Safety Line Endurance Gel Road Cycling Gloves',
    slug: 'safety-line-endurance-gel-road-cycling-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'cycling-gloves',
    shortDescription: 'Endurance road cycling gloves engineered for long-distance century rides with advanced gel vibration damping and breathable stretch backing.',
    longDescription: 'Engineered for long-distance century rides and Gran Fondo racing. Features advanced gel vibration damping to prevent hand fatigue, absorbent micro-fleece thumb wipe, and secure velcro closure with embroidered Safety Line emblem.',
    material: 'Hydrophobic Microfiber Palm & High-Damping Gel Inserts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Endurance White / Stealth Black'],
    features: [
      'High-damping silicon grip palm with vibration isolation',
      'Seamless flex-zone finger framing with terry sweat wipe',
      'Breathable stretch vent backing for optimal airflow',
      'Secure adjustable velcro wrist closure'
    ],
    productCode: 'GW-CG-04',
    status: 'Active',
    displayOrder: 4,
    coverImage: cy4Img,
    galleryImages: [cy4Img],
    seoTitle: 'Safety Line Endurance Gel Road Cycling Gloves | White',
    seoDescription: 'Endurance road cycling gloves with vibration isolation and gel padding.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-cg-05',
    name: 'Safety Line Grand Prix Monza Aero Cycling Gloves',
    slug: 'safety-line-grand-prix-monza-aero-cycling-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'cycling-gloves',
    shortDescription: 'Championship-tier cycling gloves designed with radiant Monza Red aero backing, dual-density gel cushioning, and official Safety Line branding.',
    longDescription: 'Championship-tier cycling gloves designed with radiant Monza Red aero backing, dual-density gel cushioning, Kevlar® reinforced thumb saddle, and official Safety Line branding.',
    material: 'Dual-Density Gel, Kevlar® Thumb Saddle & Monza Red Aero Knit',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Championship Monza Red / Black'],
    features: [
      'Dual-density ergonomic gel palm with Kevlar® thumb saddle',
      'Pre-curved articulated finger sidewalls for racing grip',
      'Breathable aero fabric with pull tab gauntlet',
      'UPF 50+ solar barrier protection'
    ],
    productCode: 'GW-CG-05',
    status: 'Active',
    displayOrder: 5,
    coverImage: cy5Img,
    galleryImages: [cy5Img],
    seoTitle: 'Safety Line Grand Prix Monza Aero Cycling Gloves | Red',
    seoDescription: 'Championship Monza Red cycling gloves with dual-density gel palm and Kevlar saddle.',
    createdAt: '2026-03-15T12:00:00.000Z'
  },
  {
    id: 'prod-cg-06',
    name: 'Safety Line Chrono Speed Track Cycling Gloves',
    slug: 'safety-line-chrono-speed-track-cycling-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'cycling-gloves',
    shortDescription: 'Ultra-lightweight track and road racing gloves designed for maximum tactile handlebar connection and aerodynamic efficiency.',
    longDescription: 'Ultra-lightweight track and road racing gloves designed for maximum tactile handlebar connection and aerodynamic efficiency with embroidered Safety Line SL emblem.',
    material: 'Tacky Synthetic Leather & Ultra-Low Profile Aero Fabric',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Chrono Racer Red / Black'],
    features: [
      'Tacky synthetic leather palm with direct handlebar feedback',
      'Ultra-low profile aero stitching for zero drag',
      'Flexible knuckle articulation panels',
      'Embroidered Safety Line SL insignia'
    ],
    productCode: 'GW-CG-06',
    status: 'Active',
    displayOrder: 3,
    coverImage: cy6Img,
    galleryImages: [cy6Img],
    seoTitle: 'Safety Line Chrono Speed Track Cycling Gloves | Red',
    seoDescription: 'Ultra-lightweight track cycling gloves with tacky synthetic leather palm.',
    createdAt: '2026-03-16T08:00:00.000Z'
  },
  {
    id: 'prod-cg-09',
    name: 'Safety Line All-Weather Gravel & MTB Cycling Gloves',
    slug: 'safety-line-all-weather-gravel-mtb-cycling-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'cycling-gloves',
    shortDescription: 'Rugged all-weather gravel and cross-country cycling gloves built with abrasion-resistant palm reinforcement and touchscreen compatibility.',
    longDescription: 'Rugged all-weather gravel and cross-country cycling gloves built with abrasion-resistant palm reinforcement, touchscreen compatibility, and Safety Line wrist security.',
    material: 'Abrasion-Resistant Synthetic Leather & TPR Impact Guards',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gravel Explorer Slate / Orange'],
    features: [
      'All-weather silicon traction palm with double stitching',
      'Reinforced durability seams with neoprene cuff',
      'TPR impact guards and flexible mesh',
      'Touchscreen compatible finger tips'
    ],
    productCode: 'GW-CG-09',
    status: 'Active',
    displayOrder: 4,
    coverImage: cy9Img,
    galleryImages: [cy9Img],
    seoTitle: 'Safety Line All-Weather Gravel & MTB Cycling Gloves | Slate',
    seoDescription: 'Rugged all-weather gravel and mountain biking gloves with TPR impact guards.',
    createdAt: '2026-03-17T08:00:00.000Z'
  },

  // 2.5. Golf Gloves Category (GW-GG)
  {
    id: 'prod-gg-01',
    name: 'Safety Line Tour Precision Cabretta Golf Gloves',
    slug: 'safety-line-tour-precision-cabretta-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'Tour-grade AAA Indonesian Cabretta leather golf gloves with micro-perforated airflow design and Velcro precision tab.',
    longDescription: 'Precision-tailored golf gloves crafted from Grade-AAA Indonesian Cabretta leather for velvet-soft tactile feedback, all-weather moisture control, and zero-slip club head stability in competitive play.',
    material: '0.45mm AAA Cabretta Leather & Micro-Porated Airflow Mesh',
    sizes: ['S', 'M', 'ML', 'L', 'XL'],
    colors: ['Tour Pearl White / Stealth Black Tab'],
    features: [
      'Grade-AAA Ethiopian & Indonesian Cabretta leather for supple second-skin fit',
      'Micro-perforation arrays across fingers for rapid sweat dispersion',
      'Angled ergonomic Velcro tab closure with elasticized wrist contouring',
      'Reinforced palm heel pad for extended durability across 100+ rounds'
    ],
    productCode: 'GW-GG-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: gg1Img,
    galleryImages: [gg1Img],
    seoTitle: 'Safety Line Tour Precision Cabretta Golf Gloves | Tour Grade',
    seoDescription: 'Tour-grade AAA Cabretta leather golf gloves with micro-perforated airflow design and Velcro tab.',
    createdAt: '2026-03-18T08:00:00.000Z'
  },
  {
    id: 'prod-gg-02',
    name: 'Safety Line Pure Grip All-Weather Golf Gloves',
    slug: 'safety-line-pure-grip-all-weather-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'All-weather golf gloves engineered with tacky synthetic leather palm matrix and 4-way stretch flex mesh for high humidity.',
    longDescription: 'Engineered to maintain maximum club face control in damp, humid, or rainy conditions. Combines hydrophobic microfiber palm texture with flexible knuckle inserts.',
    material: 'Hydrophobic Microfiber Suede & 4-Way Stretch PowerMesh',
    sizes: ['S', 'M', 'ML', 'L', 'XL'],
    colors: ['Optic White / Signal Red Accent'],
    features: [
      'Hydrophobic tacky synthetic leather palm for zero-slip wet grip',
      'Flexible 4-way stretch mesh over knuckles and finger joints',
      'Moisture-wicking interior lining for dry hands in hot climates',
      'Precision Velcro closure tab with Safety Line branding'
    ],
    productCode: 'GW-GG-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: gg2Img,
    galleryImages: [gg2Img],
    seoTitle: 'Safety Line Pure Grip All-Weather Golf Gloves | Hydrophobic',
    seoDescription: 'All-weather golf gloves with tacky synthetic palm and 4-way stretch mesh.',
    createdAt: '2026-03-18T10:00:00.000Z'
  },
  {
    id: 'prod-gg-03',
    name: 'Safety Line Master Tour Soft Cabretta Golf Gloves',
    slug: 'safety-line-master-tour-soft-cabretta-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'Ultra-thin 0.40mm AAA Cabretta leather golf gloves with seamless palm overlay and precision elastic wrist band.',
    longDescription: 'Crafted for low-handicap players and PGA tournament contenders seeking ultimate feel. Features hand-selected featherlight Cabretta leather.',
    material: '0.40mm Ultra-Thin AAA Ethiopian Cabretta Leather',
    sizes: ['S', 'M', 'ML', 'L', 'XL', 'XXL'],
    colors: ['Classic White / Midnight Black'],
    features: [
      'Hand-selected 0.40mm ultra-soft Ethiopian Cabretta leather',
      'Seamless palm surface ensuring pure feedback on leather or rubber grips',
      'Targeted finger perforations for continuous airflow',
      'Elasticized wrist binding with micro-velcro closure'
    ],
    productCode: 'GW-GG-03',
    status: 'Active',
    displayOrder: 3,
    coverImage: gg3Img,
    galleryImages: [gg3Img],
    seoTitle: 'Safety Line Master Tour Soft Cabretta Golf Gloves | PGA Tour',
    seoDescription: 'Ultra-thin 0.40mm AAA Cabretta leather golf gloves for PGA tournament precision.',
    createdAt: '2026-03-18T12:00:00.000Z'
  },
  {
    id: 'prod-gg-04',
    name: 'Safety Line Pro-Feel Perforated Tour Golf Gloves',
    slug: 'safety-line-pro-feel-perforated-tour-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'High-ventilation tour golf gloves featuring full-back laser micro-perforations and anatomical palm padding.',
    longDescription: 'Optimized for warm summer rounds and intense practice sessions. Features high-density laser-drilled perforations along all fingers and backhand.',
    material: 'Perforated AAA Cabretta Leather & Moisture-Wicking Spandex',
    sizes: ['S', 'M', 'ML', 'L', 'XL'],
    colors: ['Pearl White / Carbon Grey Accent'],
    features: [
      'Full laser-perforated finger and dorsal panels for max ventilation',
      'Anatomically contoured palm patch for reduced grip pressure',
      'Soft terry wrist lining absorbing sweat before reaching palms',
      'Ergonomic angled pull-tab closure'
    ],
    productCode: 'GW-GG-04',
    status: 'Active',
    displayOrder: 4,
    coverImage: gg4Img,
    galleryImages: [gg4Img],
    seoTitle: 'Safety Line Pro-Feel Perforated Tour Golf Gloves | Perforated',
    seoDescription: 'High-ventilation tour golf gloves with laser micro-perforations and soft wrist lining.',
    createdAt: '2026-03-19T08:00:00.000Z'
  },
  {
    id: 'prod-gg-05',
    name: 'Safety Line Elite Comfort Stretch Hybrid Golf Gloves',
    slug: 'safety-line-elite-comfort-stretch-hybrid-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'Hybrid golf gloves combining premium Cabretta leather palm grip with 3D stretch Lycra backhand flexibility.',
    longDescription: 'Designed for golfers seeking the ideal blend of leather grip tactile sensitivity and synthetic stretch mobility across all 18 holes.',
    material: 'AAA Cabretta Leather Palm & 3D Elastic Stretch Lycra Back',
    sizes: ['S', 'M', 'ML', 'L', 'XL'],
    colors: ['Pure White / Slate Grey Elastic'],
    features: [
      'AAA Cabretta leather palm and thumb for maximum club tackiness',
      'Flexible 3D Lycra backhand conforming to every hand shape',
      'Quick-drying stretch fabric preventing glove distortion over time',
      'Reinforced thumb saddle for high-frequency driving range sessions'
    ],
    productCode: 'GW-GG-05',
    status: 'Active',
    displayOrder: 5,
    coverImage: gg5Img,
    galleryImages: [gg5Img],
    seoTitle: 'Safety Line Elite Comfort Stretch Hybrid Golf Gloves | Hybrid',
    seoDescription: 'Hybrid golf gloves combining Cabretta leather palm with 3D stretch Lycra back.',
    createdAt: '2026-03-19T10:00:00.000Z'
  },
  {
    id: 'prod-gg-06',
    name: 'Safety Line Tour Select Hydrophobic Cabretta Golf Gloves',
    slug: 'safety-line-tour-select-hydrophobic-cabretta-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'Hydrophobic nano-treated Cabretta leather golf gloves repelling dew, sweat, and light rain.',
    longDescription: 'Nano-treated Cabretta leather shields hands against morning dew and summer humidity while delivering uncompromised shot feedback.',
    material: 'Nano-Treated Hydrophobic Cabretta Leather',
    sizes: ['S', 'M', 'ML', 'L', 'XL'],
    colors: ['Optic White / Royal Blue Trim'],
    features: [
      'Nano-coating repels water and sweat while maintaining natural leather softness',
      'Reinforced palm heel pad providing long-lasting abrasion resistance',
      'Micro-porous finger sidewalls ensuring rapid thermal release',
      'Embroidered Safety Line tab logo with secure Velcro fastening'
    ],
    productCode: 'GW-GG-06',
    status: 'Active',
    displayOrder: 6,
    coverImage: gg6Img,
    galleryImages: [gg6Img],
    seoTitle: 'Safety Line Tour Select Hydrophobic Golf Gloves | Nano Treated',
    seoDescription: 'Hydrophobic nano-treated Cabretta leather golf gloves repelling dew and sweat.',
    createdAt: '2026-03-19T12:00:00.000Z'
  },
  {
    id: 'prod-gg-07',
    name: 'Safety Line Apex Precision Micro-Mesh Golf Gloves',
    slug: 'safety-line-apex-precision-micro-mesh-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'Lightweight tour golf gloves featuring micro-mesh knuckle inserts and high-tack Cabretta thumb saddle.',
    longDescription: 'Engineered for smooth swing mechanics and effortless wrist cocking. Features precision micro-mesh breathability across stress points.',
    material: 'Cabretta Leather & Breathable Micro-Mesh Framing',
    sizes: ['S', 'M', 'ML', 'L', 'XL'],
    colors: ['Pearl White / Emerald Green Logo'],
    features: [
      'Micro-mesh inserts along knuckles and between fingers for maximum mobility',
      'High-tack Cabretta palm providing immediate feedback on irons and woods',
      'Elastic wrist band holding glove snug through full high-speed swings',
      'Durable double stitching across high-friction palm zones'
    ],
    productCode: 'GW-GG-07',
    status: 'Active',
    displayOrder: 7,
    coverImage: gg7Img,
    galleryImages: [gg7Img],
    seoTitle: 'Safety Line Apex Precision Micro-Mesh Golf Gloves | Apex Tour',
    seoDescription: 'Precision golf gloves with micro-mesh inserts and high-tack Cabretta thumb saddle.',
    createdAt: '2026-03-20T08:00:00.000Z'
  },
  {
    id: 'prod-gg-08',
    name: 'Safety Line Championship Gold Medal Tour Golf Gloves',
    slug: 'safety-line-championship-gold-medal-tour-golf-gloves',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    subcategory: 'golf-gloves',
    shortDescription: 'Championship-grade Cabretta leather golf gloves with gold medal accent tab and Tour-validated fit.',
    longDescription: 'Designed to commemorate championship victories. Features master-crafted Cabretta leather, gold-embossed Safety Line emblem, and flawless second-skin fit.',
    material: 'Select Grade-AAA Cabretta Leather & Satin Gold Trim',
    sizes: ['S', 'M', 'ML', 'L', 'XL', 'XXL'],
    colors: ['Championship White / Satin Gold Tab'],
    features: [
      'Select Grade-AAA Cabretta leather for the ultimate velvet-soft grip feel',
      'Gold-embossed Safety Line insignia on the ergonomic tab closure',
      'Precision hand-tailored finger seams for zero bunching during swing',
      'PGA & European Tour compliant specifications'
    ],
    productCode: 'GW-GG-08',
    status: 'Active',
    displayOrder: 8,
    coverImage: gg8Img,
    galleryImages: [gg8Img],
    seoTitle: 'Safety Line Championship Gold Medal Golf Gloves | Gold Edition',
    seoDescription: 'Championship-grade Cabretta leather golf gloves with gold medal accent tab.',
    createdAt: '2026-03-20T10:00:00.000Z'
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
