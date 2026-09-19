import React, { useState, useEffect } from 'react';
import { 
  X, Upload, Image as ImageIcon, Plus, Trash2, Check, AlertCircle, Sparkles 
} from 'lucide-react';
import { Product } from '../types';

import defaultFallbackImg from '../assets/images/shirts 1.jpeg';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  defaultCategory?: 'gearwear' | 'accessories' | 'hosiery';
  onSave: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export default function ListingModal({
  isOpen,
  onClose,
  productToEdit,
  defaultCategory = 'gearwear',
  onSave,
  onDelete,
}: ListingModalProps) {
  const isEditing = Boolean(productToEdit);

  // Determine initial category
  const resolvedCategoryId = productToEdit?.categoryId || 
    (defaultCategory === 'gearwear' ? 'cat-gearwear' : 'cat-hosiery');

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState(resolvedCategoryId);
  const [productCode, setProductCode] = useState('');
  const [material, setMaterial] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [sizes, setSizes] = useState<string[]>(['XS', 'S', 'M', 'L', 'XL']);
  const [newSizeInput, setNewSizeInput] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'High-gauge ergonomic performance knit',
    'OEKO-TEX Standard 100 Class I Certified'
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [status, setStatus] = useState<'Active' | 'Draft'>('Active');
  const [coverImage, setCoverImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sync state when productToEdit changes or modal opens
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setSlug(productToEdit.slug || '');
      setCategoryId(productToEdit.categoryId || 'cat-gearwear');
      setProductCode(productToEdit.productCode || '');
      setMaterial(productToEdit.material || '');
      setShortDescription(productToEdit.shortDescription || '');
      setLongDescription(productToEdit.longDescription || '');
      setSizes(productToEdit.sizes && productToEdit.sizes.length > 0 ? productToEdit.sizes : ['S', 'M', 'L', 'XL']);
      setFeatures(productToEdit.features && productToEdit.features.length > 0 ? productToEdit.features : []);
      setStatus(productToEdit.status || 'Active');
      setCoverImage(productToEdit.coverImage || '');
      setGalleryImages(productToEdit.galleryImages || []);
      setError(null);
    } else {
      // New listing window presets
      const generatedCode = (defaultCategory === 'gearwear' ? 'GW-' : 'AC-') + Math.floor(1000 + Math.random() * 9000);
      setName('');
      setSlug('');
      setCategoryId(defaultCategory === 'gearwear' ? 'cat-gearwear' : 'cat-hosiery');
      setProductCode(generatedCode);
      setMaterial('85% Technical Polyamide, 15% Lycra');
      setShortDescription('');
      setLongDescription('');
      setSizes(['XS', 'S', 'M', 'L', 'XL']);
      setFeatures([
        'Breathable circular knit with anti-friction Flatlock seams',
        'Hydrophobic moisture-wicking and thermal regulation',
        'OEKO-TEX Standard 100 Certified skin-safe fibers'
      ]);
      setStatus('Active');
      setCoverImage('');
      setGalleryImages([]);
      setError(null);
    }
  }, [productToEdit, defaultCategory, isOpen]);

  // Handle auto-generating slug from name if creating
  const handleNameChange = (val: string) => {
    setName(val);
    if (!productToEdit) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  };

  // Cover image upload via FileReader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        if (isGallery) {
          setGalleryImages(prev => [...prev, result]);
        } else {
          setCoverImage(result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Add custom tags
  const handleAddSize = () => {
    if (newSizeInput.trim() && !sizes.includes(newSizeInput.trim())) {
      setSizes(prev => [...prev, newSizeInput.trim()]);
      setNewSizeInput('');
    }
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures(prev => [...prev, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleAddGalleryUrl = () => {
    if (newGalleryInput.trim()) {
      setGalleryImages(prev => [...prev, newGalleryInput.trim()]);
      setNewGalleryInput('');
    }
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Product title is required.');
      return;
    }

    const finalSlug = (slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/(^-|-$)/g, '');
    if (!finalSlug) {
      setError('A valid product URL slug is required.');
      return;
    }

    const isGw = categoryId === 'cat-gearwear';
    const categoryName = isGw ? 'Gearwear Products' : 'Accessories Products';

    const finalProduct: Product = {
      id: productToEdit?.id || `prod-${Date.now()}`,
      name: name.trim(),
      slug: finalSlug,
      categoryId,
      categoryName,
      shortDescription: shortDescription.trim() || `${name.trim()} by Safety Line technical atelier.`,
      longDescription: longDescription.trim() || shortDescription.trim(),
      material: material.trim() || 'Technical Knit Composite',
      sizes: sizes.length > 0 ? sizes : ['One Size'],
      colors: [],
      features: features.length > 0 ? features : ['Precision engineered athletic construction'],
      productCode: productCode.trim() || `SL-${Math.floor(1000 + Math.random() * 9000)}`,
      status,
      displayOrder: productToEdit?.displayOrder || 10,
      coverImage: coverImage.trim() || defaultFallbackImg,
      galleryImages,
      seoTitle: `${name.trim()} | Safety Line`,
      seoDescription: shortDescription.trim(),
      createdAt: productToEdit?.createdAt || new Date().toISOString()
    };

    onSave(finalProduct);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        id="listing-modal-container" 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B3D3B] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#FF5A36]" />
            <div>
              <h2 className="font-display font-bold text-base">
                {isEditing ? `Edit Product: ${productToEdit?.name}` : 'Add New Product'}
              </h2>
              <p className="text-xs text-[#D9F0EC]/80 font-mono">
                {isEditing ? 'Update specifications, imagery, and variant parameters' : 'Enter product specifications, custom imagery, and parameters'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-left">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Core Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#0B3D3B] uppercase tracking-wider border-b border-slate-100 pb-1.5">
              1. General Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Pro Aero Compression Tee"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Product Code / SKU *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GW-1049"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs font-mono text-[#1A1A1A] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Division / Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] outline-none"
                >
                  <option value="cat-gearwear">Gearwear Products</option>
                  <option value="cat-hosiery">Accessories / Hosiery</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">URL Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. apex-pro-aero-tee"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs font-mono text-[#1A1A1A] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Display Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Active' | 'Draft')}
                  className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] outline-none"
                >
                  <option value="Active">Active in Catalogue</option>
                  <option value="Draft">Draft / Hidden</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Material & Fiber Composition</label>
              <input
                type="text"
                placeholder="e.g. 82% Micro-Polyester, 18% Elastane Spandex"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Short Summary</label>
              <textarea
                rows={2}
                placeholder="Concise overview for catalog grid preview cards..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Detailed Technical Description</label>
              <textarea
                rows={3}
                placeholder="Full yarn properties, knitting stitch patterns, recommended sport applications..."
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] outline-none resize-none"
              />
            </div>
          </div>

          {/* Section 2: Product Imagery & Upload */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#0B3D3B] uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
              <span>2. Product Photography</span>
              <span className="text-[10px] text-slate-400 font-normal">Supports URL or local image upload</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Preview Thumbnail */}
              <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase mb-2">Cover Preview</span>
                {coverImage ? (
                  <div className="w-full aspect-square rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="w-8 h-8 mb-1" />
                    <span className="text-[10px]">No image selected</span>
                  </div>
                )}
              </div>

              {/* Input & Upload */}
              <div className="md:col-span-8 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Cover Image URL</label>
                  <input
                    type="text"
                    placeholder="https://... or upload file below"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Photo from Computer</label>
                  <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 hover:border-[#0B3D3B] bg-slate-50 hover:bg-white rounded-lg p-3 cursor-pointer transition-colors text-xs text-slate-600">
                    <Upload className="w-4 h-4 text-[#FF5A36]" />
                    <span>Choose Image File (JPG, PNG, WebP)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, false)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Additional gallery urls */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-700 flex justify-between">
                    <span>Additional Gallery Angles ({galleryImages.length})</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add gallery image URL..."
                      value={newGalleryInput}
                      onChange={(e) => setNewGalleryInput(e.target.value)}
                      className="flex-grow bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-1.5 text-xs text-[#1A1A1A] outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryUrl}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Add URL
                    </button>
                    <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {galleryImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className="relative group w-14 h-14 rounded-md overflow-hidden border border-slate-200 bg-white">
                          <img src={img} alt={`Angle ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Features & Sizes */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#0B3D3B] uppercase tracking-wider border-b border-slate-100 pb-1.5">
              3. Sizing & Technical Highlights
            </h3>

            {/* Sizes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Available Sizing Specifications</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {sizes.map((s, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 text-[#0B3D3B] text-[11px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1.5">
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => setSizes(prev => prev.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  placeholder="e.g. XXL or 39-42 EU"
                  value={newSizeInput}
                  onChange={(e) => setNewSizeInput(e.target.value)}
                  className="flex-grow bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-1.5 text-xs outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-[#0B3D3B] text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Engineering Highlights / Features</label>
              <div className="space-y-1.5">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 bg-[#FAFCFB] border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
                    <span className="truncate text-slate-700 font-mono">• {feat}</span>
                    <button
                      type="button"
                      onClick={() => setFeatures(prev => prev.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-500 shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="e.g. Targeted arch compression for plantar stabilization"
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  className="flex-grow bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3 py-1.5 text-xs outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-[#0B3D3B] text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Add Highlight
                </button>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              {isEditing && onDelete && productToEdit && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to remove "${productToEdit.name}" from the catalogue?`)) {
                      onDelete(productToEdit.id);
                      onClose();
                    }
                  }}
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Product</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0B3D3B] hover:bg-[#072725] text-white px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#0B3D3B]/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#FF5A36]" />
                <span>{isEditing ? 'Save Product Changes' : 'Publish Product'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
