import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Search as SearchIcon, 
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  ShieldCheck as ShieldCheckIcon,
  CheckCircle2 as CheckCircle2Icon,
  Filter as FilterIcon,
  Sparkles as SparklesIcon,
  Flame as FlameIcon,
  Zap as ZapIcon,
  Eye as EyeIcon,
  LayoutGrid as LayoutGridIcon,
  List as ListIcon,
  X as XIcon,
  Gauge as GaugeIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { GearwearWindow, GEARWEAR_WINDOWS } from '../data/gearwearWindows';
import { Product, Settings } from '../types';
import SmoothImage from './SmoothImage';
import SEO from './SEO';
import brandLogo from '../assets/images/safetyline_landing.png';
import InquiryLoadingModal from './InquiryLoadingModal';

// Four Official Motorsport Car Racing Gloves Assets (excluding removed cg2)
import cg1Img from '../assets/images/cg1.png';
import cg3Img from '../assets/images/cg3.png';
import cg4Img from '../assets/images/cg4.png';
import cg5Img from '../assets/images/cg5.png';

// Isolated Transparent Slide Animation Images (background removed exclusively for the slide animation)
import cg1SlideImg from '../assets/images/cg1_slide.png';
import cg3SlideImg from '../assets/images/cg3_slide.png';
import cg4SlideImg from '../assets/images/cg4_slide.png';
import cg5SlideImg from '../assets/images/cg5_slide.png';

// Cycling Gloves Assets
import cy1Img from '../assets/images/cycling_glove_safetyline_1.png';
import cy2Img from '../assets/images/cycling_glove_safetyline_2.png';
import cy3Img from '../assets/images/cycling_glove_safetyline_3.png';
import cy4Img from '../assets/images/cycling_glove_safetyline_4.png';
import cy5Img from '../assets/images/cycling_glove_safetyline_5.png';
import cy6Img from '../assets/images/cycling_glove_safetyline_6.png';
import cy9Img from '../assets/images/cycling_glove_safetyline_9.png';

// Golf Gloves Assets
import gg1Img from '../assets/images/golf_glove_1.png';
import gg2Img from '../assets/images/golf_glove_2.png';
import gg3Img from '../assets/images/golf_glove_3.png';
import gg4Img from '../assets/images/golf_glove_4.png';
import gg5Img from '../assets/images/golf_glove_5.png';
import gg6Img from '../assets/images/golf_glove_6.png';
import gg7Img from '../assets/images/golf_glove_7.png';
import gg8Img from '../assets/images/golf_glove_8.png';

// Fish Gloves Assets
import fg1Img from '../assets/images/fish_glove_1.png';
import fg2Img from '../assets/images/fish_glove_2.png';
import fg3Img from '../assets/images/fish_glove_3.png';

// Work Gloves Assets
import wg1Img from '../assets/images/work_glove_1.png';
import wg2Img from '../assets/images/work_glove_2.png';
import wg3Img from '../assets/images/work_glove_3.png';

// Mechanics Gloves Assets
import mg1Img from '../assets/images/mechanics_glove_1.png';
import mg2Img from '../assets/images/mechanics_glove_2.png';
import mg3Img from '../assets/images/mechanics_glove_3.png';

// Weight Lifting Assets
import wl1Img from '../assets/images/weight_lifting_1.png';
import wl2Img from '../assets/images/weight_lifting_2.png';
import wl3Img from '../assets/images/weight_lifting_3.png';
import wl4Img from '../assets/images/weight_lifting_4.png';

interface GearwearWindowPageProps {
  window: GearwearWindow;
  products: Product[];
  settings: Settings;
}

// Dedicated metadata for glove models
export interface CarRacingGloveSpec {
  code: string;
  name: string;
  livery: string;
  image: string;
  slideImage: string;
  badge: string;
  flameRating: string;
  palmMatrix: string;
  seamType: string;
  knuckleArmor: string;
  targetDiscipline: string;
  summary: string;
}

export const CAR_RACING_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-CR-01',
    name: 'Safety Line Signature Flame FIA Racing Gloves',
    livery: 'Purple / Black Tiger Flame',
    image: cg1Img,
    slideImage: cg1SlideImg,
    badge: 'FIA 8856-2018',
    flameRating: '15s+ Direct Contact Flame Resistance',
    palmMatrix: 'Reinforced Suede Steering Grip with Knuckle Padding',
    seamType: 'External Reverse Seams with Safety Line Wrist Strap',
    knuckleArmor: 'Metacarpal Impact Dampener & Suede Upper Shield',
    targetDiscipline: 'Circuit Racing, Touring & Sprint Track Days',
    summary: 'Official Safety Line FIA-compliant fireproof racing gloves featuring iconic purple tiger flame Nomex® backing, suede reinforced grip, and embroidered SL insignia on the safety gauntlet.'
  },
  {
    code: 'GW-CR-03',
    name: 'Safety Line Veloce High-Visibility Endurance Gloves',
    livery: 'Signal Neon Yellow / Black',
    image: cg3Img,
    slideImage: cg3SlideImg,
    badge: 'Night Stint Hi-Vis',
    flameRating: 'FIA 8856-2000 & SFI 3.3/5 Certified',
    palmMatrix: 'Full Palm Traction Grips with Thumb Saddle Reinforcement',
    seamType: 'External Seams with Hook-and-Loop Safety Line Strap',
    knuckleArmor: 'High-Density Impact Zone & Ergonomic Flex Articulation',
    targetDiscipline: '24-Hour Endurance, Night Stints & Rally Stages',
    summary: 'Optimized for night stints and endurance GT racing where visual signaling in dark cockpits is vital. Fluorescent signal yellow Nomex® aramid with Safety Line wrist closure and embroidered SL emblem.'
  },
  {
    code: 'GW-CR-04',
    name: 'Safety Line Pro-Circuit Two-Tone Racing Gloves',
    livery: 'Monochrome Stealth Black / Pure White',
    image: cg4Img,
    slideImage: cg4SlideImg,
    badge: 'FIA 8856 Pro-Circuit',
    flameRating: 'FIA 8856-2018 Benchmark Tested',
    palmMatrix: 'Reinforced White Leather Palmar Cushioning',
    seamType: 'External Seam Finger Framing with Zero Internal Friction',
    knuckleArmor: 'Integrated White Metacarpal Padded Shield',
    targetDiscipline: 'Single-Seaters, Formula Regional & GT Racing',
    summary: 'Classic high-contrast two-tone black and white Nomex® racing gloves engineered with padded knuckles, reverse-stitched palm, and embroidered SL safety gauntlet.'
  },
  {
    code: 'GW-CR-05',
    name: 'Safety Line Grand Prix Monza Flame-Retardant Racing Gloves',
    livery: 'Championship Monza Red / White',
    image: cg5Img,
    slideImage: cg5SlideImg,
    badge: 'FIA 8856 Grand Prix',
    flameRating: 'FIA 8856-2018 & SFI Approved',
    palmMatrix: 'Soft White Leather Ergonomic Palm Grip',
    seamType: 'Pre-Curved External Seams with Extended Safety Gauntlet',
    knuckleArmor: 'Padded Metacarpal Bar with Safety Line Strap',
    targetDiscipline: 'Formula Racing, Historic Touring & Hillclimb',
    summary: 'Championship-grade fire-retardant racing gloves in radiant Monza Red with white finger sidewalls, extended Nomex safety gauntlet, and iconic SL insignia.'
  }
];

