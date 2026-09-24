export interface GearwearWindow {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  description: string;
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
    badge: 'Military & Security Grade',
    tagline: 'High-Dexterity Combat & Law Enforcement Tactical Handwear',
    description: 'Engineered for extreme duty operations and tactical mobility. Constructed with molded high-impact knuckle protection, anti-abrasion goat leather and Kevlar® palms, breathable stretch backs, and touchscreen conductive fingertips.',
    features: [
      'Molded thermal TPR and carbon-fiber composite knuckle protection',
      'Kevlar® cut-resistant palm lining meeting EN 388 Level 4 abrasion benchmarks',
      'Touchscreen sensitive thumb and trigger finger conductive thread',
      'Reinforced thumb saddle and heavy-duty double-needle nylon stitching',
      'Adjustable low-profile TPR wrist strap with industrial hook-and-loop closure'
    ],
    specs: [
      { label: 'Safety Rating', value: 'EN 388:2016 (4X43DP) Certified' },
      { label: 'Palm Construction', value: 'Synthetic Micro-Suede & Goat Leather' },
      { label: 'Reinforcement', value: 'Kevlar® Cut-Resistant Internal Weave' },
      { label: 'Dexterity', value: 'Ergonomic 3D Curved Finger Fit' }
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
    tagline: 'High-Cadence Aerodynamic Road Racing & Gravel Cycling Apparel',
    description: 'Precision-tailored road and cycling technical wear. Designed with aerodynamic drag reduction panels, laser-cut ventilation zones, 4-way stretch Italian warp knit Lycra, and multi-density 3D gel chamois pads for ultra-endurance rides.',
    features: [
      'Aerodynamic textured sleeve fabrics for boundary-layer airflow reduction',
      'Multi-density anatomical 3D gel chamois with anti-bacterial silver treatment',
      'Micro-porous rapid vapor evaporation matrices (130 GSM featherlight)',
      'UPF 50+ UV solar protection barrier for extended sun exposure',
      '3M Scotchlite™ high-visibility reflective elements for low-light safety'
    ],
    specs: [
      { label: 'Fabric Gauge', value: 'Italian Warp Knit 80% Poly, 20% Elastane' },
      { label: 'Chamois', value: 'Multi-Density 120kg/m³ Ergonomic Gel Insert' },
      { label: 'Zippers', value: 'Full-Length YKK Self-Locking Aerodynamic Zip' },
      { label: 'Silicon Grip', value: 'Laser-Cut Micro-Dot Hem & Leg Grippers' }
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
    badge: 'Motorsport FIA Benchmark',
    tagline: 'Track-Tested Motorsport Suits, Gloves & Flame-Resistant Gear',
    description: 'High-performance motorsport apparel engineered for circuit racing, rally, and karting. Formulated with fire-retardant Nomex® fabrics, pre-curved racing gloves with external seams for zero steering friction, and high-traction silicone printed palms.',
    features: [
      'Multi-layer flame-retardant aramid and Nomex® textile construction',
      'Pre-formed fingers with external seams for fatigue-free steering grip',
      'Flame-resistant high-tack silicone palm grip for maximum wheel feedback',
      'Extended safety gauntlet with elasticated wrist retention system',
      'Sublimated and embroidered OEM racing logos with zero heat transfer'
    ],
    specs: [
      { label: 'Standard', value: 'Built to FIA 8856-2018 / SFI 3.3/5 Standards' },
      { label: 'Thermal Shield', value: 'Double-Layer Aramid & Nomex® Yarn' },
      { label: 'Palm Coating', value: 'Flame-Resistant High-Tack Silicone Grid' },
      { label: 'Weight Profile', value: 'Ultra-lightweight competitive ergonomics' }
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
    badge: 'Powerlifting Heavy Duty',
    tagline: 'Heavy Barbell Strength Belts, Wrist Wraps & Padded Gym Gloves',
    description: 'Industrial-grade strength conditioning equipment and apparel for powerlifters, Olympic lifters, and bodybuilding athletes. Crafted with heavy-duty top-grain buffalo leather, reinforced double-bonded nylon stitching, and high-friction anti-slip palm padding.',
    features: [
      'Top-grain genuine buffalo leather with non-stretch heavy-duty core',
      'Heavy-gauge stainless steel lever and dual-prong buckle hardware',
      'Honey-comb silicone textured palm padding for non-slip bar grip',
      'High-elasticity thumb-loop wrist wraps for maximum joint stability',
      '7mm neoprene compression knee and elbow sleeves with reinforced seams'
    ],
    specs: [
      { label: 'Tensile Rating', value: 'Tested up to 500kg Barbell Tensile Loads' },
      { label: 'Stitching', value: 'Heavy-Duty Bonded Nylon Industrial Thread' },
      { label: 'Leather Thickness', value: '10mm & 13mm Competition Thickness Options' },
      { label: 'Hardware', value: 'Matte Black Anodized Stainless Steel' }
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
