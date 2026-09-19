import { Category, Product, Settings } from '../types';
import { gearwearProducts } from './gearwearProducts';
import { hosieryProducts } from './hosieryProducts';

export const defaultCategories: Category[] = [
  {
    id: 'cat-gearwear',
    name: 'Gearwear',
    slug: 'gearwear',
    description: 'Elite high-performance athletic apparel designed with proprietary aerodynamic and thermoregulating technologies for professional training and active lifestyle.'
  },
  {
    id: 'cat-hosiery',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Ultra-luxurious, fine-gauge socks, tights, stockings, and performance activewear accessories crafted with precision textiles.'
  }
];

export const defaultProducts: Product[] = [...gearwearProducts, ...hosieryProducts];

export const defaultSettings: Settings = {
  companyName: 'Safety Line',
  slogan: 'Precision Sportswear & Exquisite Fine Legwear',
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
