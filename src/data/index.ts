import { Settings, Category } from '../types';
import { gearwearProducts } from './gearwearProducts';
import { hosieryProducts } from './hosieryProducts';
import { articles } from './articles';

export const categories: Category[] = [
  {
    id: 'cat-gearwear',
    name: 'Gearwear Products',
    slug: 'gearwear',
    description: 'Elite high-performance athletic apparel engineered with proprietary aerodynamic and thermoregulating technologies for professional athletes and active living.'
  },
  {
    id: 'cat-hosiery',
    name: 'Accessories Products',
    slug: 'accessories',
    description: 'Ultra-luxurious, fine-gauge stay-ups, tights, technical socks, and precision accessories crafted with pure mulberry silk, combed Egyptian Giza cotton, and Mongolian cashmere.'
  }
];

export const allProducts = [...gearwearProducts, ...hosieryProducts];
export const products = allProducts;

export const settings: Settings = {
  companyName: 'Safety Line',
  slogan: 'Leading International Manufacturers & Exporters of Safety Protective Gloves & Garments',
  aboutText: 'Family-owned business since 2008. Safety Line is a leading international manufacturer and exporter of safety protective gloves in all sorts and garments. Employing 90 experienced craftsmen and 70 stitching machines with state-of-the-art press cutting in Pakistan.',
  contactEmail: 'info@safetyline-ind.com',
  salesEmail: 'sales@safetyline-ind.com',
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

export const testimonials = [
  {
    id: 't-01',
    author: 'Elena Rostova',
    role: 'Head of Purchasing, Le Petit Pavillon Boutique (Geneva)',
    message: 'The hand-feel of the Aurelia silk stockings is unlike anything in contemporary retail. The French lace finish and dual silicone stay-up band have earned unanimous praise from our private clientele.',
    rating: 5,
    createdAt: '2026-02-14T10:00:00.000Z'
  },
  {
    id: 't-02',
    author: 'Marcus Vance',
    role: 'Lead Coach, Apex Athletics High Performance Centre',
    message: 'We tested the Apex Pro Aero and Chronos Thermal series in cold mountain altitude camps. Muscle fatigue markers dropped significantly. The circular knit zero-friction design is a game changer.',
    rating: 5,
    createdAt: '2026-02-20T10:00:00.000Z'
  },
  {
    id: 't-03',
    author: 'Sophie Laurent',
    role: 'Senior Merchandiser, L’Atelier Legwear Paris',
    message: 'Safety Line delivers unmatched consistency in denier uniformity and seam linking. Their digital catalog makes seasonal showroom curation seamless and accurate.',
    rating: 5,
    createdAt: '2026-03-01T10:00:00.000Z'
  }
];

export const certifications = [
  {
    name: 'ISO 9001:2015 Quality Management',
    issuer: 'International Quality Assurance Bureau',
    code: 'ISO-9001-CH-4892',
    description: 'Certified quality control protocols across clean-room knitting, computerized tensile inspection, and zero-defect packaging.'
  },
  {
    name: 'OEKO-TEX® Standard 100 Class I',
    issuer: 'International Association for Research and Testing in Textile Ecology',
    code: 'OEKO-TEX-ZUR-8120',
    description: 'Guarantees every thread, elastic core, silicone band, and dye pigment is completely free of harmful substances and skin allergens.'
  },
  {
    name: 'GOTS Global Organic Textile Standard',
    issuer: 'Organic Soil & Fiber Association',
    code: 'GOTS-ORG-9921',
    description: 'Certifies that all long-staple Egyptian cotton and raw mulberry silk filaments are sourced from verified sustainable, fair-wage farms.'
  },
  {
    name: 'Swiss Lab Hydrostatic & Tensile Certified',
    issuer: 'Zurich Materials & Performance Testing Lab',
    code: 'SWISS-TEST-2026',
    description: 'Validates 15,000mm hydrostatic waterproof shells and 5,000+ cycle stretch elasticity memory without fiber deformation.'
  }
];

export { gearwearProducts, hosieryProducts, articles };