export const CYCLING_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-CG-01',
    name: 'Safety Line Pro-Aero Carbon Cycling Gloves',
    livery: 'Carbon Black / Neon Yellow Aero',
    image: cy1Img,
    slideImage: cy1Img,
    badge: 'UCI Pro Aero',
    flameRating: 'UV Solar Block UPF 50+ Certified',
    palmMatrix: 'Gel-Padded Non-Slip Microfiber Grip with Ulnar Nerve Protection',
    seamType: 'Ergonomic 4-Way Stretch Breathable Mesh with Low-Profile Seams',
    knuckleArmor: 'Ventilated Air-Mesh Dorsal Shield with Pull Tabs',
    targetDiscipline: 'Road Cycling, Criterium & Time Trial',
    summary: 'Professional aerodynamic road cycling gloves featuring multi-density 5mm shock-absorbing gel palm pads, moisture-wicking micro-mesh, and Safety Line pull-tab release.'
  },
  {
    code: 'GW-CG-02',
    name: 'Safety Line Veloce Signal Aero Cycling Gloves',
    livery: 'Signal Neon Yellow / Carbon Black',
    image: cy2Img,
    slideImage: cy2Img,
    badge: 'Veloce Hi-Vis',
    flameRating: 'High-Visibility UV Solar Shield UPF 50+',
    palmMatrix: 'Reinforced Suede Microfiber with Anti-Shock Gel Cushioning',
    seamType: 'Breathable Air-Mesh Finger Framing with Quick Release Tabs',
    knuckleArmor: 'High-Density Flex Mesh Backhand',
    targetDiscipline: 'Road Racing, Criterium & Night Training',
    summary: 'High-visibility aerodynamic cycling gloves engineered with fluorescent signal accents, shock-absorbing gel palm pads, and breathable stretch airflow mesh.'
  },

  {
    code: 'GW-CG-04',
    name: 'Safety Line Endurance Gel Road Cycling Gloves',
    livery: 'Endurance White / Stealth Black',
    image: cy4Img,
    slideImage: cy4Img,
    badge: 'Endurance Ultra',
    flameRating: 'High-Vapor Breathable Mesh Rating',
    palmMatrix: 'High-Damping Silicon Grip Palm with Vibration Isolation',
    seamType: 'Seamless Flex-Zone Finger Framing with Terry Sweat Wipe',
    knuckleArmor: 'Breathable Stretch Vent Backing',
    targetDiscipline: 'Century Rides, Gran Fondo & Ultra Endurance',
    summary: 'Engineered for long-distance century rides and Gran Fondo racing. Features advanced gel vibration damping, absorbent micro-fleece thumb wipe, and secure velcro closure.'
  },
  {
    code: 'GW-CG-05',
    name: 'Safety Line Grand Prix Monza Aero Cycling Gloves',
    livery: 'Championship Monza Red / Black',
    image: cy5Img,
    slideImage: cy5Img,
    badge: 'Grand Prix Edition',
    flameRating: 'UPF 50+ Sun & Wind Barrier',
    palmMatrix: 'Dual-Density Ergonomic Gel Palm with Kevlar® Thumb Saddle',
    seamType: 'Pre-Curved Articulated Finger Sidewalls',
    knuckleArmor: 'Breathable Aero Fabric with Pull Tab Gauntlet',
    targetDiscipline: 'Sprint Circuit, Road & Track Racing',
    summary: 'Championship-tier cycling gloves designed with radiant Monza Red aero backing, dual-density gel cushioning, and official Safety Line branding.'
  },
  {
    code: 'GW-CG-06',
    name: 'Safety Line Chrono Speed Track Cycling Gloves',
    livery: 'Chrono Racer Red / Black',
    image: cy6Img,
    slideImage: cy6Img,
    badge: 'Chrono Speed Track',
    flameRating: 'Track Sprint Aerodynamic Tested',
    palmMatrix: 'Tacky Synthetic Leather Palm with Direct Bar Feedback',
    seamType: 'Ultra-Low Profile Aero Stitching',
    knuckleArmor: 'Flexible Knuckle Articulation Panels',
    targetDiscipline: 'Track Sprint, Velodrome & Road Racing',
    summary: 'Ultra-lightweight track and road racing gloves designed for maximum tactile handlebar connection and aerodynamic efficiency with embroidered Safety Line SL emblem.'
  },
  {
    code: 'GW-CG-09',
    name: 'Safety Line All-Weather Gravel & MTB Cycling Gloves',
    livery: 'Gravel Explorer Slate / Orange',
    image: cy9Img,
    slideImage: cy9Img,
    badge: 'Gravel & MTB Pro',
    flameRating: 'All-Weather Abrasion Resistant',
    palmMatrix: 'All-Weather Silicon Traction Palm with Double Stitching',
    seamType: 'Reinforced Durability Seams with Neoprene Cuff',
    knuckleArmor: 'TPR Impact Guards & Flexible Mesh',
    targetDiscipline: 'Gravel Grinding, Cyclocross & Mountain Biking',
    summary: 'Rugged all-weather gravel and cross-country cycling gloves built with abrasion-resistant palm reinforcement, touchscreen compatibility, and Safety Line wrist security.'
  }
];

