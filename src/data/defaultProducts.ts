import { Category, Product, Settings } from '../types';
import prod1Img from '../assets/images/regenerated_image_1788784305175.jpg';
import prod2Img from '../assets/images/regenerated_image_1788784337552.jpg';
import prod3Img from '../assets/images/regenerated_image_1788784410117.jpg';
import prod4Img from '../assets/images/regenerated_image_1788784447014.jpg';

export const defaultCategories: Category[] = [
  {
    id: 'cat-gearwear',
    name: 'Gearwear',
    slug: 'gearwear',
    description: 'Elite high-performance athletic apparel designed with proprietary aerodynamic and thermoregulating technologies for professional training and active lifestyle.'
  },
  {
    id: 'cat-hosiery',
    name: 'Hosiery',
    slug: 'hosiery',
    description: 'Ultra-luxurious, fine-gauge socks, tights, and stockings crafted with premium mulberry silk, combed Egyptian cotton, and Mongolian cashmere.'
  }
];

export const defaultProducts: Product[] = [
  {
    id: 'prod-apx-01',
    name: 'Apex Pro Aero Compression Tee',
    slug: 'apex-pro-aero-compression-tee',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    shortDescription: 'Unrivaled lightweight compression top with target-zoned aerodynamic breathability.',
    longDescription: 'Engineered for high-intensity athletic performance, the Apex Pro Aero Compression Tee utilizes a ultra-dense polyamide composite that stabilizes micro-muscle groups while maximizing heat dissipation. Advanced flatlock structural stitching eliminates friction completely, and 4-way elastic memory keeps its exact ergonomic shape session after session.',
    material: '82% Aero-Polyamide, 18% Elastane Composite',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Obsidian Black', 'Chamber Slate', 'Electric Cobalt'],
    features: [
      'Target-zoned moisture-wicking capillary channels',
      'Anti-microbial silver-ion thread technology',
      'Aerodynamic shoulder-seam optimization',
      'Reflective micro-branding elements'
    ],
    productCode: 'GW-APX-01',
    status: 'Active',
    displayOrder: 1,
    coverImage: prod1Img,
    galleryImages: [
      prod1Img,
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600'
    ],
    seoTitle: 'Apex Pro Aero Compression Tee - Elite Performance Gearwear',
    seoDescription: 'Discover the ultimate lightweight compression tee with target-zoned aerodynamic breathability and silver-ion odor resistance.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-znt-02',
    name: 'Zenith Hydrophobic Stormshell',
    slug: 'zenith-hydrophobic-stormshell',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    shortDescription: 'Ultra-lightweight windproof and hydrophobic outdoor performance shell.',
    longDescription: 'Designed to combat unpredictable weather, the Zenith Stormshell features a triple-layer hydrophobic membrane that repels high-pressure rain while maintaining an incredibly high breathability rating. Includes fully taped inner seams, responsive adjustable cuffs, and dedicated concealed media compartments.',
    material: '100% Recycled Hydrophobic Polyester Ribbon',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Nordic Mist', 'Forest Charcoal', 'Acid Lime'],
    features: [
      '15,000mm hydrostatic head waterproof rating',
      'Underarm dual-zipper thermal regulators',
      'Helmet-compatible dynamic drawcord hood',
      'Internal bonded multimedia port'
    ],
    productCode: 'GW-ZNT-02',
    status: 'Active',
    displayOrder: 2,
    coverImage: prod2Img,
    galleryImages: [
      prod2Img,
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600'
    ],
    seoTitle: 'Zenith Hydrophobic Stormshell - Waterproof Active Jacket',
    seoDescription: 'The Zenith Stormshell is a premium waterproof, windproof active training jacket perfect for rugged outdoor adventures.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-chr-03',
    name: 'Chronos Thermal Compression Leggings',
    slug: 'chronos-thermal-compression-leggings',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    shortDescription: 'Brushed thermal interior leggings providing compression and cold-weather insulation.',
    longDescription: 'The Chronos Thermal Leggings provide optimal cold-weather performance. Featuring an insulating micro-brushed lining, these compression tights support blood flow, improve recovery times, and shield your muscles from sudden temperature drops during outdoor runs or sub-zero sessions.',
    material: '78% Thermal Polyamide, 22% Lycra Extra Life',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Stellar Silver', 'Deep Maroon', 'Obsidian Black'],
    features: [
      'Micro-brushed internal thermal fleece lining',
      'High-waisted compression lumbar stabilizer',
      'Concealed anti-bounce phone pocket',
      'Reinforced knee flex-zones'
    ],
    productCode: 'GW-CHR-03',
    status: 'Active',
    displayOrder: 3,
    coverImage: prod3Img,
    galleryImages: [
      prod3Img,
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600'
    ],
    seoTitle: 'Chronos Thermal Compression Leggings | Premium Men & Women Leggings',
    seoDescription: 'Perform your best in freezing conditions with our Chronos Thermal Compression Leggings featuring insulating fleece and high lumbar support.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-str-04',
    name: 'Stratum Seamless Training Shorts',
    slug: 'stratum-seamless-training-shorts',
    categoryId: 'cat-gearwear',
    categoryName: 'Gearwear',
    shortDescription: 'Seamless multi-stretch gym shorts designed for boundless dynamic movement.',
    longDescription: 'Constructed using a proprietary zero-friction circular knit technique, the Stratum Shorts prevent chafing completely. With an integrated inner supportive liner and multi-directional knit ventilation, they deliver extreme comfort during the most challenging squat and sprints sessions.',
    material: '90% Nylon, 10% Spandex Core',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Concrete Grey', 'Petrol Blue', 'Lava Red'],
    features: [
      'Advanced 3D seamless structural design',
      'Integrated sweat-absorbent athletic brief liner',
      'Secure-grip silicone waistband inserts',
      'Double-stitched high-tensile seams'
    ],
    productCode: 'GW-STR-04',
    status: 'Active',
    displayOrder: 4,
    coverImage: prod4Img,
    galleryImages: [
      prod4Img,
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600'
    ],
    seoTitle: 'Stratum Seamless Training Shorts - Active Gym Gearwear',
    seoDescription: 'Zero-chafing circular knit training shorts with integrated support lining for gym workout and high performance.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-aur-01',
    name: 'Aurelia Pure Silk Lace Stockings',
    slug: 'aurelia-pure-silk-lace-stockings',
    categoryId: 'cat-hosiery',
    categoryName: 'Hosiery',
    shortDescription: 'Exquisite stockings made from authentic mulberry silk with hand-woven lace borders.',
    longDescription: 'Evoking timeless elegance, the Aurelia Stockings represent the pinnacle of luxury legwear. Spun from long-fiber Grade-A mulberry silk, they lay weightlessly on the skin, presenting a subtle pearlescent sheen. Hand-trimmed French lace thigh cuffs are lined with skin-safe silicone to stay perfectly in place without compression.',
    material: '85% Pure Mulberry Silk, 15% Premium Lycra (for elasticity)',
    sizes: ['S', 'M', 'L'],
    colors: ['Champagne Ivory', 'Noir Onyx', 'Soft Rose'],
    features: [
      'Grade 6A Mulberry Silk fibers',
      'Hand-woven French lace thigh-high cuffs',
      'Dual-strip skin-friendly hypoallergenic silicone grip',
      'Invisible, ultra-sheer reinforced toe construction'
    ],
    productCode: 'HS-AUR-01',
    status: 'Active',
    displayOrder: 5,
    coverImage: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=600'
    ],
    seoTitle: 'Aurelia Pure Silk Lace Stockings | Premium Silk Hosiery',
    seoDescription: 'Indulge in maximum luxury with pure mulberry silk stockings featuring delicate French lace borders and dual-silicone comfort grips.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-csh-02',
    name: 'Cashmere Blend Lounge Socks',
    slug: 'cashmere-blend-lounge-socks',
    categoryId: 'cat-hosiery',
    categoryName: 'Hosiery',
    shortDescription: 'Unbelievably soft Mongolian cashmere socks for premium domestic leisure.',
    longDescription: 'Crafted using a high-gauge blend of long-staple Mongolian cashmere and merino wool, the Cashmere Blend Lounge Socks provide ultimate comfort and temperature control. A non-binding soft ribbed ankle band holds without pressure, creating an ideal companion for luxury indoor relaxation and cold evenings.',
    material: '70% Mongolian Cashmere, 20% Fine Merino Wool, 10% Stretch Elastic',
    sizes: ['One Size (Fits 36-44)'],
    colors: ['Oatmeal Heather', 'Dove Grey', 'Camel Beige'],
    features: [
      'Plush, heavy-gauge knitted cashmere stitch',
      'Non-binding relaxed-elastic ribbing',
      'Hand-linked ultra-smooth seamless toes',
      'Double-ply wear-prone heel reinforcement'
    ],
    productCode: 'HS-CSH-02',
    status: 'Active',
    displayOrder: 6,
    coverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600'
    ],
    seoTitle: 'Cashmere Blend Lounge Socks - Luxury Comfy Hosiery',
    seoDescription: 'Relax in total comfort with lounge socks made from rare Mongolian cashmere and Merino wool, featuring hand-linked seams.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-sov-03',
    name: 'Sovereign Sheer Microfiber Tights',
    slug: 'sovereign-sheer-microfiber-tights',
    categoryId: 'cat-hosiery',
    categoryName: 'Hosiery',
    shortDescription: 'Elegant, ultra-durable 15-denier semi-sheer support tights.',
    longDescription: 'Crafted with double-wrapped Lycra microfibers, the Sovereign Tights deliver a flawless, high-definition cosmetic leg appearance. Designed with a soft, anatomically sculpted control waistband that gently shapes without restricting breathing, they are highly run-resistant and soft to the touch.',
    material: '84% Micro-Polyamide, 16% Lycra Satin-Skin',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Nude Bronze', 'Satin Beige', 'Midnight Sheer'],
    features: [
      'Resilient double-wrapped run-resistant microfiber',
      'Anatomically sculpted control comfort top',
      'Cotton hygienic gusset with flat seams',
      'High-sheen light reflective satin finish'
    ],
    productCode: 'HS-SOV-03',
    status: 'Active',
    displayOrder: 7,
    coverImage: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600'
    ],
    seoTitle: 'Sovereign Sheer Microfiber Tights - Flawless Leg Hosiery',
    seoDescription: 'Shop our flawless 15-denier support tights constructed with dual-wrapped resilient microfiber for run-resistance and subtle satin shimmer.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-int-04',
    name: 'Integra Combed Cotton Ribbed Socks',
    slug: 'integra-combed-cotton-ribbed-socks',
    categoryId: 'cat-hosiery',
    categoryName: 'Hosiery',
    shortDescription: 'Premium Egyptian combed cotton everyday dress socks.',
    longDescription: 'The Integra Ribbed Socks are the perfect blend of classical business aesthetics and incredible softness. Woven from Egyptian Giza cotton on traditional Italian high-cylinder knitting machines, they provide breathable daily thermal regulation, a beautiful vertical drape, and excellent longevity.',
    material: '92% Giza Combed Cotton, 6% Nylon, 2% Lycra Core',
    sizes: ['38-41', '42-45', '46-48'],
    colors: ['Navy Royale', 'Oxford Grey', 'Forest Pine'],
    features: [
      'Premium extra-long staple Giza cotton',
      'Classic 5x1 flat-rib stretch pattern',
      'Pressure-free hand-linked seamless hand closures',
      'Double-ply heel and ball-of-foot padding'
    ],
    productCode: 'HS-INT-04',
    status: 'Active',
    displayOrder: 8,
    coverImage: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=600',
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=600'
    ],
    seoTitle: 'Integra Combed Cotton Ribbed Socks | Luxury Dress Socks',
    seoDescription: 'The pinnacle of classical office fashion. Breathable Egyptian combed cotton socks featuring dynamic 5x1 rib knitting and hand-linked toes.',
    createdAt: new Date().toISOString()
  }
];

