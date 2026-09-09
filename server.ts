import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import type { Category, Product, Settings, CustomerReview, ProductFeedback } from './src/types';

const app = express();
const PORT = 3000;
const DB_PATH = path.join(process.cwd(), 'db.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const JWT_SECRET = process.env.JWT_SECRET || 'vanguard-luxury-secret-key-987';

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Custom Database structure
interface DBStructure {
  categories: Category[];
  products: Product[];
  settings: Settings;
  users: Array<{ email: string; passwordHash: string }>;
  reviews: CustomerReview[];
  feedbacks: ProductFeedback[];
}

// SHA256 helper
function sha256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// Generate real custom JWT
function generateJWT(email: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

// Verify custom JWT
function verifyJWT(token: string): { email: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
    if (signature !== expectedSignature) return null;
    
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (decodedPayload.exp < Date.now()) {
      return null; // Expired
    }
    return { email: decodedPayload.email };
  } catch (err) {
    return null;
  }
}

// Default fallback settings and categories
const fallbackCategories: Category[] = [
  { id: 'cat-gw', name: 'Performance Gearwear', slug: 'gearwear', description: 'Engineered Technical Apparel & Teamwear' },
  { id: 'cat-hs', name: 'Technical Hosiery', slug: 'hosiery', description: 'Compression, Grip & Thermal Socks' }
];

const fallbackSettings: Settings = {
  companyName: 'Safety Line Ind',
  slogan: 'Textile Engineering & Fine Hosiery Atelier',
  aboutText: 'Specialized manufacturing facility in Sialkot, Pakistan delivering precision athletic gearwear and technical hosiery.',
  contactEmail: 'safetylineind@gmail.com',
  contactPhone: '+923007130987',
  whatsappNumber: '+923007130987',
  officeAddress: 'Small Industrial Estate, Sialkot 51310, Punjab, Pakistan',
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108035.79541575235!2d74.46468725820311!3d32.49454159999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ee017fa7259c7%3A0xb355152a514d7a8d!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'
};

// Initialize Database
function getDB(): DBStructure {
  if (!fs.existsSync(DB_PATH)) {
    // admin credentials: admin@showcase.com / admin123
    const initialDB: DBStructure = {
      categories: fallbackCategories,
      products: [],
      settings: fallbackSettings,
      users: [
        {
          email: 'admin@showcase.com',
          passwordHash: sha256('admin123'),
        }
      ],
      reviews: [],
      feedbacks: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2), 'utf8');
    return initialDB;
  }
  try {
    const content = fs.readFileSync(DB_PATH, 'utf8');
    const db = JSON.parse(content);
    if (!db.reviews) db.reviews = [];
    if (!db.feedbacks) db.feedbacks = [];
    return db as DBStructure;
  } catch (e) {
    // Fallback if file corrupted
    const initialDB: DBStructure = {
      categories: fallbackCategories,
      products: [],
      settings: fallbackSettings,
      users: [
        {
          email: 'admin@showcase.com',
          passwordHash: sha256('admin123'),
        }
      ],
      reviews: [],
      feedbacks: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2), 'utf8');
    return initialDB;
  }
}

function saveDB(db: DBStructure) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

// Body parsers with larger size limits to allow Base64 image uploads smoothly
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Serve uploaded media files statically with client caching
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d', immutable: true }));
app.use('/src/assets/images', express.static(path.join(process.cwd(), 'src', 'assets', 'images'), { maxAge: '7d' }));
app.use('/assets/images', express.static(path.join(process.cwd(), 'src', 'assets', 'images'), { maxAge: '7d' }));

// Express JWT Auth Middleware
const authenticateAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  const token = authHeader.split(' ')[1];
  const verified = verifyJWT(token);
  if (!verified) {
    return res.status(401).json({ error: 'Invalid or expired credentials' });
  }
  req.user = verified;
  next();
};

// ==========================================
// REST API ROUTES
// ==========================================

// Health check for Cloud Run and monitoring
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authenticate Admin Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const db = getDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.passwordHash !== sha256(password)) {
    return res.status(401).json({ error: 'Invalid administrative email or password' });
  }

  const token = generateJWT(user.email);
  return res.json({
    token,
    user: { email: user.email }
  });
});

// Category REST APIs
app.get('/api/categories', (req, res) => {
  const db = getDB();
  res.json(db.categories);
});

app.post('/api/categories', authenticateAdmin, (req, res) => {
  const { name, slug, description } = req.body;
  if (!name || !slug) {
    return res.status(400).json({ error: 'Category name and slug are required' });
  }
  const db = getDB();
  const existing = db.categories.find(c => c.slug === slug);
  if (existing) {
    return res.status(400).json({ error: 'Category with this slug already exists' });
  }
  const newCategory: Category = {
    id: 'cat-' + Date.now(),
    name,
    slug,
    description
  };
  db.categories.push(newCategory);
  saveDB(db);
  res.status(201).json(newCategory);
});