export const GOLF_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-GG-01',
    name: 'Safety Line Tour Precision Cabretta Golf Gloves',
    livery: 'Tour Pearl White / Stealth Black Tab',
    image: gg1Img,
    slideImage: gg1Img,
    badge: 'Tour Grade AAA',
    flameRating: '0.45mm AAA Cabretta Leather',
    palmMatrix: 'Micro-Perforated Ethiopian Cabretta Leather Palm',
    seamType: 'Ergonomic Angled Tab Closure with Elastic Wrist',
    knuckleArmor: 'Micro-Perforation Array & Breathable Spandex',
    targetDiscipline: 'PGA Tour, Tournament Play & Low Handicap',
    summary: 'Precision-tailored golf gloves crafted from Grade-AAA Indonesian Cabretta leather for velvet-soft tactile feedback, all-weather moisture control, and zero-slip club head stability in competitive play.'
  },
  {
    code: 'GW-GG-02',
    name: 'Safety Line Pure Grip All-Weather Golf Gloves',
    livery: 'Optic White / Signal Red Accent',
    image: gg2Img,
    slideImage: gg2Img,
    badge: 'All-Weather Pro',
    flameRating: 'Hydrophobic All-Weather Treated',
    palmMatrix: 'Tacky Synthetic Microfiber Suede Palm',
    seamType: '4-Way Stretch Flex Mesh Finger Framing',
    knuckleArmor: 'PowerMesh Flex Knuckle Inserts',
    targetDiscipline: 'Wet Conditions, High Humidity & Summer Rounds',
    summary: 'All-weather golf gloves engineered with tacky synthetic leather palm matrix and 4-way stretch flex mesh for ultimate control in damp or humid climates.'
  },
  {
    code: 'GW-GG-03',
    name: 'Safety Line Master Tour Soft Cabretta Golf Gloves',
    livery: 'Classic White / Midnight Black',
    image: gg3Img,
    slideImage: gg3Img,
    badge: 'Master Tour Spec',
    flameRating: '0.40mm Ultra-Thin Cabretta',
    palmMatrix: 'Seamless Grade-AAA Leather Palm Overlay',
    seamType: 'Precision Hand-Tailored Elastic Wrist Binding',
    knuckleArmor: 'Targeted Finger Airflow Perforations',
    targetDiscipline: 'Competitive Championship & Tour Play',
    summary: 'Ultra-thin 0.40mm AAA Cabretta leather golf gloves featuring a seamless palm overlay and precision elastic wrist band for supreme feel and distance control.'
  },
  {
    code: 'GW-GG-04',
    name: 'Safety Line Pro-Feel Perforated Tour Golf Gloves',
    livery: 'Pearl White / Carbon Grey Accent',
    image: gg4Img,
    slideImage: gg4Img,
    badge: 'Airflow Perforated',
    flameRating: 'Laser-Drilled Thermal Release',
    palmMatrix: 'Anatomically Contoured Cabretta Palm Patch',
    seamType: 'Ergonomic Angled Velcro Tab with Soft Wrist Lining',
    knuckleArmor: 'Full Laser-Perforated Dorsal Airflow Panel',
    targetDiscipline: 'Hot Climate Golf, Practice Range & Tournaments',
    summary: 'High-ventilation tour golf gloves featuring full-back laser micro-perforations and anatomical palm padding for maximum cooling in hot summer conditions.'
  },
  {
    code: 'GW-GG-05',
    name: 'Safety Line Elite Comfort Stretch Hybrid Golf Gloves',
    livery: 'Pure White / Slate Grey Elastic',
    image: gg5Img,
    slideImage: gg5Img,
    badge: 'Hybrid Stretch Pro',
    flameRating: '3D Stretch Lycra & Cabretta Hybrid',
    palmMatrix: 'High-Tack Cabretta Leather Palm & Thumb Saddle',
    seamType: '3D Conformable Elastic Stretch Backhand',
    knuckleArmor: 'Flexible Lycra Knuckle Articulation Zone',
    targetDiscipline: 'All-Day Rounds, Practice Ranges & Club Play',
    summary: 'Hybrid golf gloves combining premium Cabretta leather palm grip with 3D stretch Lycra backhand flexibility for effortless mobility across 18 holes.'
  },
  {
    code: 'GW-GG-06',
    name: 'Safety Line Tour Select Hydrophobic Cabretta Golf Gloves',
    livery: 'Optic White / Royal Blue Trim',
    image: gg6Img,
    slideImage: gg6Img,
    badge: 'Nano Hydrophobic',
    flameRating: 'Dew & Sweat Repellent Nano Shield',
    palmMatrix: 'Nano-Treated Hydrophobic Cabretta Leather',
    seamType: 'Micro-Porous Finger Sidewalls with Embroidered Tab',
    knuckleArmor: 'Abrasion-Resistant Dorsal Shielding',
    targetDiscipline: 'Morning Dew Rounds, Rainy Matches & Tour Play',
    summary: 'Hydrophobic nano-treated Cabretta leather golf gloves repelling dew, sweat, and light rain while providing uncompromised shot feedback.'
  },
  {
    code: 'GW-GG-07',
    name: 'Safety Line Apex Precision Micro-Mesh Golf Gloves',
    livery: 'Pearl White / Emerald Green Logo',
    image: gg7Img,
    slideImage: gg7Img,
    badge: 'Apex Precision',
    flameRating: 'High-Tack Micro-Mesh Construction',
    palmMatrix: 'High-Tack Cabretta Leather Palm with Heel Patch',
    seamType: 'Double-Stitched High-Friction Stress Zones',
    knuckleArmor: 'Precision Micro-Mesh Knuckle Inserts',
    targetDiscipline: 'High-Speed Swings, Driving Range & Championship Play',
    summary: 'Lightweight tour golf gloves featuring micro-mesh knuckle inserts and high-tack Cabretta thumb saddle for smooth swing mechanics.'
  },
  {
    code: 'GW-GG-08',
    name: 'Safety Line Championship Gold Medal Tour Golf Gloves',
    livery: 'Championship White / Satin Gold Tab',
    image: gg8Img,
    slideImage: gg8Img,
    badge: 'Gold Medal Tour',
    flameRating: 'Select Grade-AAA Championship Cabretta',
    palmMatrix: 'Velvet-Soft Hand-Tailored Cabretta Leather',
    seamType: 'Gold-Embossed Ergonomic Tab Closure',
    knuckleArmor: 'Seamless Contour Fit with Zero Bunching',
    targetDiscipline: 'Championship Finals, Trophy Rounds & Pro-Am',
    summary: 'Championship-grade Cabretta leather golf gloves with gold medal accent tab and Tour-validated fit designed to commemorate victory on the course.'
  }
];

export const FISH_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-FG-01',
    name: 'Safety Line Marine Kevlar® Anti-Puncture Fishing Gloves',
    livery: 'Ocean Blue / Slate Grey',
    image: fg1Img,
    slideImage: fg1Img,
    badge: 'Marine Kevlar®',
    flameRating: 'Puncture Resistance ANSI Level 3 / EN 388',
    palmMatrix: 'High-Traction Silicone Fish-Scale Grip Matrix',
    seamType: 'Water-Repellent Neoprene with Pull Tab Cuff',
    knuckleArmor: 'Puncture-Guard Dorsal Reinforcements',
    targetDiscipline: 'Saltwater Angling, Wire Leadering & Wet-Deck Handling',
    summary: 'Heavy-duty marine fishing gloves featuring puncture-resistant Kevlar® palmar lining, high-traction silicone fish-scale grip, and water-repellent neoprene.'
  },
  {
    code: 'GW-FG-02',
    name: 'Safety Line Steel-Core Fillet & Cut-Resistant Gloves',
    livery: 'Silver-Grey Knit / Navy Blue Dipped',
    image: fg2Img,
    slideImage: fg2Img,
    badge: 'ANSI Cut Level 5',
    flameRating: 'ANSI A5 / EN 388 Level 5 Cut Protection',
    palmMatrix: 'Crinkle Textured Crinkle Nitrile Wet Palm',
    seamType: 'Seamless 13-Gauge Breathable Knit Elastic Wrist',
    knuckleArmor: 'Micro-Wire Woven Dorsal Shield',
    targetDiscipline: 'Fish Filleting, Processing & Blade Handling',
    summary: 'Cut-resistant fish filleting gloves woven with stainless steel core fibers and crinkle nitrile dipped palm for knife safety.'
  },
  {
    code: 'GW-FG-03',
    name: 'Safety Line Offshore Big Game Leadering Gloves',
    livery: 'Cyan Teal / Stealth Black',
    image: fg3Img,
    slideImage: fg3Img,
    badge: 'Big Game Offshore',
    flameRating: 'Heavy Wire Leader & Friction Certified',
    palmMatrix: 'Double-Layer Heavy Kevlar® Palmar Armor',
    seamType: 'Heavy-Duty Brass Grommet Pull Tab Cuff',
    knuckleArmor: 'Molded Rubber Impact Finger Bumpers',
    targetDiscipline: 'Offshore Tournament Angling & Marlin Leadering',
    summary: 'Heavy-duty offshore leadering fishing gloves featuring reinforced double-layer Kevlar® palm pads, cyan flex webbing, and grommet pull tab.'
  }
];

