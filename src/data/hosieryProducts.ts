import { Product } from '../types';
import mauveZipJacketImg from '../assets/images/mauve_zip_jacket_1788984951352.jpg';
import terracottaRunTankImg from '../assets/images/terracotta_run_tank_1788984988331.jpg';
import blueMuscleTankImg from '../assets/images/blue_muscle_tank_1788985004892.jpg';
import womenSportsSetImg from '../assets/images/women_sports_set_1788984867763.jpg';

// Newly added accessory and hosiery product images
import shirts1Img from '../assets/images/shirts 1.jpeg';
import gniImg from '../assets/images/gni.jpg';
import fgknfImg from '../assets/images/fgk nf.jpeg';
import geminiPtpjhImg from '../assets/images/Gemini_Generated_Image_ptpjhoptpjhoptpj.jpeg';
import d1211207Img from '../assets/images/D1211207.jpg';

export const hosieryProducts: Product[] = [
  {
    id: 'prod-hs-shirts1',
    name: 'AeroClassic Premium Technical Training Shirt',
    slug: 'aeroclassic-premium-technical-training-shirt',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'High-density micro-pique technical training shirt featuring ergonomic flatlock seaming and rapid vapor transfer.',
    longDescription: 'Engineered for intensive conditioning and daily activewear, this performance training shirt combines ultra-fine combed poly-cotton filaments with targeted elastane flexibility. The specialized micro-pique knit creates micro-capillary air channels across the torso that accelerate moisture evaporation while maintaining a structured, crisp silhouette.',
    material: '65% Combed Micro-Polyester, 30% Long-Staple Ringspun Cotton, 5% Lycra Spandex (190 GSM)',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Micro-pique dual-face airflow knitting technology',
      'Ergonomic raglan shoulder articulation preventing seam friction',
      'Hydrophilic moisture-wicking capillary channels',
      'Colorfast reactive dye ensuring long-term vibrancy',
      'Reinforced double-stitched collar and hem finishing'
    ],
    productCode: 'ACC-SHT-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: shirts1Img,
    galleryImages: [shirts1Img],
    seoTitle: 'AeroClassic Premium Technical Training Shirt | Safety Line Accessories',
    seoDescription: 'High-density micro-pique technical activewear shirt with ergonomic flatlock seams and moisture management.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-hs-gni',
    name: 'Veloce Pro Performance Compression Layer',
    slug: 'veloce-pro-performance-compression-layer',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Zoned multi-density athletic performance apparel offering core stabilization and dynamic 4-way stretch.',
    longDescription: 'Constructed on high-gauge Italian circular knitting machines, this technical athletic accessory layer delivers graduated muscle support and friction-free skin contact. The ultra-fine polyamide yarn is blended with high-tension elastane to resist deformation across thousands of stretch cycles while keeping the athlete cool and dry.',
    material: '82% High-Tenacity Micro-Polyamide, 18% Elastane Power-Spandex (220 GSM)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Graduated athletic compression for targeted muscle group recovery',
      'Zero-chafe ultra-flat interlock seam construction',
      'Anti-microbial silver-ion surface protection for odor control',
      '4-way omnidirectional elastic memory retention',
      'Breathable heat-dispersion panels along high-perspiration zones'
    ],
    productCode: 'ACC-GNI-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: gniImg,
    galleryImages: [gniImg],
    seoTitle: 'Veloce Pro Performance Compression Layer | Safety Line Accessories',
    seoDescription: 'Zoned multi-density athletic performance layer engineered with high-tenacity micro-polyamide and power-spandex.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-hs-fgknf',
    name: 'Strata Elite Thermal Athletic Knit Top',
    slug: 'strata-elite-thermal-athletic-knit-top',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Versatile lightweight knit technical garment with brushed micro-fleece interior and high-tensile exterior.',
    longDescription: 'Tailored for transitional weather training and active recovery. Features an engineered double-knit jacquard architecture with a brushed thermal micro-fleece interior that gently traps body heat while the smooth, abrasion-resistant outer shell shields against wind drafts and friction.',
    material: '78% Technical Micro-Poly Jacquard, 16% Modal Fiber, 6% Spandex (240 GSM)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Dual-faced thermal jacquard weave for balanced microclimate control',
      'Ultra-soft modal blend delivering a buttery, skin-safe hand feel',
      'Elasticized comfort cuffs with shape-memory ribbing',
      'Concealed moisture-wicking underarm ventilation panels',
      'Anti-pilling enzyme wash finish for enduring softness'
    ],
    productCode: 'ACC-FGK-03',
    status: 'Active',
    displayOrder: 3,
    coverImage: fgknfImg,
    galleryImages: [fgknfImg],
    seoTitle: 'Strata Elite Thermal Athletic Knit Top | Safety Line Accessories',
    seoDescription: 'Versatile lightweight knit technical activewear top featuring dual-faced jacquard thermal construction.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-hs-ptpjh',
    name: 'Quantum Aero Studio Conditioning Top',
    slug: 'quantum-aero-studio-conditioning-top',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Modern ergonomic studio training top engineered with silky tactile drape and high-cadence airflow channels.',
    longDescription: 'Designed for studio conditioning, high-mobility yoga, and athletic conditioning. Woven with micro-denier poly-modal filaments that provide an ultra-lightweight, cool-to-touch sensation on the skin with zero cling during high-sweat exertion.',
    material: '70% Micro-Denier Polyester, 22% Micro-Modal, 8% Lycra Elastane (175 GSM)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Featherweight 175 GSM open-knit breathable structure',
      'Silky tactile skin glide with zero-friction draping',
      'Anatomically sculpted armholes for unrestricted rotational range',
      'Natural odor-resistant modal fiber integration',
      'Reinforced bound neckline retaining shape after laundering'
    ],
    productCode: 'ACC-PTP-04',
    status: 'Active',
    displayOrder: 4,
    coverImage: geminiPtpjhImg,
    galleryImages: [geminiPtpjhImg],
    seoTitle: 'Quantum Aero Studio Conditioning Top | Safety Line Accessories',
    seoDescription: 'Modern ergonomic studio training top engineered with silky tactile drape and high-cadence airflow channels.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-hs-d1211207',
    name: 'Precision-Flex Athletic Sports Apparel',
    slug: 'precision-flex-athletic-sports-apparel-d1211207',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Heavy-duty athletic training apparel crafted with high-tensile stretch composite and moisture-dispersion knit.',
    longDescription: 'Manufactured with premium Sialkot athletic textile expertise, this precision garment features reinforced seam lines, high-density stretch recovery, and specialized moisture-wicking yarn to provide uncompromising durability during intense training regimes.',
    material: '88% Technical Poly-Spandex Microfiber, 12% High-Tension Lycra (210 GSM)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Multi-directional 4-way stretch recovery matrix',
      'Hydrophobic outer moisture barrier with rapid evaporation',
      'High-stress point bar-tack reinforcement',
      'Chafe-free ergonomic flatlock seam construction',
      'Authentic Safety Line industrial manufacturer insignia'
    ],
    productCode: 'ACC-D1207-05',
    status: 'Active',
    displayOrder: 5,
    coverImage: d1211207Img,
    galleryImages: [d1211207Img],
    seoTitle: 'Precision-Flex Athletic Sports Apparel | Safety Line Accessories',
    seoDescription: 'Heavy-duty athletic training apparel crafted with high-tensile stretch composite and moisture dispersion.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-hs-afx-01',
    name: 'AeroFlex Seamless Compression Set',
    slug: 'aeroflex-seamless-compression-set',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'High-density 4-way stretch compression sports top and high-waisted seamless support leggings.',
    longDescription: 'Engineered with seamless circular knitting technology for zero-rub comfort and compression support. Features an elasticized underband and high-rise sculpting waist with graduated pressure distribution.',
    material: '78% Recycled Poly-Spandex Microfiber, 22% High-Tension Lycra',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Targeted core & glute compression support',
      'Sweat-wicking micro-porous capillary weave',
      'Chafe-free ergonomic flatlock seam construction',
      'Anti-roll 3-inch high-tension compression waistband',
      'Reflective Safety Line emblem branding'
    ],
    productCode: 'ACC-AFX-01',
    status: 'Active',
    displayOrder: 6,
    coverImage: womenSportsSetImg,
    galleryImages: [womenSportsSetImg],
    seoTitle: 'AeroFlex Seamless Compression Set | Safety Line Accessories',
    seoDescription: 'High-density 4-way stretch compression activewear set with Safety Line emblem.',
    createdAt: '2026-03-01T08:00:00.000Z'
  },
  {
    id: 'prod-hs-aur-05',
    name: 'Aura Sculpt Zip-Up Contoured Layer',
    slug: 'aura-sculpt-zip-up-contoured-layer',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Form-fitting dusty mauve zip-up compression layer with contour stitch lines and thumbhole cuffs.',
    longDescription: 'Crafted from soft brushed nylon-elastane fabric with ergonomic princess seamlines. Includes extended cuffs with reinforced thumbholes and full-length zip.',
    material: '75% Tactel Micro-Nylon, 25% Spandex Feather-Soft Knit',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Ergonomic princess seam sculpting architecture',
      'Extended sleeve cuffs with integrated thumbholes',
      'Full-length smooth gliding YKK zip closure',
      'High-stretch anti-pilling composite',
      'Concealed zippered invisible hip utility pockets'
    ],
    productCode: 'ACC-AUR-05',
    status: 'Active',
    displayOrder: 7,
    coverImage: mauveZipJacketImg,
    galleryImages: [mauveZipJacketImg],
    seoTitle: 'Aura Sculpt Zip-Up Contoured Layer | Safety Line Accessories',
    seoDescription: 'Dusty mauve workout compression top with contouring princess seams and thumbhole sleeves.',
    createdAt: '2026-03-03T08:00:00.000Z'
  },
  {
    id: 'prod-hs-ter-06',
    name: 'Terracotta Breeze Lightweight Racerback',
    slug: 'terracotta-breeze-lightweight-racerback',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Ultra-lightweight heather terracotta racerback tank with dropped armholes and curved scallop hem.',
    longDescription: 'Spun from micro-open knit slub jersey for generous airflow and quick evaporation during intensive workouts or warm-weather training.',
    material: '85% Micro-Modal, 15% Performance Polyester Slub',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Open-pore micro-knit fiber structure',
      'Deep cut armholes for full mobility',
      'Curved dropped scallop rear hem',
      'Anti-odor natural fiber infusion',
      'Non-restrictive relaxed athletic silhouette'
    ],
    productCode: 'ACC-TER-06',
    status: 'Active',
    displayOrder: 8,
    coverImage: terracottaRunTankImg,
    galleryImages: [terracottaRunTankImg],
    seoTitle: 'Terracotta Breeze Lightweight Racerback | Safety Line Accessories',
    seoDescription: 'Ultra-light heather terracotta racerback tank with dropped armholes and curved scallop hem.',
    createdAt: '2026-03-04T08:00:00.000Z'
  },
  {
    id: 'prod-hs-nor-09',
    name: 'Nordic Ice Piping Contrast Muscle Tank',
    slug: 'nordic-ice-piping-contrast-muscle-tank',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Pastel powder blue high-neck sleeveless gym tank top finished with contrasting black athletic binding trim.',
    longDescription: 'Minimalist athletic elegance meets raw performance. Tailored with a clean crew collar, contrast black edge binding around the neckline and deep armholes, and subtle Safety Line monogram on the upper chest. Pairs seamlessly with compression shorts or high-rise tights.',
    material: '92% Combed Athletic Cotton, 8% Lycra Soft-Flex',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Contrast black reinforced rib-knit edge binding',
      'Soft-brushed combed cotton hand with dynamic 4-way stretch',
      'High-neck cut for active modesty during inverted poses',
      'Precision heat-sealed Safety Line chest insignia',
      'Pre-shrunk dimensional shape retention'
    ],
    productCode: 'ACC-NOR-09',
    status: 'Active',
    displayOrder: 9,
    coverImage: blueMuscleTankImg,
    galleryImages: [blueMuscleTankImg],
    seoTitle: 'Nordic Ice Piping Contrast Muscle Tank | Safety Line Accessories',
    seoDescription: 'Ice powder blue sleeveless muscle tank top with contrasting black piping trim and Safety Line monogram.',
    createdAt: '2026-03-04T08:00:00.000Z'
  },
  {
    id: 'prod-aur-01',
    name: 'Aurelia Pure Silk Lace Stockings',
    slug: 'aurelia-pure-silk-lace-stockings',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Exquisite stay-up stockings made from authentic mulberry silk with hand-woven lace borders.',
    longDescription: 'Evoking timeless elegance, the Aurelia Stockings represent the pinnacle of luxury legwear. Spun from long-fiber Grade-A mulberry silk, they lay weightlessly on the skin, presenting a subtle pearlescent sheen. Hand-trimmed French lace thigh cuffs are lined with skin-safe silicone to stay perfectly in place without compression or slippage.',
    material: '85% Pure Grade-6A Mulberry Silk, 15% Premium Lycra',
    sizes: ['S', 'M', 'L'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Grade 6A raw Mulberry Silk filament yarn',
      'Hand-woven French Calais lace thigh-high cuffs',
      'Dual-strip skin-friendly hypoallergenic silicone grip',
      'Invisible, ultra-sheer reinforced toe construction',
      'Anti-snag weave matrix for enhanced durability'
    ],
    productCode: 'HS-AUR-01',
    status: 'Active',
    displayOrder: 10,
    coverImage: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=800',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800'
    ],
    seoTitle: 'Aurelia Pure Silk Lace Stockings | Luxury Silk Hosiery',
    seoDescription: 'Indulge in maximum luxury with pure mulberry silk stay-up stockings featuring delicate French lace borders and dual-silicone comfort grips.',
    createdAt: '2026-01-20T08:00:00.000Z'
  },
  {
    id: 'prod-csh-02',
    name: 'Cashmere Blend Lounge Socks',
    slug: 'cashmere-blend-lounge-socks',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Unbelievably soft Mongolian cashmere socks for premium domestic leisure and cozy warmth.',
    longDescription: 'Crafted using a high-gauge blend of long-staple Mongolian cashmere and fine merino wool, the Cashmere Blend Lounge Socks provide ultimate comfort and temperature control. A non-binding soft ribbed ankle band holds without pressure, creating an ideal companion for luxury indoor relaxation and cold winter evenings.',
    material: '70% Mongolian Cashmere, 20% Fine Merino Wool, 10% Stretch Elastic',
    sizes: ['One Size (Fits 36-44)'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Plush, heavy-gauge knitted cashmere stitch',
      'Non-binding relaxed-elastic ribbing',
      'Hand-linked ultra-smooth seamless toes',
      'Double-ply wear-prone heel reinforcement',
      'Natural thermoregulation and moisture absorption'
    ],
    productCode: 'HS-CSH-02',
    status: 'Active',
    displayOrder: 11,
    coverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800'
    ],
    seoTitle: 'Cashmere Blend Lounge Socks | Luxury Comfy Hosiery',
    seoDescription: 'Relax in total comfort with lounge socks made from rare Mongolian cashmere and Merino wool, featuring hand-linked seams.',
    createdAt: '2026-02-05T08:00:00.000Z'
  },
  {
    id: 'prod-sov-03',
    name: 'Sovereign Sheer Microfiber Tights',
    slug: 'sovereign-sheer-microfiber-tights',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Elegant, ultra-durable 15-denier semi-sheer support tights with a satin-matte sheen.',
    longDescription: 'Crafted with double-wrapped Lycra microfibers, the Sovereign Tights deliver a flawless, high-definition cosmetic leg appearance. Designed with a soft, anatomically sculpted control waistband that gently shapes without restricting breathing, they are highly run-resistant and velvety soft to the touch.',
    material: '84% Micro-Polyamide, 16% Lycra Satin-Skin',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Resilient double-wrapped run-resistant microfiber',
      'Anatomically sculpted control comfort top',
      'Cotton hygienic breathable gusset with flat seams',
      'High-sheen light reflective satin finish',
      'Invisible sandal-toe reinforcement'
    ],
    productCode: 'HS-SOV-03',
    status: 'Active',
    displayOrder: 12,
    coverImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800'
    ],
    seoTitle: 'Sovereign Sheer Microfiber Tights | Flawless 15-Denier Legwear',
    seoDescription: 'Shop our flawless 15-denier support tights constructed with dual-wrapped resilient microfiber for run-resistance and subtle satin shimmer.',
    createdAt: '2026-02-14T08:00:00.000Z'
  },
  {
    id: 'prod-int-04',
    name: 'Integra Combed Cotton Ribbed Socks',
    slug: 'integra-combed-cotton-ribbed-socks',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Premium Egyptian combed cotton everyday dress socks crafted on Italian cylinders.',
    longDescription: 'The Integra Ribbed Socks are the perfect blend of classical business aesthetics and incredible softness. Woven from Egyptian Giza cotton on traditional Italian high-cylinder knitting machines, they provide breathable daily thermal regulation, a beautiful vertical drape, and exceptional longevity.',
    material: '92% Giza Combed Cotton, 6% Polyamide, 2% Lycra Core',
    sizes: ['38-41', '42-45', '46-48'],
    colors: ['Yellow', 'Red', 'Blue', 'Light Brown', 'White'],
    features: [
      'Premium extra-long staple Giza cotton',
      'Classic 5x1 flat-rib stretch pattern',
      'Pressure-free hand-linked seamless toe closures',
      'Double-ply heel and ball-of-foot padding',
      'Colorfast reactive dye processing'
    ],
    productCode: 'HS-INT-04',
    status: 'Active',
    displayOrder: 13,
    coverImage: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800',
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=800'
    ],
    seoTitle: 'Integra Combed Cotton Ribbed Socks | Luxury Dress Socks',
    seoDescription: 'The pinnacle of classical office fashion. Breathable Egyptian combed cotton socks featuring dynamic 5x1 rib knitting and hand-linked toes.',
    createdAt: '2026-02-25T08:00:00.000Z'
  }
];
