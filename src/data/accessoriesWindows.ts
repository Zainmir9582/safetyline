import gymwearImg from '../assets/images/gymwear_cat_1790288454662.jpg';
import tshirtsImg from '../assets/images/tshirts_cat_1790288470836.jpg';
import jacketsImg from '../assets/images/jackets_cat_1790288483254.jpg';
import hoodiesImg from '../assets/images/hoodies_cat_1790288502434.jpg';
import tracksuitsImg from '../assets/images/tracksuits_cat_1790288520625.jpg';

export interface AccessoriesWindow {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  minorDetail: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  routePath: string;
  codePrefix: string;
  themeColor: string;
}

export const ACCESSORIES_WINDOWS: AccessoriesWindow[] = [
  {
    id: 'gymwear',
    slug: 'gymwear',
    title: 'GymWear',
    shortTitle: 'GymWear',
    badge: 'Active Athletic',
    minorDetail: 'High-stretch performance activewear, seamless compression knits & training sets.',
    tagline: 'High-Stretch Conditioning Apparel & Gym Workout Sets',
    description: 'Engineered for gym training, weight conditioning, and high-intensity movement. Features 4-way elastic memory fabrics, ergonomic flatlock anti-chafing construction, and zoned moisture-wicking technology.',
    image: gymwearImg,
    features: [
      'High-gauge elastic recovery microfiber activewear composite',
      'Ergonomic seamless anti-chafing flatlock construction',
      'Rapid-drying hydrophilic moisture-dispersion channels',
      'Reinforced high-load stress point seaming'
    ],
    specs: [
      { label: 'Fabric Composition', value: '85% Poly-Microfiber, 15% Spandex' },
      { label: 'Weight Gauge', value: '190 GSM High-Tensile Knit' },
      { label: 'Stitching', value: 'Zero-Friction 4-Needle Flatlock' }
    ],
    routePath: '/accessories/gymwear',
    codePrefix: 'ACC-GW',
    themeColor: '#0B3D3B'
  },
  {
    id: 't-shirts',
    slug: 't-shirts',
    title: 'T-shirts',
    shortTitle: 'T-shirts',
    badge: 'Technical Tees',
    minorDetail: 'Ultra-breathable combed cotton & performance poly tees, athletic crewnecks.',
    tagline: 'Athletic Crewnecks, Performance Poly & Combed Cotton Tees',
    description: 'Precision-tailored athletic and casual performance tees. Spun from premium combed cotton and high-filament polyester fibers with ribbed collar recovery, anti-pilling wash resistance, and soft skin feel.',
    image: tshirtsImg,
    features: [
      'Super-combed cotton and performance polyester blend',
      'Reinforced shoulder-to-shoulder tape binding for shape retention',
      'Ultra-soft touch with high breathability micro-porous matrix',
      'Colorfast reactive dyeing resisting repetitive laundering'
    ],
    specs: [
      { label: 'Fabric Blend', value: '60% Combed Cotton, 40% Poly' },
      { label: 'Neckline', value: '1x1 Spandex Ribbed Collar' },
      { label: 'Fit Profile', value: 'Athletic Contoured Silhouette' }
    ],
    routePath: '/accessories/t-shirts',
    codePrefix: 'ACC-TS',
    themeColor: '#FF5A36'
  },
  {
    id: 'jackets',
    slug: 'jackets',
    title: 'Jackets',
    shortTitle: 'Jackets',
    badge: 'Performance Outerwear',
    minorDetail: 'Lightweight windbreakers, weather-resistant athletic jackets & technical outerwear.',
    tagline: 'Technical Athletic Outerwear, Windbreakers & Training Shells',
    description: 'Crafted for all-weather athletic performance and team outerwear. Incorporates water-repellent ripstop shells, breathable inner mesh linings, full-zip ergonomic articulation, and secure zippered media compartments.',
    image: jacketsImg,
    features: [
      'Hydrophobic windproof shell with water-repellent DWR coating',
      'Full-length YKK self-locking front ventilation zipper',
      'Concealed zippered side pockets and internal media pouch',
      'Elasticated cuffs and adjustable dynamic bungee hem'
    ],
    specs: [
      { label: 'Shell Material', value: '100% Ripstop Hydrophobic Nylon' },
      { label: 'Hardware', value: 'Heavy-Duty YKK Reverse Coil Zippers' },
      { label: 'Ventilation', value: 'Concealed Underarm Mesh Panels' }
    ],
    routePath: '/accessories/jackets',
    codePrefix: 'ACC-JK',
    themeColor: '#0B3D3B'
  },
  {
    id: 'hoodies',
    slug: 'hoodies',
    title: 'Hoodies',
    shortTitle: 'Hoodies',
    badge: 'Fleece & Warm-Up',
    minorDetail: 'Fleece-lined athletic pullovers, zip-up performance hoodies & warm-up tops.',
    tagline: 'Brushed Fleece Pullovers, Athletic Warm-Up Hoodies & Full Zips',
    description: 'Heavyweight and midweight athletic warm-up hoodies built for pre-workout sessions and casual active lifestyle. Features micro-brushed thermal fleece interior, double-lined ergonomic hood, and reinforced kangaroo pockets.',
    image: hoodiesImg,
    features: [
      'Heavyweight 320 GSM brushed interior thermal fleece',
      'Double-lined anatomical hood with braided drawstrings',
      'Reinforced bar-tacked kangaroo pocket with phone pouch',
      'Heavy-duty spandex-ribbed cuffs and waistband'
    ],
    specs: [
      { label: 'Fabric Composition', value: '80% Cotton, 20% Polyester Fleece' },
      { label: 'Fleece Weight', value: '320 GSM Pre-Shrunk Terry/Fleece' },
      { label: 'Construction', value: 'Twin-Needle Coverseam Stitching' }
    ],
    routePath: '/accessories/hoodies',
    codePrefix: 'ACC-HD',
    themeColor: '#EA2227'
  },
  {
    id: 'tracksuits',
    slug: 'tracksuits',
    title: 'Tracksuit (Summer & Winter)',
    shortTitle: 'Tracksuits',
    badge: 'Dual-Season Apparel',
    minorDetail: 'Dual-season breathable summer knits & insulated winter thermal tracksuits.',
    tagline: 'Summer Featherlight Knits & Winter Insulated Thermal Tracksuits',
    description: 'Complete dual-season tracksuit collections tailored for athletes and athletic clubs. Features breathable lightweight polyester tricot for summer conditioning and brushed thermal fleece composites for winter training.',
    image: tracksuitsImg,
    features: [
      'Dual-season line: Summer ultralight knit & Winter thermal brushed fleece',
      'Matching athletic jacket with stand-up collar and tapered track pants',
      'Elasticated waistband with high-tensile inner drawstring',
      'Ankle side zippers for quick shoe-on dressing and ventilation'
    ],
    specs: [
      { label: 'Summer Series', value: '180 GSM Rapid-Dry Poly Tricot' },
      { label: 'Winter Series', value: '300 GSM Brushed Thermal Poly-Cotton' },
      { label: 'Zippers', value: 'YKK Ankle & Pocket Zippers' }
    ],
    routePath: '/accessories/tracksuits',
    codePrefix: 'ACC-TR',
    themeColor: '#0B3D3B'
  }
];

export function getAccessoriesWindowBySlug(slug: string): AccessoriesWindow | undefined {
  const normalized = slug.toLowerCase().trim();
  return ACCESSORIES_WINDOWS.find(w => 
    w.slug === normalized || 
    w.id === normalized ||
    (normalized === 'gym-wear' && w.slug === 'gymwear') ||
    (normalized === 'tshirts' && w.slug === 't-shirts') ||
    (normalized === 'tshirt' && w.slug === 't-shirts') ||
    (normalized === 't-shirt' && w.slug === 't-shirts') ||
    (normalized === 'jacket' && w.slug === 'jackets') ||
    (normalized === 'hoodie' && w.slug === 'hoodies') ||
    (normalized === 'tracksuit' && w.slug === 'tracksuits') ||
    (normalized === 'track-suit' && w.slug === 'tracksuits') ||
    (normalized === 'track-suits' && w.slug === 'tracksuits')
  );
}
