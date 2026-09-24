import { Product } from '../types';
import gymwearImg from '../assets/images/gymwear_cat_1790288454662.jpg';
import tshirtsImg from '../assets/images/tshirts_cat_1790288470836.jpg';
import jacketsImg from '../assets/images/jackets_cat_1790288483254.jpg';
import hoodiesImg from '../assets/images/hoodies_cat_1790288502434.jpg';
import tracksuitsImg from '../assets/images/tracksuits_cat_1790288520625.jpg';

export const hosieryProducts: Product[] = [
  // 1. GymWear Category
  {
    id: 'prod-acc-gw-01',
    name: 'Pro-Fit Seamless GymWear Training Set',
    slug: 'pro-fit-seamless-gymwear-training-set',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'gymwear',
    shortDescription: 'High-stretch ergonomic gym workout set with seamless compression knits and zoned moisture release.',
    longDescription: 'Engineered for bodybuilding, high-intensity functional training, and gym workouts. Woven with 4-way micro-elasticity yarn that adapts dynamically to deep squatting and pressing movements without slipping.',
    material: '85% Technical Polyamide, 15% Spandex High-Tensile Knit',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Seamless friction-free circular knit construction',
      'Targeted sweat evaporation capillary matrix',
      'Non-slip compressive waistband with elastic recovery',
      'Anti-microbial silver-ion odor protection'
    ],
    productCode: 'ACC-GW-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: gymwearImg,
    galleryImages: [gymwearImg],
    seoTitle: 'Pro-Fit Seamless GymWear Training Set | Safety Line',
    seoDescription: 'High-stretch performance gymwear set with seamless compression knits and moisture-wicking technology.',
    createdAt: '2026-03-15T08:00:00.000Z'
  },
  {
    id: 'prod-acc-gw-02',
    name: 'FlexCore Athletic Gym Performance Top',
    slug: 'flexcore-athletic-gym-performance-top',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'gymwear',
    shortDescription: 'Featherlight athletic training top engineered with breathable micro-mesh back panels and anti-chafe seams.',
    longDescription: 'Designed for relentless weight training cycles and cardio workouts. Offers supreme airflow and soft skin feel that keeps lifters cool during long training blocks.',
    material: '88% Poly-Microfiber, 12% Lycra (180 GSM)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Micro-porous heat dissipation back channels',
      'Flatlock ergonomic anti-chafe seaming',
      'Dynamic 4-way stretch unrestricted range',
      'Safety Line authentic craftsmanship insignia'
    ],
    productCode: 'ACC-GW-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: gymwearImg,
    galleryImages: [gymwearImg],
    seoTitle: 'FlexCore Athletic Gym Performance Top | Safety Line',
    seoDescription: 'Breathable lightweight gym training top with flatlock seaming and active moisture management.',
    createdAt: '2026-03-16T08:00:00.000Z'
  },

  // 2. T-shirts Category
  {
    id: 'prod-acc-ts-01',
    name: 'Apex Classic Combed Cotton Performance T-Shirt',
    slug: 'apex-classic-combed-cotton-performance-t-shirt',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 't-shirts',
    shortDescription: 'Ultra-soft combed cotton athletic crewneck tee with reinforced collar recovery and tailored silhouette.',
    longDescription: 'Crafted from ring-spun super-combed cotton fibers blended with lightweight polyester for shape stabilization. Features reinforced shoulder taping that prevents collar stretching wash after wash.',
    material: '60% Super-Combed Cotton, 40% High-Grade Polyester (175 GSM)',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Ring-spun super-combed cotton for smooth tactile comfort',
      'Shoulder-to-shoulder inner tape reinforcement',
      'Twin-needle hem and sleeve finishing',
      'Pre-shrunk dimensional integrity guarantee'
    ],
    productCode: 'ACC-TS-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: tshirtsImg,
    galleryImages: [tshirtsImg],
    seoTitle: 'Apex Classic Combed Cotton Performance T-Shirt | Safety Line',
    seoDescription: 'Ultra-soft combed cotton athletic performance crewneck t-shirt with reinforced shape retention.',
    createdAt: '2026-03-17T08:00:00.000Z'
  },
  {
    id: 'prod-acc-ts-02',
    name: 'VaporDry High-Cadence Athletic T-Shirt',
    slug: 'vapordry-high-cadence-athletic-t-shirt',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 't-shirts',
    shortDescription: 'Technical moisture-dispersion polyester training tee designed for fast evaporation and zero sweat cling.',
    longDescription: 'Engineered for athletes needing rapid moisture expulsion. The micro-waffle knit face lifts perspiration away from the skin instantly to maintain dry skin contact.',
    material: '100% VaporDry Performance Polyester Filament',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Rapid vapor evaporation micro-waffle knit matrix',
      'Chafe-free ergonomic collar binding',
      'Anti-odor active treatment',
      'Reflective Safety Line accent branding'
    ],
    productCode: 'ACC-TS-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: tshirtsImg,
    galleryImages: [tshirtsImg],
    seoTitle: 'VaporDry High-Cadence Athletic T-Shirt | Safety Line',
    seoDescription: 'Quick-drying active technical t-shirt with micro-waffle vapor evaporation fabric.',
    createdAt: '2026-03-18T08:00:00.000Z'
  },

  // 3. Jackets Category
  {
    id: 'prod-acc-jk-01',
    name: 'ShieldPro Technical Athletic Windbreaker Jacket',
    slug: 'shieldpro-technical-athletic-windbreaker-jacket',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'jackets',
    shortDescription: 'Lightweight weather-resistant athletic training jacket with water-repellent shell and ventilation eyelets.',
    longDescription: 'Engineered for team outerwear, outdoor training, and track warm-ups. Features a durable water repellent (DWR) ripstop shell, breathable interior mesh, and heavy-duty YKK zippers with custom pullers.',
    material: '100% Water-Repellent Ripstop Nylon with Breathable Poly Mesh Lining',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Durable water-repellent (DWR) wind-blocking shell',
      'Breathable interior mesh lining preventing moisture condensation',
      'Dual secure zippered side hand pockets and interior chest pocket',
      'Elastic storm cuffs and adjustable shock-cord waist hem'
    ],
    productCode: 'ACC-JK-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: jacketsImg,
    galleryImages: [jacketsImg],
    seoTitle: 'ShieldPro Technical Athletic Windbreaker Jacket | Safety Line',
    seoDescription: 'Lightweight water-repellent athletic windbreaker jacket with breathable mesh lining and YKK zippers.',
    createdAt: '2026-03-19T08:00:00.000Z'
  },
  {
    id: 'prod-acc-jk-02',
    name: 'ThermalStorm Hybrid Athletic Zip Jacket',
    slug: 'thermalstorm-hybrid-athletic-zip-jacket',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'jackets',
    shortDescription: 'All-weather athletic zip jacket with bonded thermal fleece interior and protective stand-up collar.',
    longDescription: 'Combines the flexibility of an active mid-layer with the weather resistance of an outer shell. Perfect for cold-weather field training, athletic coaching staff, and team travel.',
    material: 'Bonded 3-Layer Softshell (92% Poly, 8% Elastane) with Micro-Fleece Back',
    sizes: ['M', 'L', 'XL', 'XXL'],
    features: [
      'Micro-brushed internal thermal insulation fleece',
      'Wind-resistant 4-way stretch flexible outer shell',
      'Stand-up chin guard collar with reverse-coil front zipper',
      'Bar-tack reinforced stress points for maximum durability'
    ],
    productCode: 'ACC-JK-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: jacketsImg,
    galleryImages: [jacketsImg],
    seoTitle: 'ThermalStorm Hybrid Athletic Zip Jacket | Safety Line',
    seoDescription: 'Cold-weather athletic softshell zip jacket with bonded thermal fleece interior.',
    createdAt: '2026-03-20T08:00:00.000Z'
  },

  // 4. Hoodies Category
  {
    id: 'prod-acc-hd-01',
    name: 'Heavyweight Pro Athletic Pullover Hoodie',
    slug: 'heavyweight-pro-athletic-pullover-hoodie',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'hoodies',
    shortDescription: 'Premium 320 GSM brushed fleece athletic hoodie with double-lined hood and reinforced kangaroo pocket.',
    longDescription: 'Spun from heavy-gauge cotton-rich fleece that delivers soft interior warmth and durable structure. Features heavy-duty ribbed cuffs, braided drawstrings, and reinforced kangaroo pocket bar-tacking.',
    material: '80% Premium Cotton, 20% Polyester Heavyweight Fleece (320 GSM)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Heavyweight 320 GSM interior brushed thermal fleece',
      'Double-ply structured hood with metal eyelets and flat-braided cords',
      'Spandex-ribbed cuffs and hem maintaining snug fit',
      'Deep kangaroo pocket with internal concealed phone sleeve'
    ],
    productCode: 'ACC-HD-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: hoodiesImg,
    galleryImages: [hoodiesImg],
    seoTitle: 'Heavyweight Pro Athletic Pullover Hoodie | Safety Line',
    seoDescription: '320 GSM brushed fleece athletic pullover hoodie with double-ply hood and kangaroo pocket.',
    createdAt: '2026-03-21T08:00:00.000Z'
  },
  {
    id: 'prod-acc-hd-02',
    name: 'FlexWarm Technical Full-Zip Training Hoodie',
    slug: 'flexwarm-technical-full-zip-training-hoodie',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'hoodies',
    shortDescription: 'Performance full-zip athletic hoodie engineered for dynamic warm-ups and cold-weather gym sessions.',
    longDescription: 'Designed for athletic movement and quick transitions. Features an ergonomic raglan sleeve cut, full-length front zipper, and moisture-wicking fleece that breathes during warm-up sets.',
    material: '75% Cotton, 20% Polyester, 5% Elastane Flex-Fleece (290 GSM)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Ergonomic raglan sleeve articulation for full overhead mobility',
      'Full-length YKK front zipper with self-fabric zipper garage',
      'Dual concealed zippered hand pockets',
      'Low-profile athletic hood fit'
    ],
    productCode: 'ACC-HD-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: hoodiesImg,
    galleryImages: [hoodiesImg],
    seoTitle: 'FlexWarm Technical Full-Zip Training Hoodie | Safety Line',
    seoDescription: 'Full-zip athletic training hoodie with flex-fleece construction and zippered pockets.',
    createdAt: '2026-03-22T08:00:00.000Z'
  },

  // 5. Tracksuit (Summer & Winter) Category
  {
    id: 'prod-acc-tr-01',
    name: 'DualSeason Performance Tracksuit (Summer Series)',
    slug: 'dualseason-performance-tracksuit-summer-series',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'tracksuits',
    shortDescription: 'Ultra-breathable lightweight summer tracksuit set engineered with rapid-dry poly tricot and tapered track pants.',
    longDescription: 'Specially designed for warm-weather training, athletic warm-ups, and summer team travel. Includes a zip-up jacket with stand collar and matching lightweight pants with ankle zippers for quick shoe-on changes.',
    material: '100% Breathable Lightweight Poly Tricot (180 GSM)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Summer lightweight micro-porous breathable poly tricot',
      'Athletic stand collar jacket with full-zip front',
      'Tapered track pants with elastic waist and internal drawstring',
      'Ankle side zippers for effortless on/off over training shoes'
    ],
    productCode: 'ACC-TR-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: tracksuitsImg,
    galleryImages: [tracksuitsImg],
    seoTitle: 'DualSeason Summer Performance Tracksuit | Safety Line',
    seoDescription: 'Lightweight summer athletic tracksuit set with breathable poly tricot and ankle zippers.',
    createdAt: '2026-03-23T08:00:00.000Z'
  },
  {
    id: 'prod-acc-tr-02',
    name: 'DualSeason Insulated Tracksuit (Winter Series)',
    slug: 'dualseason-insulated-tracksuit-winter-series',
    categoryId: 'cat-hosiery',
    categoryName: 'Accessories',
    subcategory: 'tracksuits',
    shortDescription: 'Thermal brushed fleece winter tracksuit set built for cold-weather training and outdoor athletic conditioning.',
    longDescription: 'Constructed for winter conditioning, sub-zero warm-ups, and travel. Features heavy thermal brushed poly-cotton fleece that seals in core warmth while resisting moisture and wind chill.',
    material: '65% Combed Cotton, 35% Polyester Brushed Winter Fleece (310 GSM)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Dense 310 GSM thermal brushed interior fleece for winter insulation',
      'Wind-blocking ribbed collar, cuffs, and waistband',
      'Zippered side pockets on both jacket and track pants',
      'Reinforced gusset crotch and knee articulation'
    ],
    productCode: 'ACC-TR-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: tracksuitsImg,
    galleryImages: [tracksuitsImg],
    seoTitle: 'DualSeason Winter Insulated Tracksuit | Safety Line',
    seoDescription: 'Heavyweight winter thermal fleece athletic tracksuit set with zippered pockets and wind-blocking ribbing.',
    createdAt: '2026-03-24T08:00:00.000Z'
  }
];
