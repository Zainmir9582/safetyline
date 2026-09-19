export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string; // references Category.id
  categoryName: string; // cached for UI simplicity
  shortDescription: string;
  longDescription: string;
  material: string;
  sizes: string[];
  colors?: string[];
  features: string[];
  productCode: string;
  status: 'Active' | 'Draft';
  displayOrder: number;
  coverImage: string; // URL or base64
  galleryImages: string[]; // URLs or base64
  isListingSlot?: boolean; // Whether this is an open listing window ready for user images/details
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
}

export interface Settings {
  companyName: string;
  slogan: string;
  aboutText: string;
  contactEmail: string;
  salesEmail?: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramHosiery?: string;
  instagramGearwear?: string;
  facebookUrl?: string;
  officeAddress: string;
  googleMapEmbedUrl: string;
  googleMapsUrl?: string;
  businessHours?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
}

export interface CustomerReview {
  id: string;
  author: string;
  role?: string;
  message: string;
  screenshot?: string; // Image URL (uploaded base64)
  rating: number; // 1-5
  createdAt: string;
}

export interface ProductFeedback {
  id: string;
  productId: string;
  productName: string;
  author: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
}