export const WORK_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-WG-01',
    name: 'Safety Line Heavy-Duty Split Cowhide Leather Work Gloves',
    livery: 'Golden Tan Cowhide / Natural Canvas',
    image: wg1Img,
    slideImage: wg1Img,
    badge: 'Heavy Industrial Duty',
    flameRating: 'EN 388 Level 4 Abrasion Resistant',
    palmMatrix: '1.2mm Select Split Cowhide Leather Palm & Tips',
    seamType: 'Double-Needle Kevlar® Thread Stitching',
    knuckleArmor: 'Rubberized Heavy Safety Cuff & Knuckle Strap',
    targetDiscipline: 'Job-Site Construction, Rigging & Lumber Handling',
    summary: 'Industrial heavy-duty work gloves built with golden tan select split cowhide leather, keystone thumb, and rubberized safety cuff.'
  },
  {
    code: 'GW-WG-02',
    name: 'Safety Line High-Visibility Site Utility Work Gloves',
    livery: 'High-Vis Lime Yellow / Stealth Black',
    image: wg2Img,
    slideImage: wg2Img,
    badge: 'High-Vis Construction',
    flameRating: 'Daytime High-Visibility Signal Certified',
    palmMatrix: 'Padded Abrasion-Resistant Microfiber Palm',
    seamType: 'Adjustable Hook-and-Loop Velcro Wrist Closure',
    knuckleArmor: 'Fluorescent 4-Way Stretch Breathable Back',
    targetDiscipline: 'Commercial Construction & Equipment Operation',
    summary: 'Modern construction site utility work gloves featuring high-visibility fluorescent lime-yellow backhand and microfiber synthetic leather palm.'
  },
  {
    code: 'GW-WG-03',
    name: 'Safety Line Extreme Rigging TPR Impact Work Gloves',
    livery: 'Safety Orange / Stealth Black Armor',
    image: wg3Img,
    slideImage: wg3Img,
    badge: 'Rigging TPR Impact',
    flameRating: 'ANSI/ISEA 138 Level 2 Impact Rated',
    palmMatrix: 'Abrasion-Resistant Leather with Kevlar® Stitching',
    seamType: 'Wide Neoprene Wrist Cuff with Pull Tab',
    knuckleArmor: 'Segmented Thermal TPR Armor across Knuckles & Fingers',
    targetDiscipline: 'Oil & Gas Drilling, Steel Erection & Heavy Rigging',
    summary: 'Heavy-duty oilfield and rigging impact work gloves featuring safety orange dorsal mesh and flexible segmented black TPR impact armor.'
  }
];

export const MECHANICS_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-MG-01',
    name: 'Safety Line Stealth TPR Armor Automotive Mechanics Gloves',
    livery: 'Stealth Matte Black',
    image: mg1Img,
    slideImage: mg1Img,
    badge: 'Workshop TPR Armor',
    flameRating: 'ANSI/ISEA 138 Level 2 Impact Shield',
    palmMatrix: 'Clarino Synthetic Leather with Silicone Hex Matrix',
    seamType: 'Neoprene Wrist Cuff with Hook-and-Loop Closure',
    knuckleArmor: 'Molded Low-Profile Black TPR Impact Armor',
    targetDiscipline: 'Automotive Repair, Engine Teardowns & Pit Crews',
    summary: 'Professional workshop mechanics gloves featuring molded TPR impact knuckle armor, silicone hex grip Clarino palm, and touchscreen fingers.'
  },
  {
    code: 'GW-MG-02',
    name: 'Safety Line Cobalt Precision Technician Mechanics Gloves',
    livery: 'Cobalt Blue / Stealth Black',
    image: mg2Img,
    slideImage: mg2Img,
    badge: 'High-Dexterity Tech',
    flameRating: '0.6mm Ultra-Thin Tactile Sensitivity',
    palmMatrix: 'Microfiber Synthetic Suede Palm with Conductive Tips',
    seamType: 'Pre-Curved Ergonomic Finger Articulation',
    knuckleArmor: 'Segmented Flex TPR Knuckle & Metacarpal Protectors',
    targetDiscipline: 'Precision Diagnostics, Timing & Electrical Bays',
    summary: 'High-dexterity automotive technician gloves featuring vibrant cobalt blue stretch spandex, TPR knuckle shields, and tactile grey Clarino palm.'
  },
  {
    code: 'GW-MG-03',
    name: 'Safety Line Diesel Heavy-Machinery Oily-Grip Gloves',
    livery: 'Charcoal Grey / Hi-Vis Red Armor',
    image: mg3Img,
    slideImage: mg3Img,
    badge: 'Oily-Grip Diesel',
    flameRating: 'Hydrocarbon & Fuel Impermeable Palm',
    palmMatrix: 'Double-Dipped Micro-Sandy Nitrile Oil Palm',
    seamType: 'Seamless 13-Gauge Knit Extended Safety Cuff',
    knuckleArmor: 'Molded Hi-Vis Red Rubber Impact Ribs',
    targetDiscipline: 'Diesel Engines, Hydraulic Systems & Plant Machinery',
    summary: 'Heavy-machinery diesel mechanic gloves with micro-sandy nitrile dipped palm, hi-vis red impact ribs, and seamless breathable knit.'
  }
];

export const WEIGHT_LIFTING_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-WL-01',
    name: 'Safety Line Pro-Series Padded Wrist-Wrap Gym Gloves',
    livery: 'Stealth Black / Padded Suede',
    image: wl1Img,
    slideImage: wl1Img,
    badge: 'Powerlifting Heavy',
    flameRating: '500kg+ Barbell Load Tested',
    palmMatrix: 'Dual-Layer Cushioned Suede & Leather Palm Pads',
    seamType: 'Integrated 18-Inch Heavy Elastic Wrist Wrap Strap',
    knuckleArmor: 'Half-Finger Ergonomic Grip Zone with Knurl Relief',
    targetDiscipline: 'Heavy Bench Press, Deadlifts & Barbell Complexes',
    summary: 'Professional bodybuilding weight lifting gloves featuring cushioned leather palm pads, integrated 18-inch wrist wrap support, and heavy-duty velcro lock.'
  },
  {
    code: 'GW-WL-02',
    name: 'Safety Line AeroMesh Hex-Grip Fitness Training Gloves',
    livery: 'Charcoal Flex Mesh / Stealth Black',
    image: wl2Img,
    slideImage: wl2Img,
    badge: 'AeroMesh Gym',
    flameRating: 'High-Vapor Evaporative Heat Dumping',
    palmMatrix: 'Silicone Honeycomb Callus-Shield Palm Cushioning',
    seamType: 'Quick-Release Finger Pull Loops & Neoprene Cuff',
    knuckleArmor: 'Breathable Flex Mesh Evaporative Backing',
    targetDiscipline: 'Cross-Training, Pull-Ups & Dumbbell Conditioning',
    summary: 'Ventilated fitness training gloves featuring breathable flex mesh, honeycomb silicone anti-slip palm cushioning, and quick-pull removal tabs.'
  },
  {
    code: 'GW-WL-03',
    name: 'Safety Line Titan 10mm Buffalo Leather Lever Powerlifting Belt',
    livery: 'Matte Black Leather / Steel Lever',
    image: wl3Img,
    slideImage: wl3Img,
    badge: 'IPF Spec 10mm',
    flameRating: '500kg+ Tensile Core Resistance',
    palmMatrix: 'Non-Stretch Suede Core with 4-Row Bonded Stitching',
    seamType: 'Matte Black Quick-Release Alloy Lever Buckle',
    knuckleArmor: 'Uniform 10mm Competition-Grade Buffalo Leather',
    targetDiscipline: 'Maximal Squats, Deadlifts & Strongman Lifts',
    summary: 'Heavy-duty 10mm genuine buffalo leather powerlifting belt equipped with a precision matte black steel quick-release lever.'
  },
  {
    code: 'GW-WL-04',
    name: 'Safety Line 7mm High-Density SCR Neoprene Knee Sleeves',
    livery: 'Stealth Black / Charcoal Stitching',
    image: wl4Img,
    slideImage: wl4Img,
    badge: '7mm Competition',
    flameRating: 'High Rebound Joint Compression',
    palmMatrix: 'Graduated Vascular Warmth Compression Core',
    seamType: 'Heavy Reinforced Zig-Zag Flatlock Seams',
    knuckleArmor: 'Anatomical 3D Contoured Patellar Guidance Shield',
    targetDiscipline: 'Olympic Squats, Powerlifting Meets & Joint Warmth',
    summary: 'High-density 7mm neoprene compression knee sleeves providing joint warmth, rebound assistance, and lateral knee stabilization.'
  }
];

