import golfGlovesImg from '../assets/images/blank_golf_glove_1792247520769.jpg';
import fishGlovesImg from '../assets/images/blank_fish_glove_1792247591287.jpg';
import workGlovesImg from '../assets/images/blank_mechanic_glove_1792247541453.jpg';
import mechanicsGlovesImg from '../assets/images/blank_mechanic_glove_1792247541453.jpg';
import tacticalPoliceGlovesImg from '../assets/images/blank_police_glove_1792247591145.jpg';
import motorcarsGlovesImg from '../assets/images/blank_racing_glove_1792247541163.jpg';
import cyclingGlovesImg from '../assets/images/blank_cycling_glove_1792247541304.jpg';
import roadCyclingImg from '../assets/images/blank_road_cycling_1792247567857.jpg';
import weightLiftingImg from '../assets/images/blank_weight_lifting_1792247542179.jpg';
import tacticalGlovesImg from '../assets/images/blank_tactical_glove_1792247540904.jpg';
import carRacingImg from '../assets/images/blank_racing_glove_1792247541163.jpg';

export type GearwearGroup = 'tactical' | 'car' | 'athletic';

export interface GearwearWindow {
  id: string;
  slug: string;
  group: GearwearGroup;
  groupLabel: string;
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
  iconName: 'ShieldAlert' | 'Bike' | 'Flame' | 'Dumbbell' | 'Wrench' | 'Fish' | 'Car' | 'Compass';
}