app.put('/api/categories/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { name, slug, description } = req.body;
  const db = getDB();
  const index = db.categories.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }
  db.categories[index] = {
    ...db.categories[index],
    name: name || db.categories[index].name,
    slug: slug || db.categories[index].slug,
    description: description !== undefined ? description : db.categories[index].description
  };
  saveDB(db);
  res.json(db.categories[index]);
});

app.delete('/api/categories/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const index = db.categories.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }
  // Remove category
  db.categories.splice(index, 1);
  // Optional: Nullify category for affected products
  db.products = db.products.map(p => {
    if (p.categoryId === id) {
      return { ...p, categoryId: '', categoryName: 'Uncategorized' };
    }
    return p;
  });
  saveDB(db);
  res.json({ message: 'Category and associations updated successfully' });
});

// Products REST APIs
app.get('/api/products', (req, res) => {
  const db = getDB();
  let products = [...db.products];

  // Filtering by category slug
  const categorySlug = req.query.category as string;
  if (categorySlug) {
    const cat = db.categories.find(c => c.slug === categorySlug);
    if (cat) {
      products = products.filter(p => p.categoryId === cat.id);
    } else {
      products = [];
    }
  }

  // Search filter
  const search = req.query.search as string;
  if (search) {
    const s = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(s) || 
      p.shortDescription.toLowerCase().includes(s) ||
      p.productCode.toLowerCase().includes(s)
    );
  }

  // Sorting
  products.sort((a, b) => a.displayOrder - b.displayOrder);

  res.json(products);
});

app.get('/api/products/:slug', (req, res) => {
  const { slug } = req.params;
  const db = getDB();
  const product = db.products.find(p => p.slug === slug);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/products', authenticateAdmin, (req, res) => {
  const db = getDB();
  const productData = req.body;

  if (!productData.name || !productData.slug || !productData.categoryId) {
    return res.status(400).json({ error: 'Name, Slug, and Category are required fields' });
  }

  const existing = db.products.find(p => p.slug === productData.slug);
  if (existing) {
    return res.status(400).json({ error: 'Product with this slug already exists' });
  }

  const cat = db.categories.find(c => c.id === productData.categoryId);

  const newProduct: Product = {
    id: 'prod-' + Date.now(),
    name: productData.name,
    slug: productData.slug,
    categoryId: productData.categoryId,
    categoryName: cat ? cat.name : 'Uncategorized',
    shortDescription: productData.shortDescription || '',
    longDescription: productData.longDescription || '',
    material: productData.material || '',
    sizes: Array.isArray(productData.sizes) ? productData.sizes : [],
    colors: Array.isArray(productData.colors) ? productData.colors : [],
    features: Array.isArray(productData.features) ? productData.features : [],
    productCode: productData.productCode || 'GW-' + Date.now().toString().slice(-4),
    status: productData.status || 'Active',
    displayOrder: parseInt(productData.displayOrder) || 10,
    coverImage: productData.coverImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600',
    galleryImages: Array.isArray(productData.galleryImages) ? productData.galleryImages : [],
    seoTitle: productData.seoTitle || productData.name,
    seoDescription: productData.seoDescription || productData.shortDescription,
    createdAt: new Date().toISOString()
  };

  db.products.push(newProduct);
  saveDB(db);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const db = getDB();

  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const cat = db.categories.find(c => c.id === productData.categoryId);

  db.products[index] = {
    ...db.products[index],
    name: productData.name || db.products[index].name,
    slug: productData.slug || db.products[index].slug,
    categoryId: productData.categoryId || db.products[index].categoryId,
    categoryName: cat ? cat.name : db.products[index].categoryName,
    shortDescription: productData.shortDescription !== undefined ? productData.shortDescription : db.products[index].shortDescription,
    longDescription: productData.longDescription !== undefined ? productData.longDescription : db.products[index].longDescription,
    material: productData.material !== undefined ? productData.material : db.products[index].material,
    sizes: Array.isArray(productData.sizes) ? productData.sizes : db.products[index].sizes,
    colors: Array.isArray(productData.colors) ? productData.colors : db.products[index].colors,
    features: Array.isArray(productData.features) ? productData.features : db.products[index].features,
    productCode: productData.productCode !== undefined ? productData.productCode : db.products[index].productCode,
    status: productData.status || db.products[index].status,
    displayOrder: productData.displayOrder !== undefined ? parseInt(productData.displayOrder) : db.products[index].displayOrder,
    coverImage: productData.coverImage !== undefined ? productData.coverImage : db.products[index].coverImage,
    galleryImages: Array.isArray(productData.galleryImages) ? productData.galleryImages : db.products[index].galleryImages,
    seoTitle: productData.seoTitle !== undefined ? productData.seoTitle : db.products[index].seoTitle,
    seoDescription: productData.seoDescription !== undefined ? productData.seoDescription : db.products[index].seoDescription,
  };

  saveDB(db);
  res.json(db.products[index]);
});