export const GearwearWindowPage: React.FC<GearwearWindowPageProps> = ({
  window: currentWindow,
  products,
  settings
}) => {
  const isCarRacing = currentWindow.slug === 'motorcars-gloves' || currentWindow.slug === 'car-racing';
  const isCycling = currentWindow.slug === 'cycling-gloves';
  const isGolf = currentWindow.slug === 'golf-gloves';
  const isFish = currentWindow.slug === 'fish-gloves';
  const isWork = currentWindow.slug === 'work-gloves';
  const isMechanics = currentWindow.slug === 'mechanics-gloves';
  const isWeightLifting = currentWindow.slug === 'weight-lifting';

  const isHasHeroSlide = isCarRacing || isCycling || isGolf || isFish || isWork || isMechanics || isWeightLifting;

  const activeSlideModels = isCarRacing 
    ? CAR_RACING_GLOVE_MODELS 
    : isCycling 
    ? CYCLING_GLOVE_MODELS 
    : isGolf 
    ? GOLF_GLOVE_MODELS 
    : isFish
    ? FISH_GLOVE_MODELS
    : isWork
    ? WORK_GLOVE_MODELS
    : isMechanics
    ? MECHANICS_GLOVE_MODELS
    : isWeightLifting
    ? WEIGHT_LIFTING_MODELS
    : [];

  // Search, size and view filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProductTitle, setInquiryProductTitle] = useState<string>(
    isCarRacing ? 'Car Racing Gloves Series' 
    : isCycling ? 'Cycling Gloves Series' 
    : isGolf ? 'Golf Gloves Series' 
    : isFish ? 'Fish Gloves Series'
    : isWork ? 'Work Gloves Series'
    : isMechanics ? 'Mechanics Gloves Series'
    : isWeightLifting ? 'Weight Lifting Equipment Series'
    : `${currentWindow.title} Line`
  );

  // Auto slide animation index
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Quick Inspection Modal State
  const [inspectGlove, setInspectGlove] = useState<CarRacingGloveSpec | null>(null);

  // Automatic continuous slideshow cycling every 3 seconds
  useEffect(() => {
    if (!isHasHeroSlide) return;

    const timer = setInterval(() => {
      setSlideDirection('next');
      setActiveSlideIdx((prev) => (prev + 1) % activeSlideModels.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isHasHeroSlide, activeSlideModels.length]);

  const goToNextSlide = () => {
    setSlideDirection('next');
    setActiveSlideIdx((prev) => (prev + 1) % activeSlideModels.length);
  };

  const goToPrevSlide = () => {
    setSlideDirection('prev');
    setActiveSlideIdx((prev) => (prev - 1 + activeSlideModels.length) % activeSlideModels.length);
  };

  // Filter products belonging to this specific category window
  const windowProducts = useMemo(() => {
    return products.filter(p => {
      if (p.categoryId !== 'cat-gearwear') return false;
      
      const sub = (p.subcategory || '').toLowerCase();
      const slug = currentWindow.slug.toLowerCase();
      const pName = p.name.toLowerCase();
      const pCode = (p.productCode || '').toLowerCase();

      // Check subcategory match or keywords
      const isSubMatch = sub === slug;
      let isKeywordMatch = false;

      if (slug === 'golf-gloves') {
        isKeywordMatch = pName.includes('golf') || pCode.includes('gg');
      } else if (slug === 'fish-gloves') {
        isKeywordMatch = pName.includes('fish') || pName.includes('marine') || pName.includes('angling') || pCode.includes('fg');
      } else if (slug === 'work-gloves') {
        isKeywordMatch = pName.includes('work') || pName.includes('rigg') || pName.includes('construct') || pCode.includes('wg');
      } else if (slug === 'mechanics-gloves') {
        isKeywordMatch = pName.includes('mechanic') || pName.includes('workshop') || pName.includes('tpr') || pCode.includes('mg');
      } else if (slug === 'tactical-police-gloves' || slug === 'tactical-gloves') {
        isKeywordMatch = pName.includes('tactical') || pName.includes('police') || pName.includes('swat') || pCode.includes('tp') || pCode.includes('tg');
      } else if (slug === 'motorcars-gloves' || slug === 'car-racing') {
        isKeywordMatch = sub === 'car-racing' || sub === 'motorcars-gloves' || pName.includes('motorcar') || pName.includes('racing') || pName.includes('nomex') || pName.includes('rally') || pCode.includes('mc') || pCode.includes('cr');
      } else if (slug === 'cycling-gloves') {
        isKeywordMatch = (pName.includes('cycl') && pName.includes('glove')) || pCode.includes('cg');
      } else if (slug === 'road-cycling-apparel') {
        isKeywordMatch = (pName.includes('cycl') && !pName.includes('glove')) || pName.includes('road') || pName.includes('aero') || pCode.includes('rc');
      } else if (slug === 'weight-lifting') {
        isKeywordMatch = pName.includes('lift') || pName.includes('weight') || pName.includes('belt') || pCode.includes('wl');
      }

      return isSubMatch || isKeywordMatch;
    });
  }, [products, currentWindow.slug]);

  // Extract available sizes in this category
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    windowProducts.forEach(p => {
      p.sizes?.forEach(s => sizeSet.add(s));
    });
    return ['All', ...Array.from(sizeSet)];
  }, [windowProducts]);

  // Filter products by search and size
  const filteredProducts = useMemo(() => {
    return windowProducts.filter(p => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        p.name.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);

      const matchSize = selectedSize === 'All' || (p.sizes && p.sizes.includes(selectedSize));

      return matchSearch && matchSize;
    });
  }, [windowProducts, searchQuery, selectedSize]);

  // Other windows for quick switcher
  const otherWindows = useMemo(() => {
    return GEARWEAR_WINDOWS.filter(w => w.slug !== currentWindow.slug);
  }, [currentWindow.slug]);

  const activeGlove = activeSlideModels[activeSlideIdx] || activeSlideModels[0];

  // Calculate previous and next glove indexes for the visual 3D carousel effect
  const prevGloveIdx = (activeSlideIdx - 1 + activeSlideModels.length) % activeSlideModels.length;
  const nextGloveIdx = (activeSlideIdx + 1) % activeSlideModels.length;
  const prevGlove = activeSlideModels[prevGloveIdx];
  const nextGlove = activeSlideModels[nextGloveIdx];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      id="gearwear-category-page" 
      className="min-h-screen font-sans bg-[#F8FAFC] text-[#0F172A] pb-24"
    >
      <SEO
        title={`${isCarRacing ? 'FIA Car Racing Gloves' : currentWindow.title} | Safety Line Motorsport & Protective Handwear`}
        description={`${currentWindow.title}: ${currentWindow.minorDetail} Engineered at Safety Line's Sialkot industrial facilities.`}
        keywords={`${currentWindow.title}, car racing gloves, FIA 8856, Nomex racing gloves, motorsport handwear, Safety Line, Gearwear`}
        image={currentWindow.image}
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#070D14]/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Category Identification with Premium Presentation Badge */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-3.5 cursor-pointer group">
            {/* High-contrast Emblem Badge ensuring the red 'S' and black 'L' stand out brilliantly */}
            <div className="relative shrink-0 flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-b from-white via-white to-slate-100 shadow-md shadow-black/40 border border-white/80 group-hover:border-[#EA2227] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(234,34,39,0.35)]">
              <img
                src={brandLogo}
                alt="Safety Line"
                className="h-8 sm:h-8.5 w-auto object-contain filter drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base tracking-[0.16em] uppercase leading-none">
                <span className="text-[#EA2227] drop-shadow-[0_0_10px_rgba(234,34,39,0.35)]">SAFETY</span>{' '}
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">LINE</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase mt-0.5 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA2227] animate-pulse" />
                <span>Gearwear • {currentWindow.shortTitle}</span>
              </span>
            </div>
          </Link>

          {/* Top Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => navigate('/gearwear')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border border-slate-700 hover:border-slate-500 shadow-sm"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>All Gearwear</span>
            </button>
            <button
              onClick={() => {
                setInquiryProductTitle(isCarRacing ? 'Car Racing Gloves Series' : `${currentWindow.title} Line`);
                setIsInquiryModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#EA2227] to-[#C91A1E] hover:from-[#f52d32] hover:to-[#EA2227] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#EA2227]/30 hover:shadow-[#EA2227]/50 active:scale-95"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Wholesale Inquiry</span>
            </button>
          </div>

        </div>

        {/* Quick Category Bar */}
        <div className="bg-[#05090F] border-t border-slate-800/80 px-4 sm:px-8 py-1.5 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Gearwear Windows:
            </span>
            {GEARWEAR_WINDOWS.map((win) => {
              const isActive = win.slug === currentWindow.slug;
              return (
                <button
                  key={win.id}
                  onClick={() => navigate(win.routePath)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#EA2227] text-white font-bold shadow-sm shadow-[#EA2227]/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{win.shortTitle}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =========================================================================
          FULL HEADER BANNER (NORMAL BALANCED HEIGHT WHITE STUDIO SHOWCASE & SIDE LOGO)
          ========================================================================= */}
      {isHasHeroSlide ? (
        <section className="relative w-full h-[340px] sm:h-[400px] lg:h-[450px] bg-white border-b border-slate-200 overflow-hidden flex items-center justify-center select-none">
          
          {/* Subtle Dynamic Light Grid Ambience */}
          <div className="absolute inset-0 bg-[radial-gradient(#EA2227_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none" />
          
          {/* Safety Line Brand Logo Badge on the Side */}
          <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-6 z-30 flex items-center space-x-2.5 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="relative shrink-0 flex items-center justify-center p-1 rounded-lg bg-slate-50 border border-slate-100">
              <img
                src={brandLogo}
                alt="Safety Line"
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xs sm:text-sm tracking-[0.15em] uppercase leading-none">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-slate-900">LINE</span>
              </span>
              <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase mt-0.5 font-bold">
                {isCarRacing ? 'Motorsport Handwear' : isGolf ? 'Tour Precision Golf' : isCycling ? 'Aero Cycling Series' : isFish ? 'Marine Kevlar® Series' : isWork ? 'Industrial Safety Line' : isMechanics ? 'Workshop Mechanics Series' : isWeightLifting ? 'Strength & Conditioning' : currentWindow.badge}
              </span>
            </div>
          </div>

          {/* Subtle Safety Line Crest Watermark on the Side Background */}
          <div className="hidden lg:block absolute left-8 xl:left-12 top-1/2 -translate-y-1/2 w-64 xl:w-72 aspect-square opacity-[0.035] pointer-events-none">
            <img
              src={brandLogo}
              alt=""
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>

          {/* Studio Ambient Backlight behind Center Glove */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] rounded-full bg-gradient-to-tr from-[#EA2227]/8 via-slate-100 to-cyan-400/8 blur-[100px] pointer-events-none" />

          {/* Studio Center Floor Shadow & Racing Red Accent Pedestal */}
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 w-[70%] max-w-xl h-10 bg-slate-900/10 rounded-[100%] blur-lg pointer-events-none" />
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[40%] max-w-sm h-[2px] bg-gradient-to-r from-transparent via-[#EA2227]/50 to-transparent pointer-events-none" />

          {/* Full Header Carousel Stage: Displays the Glove Slide Animation in Auto */}
          <div className="relative w-full max-w-7xl h-full flex items-center justify-center px-4 sm:px-12">
            
            {/* Left Background Adjacent Glove (Visual Depth Preview - No Text) */}
            <div 
              onClick={goToPrevSlide}
              className="hidden md:flex absolute left-4 lg:left-12 xl:left-16 z-10 w-44 sm:w-52 lg:w-64 aspect-square items-center justify-center opacity-30 hover:opacity-65 transition-all duration-300 cursor-pointer transform -translate-x-6 sm:-translate-x-10 scale-85 hover:scale-90"
              title="Previous Model"
            >
              <img
                src={prevGlove.slideImage}
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(15,23,42,0.12)]"
              />
            </div>

            {/* Center Active Glove: Animated Floating & Sliding Presentation on Crisp White Stage */}
            <div className="relative z-20 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[390px] aspect-square flex items-center justify-center">
              
              {/* Soft Ambient Halo behind active glove */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.55, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-tr from-[#EA2227]/10 via-slate-200/35 to-cyan-400/10 blur-2xl pointer-events-none"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-glove-${activeSlideIdx}`}
                  initial={{ 
                    opacity: 0, 
                    x: slideDirection === 'next' ? 60 : -60,
                    scale: 0.92 
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1,
                    y: [0, -10, 0]
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: slideDirection === 'next' ? -60 : 60,
                    scale: 0.92 
                  }}
                  transition={{
                    opacity: { duration: 0.35 },
                    x: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  onClick={() => setInspectGlove(activeGlove)}
                  className="relative z-10 w-full h-full flex items-center justify-center p-0 cursor-pointer"
                >
                  <img
                    src={activeGlove.slideImage}
                    alt=""
                    className="w-full h-full object-contain filter drop-shadow-[0_18px_30px_rgba(15,23,42,0.16)] drop-shadow-[0_5px_10px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:scale-[1.04]"
                  />
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Right Background Adjacent Glove (Visual Depth Preview - No Text) */}
            <div 
              onClick={goToNextSlide}
              className="hidden md:flex absolute right-4 lg:right-12 xl:right-16 z-10 w-44 sm:w-52 lg:w-64 aspect-square items-center justify-center opacity-30 hover:opacity-65 transition-all duration-300 cursor-pointer transform translate-x-6 sm:translate-x-10 scale-85 hover:scale-90"
              title="Next Model"
            >
              <img
                src={nextGlove.slideImage}
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(15,23,42,0.12)]"
              />
            </div>

            {/* Left Chevron Navigation Arrow (Glassmorphism Light Theme) */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-2.5 sm:left-6 lg:left-10 z-30 p-2.5 sm:p-3 rounded-xl bg-white/90 hover:bg-[#EA2227] text-slate-700 hover:text-white transition-all duration-300 backdrop-blur-md border border-slate-200/90 hover:border-[#EA2227] shadow-sm hover:shadow-md active:scale-90 cursor-pointer"
              title="Previous Glove"
            >
              <ChevronLeftIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>

            {/* Right Chevron Navigation Arrow (Glassmorphism Light Theme) */}
            <button
              onClick={goToNextSlide}
              className="absolute right-2.5 sm:right-6 lg:right-10 z-30 p-2.5 sm:p-3 rounded-xl bg-white/90 hover:bg-[#EA2227] text-slate-700 hover:text-white transition-all duration-300 backdrop-blur-md border border-slate-200/90 hover:border-[#EA2227] shadow-sm hover:shadow-md active:scale-90 cursor-pointer"
              title="Next Glove"
            >
              <ChevronRightIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>

            {/* Carousel Slide Indicators at Bottom (Telemetry Light Theme - No Text) */}
            <div className="absolute bottom-3.5 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {activeSlideModels.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSlideDirection(idx > activeSlideIdx ? 'next' : 'prev');
                    setActiveSlideIdx(idx);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlideIdx === idx 
                      ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-[#EA2227] shadow-[0_0_8px_rgba(234,34,39,0.4)]' 
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </section>
      ) : (
        /* Standard Header Banner for other non-car categories */
        <section className="bg-gradient-to-b from-[#0B151E] to-[#080D14] text-white py-10 sm:py-12 border-b border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/gearwear" className="hover:text-white transition-colors">Gearwear</Link>
              <span>/</span>
              <span className="text-slate-300">{currentWindow.groupLabel}</span>
              <span>/</span>
              <span className="text-white font-bold">{currentWindow.title}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-semibold uppercase tracking-wider">
                  <span>{currentWindow.badge}</span>
                  <span>•</span>
                  <span>{currentWindow.codePrefix} Series</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  {currentWindow.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  {currentWindow.minorDetail}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setInquiryProductTitle(`${currentWindow.title} Line`);
                      setIsInquiryModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA2227] hover:bg-[#d0171c] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md shadow-[#EA2227]/30 active:scale-95 transition-all cursor-pointer border border-[#FF5A36]/40"
                  >
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span>Request OEM Spec Pack</span>
                  </button>
                </div>
              </div>

              <div className="shrink-0 w-36 sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl bg-slate-900">
                <SmoothImage
                  src={currentWindow.image}
                  alt={currentWindow.title}
                  priority={true}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

          </div>
        </section>
      )}

      {/* =========================================================================
          PRODUCT CATALOGUE & FILTERS PORTION (CLEAN, SUITABLE MODERN E-COMMERCE DESIGN)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        
        {/* Breadcrumb Trail */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/gearwear" className="hover:text-slate-900 transition-colors">Gearwear</Link>
          <span>/</span>
          {isCarRacing ? (
            <>
              <span className="text-[#EA2227] font-semibold">Motorsport Handwear</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">Car Racing Gloves</span>
            </>
          ) : (
            <span className="text-slate-900 font-bold">{currentWindow.title}</span>
          )}
        </div>

        {/* Filter, View Switcher & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Item count & active label */}
          <div className="flex items-center space-x-3">
            <span className="font-display font-black text-lg text-slate-900">
              {isCarRacing 
                ? 'Official Safety Line Racing Gloves' 
                : isGolf 
                ? 'Official Safety Line Tour Golf Gloves' 
                : isCycling 
                ? 'Official Safety Line Aero Cycling Gloves' 
                : isFish 
                ? 'Official Safety Line Marine Fish Gloves' 
                : isWork 
                ? 'Official Safety Line Industrial Work Gloves' 
                : isMechanics 
                ? 'Official Safety Line Workshop Mechanics Gloves' 
                : isWeightLifting 
                ? 'Official Safety Line Strength & Weight Lifting' 
                : 'Products'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EA2227]/10 text-[#EA2227] border border-[#EA2227]/20">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Model' : 'Models'}
            </span>
          </div>

          {/* Search, Size Filters & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Mode Switcher (Grid vs List) */}
            <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View"
              >
                <LayoutGridIcon className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Detailed List View"
              >
                <ListIcon className="w-3.5 h-3.5" />
                <span>Detailed List</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <SearchIcon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${currentWindow.shortTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl py-1.5 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 focus:border-[#EA2227] focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Size Filter Dropdown */}
            {availableSizes.length > 1 && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                <span className="hidden lg:inline text-slate-400">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="rounded-xl py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 focus:border-[#EA2227] text-slate-800 outline-none cursor-pointer"
                >
                  {availableSizes.map(s => (
                    <option key={s} value={s}>{s === 'All' ? 'All Sizes' : `Size ${s}`}</option>
                  ))}
                </select>
              </div>
            )}

          </div>

        </div>

        {/* =====================================================================
            VIEW MODE 1: GRID VIEW (CLEAN, MODERN E-COMMERCE CARDS)
            ===================================================================== */}
        {viewMode === 'grid' && (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const isCarProduct = product.productCode?.startsWith('GW-CR');
                const matchingSpec = activeSlideModels.find(m => m.code === product.productCode);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-[#EA2227]/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div 
                        className="aspect-[4/3] bg-white relative overflow-hidden flex items-center justify-center p-4 border-b border-slate-100 cursor-pointer"
                        onClick={() => {
                          if (matchingSpec) setInspectGlove(matchingSpec);
                          else navigate(`/product/${product.slug}`);
                        }}
                      >
                        <SmoothImage
                          src={product.coverImage}
                          alt={product.name}
                          priority={idx < 4}
                          fallbackText={product.productCode}
                          containerClassName="w-full h-full flex items-center justify-center"
                          className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out group-hover:scale-108"
                        />

                        {/* Product Code Badge */}
                        <div className="absolute top-3 left-3 bg-[#EA2227] text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase shadow-sm">
                          {product.productCode}
                        </div>

                        {/* Homologation / Safety / Quality Badge */}
                        {isCarProduct ? (
                          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs text-white border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                            FIA 8856
                          </div>
                        ) : product.productCode?.startsWith('GW-CG') ? (
                          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs text-white border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                            UCI Aero Pro
                          </div>
                        ) : product.productCode?.startsWith('GW-GG') ? (
                          <div className="absolute top-3 right-3 bg-[#0B3D3B]/90 backdrop-blur-xs text-white border border-[#0B3D3B] px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                            AAA Cabretta
                          </div>
                        ) : null}

                        {/* Quick View Button on Hover */}
                        <div className="absolute bottom-3 right-3 bg-slate-900/85 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <EyeIcon className="w-3 h-3 text-[#EA2227]" />
                          <span>Quick View</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#EA2227] font-bold">
                            {product.material ? product.material.split(',')[0] : currentWindow.title}
                          </span>
                          {product.sizes && product.sizes.length > 0 && (
                            <span className="text-[10px] font-mono text-slate-400">
                              {product.sizes.length} Sizes Available
                            </span>
                          )}
                        </div>

                        <h3 
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                          className="font-display font-bold text-base text-slate-900 group-hover:text-[#EA2227] transition-colors leading-snug cursor-pointer line-clamp-1"
                          title={product.name}
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                          {product.shortDescription}
                        </p>

                        {/* Features Snippet */}
                        {product.features && product.features.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 space-y-1">
                            {product.features.slice(0, 2).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-tight truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-5 pt-0 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                          className="py-2 px-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                        >
                          <EyeIcon className="w-3.5 h-3.5 text-slate-600" />
                          <span>Specs</span>
                        </button>

                        <button
                          onClick={() => {
                            setInquiryProductTitle(`${product.productCode} - ${product.name}`);
                            setIsInquiryModalOpen(true);
                          }}
                          className="py-2 px-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1 bg-[#EA2227] hover:bg-[#d0171c] text-white shadow-xs transition-colors cursor-pointer"
                        >
                          <SparklesIcon className="w-3.5 h-3.5" />
                          <span>Quote</span>
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* =====================================================================
            VIEW MODE 2: DETAILED LIST VIEW (EXHAUSTIVE MOTORSPORT SPECIFICATION)
            ===================================================================== */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const isCarProduct = product.productCode?.startsWith('GW-CR');
                const matchingSpec = activeSlideModels.find(m => m.code === product.productCode);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[#EA2227]/80 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6">
                      
                      {/* Left: Product Image */}
                      <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
                        <div 
                          className="aspect-[4/3] rounded-xl bg-white relative overflow-hidden flex items-center justify-center p-3 border border-slate-100 cursor-pointer group"
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                        >
                          <SmoothImage
                            src={product.coverImage}
                            alt={product.name}
                            priority={idx < 4}
                            fallbackText={product.productCode}
                            containerClassName="w-full h-full flex items-center justify-center"
                            className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out group-hover:scale-108"
                          />

                          {/* Code Badge */}
                          <div className="absolute top-2.5 left-2.5 bg-[#EA2227] text-white px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase shadow-sm">
                            {product.productCode}
                          </div>

                          {isCarProduct ? (
                            <div className="absolute top-2.5 right-2.5 bg-slate-900/90 text-white border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                              FIA 8856-2018
                            </div>
                          ) : product.productCode?.startsWith('GW-CG') ? (
                            <div className="absolute top-2.5 right-2.5 bg-slate-900/90 text-white border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                              UCI Aero Pro
                            </div>
                          ) : product.productCode?.startsWith('GW-GG') ? (
                            <div className="absolute top-2.5 right-2.5 bg-[#0B3D3B]/90 text-white border border-[#0B3D3B] px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                              AAA Cabretta
                            </div>
                          ) : null}
                        </div>

                        {/* Livery info */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                            <span className="font-semibold text-slate-700">Livery:</span>
                            <div className="flex flex-wrap gap-1">
                              {product.colors.map(c => (
                                <span 
                                  key={c} 
                                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Middle: Title, Description, Technical highlights */}
                      <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#EA2227] font-bold block">
                            {product.material ? product.material.split(',')[0] : currentWindow.title}
                          </span>

                          <h3 
                            onClick={() => {
                              if (matchingSpec) setInspectGlove(matchingSpec);
                              else navigate(`/product/${product.slug}`);
                            }}
                            className="font-display font-bold text-lg sm:text-xl text-slate-900 hover:text-[#EA2227] transition-colors leading-snug cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {product.shortDescription}
                          </p>

                          {/* Technical Highlights Grid */}
                          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">Material Core</span>
                              <span className="font-semibold text-[11px] text-slate-900 truncate block" title={product.material}>
                                {product.material || 'Nomex® Aramid Matrix'}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">Homologation</span>
                              <span className="font-semibold text-[#EA2227] text-[11px] truncate block">
                                {isCarProduct 
                                  ? 'FIA 8856-2018 / SFI 3.3/5' 
                                  : isGolf 
                                  ? 'Tour Precision Grade AAA' 
                                  : isCycling 
                                  ? 'UCI Aero Pro Certified' 
                                  : isFish
                                  ? 'ANSI A3 / EN 388 Marine Cut'
                                  : isWork
                                  ? 'EN 388 Industrial Heavy-Duty'
                                  : isMechanics
                                  ? 'ANSI/ISEA 138 Level 2 TPR'
                                  : isWeightLifting
                                  ? 'IPF Heavy Powerlifting Spec'
                                  : 'EN ISO Safety Standard'}
                              </span>
                            </div>
                          </div>

                          {/* Available sizes */}
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-mono text-slate-400 uppercase">Available Sizes:</span>
                              {product.sizes.map(s => (
                                <span 
                                  key={s} 
                                  className="w-6 h-6 rounded border border-slate-200 bg-slate-50 text-slate-800 font-mono text-[10px] font-bold flex items-center justify-center"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Key Features */}
                        {product.features && product.features.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 space-y-1">
                            {product.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-tight">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions, OEM Request */}
                      <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-3">
                        
                        <div className="rounded-xl p-3 bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-700 block">
                            OEM Manufacturing
                          </span>
                          <ul className="text-[11px] text-slate-600 space-y-1">
                            <li>• Custom Racing Team Liveries</li>
                            <li>• Direct Nomex® Embroidery</li>
                            <li>• Export-Grade Packaging</li>
                          </ul>
                        </div>

                        <div className="space-y-2 pt-2">
                          <button
                            onClick={() => {
                              setInquiryProductTitle(`${product.productCode} - ${product.name}`);
                              setIsInquiryModalOpen(true);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all bg-[#EA2227] hover:bg-[#d0171c] text-white shadow-xs cursor-pointer"
                          >
                            <SparklesIcon className="w-3.5 h-3.5" />
                            <span>Request OEM Quote</span>
                          </button>

                          <button
                            onClick={() => {
                              if (matchingSpec) setInspectGlove(matchingSpec);
                              else navigate(`/product/${product.slug}`);
                            }}
                            className="w-full py-2 px-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                            <span>Full Data Sheet</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state if search yields no results */}
        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3 shadow-sm">
            <FilterIcon className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-display font-bold text-base text-slate-900">
              No products found matching your filter
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Try adjusting your search terms or clearing active filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedSize('All'); }}
              className="mt-2 bg-[#EA2227] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Other Gearwear Categories Switcher */}
        <section className="pt-12 border-t border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Explore Other Gearwear Collections
            </h3>
            <Link
              to="/gearwear"
              className="text-xs font-mono font-bold text-[#EA2227] hover:underline uppercase inline-flex items-center gap-1"
            >
              <span>View All Categories</span>
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherWindows.map((win) => (
              <div
                key={win.id}
                onClick={() => navigate(win.routePath)}
                className="group cursor-pointer p-4 rounded-xl border border-slate-200 bg-white hover:border-[#EA2227] transition-all hover:shadow-md flex items-center space-x-3.5"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={win.image}
                    alt={win.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#EA2227] transition-colors truncate">
                    {win.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate font-normal">
                    {win.minorDetail}
                  </p>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-[#EA2227] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* =========================================================================
          QUICK GLOVE INSPECTION MODAL (FOR MOTORSPORT CAR RACING GLOVES)
          ========================================================================= */}
      <AnimatePresence>
        {inspectGlove && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative text-slate-900"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#0B151E] text-white p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-[#EA2227] text-white text-[10px] font-mono font-bold">
                    {inspectGlove.code}
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    {inspectGlove.code.startsWith('GW-CR') ? 'Motorsport Specification Sheet' : inspectGlove.code.startsWith('GW-CG') ? 'Aero Cycling Specification Sheet' : 'Tour Golf Specification Sheet'}
                  </span>
                </div>
                <button
                  onClick={() => setInspectGlove(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-200">
                    <img
                      src={inspectGlove.image}
                      alt={inspectGlove.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-[#EA2227] uppercase">
                      Livery / Style: {inspectGlove.livery}
                    </span>
                    <h4 className="font-display font-black text-xl text-slate-900 leading-tight">
                      {inspectGlove.name}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {inspectGlove.summary}
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          {inspectGlove.code.startsWith('GW-CR') ? 'Flame Rating:' : inspectGlove.code.startsWith('GW-CG') ? 'Protection Rating:' : 'Leather & Rating:'}
                        </span>
                        <span className="font-mono font-bold text-[#EA2227]">{inspectGlove.flameRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Seam Type:</span>
                        <span className="font-semibold text-slate-800">{inspectGlove.seamType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Knuckle Armor:</span>
                        <span className="font-semibold text-slate-800">{inspectGlove.knuckleArmor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Primary Discipline:</span>
                        <span className="font-semibold text-slate-800">{inspectGlove.targetDiscipline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => {
                      setInquiryProductTitle(`${inspectGlove.code} - ${inspectGlove.name}`);
                      setInspectGlove(null);
                      setIsInquiryModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 bg-[#EA2227] hover:bg-[#d0171c] text-white shadow-md shadow-[#EA2227]/25 cursor-pointer"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    <span>Request Quotation & OEM Customization</span>
                  </button>

                  <button
                    onClick={() => setInspectGlove(null)}
                    className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Multi-Stage Animated Spec & OEM Loading Form Modal */}
      <InquiryLoadingModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
        defaultCategory={`Gearwear: ${currentWindow.title}`}
        defaultProductTitle={inquiryProductTitle}
      />

    </motion.div>
  );
};

export default GearwearWindowPage;
