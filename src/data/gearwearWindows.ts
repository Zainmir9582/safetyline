import tacticalGlovesImg from '../assets/images/tactical_gloves_cat_1790287132299.jpg';
import roadCyclingImg from '../assets/images/road_cycling_cat_1790287328917.jpg';
import carRacingImg from '../assets/images/car_racing_cat_1790287345103.jpg';
import weightLiftingImg from '../assets/images/weight_lifting_cat_1790287360273.jpg';

export interface GearwearWindow {
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
  iconName: 'ShieldAlert' | 'Bike' | 'Flame' | 'Dumbbell';
}

export const GEARWEAR_WINDOWS: GearwearWindow[] = [
  {
    id: 'tactical-gloves',
    slug: 'tactical-gloves',
    title: 'Tactical Gloves',
    shortTitle: 'Tactical Gloves',
    badge: 'Military & Security',
    minorDetail: 'Impact knuckle guards, Kevlar® cut resistance & grip dexterity.',
    tagline: 'High-Dexterity Combat & Law Enforcement Tactical Handwear',
    description: 'Engineered for extreme duty operations and tactical mobility. Constructed with molded high-impact knuckle protection, anti-abrasion goat leather and Kevlar® palms, breathable stretch backs, and touchscreen conductive fingertips.',
    image: tacticalGlovesImg,
    features: [
      'Molded thermal TPR and carbon-fiber composite knuckle protection',
      'Kevlar® cut-resistant palm lining meeting EN 388 Level 4 abrasion benchmarks',
      'Touchscreen sensitive thumb and trigger finger conductive thread',
      'Reinforced thumb saddle and heavy-duty double-needle nylon stitching'
    ],
    specs: [
      { label: 'Safety Rating', value: 'EN 388:2016 Certified' },
      { label: 'Palm Construction', value: 'Goat Leather & Kevlar®' },
      { label: 'Dexterity', value: 'Ergonomic 3D Curved Fit' }
    ],
    routePath: '/gearwear/tactical-gloves',
    codePrefix: 'GW-TG',
    themeColor: '#0B3D3B',
    iconName: 'ShieldAlert'
  },
  {
    id: 'road-cycling-apparel',
    slug: 'road-cycling-apparel',
    title: 'Road & Cycling Apparel',
    shortTitle: 'Cycling Apparel',
    badge: 'Aero-Speed Pro',
    minorDetail: 'Aerodynamic race jerseys, breathable mesh & 3D gel chamois bibs.',
    tagline: 'High-Cadence Aerodynamic Road Racing & Gravel Cycling Apparel',
    description: 'Precision-tailored road and cycling technical wear. Designed with aerodynamic drag reduction panels, laser-cut ventilation zones, 4-way stretch Italian warp knit Lycra, and multi-density 3D gel chamois pads for ultra-endurance rides.',
    image: roadCyclingImg,
    features: [
      'Aerodynamic textured sleeve fabrics for boundary-layer airflow reduction',
      'Multi-density anatomical 3D gel chamois with anti-bacterial silver treatment',
      'Micro-porous rapid vapor evaporation matrices (130 GSM featherlight)',
      'UPF 50+ UV solar protection barrier for extended sun exposure'
    ],
    specs: [
      { label: 'Fabric Gauge', value: 'Italian Warp Knit Lycra' },
      { label: 'Chamois', value: 'Multi-Density 120kg/m³ Gel' },
      { label: 'Zippers', value: 'Full-Length YKK Self-Locking' }
    ],
    routePath: '/gearwear/road-cycling-apparel',
    codePrefix: 'GW-RC',
    themeColor: '#FF5A36',
    iconName: 'Bike'
  },
  {
    id: 'car-racing',
    slug: 'car-racing',
    title: 'Car Racing',
    shortTitle: 'Car Racing',
    badge: 'FIA Motorsport',
    minorDetail: 'Flame-resistant Nomex® suits, pre-curved gloves & silicone steering grip.',
    tagline: 'Track-Tested Motorsport Suits, Gloves & Flame-Resistant Gear',
    description: 'High-performance motorsport apparel engineered for circuit racing, rally, and karting. Formulated with fire-retardant Nomex® fabrics, pre-curved racing gloves with external seams for zero steering friction, and high-traction silicone printed palms.',
    image: carRacingImg,
    features: [
      'Multi-layer flame-retardant aramid and Nomex® textile construction',
      'Pre-formed fingers with external seams for fatigue-free steering grip',
      'Flame-resistant high-tack silicone palm grip for maximum wheel feedback',
      'Extended safety gauntlet with elasticated wrist retention system'
    ],
    specs: [
      { label: 'Standard', value: 'FIA 8856-2018 / SFI 3.3/5' },
      { label: 'Thermal Shield', value: 'Double-Layer Aramid & Nomex®' },
      { label: 'Palm Coating', value: 'High-Tack Silicone Grid' }
    ],
    routePath: '/gearwear/car-racing',
    codePrefix: 'GW-CR',
    themeColor: '#EA2227',
    iconName: 'Flame'
  },
  {
    id: 'weight-lifting',
    slug: 'weight-lifting',
    title: 'Weight Lifting',
    shortTitle: 'Weight Lifting',
    badge: 'Heavy Powerlifting',
    minorDetail: '10mm leather powerlifting belts, wrist support wraps & padded gym gloves.',
    tagline: 'Heavy Barbell Strength Belts, Wrist Wraps & Padded Gym Gloves',
    description: 'Industrial-grade strength conditioning equipment and apparel for powerlifters, Olympic lifters, and bodybuilding athletes. Crafted with heavy-duty top-grain buffalo leather, reinforced double-bonded nylon stitching, and high-friction anti-slip palm padding.',
    image: weightLiftingImg,
    features: [
      'Top-grain genuine buffalo leather with non-stretch heavy-duty core',
      'Heavy-gauge stainless steel lever and dual-prong buckle hardware',
      'Honey-comb silicone textured palm padding for non-slip bar grip',
      'High-elasticity thumb-loop wrist wraps for maximum joint stability'
    ],
    specs: [
      { label: 'Tensile Load', value: 'Tested up to 500kg Barbell Loads' },
      { label: 'Hardware', value: 'Matte Stainless Steel Lever' },
      { label: 'Thickness', value: '10mm & 13mm Competition Specs' }
    ],
    routePath: '/gearwear/weight-lifting',
    codePrefix: 'GW-WL',
    themeColor: '#0B3D3B',
    iconName: 'Dumbbell'
  }
];

export function getGearwearWindowBySlug(slug: string): GearwearWindow | undefined {
  const normalized = slug.toLowerCase().trim();
  return GEARWEAR_WINDOWS.find(w => 
    w.slug === normalized || 
    w.id === normalized ||
    (normalized === 'cycling' && w.slug === 'road-cycling-apparel') ||
    (normalized === 'road-cycling' && w.slug === 'road-cycling-apparel') ||
    (normalized === 'racing' && w.slug === 'car-racing') ||
    (normalized === 'motorsport' && w.slug === 'car-racing') ||
    (normalized === 'lifting' && w.slug === 'weight-lifting') ||
    (normalized === 'weightlifting' && w.slug === 'weight-lifting')
  );
}
