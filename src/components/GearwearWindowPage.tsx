import React, { useState, useEffect, useMemo } from 'react';
import {
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  CheckCircle2 as CheckCircle2Icon,
  Filter as FilterIcon,
  Eye as EyeIcon,
  LayoutGrid as LayoutGridIcon,
  List as ListIcon,
  X as XIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { GearwearWindow, GEARWEAR_WINDOWS } from '../data/gearwearWindows';
import { Product, Settings } from '../types';
import SmoothImage from './SmoothImage';
import SEO from './SEO';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
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
      transition={{ duration: 0.2 }}
      id="gearwear-category-page"
      className="min-h-screen font-sans bg-[#F7F6F2] text-[#141918] flex flex-col"
    >
      <SEO
        title={`${isCarRacing ? 'FIA Car Racing Gloves' : currentWindow.title} | Safety Line Motorsport & Protective Handwear`}
        description={`${currentWindow.title}: ${currentWindow.minorDetail} Engineered at Safety Line's Sialkot industrial facilities.`}
        keywords={`${currentWindow.title}, car racing gloves, FIA 8856, Nomex racing gloves, motorsport handwear, Safety Line, Gearwear`}
        image={currentWindow.image}
      />

      {/* Unified Architectural Header + Clean Production Line Switcher */}
      <SiteHeader
        variant="obsidian"
        ctaLabel="Wholesale Inquiry"
        onOpenInquiry={() => {
          setInquiryProductTitle(isCarRacing ? 'Car Racing Gloves Series' : `${currentWindow.title} Line`);
          setIsInquiryModalOpen(true);
        }}
        subBar={
          <div className="bg-[#091211] border-t border-white/10 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
            <div className="max-w-7xl mx-auto flex items-center gap-1 h-10 text-xs">
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-[0.14em] mr-3 hidden sm:inline shrink-0">
                Gearwear Lines
              </span>
              {GEARWEAR_WINDOWS.map((win) => {
                const isActive = win.slug === currentWindow.slug;
                return (
                  <button
                    key={win.id}
                    type="button"
                    onClick={() => navigate(win.routePath)}
                    className={`relative px-3 h-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{win.shortTitle}</span>
                    {isActive && (
                      <span className="absolute left-2 right-2 bottom-0 h-[2px] bg-[#D92227]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        }
      />

      {/* =====================================================================
          STUDIO PRODUCT SHOWCASE BANNER (TRANSPARENT PNG SLIDE STAGE)
          ===================================================================== */}
      {isHasHeroSlide ? (
        <section className="relative w-full bg-white border-b border-[#E2DFD7] select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Top Editorial Context Rail */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ECE9E1] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#525957]">
                  <Link to="/gearwear" className="hover:text-[#141918] transition-colors">Gearwear</Link>
                  <span>/</span>
                  <span className="text-[#D92227] font-semibold">{currentWindow.badge}</span>
                </div>
                <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#141918] tracking-tight">
                  {currentWindow.title}
                </h1>
              </div>

              {/* Active Slide Metadata Telemetry */}
              <div className="flex items-center gap-5 text-xs font-mono shrink-0">
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] uppercase tracking-wider text-[#525957]">Featured Model</span>
                  <span className="font-semibold text-[#141918] tabular-nums">
                    {activeGlove?.code} · {activeGlove?.livery}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => activeGlove && setInspectGlove(activeGlove)}
                  className="px-3.5 py-2 rounded-sm border border-[#E2DFD7] hover:border-[#141918] text-[#141918] text-[11px] font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                >
                  Inspect Specs
                </button>
              </div>
            </div>

            {/* Clean Studio Carousel Stage */}
            <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] flex items-center justify-center overflow-hidden">
              {/* Previous Model Ghost Preview */}
              {prevGlove && activeSlideModels.length > 1 && (
                <div
                  onClick={goToPrevSlide}
                  className="hidden md:flex absolute left-10 lg:left-16 z-10 w-44 lg:w-56 aspect-square items-center justify-center opacity-25 hover:opacity-55 transition-opacity duration-200 cursor-pointer scale-90"
                  title="Previous Model"
                >
                  <img
                    src={prevGlove.slideImage}
                    alt={prevGlove.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(20,25,24,0.10)]"
                  />
                </div>
              )}

              {/* Center Featured Transparent Showcase */}
              <div className="relative z-20 w-full max-w-[240px] sm:max-w-[290px] lg:max-w-[330px] aspect-square flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`hero-glove-${activeSlideIdx}`}
                    initial={{
                      opacity: 0,
                      x: slideDirection === 'next' ? 44 : -44,
                      scale: 0.96
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      y: [0, -6, 0]
                    }}
                    exit={{
                      opacity: 0,
                      x: slideDirection === 'next' ? -44 : 44,
                      scale: 0.96
                    }}
                    transition={{
                      opacity: { duration: 0.28 },
                      x: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.32 },
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }
                    }}
                    onClick={() => activeGlove && setInspectGlove(activeGlove)}
                    className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={activeGlove?.slideImage}
                      alt={activeGlove?.name || currentWindow.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_18px_28px_rgba(20,25,24,0.14)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Model Ghost Preview */}
              {nextGlove && activeSlideModels.length > 1 && (
                <div
                  onClick={goToNextSlide}
                  className="hidden md:flex absolute right-10 lg:right-16 z-10 w-44 lg:w-56 aspect-square items-center justify-center opacity-25 hover:opacity-55 transition-opacity duration-200 cursor-pointer scale-90"
                  title="Next Model"
                >
                  <img
                    src={nextGlove.slideImage}
                    alt={nextGlove.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(20,25,24,0.10)]"
                  />
                </div>
              )}

              {/* Architectural Prev / Next Controls */}
              <button
                type="button"
                onClick={goToPrevSlide}
                aria-label="Previous model"
                className="absolute left-0 sm:left-2 z-30 p-2.5 rounded-sm bg-white hover:bg-[#141918] text-[#141918] hover:text-white border border-[#E2DFD7] hover:border-[#141918] transition-colors cursor-pointer"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="Next model"
                className="absolute right-0 sm:right-2 z-30 p-2.5 rounded-sm bg-white hover:bg-[#141918] text-[#141918] hover:text-white border border-[#E2DFD7] hover:border-[#141918] transition-colors cursor-pointer"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Progress Rail & Slide Selectors */}
            <div className="pt-3 border-t border-[#ECE9E1] flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-[#525957] max-w-2xl">
                {currentWindow.minorDetail}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-[#525957] tabular-nums mr-1">
                  0{activeSlideIdx + 1} / 0{activeSlideModels.length}
                </span>
                {activeSlideModels.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSlideDirection(idx > activeSlideIdx ? 'next' : 'prev');
                      setActiveSlideIdx(idx);
                    }}
                    aria-label={`View slide ${idx + 1}`}
                    className={`h-1.5 transition-all duration-200 cursor-pointer ${
                      activeSlideIdx === idx
                        ? 'w-7 bg-[#D92227]'
                        : 'w-2.5 bg-[#E2DFD7] hover:bg-[#141918]/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Asymmetric Editorial Header for Non-Carousel Windows */
        <section className="bg-[#0E1A19] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white/55">
                  <Link to="/gearwear" className="hover:text-white transition-colors">Gearwear</Link>
                  <span>/</span>
                  <span className="text-[#D92227] font-semibold">{currentWindow.badge}</span>
                </div>

                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                  {currentWindow.title}
                </h1>

                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  {currentWindow.minorDetail}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryProductTitle(`${currentWindow.title} Line`);
                      setIsInquiryModalOpen(true);
                    }}
                    className="px-5 py-3 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                  >
                    Request OEM Spec Pack
                  </button>
                </div>
              </div>

              <div className="shrink-0 w-44 sm:w-56 aspect-[4/3] rounded-sm overflow-hidden border border-white/15 bg-[#122B29]">
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

      {/* =====================================================================
          PRODUCT CATALOGUE & FILTER TOOLBAR
          ===================================================================== */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 rounded-sm bg-white border border-[#E2DFD7] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display font-bold text-lg text-[#141918]">
              Specification Models
            </h2>
            <span className="text-xs font-mono text-[#D92227] font-semibold tabular-nums">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Model' : 'Models'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Grid / Detailed List Toggle */}
            <div className="inline-flex rounded-sm border border-[#E2DFD7] bg-[#F7F6F2] p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#141918] shadow-2xs'
                    : 'text-[#525957] hover:text-[#141918]'
                }`}
              >
                <LayoutGridIcon className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#141918] shadow-2xs'
                    : 'text-[#525957] hover:text-[#141918]'
                }`}
              >
                <ListIcon className="w-3.5 h-3.5" />
                <span>Spec List</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <SearchIcon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#525957]" />
              <input
                type="text"
                placeholder={`Search ${currentWindow.shortTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm py-2 pl-8 pr-8 text-xs bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white text-[#141918] placeholder:text-[#8A908E] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-2 text-[#525957] hover:text-[#141918] cursor-pointer"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Size Dropdown */}
            {availableSizes.length > 1 && (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="rounded-sm py-2 px-3 text-xs font-mono bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] text-[#141918] outline-none cursor-pointer"
              >
                {availableSizes.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Sizes' : `Size ${s}`}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* VIEW MODE 1: GALLERY GRID */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => {
              const isCarProduct = product.productCode?.startsWith('GW-CR');
              const matchingSpec = activeSlideModels.find(m => m.code === product.productCode);
              const certLabel = isCarProduct
                ? 'FIA 8856'
                : product.productCode?.startsWith('GW-CG')
                ? 'UCI Aero'
                : product.productCode?.startsWith('GW-GG')
                ? 'AAA Cabretta'
                : product.sizes?.length
                ? `${product.sizes.length} Sizes`
                : 'OEM Spec';

              return (
                <article
                  key={product.id}
                  className="group bg-white rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors duration-150 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div
                      onClick={() => {
                        if (matchingSpec) setInspectGlove(matchingSpec);
                        else navigate(`/product/${product.slug}`);
                      }}
                      className="aspect-[4/3] bg-[#F7F6F2] relative overflow-hidden flex items-center justify-center p-5 border-b border-[#E2DFD7] cursor-pointer"
                    >
                      <SmoothImage
                        src={product.coverImage}
                        alt={product.name}
                        priority={idx < 4}
                        fallbackText={product.productCode}
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(20,25,24,0.12)] transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono tabular-nums">
                        <span className="font-semibold text-[#D92227] uppercase">{product.productCode}</span>
                        <span className="text-[#525957]">{certLabel}</span>
                      </div>

                      <h3
                        onClick={() => {
                          if (matchingSpec) setInspectGlove(matchingSpec);
                          else navigate(`/product/${product.slug}`);
                        }}
                        className="font-display font-bold text-base text-[#141918] group-hover:text-[#D92227] transition-colors leading-snug cursor-pointer line-clamp-1"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#525957] leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>

                      {product.features && product.features.length > 0 && (
                        <div className="pt-2.5 border-t border-[#ECE9E1] space-y-1">
                          {product.features.slice(0, 2).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 text-[11px] text-[#525957]">
                              <CheckCircle2Icon className="w-3.5 h-3.5 text-[#122B29] shrink-0 mt-0.5" />
                              <span className="leading-tight truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (matchingSpec) setInspectGlove(matchingSpec);
                        else navigate(`/product/${product.slug}`);
                      }}
                      className="py-2.5 px-3 rounded-sm font-mono font-semibold text-[11px] uppercase tracking-wider inline-flex items-center justify-center gap-1.5 bg-[#F7F6F2] hover:bg-[#ECE9E1] text-[#141918] border border-[#E2DFD7] transition-colors cursor-pointer"
                    >
                      <EyeIcon className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInquiryProductTitle(`${product.productCode} - ${product.name}`);
                        setIsInquiryModalOpen(true);
                      }}
                      className="py-2.5 px-3 rounded-sm font-mono font-semibold text-[11px] uppercase tracking-wider inline-flex items-center justify-center bg-[#D92227] hover:bg-[#B5191D] text-white transition-colors cursor-pointer"
                    >
                      <span>Quote</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 2: DETAILED SPECIFICATION LIST */}
        {viewMode === 'list' && (
          <div className="space-y-5">
            {filteredProducts.map((product, idx) => {
              const isCarProduct = product.productCode?.startsWith('GW-CR');
              const matchingSpec = activeSlideModels.find(m => m.code === product.productCode);

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6">
                    {/* Studio Image */}
                    <div className="lg:col-span-4 space-y-3">
                      <div
                        onClick={() => {
                          if (matchingSpec) setInspectGlove(matchingSpec);
                          else navigate(`/product/${product.slug}`);
                        }}
                        className="aspect-[4/3] rounded-sm bg-[#F7F6F2] border border-[#E2DFD7] flex items-center justify-center p-4 cursor-pointer group"
                      >
                        <SmoothImage
                          src={product.coverImage}
                          alt={product.name}
                          priority={idx < 4}
                          fallbackText={product.productCode}
                          containerClassName="w-full h-full flex items-center justify-center"
                          className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(20,25,24,0.12)] transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </div>

                      {product.colors && product.colors.length > 0 && (
                        <div className="text-[11px] font-mono text-[#525957]">
                          <span className="font-semibold text-[#141918]">Livery: </span>
                          <span>{product.colors.join(' · ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Spec Breakdown */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3 text-[11px] font-mono tabular-nums">
                          <span className="font-bold text-[#D92227] uppercase">{product.productCode}</span>
                          <span className="text-[#525957]">/</span>
                          <span className="text-[#525957] truncate">
                            {product.material ? product.material.split(',')[0] : currentWindow.title}
                          </span>
                        </div>

                        <h3
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                          className="font-display font-bold text-lg sm:text-xl text-[#141918] hover:text-[#D92227] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#525957] leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs border-t border-[#ECE9E1] pt-3">
                        <div>
                          <span className="text-[10px] font-mono text-[#525957] uppercase block">Material Core</span>
                          <span className="font-semibold text-[#141918] truncate block" title={product.material}>
                            {product.material || 'Nomex® Aramid Matrix'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#525957] uppercase block">Standard</span>
                          <span className="font-semibold text-[#D92227] truncate block">
                            {isCarProduct
                              ? 'FIA 8856-2018 / SFI 3.3/5'
                              : isGolf
                              ? 'Tour Precision Grade AAA'
                              : isCycling
                              ? 'UCI Aero Pro Certified'
                              : isFish
                              ? 'ANSI A3 / EN 388 Marine'
                              : isWork
                              ? 'EN 388 Industrial'
                              : isMechanics
                              ? 'ANSI/ISEA 138 Level 2'
                              : isWeightLifting
                              ? 'IPF Heavy Spec'
                              : 'EN ISO Certified'}
                          </span>
                        </div>
                      </div>

                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-[#525957]">
                          <span className="uppercase">Sizes:</span>
                          <span className="text-[#141918] font-semibold">{product.sizes.join(' · ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Inquiry Actions */}
                    <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#ECE9E1] pt-4 lg:pt-0 lg:pl-6 space-y-4">
                      <div className="space-y-1.5 text-xs">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#141918] block">
                          OEM Capability
                        </span>
                        <ul className="text-[11px] text-[#525957] space-y-1">
                          <li>· Custom Team Colorways</li>
                          <li>· Direct Embroidery &amp; Labeling</li>
                          <li>· Export-Grade Packaging</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            setInquiryProductTitle(`${product.productCode} - ${product.name}`);
                            setIsInquiryModalOpen(true);
                          }}
                          className="w-full py-2.5 px-4 rounded-sm font-mono font-semibold text-[11px] uppercase tracking-wider bg-[#D92227] hover:bg-[#B5191D] text-white transition-colors cursor-pointer"
                        >
                          Request OEM Quote
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                          className="w-full py-2.5 px-4 rounded-sm font-mono font-semibold text-[11px] uppercase tracking-wider bg-[#F7F6F2] hover:bg-[#ECE9E1] text-[#141918] border border-[#E2DFD7] transition-colors cursor-pointer"
                        >
                          Full Data Sheet
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty Filter State */}
        {filteredProducts.length === 0 && (
          <div className="rounded-sm border border-[#E2DFD7] bg-white p-12 text-center space-y-3">
            <FilterIcon className="w-7 h-7 text-[#525957] mx-auto" />
            <h3 className="font-display font-bold text-base text-[#141918]">
              No models match your current filter
            </h3>
            <p className="text-xs text-[#525957] max-w-xs mx-auto">
              Clear your search term or reset the size selection to inspect the complete line.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedSize('All'); }}
              className="mt-2 bg-[#141918] hover:bg-[#D92227] text-white px-5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Switch Other Gearwear Lines */}
        <section className="pt-10 border-t border-[#E2DFD7] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#141918]">
              Other Gearwear Production Lines
            </h3>
            <Link
              to="/gearwear"
              className="text-xs font-mono font-semibold text-[#D92227] hover:underline uppercase inline-flex items-center gap-1"
            >
              <span>View All 9 Lines</span>
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherWindows.slice(0, 4).map((win) => (
              <button
                key={win.id}
                type="button"
                onClick={() => navigate(win.routePath)}
                className="group text-left cursor-pointer p-3.5 rounded-sm border border-[#E2DFD7] bg-white hover:border-[#141918] transition-colors flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-sm overflow-hidden shrink-0 bg-[#F7F6F2] p-1 border border-[#ECE9E1] flex items-center justify-center">
                  <img
                    src={win.image}
                    alt={win.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#141918] group-hover:text-[#D92227] transition-colors truncate">
                    {win.title}
                  </h4>
                  <p className="text-[11px] text-[#525957] truncate">
                    {win.shortTitle} Series
                  </p>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-[#525957] group-hover:text-[#D92227] shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Unified Footer */}
      <Footer settings={settings} />

      {/* =====================================================================
          QUICK SPECIFICATION INSPECTION MODAL
          ===================================================================== */}
      <AnimatePresence>
        {inspectGlove && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1A19]/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E2DFD7] shadow-2xl relative text-[#141918]"
            >
              <div className="sticky top-0 z-10 bg-[#0E1A19] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#D92227] tabular-nums">
                    {inspectGlove.code}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="text-xs font-mono text-white/80 uppercase tracking-wider">
                    Technical Specification Sheet
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectGlove(null)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-sm hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 aspect-square bg-[#F7F6F2] rounded-sm flex items-center justify-center p-5 border border-[#E2DFD7]">
                    <img
                      src={inspectGlove.image}
                      alt={inspectGlove.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_14px_22px_rgba(20,25,24,0.14)]"
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-[11px] font-mono font-semibold text-[#D92227] uppercase tracking-wider block">
                      {inspectGlove.livery}
                    </span>
                    <h4 className="font-display font-extrabold text-xl text-[#141918] leading-snug">
                      {inspectGlove.name}
                    </h4>
                    <p className="text-[#525957] text-xs leading-relaxed">
                      {inspectGlove.summary}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E2DFD7] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F7F6F2] rounded-sm border border-[#ECE9E1]">
                    <span className="text-[10px] font-mono uppercase text-[#525957] block">Rating / Material</span>
                    <span className="font-semibold text-[#D92227] mt-0.5 block">{inspectGlove.flameRating}</span>
                  </div>
                  <div className="p-3 bg-[#F7F6F2] rounded-sm border border-[#ECE9E1]">
                    <span className="text-[10px] font-mono uppercase text-[#525957] block">Seam Construction</span>
                    <span className="font-semibold text-[#141918] mt-0.5 block">{inspectGlove.seamType}</span>
                  </div>
                  <div className="p-3 bg-[#F7F6F2] rounded-sm border border-[#ECE9E1]">
                    <span className="text-[10px] font-mono uppercase text-[#525957] block">Armor / Shielding</span>
                    <span className="font-semibold text-[#141918] mt-0.5 block">{inspectGlove.knuckleArmor}</span>
                  </div>
                  <div className="p-3 bg-[#F7F6F2] rounded-sm border border-[#ECE9E1]">
                    <span className="text-[10px] font-mono uppercase text-[#525957] block">Primary Discipline</span>
                    <span className="font-semibold text-[#141918] mt-0.5 block">{inspectGlove.targetDiscipline}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#E2DFD7]">
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryProductTitle(`${inspectGlove.code} - ${inspectGlove.name}`);
                      setInspectGlove(null);
                      setIsInquiryModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-sm font-mono font-semibold text-xs uppercase tracking-wider bg-[#D92227] hover:bg-[#B5191D] text-white transition-colors cursor-pointer"
                  >
                    Request Quotation &amp; OEM Pack
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectGlove(null)}
                    className="py-3 px-5 rounded-sm text-xs font-mono font-semibold uppercase tracking-wider bg-[#F7F6F2] hover:bg-[#ECE9E1] text-[#141918] border border-[#E2DFD7] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