export const defaultSettings: Settings = {
  companyName: 'Safety Line',
  slogan: 'Precision Sportswear & Exquisite Fine Legwear',
  aboutText: 'Established in 2012, Safety Line is a dedicated design house specializing in two distinct, masterfully engineered textile lines: high-compression high-tech athletic Gearwear, and ultra-fine, hand-finished European Hosiery. Our garments are defined by luxury craftsmanship, scientific fiber selection, and a relentless commitment to minimalist elegance.',
  contactEmail: 'info@safetylineind.com',
  salesEmail: 'sales@safetylineind.com',
  contactPhone: '+92 3040000445',
  whatsappNumber: '+923040000445',
  instagramHosiery: 'https://www.instagram.com/safetylineindustries__official/',
  instagramGearwear: 'https://www.instagram.com/safetyline_industries_official/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61590935692095',
  officeAddress: 'Safety Line Industrial Complex, Sialkot, Pakistan',
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3365.6654140856467!2d74.5609501!3d32.4816399!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eeb0066f0908f%3A0xe7e0d64cc78c66ef!2sSafetylineindustriesofficial!5e0!3m2!1sen!2s!4v1788349852263!5m2!1sen!2s',
  googleMapsUrl: 'https://maps.app.goo.gl/YgFYKJhcfPioRnH27',
  businessHours: 'Mon – Sat: 09:00 – 18:00 PKT (UTC+5)'
};
