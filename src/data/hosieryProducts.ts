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
import geminiF0dvImg from '../assets/images/Gemini_Generated_Image_f0dv2ff0dv2ff0dv.jpeg';
import img20240928Img from '../assets/images/20240928_160251.jpg';

export const hosieryProducts: Product[] = [
  {
    id: 'prod-hs-gemini-f0dv',
    name: 'AeroForm Performance Athletic Sleeveless Tank',
    slug: 'aeroform-performance-athletic-sleeveless-tank',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Precision engineered high-performance athletic tank top featuring ergonomic cut and high-breathability mesh knit.',
    longDescription: 'Engineered for optimal temperature regulation and active mobility during high-intensity training. Features multi-density poly-spandex knit construction with micro-ventilation zones across the chest and back that disperse moisture rapidly while maintaining structural form.',
    material: '84% Micro-Poly Performance Filament, 16% Spandex 4-Way Stretch (185 GSM)',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Engineered open-capillary moisture transfer weave',
      'Ergonomic athletic cut with zero-bind armholes',
      'Smooth flatlock anti-chafing seam technology',
      'Anti-microbial and odor-inhibiting yarn treatment',
      'Reinforced shape-retention neckline binding'
    ],
    productCode: 'ACC-AFM-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: geminiF0dvImg,
    galleryImages: [geminiF0dvImg],
    seoTitle: 'AeroForm Performance Athletic Sleeveless Tank | Safety Line Accessories',
    seoDescription: 'High-performance poly-spandex athletic tank top with micro-ventilation zones and ergonomic flatlock seaming.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-hs-20240928',
    name: 'Vanguard Technical Compression Performance Garment',
    slug: 'vanguard-technical-compression-performance-garment',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    shortDescription: 'Heavy-duty commercial-grade athletic training apparel engineered with targeted compression zones and reinforced seaming.',
    longDescription: 'Crafted using high-density circular knitting technology, this technical activewear piece delivers graduated compression support to core muscle groups. The dual-surface knit draws moisture away from the skin to the exterior face for rapid evaporation during peak exertion.',
    material: '80% High-Tenacity Micro-Polyester, 20% Elastane Lycra Power Knit (225 GSM)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Graduated targeted athletic compression profile',
      'Reinforced bar-tack stress point construction',
      'Omnidirectional 4-way elastic recovery matrix',
      'Ultra-dense friction-free flatlock seam assembly',
      'Colorfast high-tenacity dye process'
    ],
    productCode: 'ACC-VNG-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: img20240928Img,
    galleryImages: [img20240928Img],
    seoTitle: 'Vanguard Technical Compression Performance Garment | Safety Line Accessories',
    seoDescription: 'Heavy-duty commercial-grade compression activewear with targeted muscle support and 4-way elastic recovery.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
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
    features: [
      'Micro-pique dual-face airflow knitting technology',
      'Ergonomic raglan shoulder articulation preventing seam friction',
      'Hydrophilic moisture-wicking capillary channels',
      'Colorfast reactive dye ensuring long-term vibrancy',
      'Reinforced double-stitched collar and hem finishing'
    ],
    productCode: 'ACC-SHT-03',
    status: 'Active',
    displayOrder: 3,
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
    features: [
      'Graduated athletic compression for targeted muscle group recovery',
      'Zero-chafe ultra-flat interlock seam construction',
      'Anti-microbial silver-ion surface protection for odor control',
      '4-way omnidirectional elastic memory retention',
      'Breathable heat-dispersion panels along high-perspiration zones'
    ],
    productCode: 'ACC-GNI-04',
    status: 'Active',
    displayOrder: 4,
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
    features: [
      'Dual-faced thermal jacquard weave for balanced microclimate control',
      'Ultra-soft modal blend delivering a buttery, skin-safe hand feel',
      'Elasticized comfort cuffs with shape-memory ribbing',
      'Concealed moisture-wicking underarm ventilation panels',
      'Anti-pilling enzyme wash finish for enduring softness'
    ],
    productCode: 'ACC-FGK-05',
    status: 'Active',
    displayOrder: 5,
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
    features: [
      'Featherweight 175 GSM open-knit breathable structure',
      'Silky tactile skin glide with zero-friction draping',
      'Anatomically sculpted armholes for unrestricted rotational range',
      'Natural odor-resistant modal fiber integration',
      'Reinforced bound neckline retaining shape after laundering'
    ],
    productCode: 'ACC-PTP-06',
    status: 'Active',
    displayOrder: 6,
    coverImage: geminiPtpjhImg,
    galleryImages: [geminiPtpjhImg],
    seoTitle: 'Quantum Aero Studio Conditioning Top | Safety Line Accessories',
    seoDescription: 'Modern ergonomic studio training top engineered with silky tactile drape and high-cadence airflow channels.',
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
    features: [
      'Targeted core & glute compression support',
      'Sweat-wicking micro-porous capillary weave',
      'Chafe-free ergonomic flatlock seam construction',
      'Anti-roll 3-inch high-tension compression waistband',
      'Reflective Safety Line emblem branding'
    ],
    productCode: 'ACC-AFX-07',
    status: 'Active',
    displayOrder: 7,
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
    features: [
      'Ergonomic princess seam sculpting architecture',
      'Extended sleeve cuffs with integrated thumbholes',
      'Full-length smooth gliding YKK zip closure',
      'High-stretch anti-pilling composite',
      'Concealed zippered invisible hip utility pockets'
    ],
    productCode: 'ACC-AUR-08',
    status: 'Active',
    displayOrder: 8,
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
    features: [
      'Open-pore micro-knit fiber structure',
      'Deep cut armholes for full mobility',
      'Curved dropped scallop rear hem',
      'Anti-odor natural fiber infusion',
      'Non-restrictive relaxed athletic silhouette'
    ],
    productCode: 'ACC-TER-09',
    status: 'Active',
    displayOrder: 9,
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
    features: [
      'Contrast black reinforced rib-knit edge binding',
      'Soft-brushed combed cotton hand with dynamic 4-way stretch',
      'High-neck cut for active modesty during inverted poses',
      'Precision heat-sealed Safety Line chest insignia',
      'Pre-shrunk dimensional shape retention'
    ],
    productCode: 'ACC-NOR-10',
    status: 'Active',
    displayOrder: 10,
    coverImage: blueMuscleTankImg,
    galleryImages: [blueMuscleTankImg],
    seoTitle: 'Nordic Ice Piping Contrast Muscle Tank | Safety Line Accessories',
    seoDescription: 'Ice powder blue sleeveless muscle tank top with contrasting black piping trim and Safety Line monogram.',
    createdAt: '2026-03-04T08:00:00.000Z'
  }
];