app.delete('/api/products/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  db.products.splice(index, 1);
  saveDB(db);
  res.json({ message: 'Product deleted successfully' });
});

// Settings REST APIs
app.get('/api/settings', (req, res) => {
  const db = getDB();
  res.json(db.settings);
});

app.put('/api/settings', authenticateAdmin, (req, res) => {
  const db = getDB();
  db.settings = {
    ...db.settings,
    ...req.body
  };
  saveDB(db);
  res.json(db.settings);
});

// Image Upload REST API (Saves Base64 image content with automatic compression & optimization)
app.post('/api/upload', authenticateAdmin, async (req, res) => {
  const { filename, base64Data } = req.body;
  if (!filename || !base64Data) {
    return res.status(400).json({ error: 'Filename and base64Data are required' });
  }

  try {
    // Strip header if present (e.g. data:image/png;base64,)
    const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Clean, 'base64');
    
    const ext = (filename && filename.includes('.')) ? path.extname(filename).toLowerCase() : '.jpg';
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
    const uniqueFilename = `img-${Date.now()}-${Math.floor(Math.random() * 10000)}${safeExt}`;
    const destination = path.join(UPLOADS_DIR, uniqueFilename);
    
    fs.writeFileSync(destination, buffer);
    const relativeUrl = `/uploads/${uniqueFilename}`;
    
    return res.status(201).json({ url: relativeUrl });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to write image file: ' + err.message });
  }
});

// ==========================================
// REVIEWS & FEEDBACKS REST APIs
// ==========================================

// Reviews (Admin-managed customer reviews with screenshots & messages)
app.get('/api/reviews', (req, res) => {
  const db = getDB();
  res.json(db.reviews || []);
});

app.post('/api/reviews', authenticateAdmin, (req, res) => {
  const { author, role, message, screenshot, rating } = req.body;
  if (!author || !message) {
    return res.status(400).json({ error: 'Author name and review message are required' });
  }

  const db = getDB();
  const newReview: CustomerReview = {
    id: 'rev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    author,
    role: role || 'Verified Customer',
    message,
    screenshot: screenshot || '',
    rating: parseInt(rating) || 5,
    createdAt: new Date().toISOString()
  };

  db.reviews = db.reviews || [];
  db.reviews.push(newReview);
  saveDB(db);
  res.status(201).json(newReview);
});

app.delete('/api/reviews/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  db.reviews = db.reviews || [];
  const index = db.reviews.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }
  db.reviews.splice(index, 1);
  saveDB(db);
  res.json({ message: 'Review deleted successfully' });
});

// Feedbacks (Submitted by customers in every product post)
app.get('/api/feedbacks', authenticateAdmin, (req, res) => {
  const db = getDB();
  res.json(db.feedbacks || []);
});

app.get('/api/products/:productId/feedbacks', (req, res) => {
  const { productId } = req.params;
  const db = getDB();
  db.feedbacks = db.feedbacks || [];
  const filtered = db.feedbacks.filter(f => f.productId === productId);
  res.json(filtered);
});

app.post('/api/products/:productId/feedbacks', (req, res) => {
  const { productId } = req.params;
  const { author, email, message, rating } = req.body;

  if (!author || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const db = getDB();
  const product = db.products.find(p => p.id === productId || p.slug === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const newFeedback: ProductFeedback = {
    id: 'feed-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    productId: product.id,
    productName: product.name,
    author,
    email,
    message,
    rating: parseInt(rating) || 5,
    createdAt: new Date().toISOString()
  };

  db.feedbacks = db.feedbacks || [];
  db.feedbacks.push(newFeedback);
  saveDB(db);
  res.status(201).json(newFeedback);
});

app.delete('/api/feedbacks/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  db.feedbacks = db.feedbacks || [];
  const index = db.feedbacks.findIndex(f => f.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Feedback not found' });
  }
  db.feedbacks.splice(index, 1);
  saveDB(db);
  res.json({ message: 'Feedback deleted successfully' });
});

// ==========================================
// VITE OR STATIC FILE SERVING
// ==========================================

async function startServer() {
  const distPath = path.join(process.cwd(), 'dist');
  const distIndexExists = fs.existsSync(path.join(distPath, 'index.html'));
  const isProduction = process.env.NODE_ENV === 'production' || distIndexExists;

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    // Support single-page routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully started on http://0.0.0.0:${PORT}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing HTTP server gracefully...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, closing HTTP server gracefully...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });
}

startServer();