export const GEARWEAR_WINDOWS: GearwearWindow[] = [
  // ==========================================
  // TACTICAL GLOVES CATEGORIES (5 Categories)
  // ==========================================
  {
    id: 'golf-gloves',
    slug: 'golf-gloves',
    group: 'tactical',
    groupLabel: 'Tacticals Series',
    title: 'Golf Gloves',
    shortTitle: 'Golf Gloves',
    badge: 'Tour Precision',
    minorDetail: 'Ultra-thin AAA Cabretta leather, moisture-wicking mesh & micro-perforated feel.',
    tagline: 'Tour-Grade Cabretta Leather Precision Grip Golf Gloves',
    description: 'Precision-tailored golf gloves crafted from Grade-AAA Indonesian Cabretta leather for velvet-soft tactile feedback, all-weather moisture control, and zero-slip club head stability in competitive play.',
    image: golfGlovesImg,
    features: [
      'Grade-AAA Ethiopian & Indonesian Cabretta leather for supple second-skin fit',
      'Micro-perforation arrays across fingers for rapid sweat dispersion',
      'Angled ergonomic Velcro tab closure with elasticized wrist contouring',
      'Reinforced palm heel pad for extended durability across 100+ rounds'
    ],
    specs: [
      { label: 'Leather Grade', value: '0.45mm AAA Cabretta' },
      { label: 'Closure', value: 'Comfort-Tab Velcro' },
      { label: 'Weather Rating', value: 'All-Weather Hydrophobic' }
    ],
    routePath: '/gearwear/golf-gloves',
    codePrefix: 'GW-GG',
    themeColor: '#0B3D3B',
    iconName: 'Compass'
  },
  {
    id: 'fish-gloves',
    slug: 'fish-gloves',
    group: 'tactical',
    groupLabel: 'Tacticals Series',
    title: 'Fish Gloves',
    shortTitle: 'Fish Gloves',
    badge: 'Marine Kevlar®',
    minorDetail: 'Cut & puncture resistant Kevlar® mesh, anti-slime wet grip & UPF 50+ protection.',
    tagline: 'Heavy-Duty Saltwater & Freshwater Non-Slip Angling Gloves',
    description: 'Engineered for offshore big game fishing, wire leader maneuvering, and wet-deck handling. Features puncture-resistant Kevlar® palmar lining, anti-slime micro-ridged silicone grip, and quick-drying saltwater fabric.',
    image: fishGlovesImg,
    features: [
      'Puncture-resistant Kevlar® weave guarding against dorsal spines and wire cuts',
      'Hexagonal high-traction silicone wet-palm texture for slime and slippery catches',
      'UPF 50+ ultraviolet solar blocking fabric with quick-drain finger ports',
      'Extended neoprene safety wrist cuff with heavy-duty pull tab'
    ],
    specs: [
      { label: 'Cut Resistance', value: 'ANSI Level 3 / EN 388' },
      { label: 'Grip Matrix', value: 'High-Vis Hydrophobic Silicone' },
      { label: 'Sun Shield', value: 'UPF 50+ Certified' }
    ],
    routePath: '/gearwear/fish-gloves',
    codePrefix: 'GW-FG',
    themeColor: '#0A4B54',
    iconName: 'Fish'
  },
  {
    id: 'work-gloves',
    slug: 'work-gloves',
    group: 'tactical',
    groupLabel: 'Tacticals Series',
    title: 'Work Gloves',
    shortTitle: 'Work Gloves',
    badge: 'Industrial Duty',
    minorDetail: 'Abrasion-resistant cowhide leather, double-stitched palm & elastic safety cuff.',
    tagline: 'Industrial Construction, Heavy Rigging & Job-Site Utility Gloves',
    description: 'Rugged industrial work gloves built with premium split-grain cowhide leather, reinforced keystone thumb saddle, double-needle bonded nylon stitching, and elastic safety cuff for demanding job sites.',
    image: workGlovesImg,
    features: [
      'Heavy-duty 1.1mm split cowhide leather palm and finger tips',
      'Reinforced keystone thumb design for ergonomic natural movement',
      'Double-stitched stress zones with heat-resistant Kevlar® thread',
      'Snug elastic shirred wrist keeping out gravel, wood chips, and debris'
    ],
    specs: [
      { label: 'Abrasion Level', value: 'EN 388 Level 4 Abrasion' },
      { label: 'Leather Type', value: 'Select Grain Cowhide' },
      { label: 'Seam Construction', value: 'Dual-Bonded Kevlar® Thread' }
    ],
    routePath: '/gearwear/work-gloves',
    codePrefix: 'GW-WG',
    themeColor: '#7A4100',
    iconName: 'Wrench'
  },
  {
    id: 'mechanics-gloves',
    slug: 'mechanics-gloves',
    group: 'tactical',
    groupLabel: 'Tacticals Series',
    title: 'Mechanics Gloves',
    shortTitle: 'Mechanics Gloves',
    badge: 'Workshop TPR',
    minorDetail: 'TPR flexible impact knuckle shield, synthetic leather palms & touchscreen fingers.',
    tagline: 'Precision Tool Handling & Vibration-Dampening Workshop Gloves',
    description: 'Engineered for automotive repair, engine teardowns, and heavy machinery operations. Features flexible thermal TPR impact shields, anatomical EVA vibration dampeners, and conductive touchscreen finger pads.',
    image: mechanicsGlovesImg,
    features: [
      'Molded TPR impact protection over knuckles and dorsal metacarpals',
      'Clarino synthetic leather palm offering high tactile tool feedback',
      'EVA foam padding on heel of hand absorbing impact wrench vibrations',
      'Conductive index and thumb pads for automotive diagnostic tablets'
    ],
    specs: [
      { label: 'Impact Defense', value: 'ANSI/ISEA 138 Level 2' },
      { label: 'Palm Material', value: 'Clarino Microfiber' },
      { label: 'Tool Grip', value: 'Silicon Hex Textured' }
    ],
    routePath: '/gearwear/mechanics-gloves',
    codePrefix: 'GW-MG',
    themeColor: '#1A365D',
    iconName: 'Wrench'
  },
  {
    id: 'tactical-police-gloves',
    slug: 'tactical-police-gloves',
    group: 'tactical',
    groupLabel: 'Tacticals Series',
    title: 'Tactical Police Gloves',
    shortTitle: 'Tactical Police',
    badge: 'Law Enforcement',
    minorDetail: 'Hard shell molded knuckles, Level 5 cut-resistant lining & covert grip.',
    tagline: 'Mil-Spec SWAT, Special Ops & Law Enforcement Duty Gloves',
    description: 'Professional duty handwear for tactical police, SWAT personnel, and security operators. Fitted with ballistic carbon/TPR knuckle armor, ANSI/EN Level 5 cut-resistant lining, and breathable stretch spandex.',
    image: tacticalPoliceGlovesImg,
    features: [
      'Ballistic molded knuckle armor with ventilation exhaust ports',
      'Full Kevlar® cut-resistant palm and finger inner lining (Level 5)',
      'Subdued matte covert hardware with quiet hook-and-loop wrist tab',
      'Laser-textured goat leather palm providing high weapon retention'
    ],
    specs: [
      { label: 'Cut Resistance', value: 'ANSI A5 / EN 388 Level 5' },
      { label: 'Knuckle Armor', value: 'Molded Carbon-Polymer' },
      { label: 'Touchscreen', value: 'Dual-Finger Capacitive' }
    ],
    routePath: '/gearwear/tactical-police-gloves',
    codePrefix: 'GW-TP',
    themeColor: '#0B3D3B',
    iconName: 'ShieldAlert'
  },

  // ==========================================
  // CAR CATEGORIES (2 Categories)
  // ==========================================
  {
    id: 'motorcars-gloves',
    slug: 'motorcars-gloves',
    group: 'car',
    groupLabel: 'Car Categories',
    title: 'Motorcars Gloves',
    shortTitle: 'Motorcars Gloves',
    badge: 'FIA Motorsport',
    minorDetail: 'Fire-retardant Nomex® aramid, external seams & silicone steering wheel grip.',
    tagline: 'Track-Tested Circuit, Rally & Formula Motorsport Racing Gloves',
    description: 'Certified track racing gloves designed for circuit racing, rally, and karting cockpits. Features multi-layer fire-retardant Nomex® construction, external reverse seams for zero pressure points, and high-tack silicone palm grids.',
    image: motorcarsGlovesImg,
    features: [
      'Double-layer flame-retardant aramid and authentic Nomex® fabric',
      'External seam stitching preventing hand blisters during endurance stints',
      'High-tack silicone palm and finger print calibrated for suede and leather wheels',
      'Elasticated extended wrist gauntlet for seamless fire-suit overlap'
    ],
    specs: [
      { label: 'Safety Standard', value: 'FIA 8856-2018 / SFI 3.3/5' },
      { label: 'Thermal Core', value: 'Dual Nomex® Aramid' },
      { label: 'Seam Design', value: '100% External Seams' }
    ],
    routePath: '/gearwear/motorcars-gloves',
    codePrefix: 'GW-MC',
    themeColor: '#EA2227',
    iconName: 'Car'
  },
  {
    id: 'cycling-gloves',
    slug: 'cycling-gloves',
    group: 'car',
    groupLabel: 'Car Categories',
    title: 'Cycling Gloves',
    shortTitle: 'Cycling Gloves',
    badge: 'Aero Pro Road',
    minorDetail: 'Shock-absorbing 3D gel palm pads, aerodynamic micro-mesh & quick-release tabs.',
    tagline: 'Ergonomic Road, Gravel & Track Shock-Absorbing Handwear',
    description: 'High-ventilation performance cycling gloves equipped with anatomical vibration-dampening gel zones, micro-porous elastic airflow backs, terry thumb sweat wipe, and quick-strip finger loops.',
    image: cyclingGlovesImg,
    features: [
      'Multi-zone anatomical silicone gel pads shielding the ulnar nerve from road chatter',
      '4-way stretch aerodynamic micro-mesh back for continuous evaporative cooling',
      'Finger pull-loops and wrist tab for effortless removal after sweaty rides',
      'Absorbent micro-fleece thumb panel for quick brow sweat clearance'
    ],
    specs: [
      { label: 'Gel Padding', value: 'Multi-Density 5mm Shock Gel' },
      { label: 'Airflow Back', value: 'Laser-Cut Aero Mesh' },
      { label: 'Grip Texture', value: 'Non-Slip Microfiber' }
    ],
    routePath: '/gearwear/cycling-gloves',
    codePrefix: 'GW-CG',
    themeColor: '#FF5A36',
    iconName: 'Bike'
  },

  // ==========================================
  // ATHLETIC & POWER CATEGORIES
  // ==========================================
  {
    id: 'road-cycling-apparel',
    slug: 'road-cycling-apparel',
    group: 'athletic',
    groupLabel: 'Athletic Wear',
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
    id: 'weight-lifting',
    slug: 'weight-lifting',
    group: 'athletic',
    groupLabel: 'Athletic Wear',
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
  
  // Exact match
  const directMatch = GEARWEAR_WINDOWS.find(w => w.slug === normalized || w.id === normalized);
  if (directMatch) return directMatch;

  // Semantic & Aliased Matches
  if (normalized === 'golf' || normalized === 'golf-glove') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'golf-gloves');
  }
  if (normalized === 'fish' || normalized === 'fishing' || normalized === 'fishing-gloves') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'fish-gloves');
  }
  if (normalized === 'work' || normalized === 'working-gloves' || normalized === 'work-glove') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'work-gloves');
  }
  if (normalized === 'mechanic' || normalized === 'mechanics' || normalized === 'mechanic-gloves') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'mechanics-gloves');
  }
  if (normalized === 'tactical-police' || normalized === 'police' || normalized === 'tactical-police-gloves' || normalized === 'police-gloves' || normalized === 'tactical-gloves' || normalized === 'tactical') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'tactical-police-gloves');
  }
  if (normalized === 'motorcar' || normalized === 'motorcars' || normalized === 'motorcars-gloves' || normalized === 'car-racing' || normalized === 'racing' || normalized === 'motorsport') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'motorcars-gloves');
  }
  if (normalized === 'cycling-gloves' || normalized === 'cycle-gloves' || normalized === 'biking-gloves') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'cycling-gloves');
  }
  if (normalized === 'cycling' || normalized === 'road-cycling' || normalized === 'cycling-apparel') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'road-cycling-apparel');
  }
  if (normalized === 'lifting' || normalized === 'weightlifting') {
    return GEARWEAR_WINDOWS.find(w => w.slug === 'weight-lifting');
  }

  return undefined;
}
