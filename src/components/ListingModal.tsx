import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Check, 
  Star, 
  AlertCircle, 
  Tag, 
  Layers, 
  FileText,
  Palette,
  Maximize2
} from 'lucide-react';
import { Product } from '../types';
import { LISTING_PLACEHOLDER_IMAGE } from '../data/gearwearProducts';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  defaultCategory?: 'gearwear' | 'accessories';
  onSave: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const COMMON_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom Size'];

export default function ListingModal({
  isOpen,
  onClose,
  productToEdit,
  defaultCategory = 'gearwear',
  onSave,
  onDelete
}: ListingModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [categorySlug, setCategorySlug] = useState<'gearwear' | 'accessories'>(defaultCategory);
  const [productCode, setProductCode] = useState('');
  const [material, setMaterial] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [colors, setColors] = useState<string[]>(['Obsidian Black', 'Chamber Slate']);
  const [newColorInput, setNewColorInput] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'High-tensile moisture management matrix',
    'Reinforced flatlock friction-free construction'
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  
  // Image handling
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState<number>(0);
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Synchronize initial state when modal opens or productToEdit changes
  useEffect(() => {
    if (!isOpen) {
      setValidationError(null);
      setSaveSuccess(false);
      return;
    }

    if (productToEdit) {
      setName(productToEdit.name);
      setCategorySlug(productToEdit.categoryId === 'cat-hosiery' || productToEdit.categoryId === 'cat-accessories' ? 'accessories' : 'gearwear');
      setProductCode(productToEdit.productCode);
      setMaterial(productToEdit.material || '');
      setShortDescription(productToEdit.shortDescription || '');
      setLongDescription(productToEdit.longDescription || '');
      setSelectedSizes(productToEdit.sizes && productToEdit.sizes.length > 0 ? productToEdit.sizes : ['S', 'M', 'L', 'XL']);
      setColors(productToEdit.colors && productToEdit.colors.length > 0 ? productToEdit.colors : ['Obsidian Black']);
      setFeatures(productToEdit.features && productToEdit.features.length > 0 ? productToEdit.features : ['High-tensile aerodynamic knit']);

      const imgs = productToEdit.galleryImages && productToEdit.galleryImages.length > 0 
        ? [...productToEdit.galleryImages] 
        : productToEdit.coverImage ? [productToEdit.coverImage] : [];
      setGalleryImages(imgs);

      const coverIdx = imgs.findIndex(img => img === productToEdit.coverImage);
      setCoverImageIndex(coverIdx >= 0 ? coverIdx : 0);
    } else {
      // New Listing Window defaults
      const randomCode = `GW-${Math.floor(10 + Math.random() * 90)}`;
      setName('');
      setCategorySlug(defaultCategory);
      setProductCode(randomCode);
      setMaterial('85% Technical Polyamide, 15% Elastane');
      setShortDescription('');
      setLongDescription('');
      setSelectedSizes(['S', 'M', 'L', 'XL']);
      setColors(['Obsidian Black', 'Carbon Slate']);
      setFeatures([
        'Advanced moisture-wicking capillary channels',
        'Ergonomic athletic panel construction',
        'Custom client branding & private label available'
      ]);
      setGalleryImages([]);
      setCoverImageIndex(0);
    }
  }, [isOpen, productToEdit, defaultCategory]);

  if (!isOpen) return null;

  // File Upload Handlers (FileReader data URL)
  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        setValidationError('Please upload image files only (PNG, JPG, WEBP).');
        return;
      }
      // Check reasonable file size (< 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setValidationError('Image size exceeds 10MB. Please use an optimized image.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setGalleryImages(prev => {
            const updated = [...prev, result];
            return updated;
          });
          setValidationError(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleAddUrlImage = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:image/')) {
      setValidationError('Please enter a valid image URL starting with https:// or http://');
      return;
    }
    setGalleryImages(prev => [...prev, trimmed]);
    setUrlInput('');
    setValidationError(null);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setGalleryImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    if (coverImageIndex === indexToRemove) {
      setCoverImageIndex(0);
    } else if (coverImageIndex > indexToRemove) {
      setCoverImageIndex(prev => prev - 1);
    }
  };

  // Size toggles
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleAddCustomSize = () => {
    if (customSizeInput.trim() && !selectedSizes.includes(customSizeInput.trim())) {
      setSelectedSizes(prev => [...prev, customSizeInput.trim()]);
      setCustomSizeInput('');
    }
  };

  // Color management
  const handleAddColor = () => {
    if (newColorInput.trim() && !colors.includes(newColorInput.trim())) {
      setColors(prev => [...prev, newColorInput.trim()]);
      setNewColorInput('');
    }
  };

  const handleRemoveColor = (colorToRemove: string) => {
    setColors(prev => prev.filter(c => c !== colorToRemove));
  };

  // Feature management
  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures(prev => [...prev, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setFeatures(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Save handler
  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError('Please enter a listing name.');
      return;
    }

    if (!productCode.trim()) {
      setValidationError('Please enter a product code or SKU.');
      return;
    }

    // Determine cover image: either selected gallery image, first image, or clean placeholder
    let cover = LISTING_PLACEHOLDER_IMAGE;
    let finalGallery = galleryImages;

    if (galleryImages.length > 0) {
      cover = galleryImages[coverImageIndex] || galleryImages[0];
    } else {
      finalGallery = [LISTING_PLACEHOLDER_IMAGE];
    }

    const categoryId = categorySlug === 'gearwear' ? 'cat-gearwear' : 'cat-hosiery';
    const categoryName = categorySlug === 'gearwear' ? 'Gearwear' : 'Accessories';
    
    // Generate clean slug from name
    const slug = productToEdit?.slug || (
      name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + '-' + Math.floor(100 + Math.random() * 900)
    );

    const savedProduct: Product = {
      id: productToEdit?.id || `prod-custom-${Date.now()}`,
      name: name.trim(),
      slug,
      categoryId,
      categoryName,
      shortDescription: shortDescription.trim() || `High-performance ${categoryName.toLowerCase()} item engineered by Safety Line Ind.`,
      longDescription: longDescription.trim() || `Custom manufactured ${name.trim()} by Safety Line Ind. Precision engineered using advanced textile technologies and rigorous quality control standards.`,
      material: material.trim() || '85% Performance Polyamide, 15% Elastane',
      sizes: selectedSizes.length > 0 ? selectedSizes : ['S', 'M', 'L', 'XL'],
      colors: colors.length > 0 ? colors : ['Standard Black'],
      features: features.length > 0 ? features : ['Precision athletic stitching', 'Moisture management'],
      productCode: productCode.trim().toUpperCase(),
      status: 'Active',
      isListingSlot: galleryImages.length === 0, // Flagged if still awaiting user's own images
      displayOrder: productToEdit?.displayOrder || 10,
      coverImage: cover,
      galleryImages: finalGallery,
      createdAt: productToEdit?.createdAt || new Date().toISOString()
    };

    setSaveSuccess(true);
    setTimeout(() => {
      onSave(savedProduct);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B3D3B] text-white px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5A36] flex items-center justify-center shadow-md">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">
                {productToEdit ? 'Edit Listing Window & Details' : 'New Listing Window: Add Images & Details'}
              </h2>
              <p className="text-xs text-[#D9F0EC] font-mono">
                {productToEdit ? `Modifying ${productToEdit.productCode}` : 'Create a customizable product slot in Safety Line catalogue'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all cursor-pointer"
            title="Close listing window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation error banner */}
        {validationError && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-3 flex items-center gap-2 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Success toast */}
        {saveSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center gap-2 text-emerald-700 text-xs font-semibold">
            <Check className="w-4 h-4 shrink-0" />
            <span>Listing successfully updated! Updating catalogue...</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSaveListing} className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* =========================================================================
              SECTION 1: IMAGE UPLOAD & GALLERY (Primary User Request)
             ========================================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#0B3D3B] flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#FF5A36]" />
                  <span>Product Imagery &amp; Gallery</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Upload photos from your computer or paste image links. You can add multiple images.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-[#D9F0EC] text-[#0B3D3B] rounded-lg font-bold">
                {galleryImages.length} {galleryImages.length === 1 ? 'Image' : 'Images'} Added
              </span>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-[#FF5A36] bg-[#FF5A36]/5' 
                  : 'border-slate-300 hover:border-[#0B3D3B] hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#D9F0EC] flex items-center justify-center text-[#0B3D3B] shadow-xs">
                  <Upload className="w-6 h-6 text-[#FF5A36]" />
                </div>
                <p className="text-sm font-bold text-[#0B3D3B]">
                  Click to browse or drag &amp; drop product images here
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  Supports PNG, JPG, JPEG, WEBP (Instant preview &amp; local storage)
                </p>
              </div>
            </div>

            {/* Direct URL Input fallback */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Or paste an image web link (https://...)"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0B3D3B] font-mono"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddUrlImage();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddUrlImage}
                className="bg-[#0B3D3B] hover:bg-[#072725] text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Link</span>
              </button>
            </div>

            {/* Thumbnail previews of uploaded images */}
            {galleryImages.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-slate-600 block">
                  Select cover image &amp; manage gallery:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {galleryImages.map((imgSrc, idx) => {
                    const isCover = idx === coverImageIndex;
                    return (
                      <div 
                        key={idx}
                        className={`relative group rounded-xl overflow-hidden border-2 aspect-square bg-slate-100 ${
                          isCover ? 'border-[#FF5A36] ring-2 ring-[#FF5A36]/30' : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <img 
                          src={imgSrc} 
                          alt={`Uploaded preview ${idx + 1}`}
                          className="w-full h-full object-cover" 
                        />
                        {/* Cover badge */}
                        {isCover && (
                          <div className="absolute top-1.5 left-1.5 bg-[#FF5A36] text-white text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span>Cover</span>
                          </div>
                        )}
                        {/* Overlay actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-1">
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => setCoverImageIndex(idx)}
                              className="bg-white/90 hover:bg-white text-[#0B3D3B] p-1.5 rounded-lg text-[10px] font-mono font-bold cursor-pointer"
                              title="Set as primary cover image"
                            >
                              Make Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-lg cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* =========================================================================
              SECTION 2: CORE PRODUCT DETAILS
             ========================================================================= */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B3D3B] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF5A36]" />
              <span>Listing Identity &amp; Specifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold text-slate-700 block">
                  Product / Listing Name <span className="text-[#FF5A36]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Aero Velocity Singlet"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B3D3B]"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 block">
                  Category Section <span className="text-[#FF5A36]">*</span>
                </label>
                <select
                  value={categorySlug}
                  onChange={e => setCategorySlug(e.target.value as 'gearwear' | 'accessories')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B3D3B]"
                >
                  <option value="gearwear">Gearwear (Athletic Sportswear)</option>
                  <option value="accessories">Accessories (Technical Compression)</option>
                </select>
              </div>

              {/* Product Code / SKU */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 block">
                  Product Code / SKU <span className="text-[#FF5A36]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GW-09"
                  value={productCode}
                  onChange={e => setProductCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 uppercase font-mono focus:outline-none focus:border-[#0B3D3B]"
                />
              </div>

              {/* Material Composition */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold text-slate-700 block">
                  Fabric &amp; Material Composition
                </label>
                <input
                  type="text"
                  placeholder="e.g. 82% Aero-Polyamide, 18% Elastane Composite"
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B3D3B]"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold text-slate-700 block">
                  Card Short Summary
                </label>
                <input
                  type="text"
                  placeholder="Brief 1-sentence overview displayed on the catalogue card"
                  value={shortDescription}
                  onChange={e => setShortDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B3D3B]"
                />
              </div>

              {/* Long Description */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold text-slate-700 block">
                  Full Technical Description &amp; Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="In-depth details regarding fiber construction, fit, use cases, and manufacturing highlights..."
                  value={longDescription}
                  onChange={e => setLongDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:border-[#0B3D3B] resize-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* =========================================================================
              SECTION 3: SIZING & COLOR PALETTE
             ========================================================================= */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B3D3B] flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#FF5A36]" />
              <span>Sizing Options &amp; Available Colors</span>
            </h3>

            {/* Sizing selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-700 block">
                Select Available Sizes:
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_SIZES.map(size => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#0B3D3B] text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 pt-1 max-w-xs">
                <input
                  type="text"
                  placeholder="Add custom size (e.g. 4XL)"
                  value={customSizeInput}
                  onChange={e => setCustomSizeInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-mono"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomSize();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCustomSize}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono px-3 py-1.5 rounded-lg font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Colors list */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono font-bold text-slate-700 block">
                Available Colors:
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                  >
                    <span>{color}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 max-w-xs pt-1">
                <input
                  type="text"
                  placeholder="Add color (e.g. Navy Blue)"
                  value={newColorInput}
                  onChange={e => setNewColorInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-mono"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddColor();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono px-3 py-1.5 rounded-lg font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* =========================================================================
              SECTION 4: TECHNICAL FEATURES BULLETS
             ========================================================================= */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-[#0B3D3B] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF5A36]" />
              <span>Key Technical Highlights &amp; Bullet Points</span>
            </h3>

            <div className="space-y-2">
              {features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="flex-1">{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(fIdx)}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Add bullet highlight (e.g. Silver-ion anti-odor thread)"
                value={newFeatureInput}
                onChange={e => setNewFeatureInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0B3D3B]"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Add Feature
              </button>
            </div>
          </div>
        </form>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            {productToEdit && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${productToEdit.name}"?`)) {
                    onDelete(productToEdit.id);
                    onClose();
                  }
                }}
                className="text-rose-600 hover:text-rose-700 text-xs font-mono font-bold inline-flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Listing</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-mono font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveListing}
              className="bg-[#0B3D3B] hover:bg-[#072725] text-white text-xs font-mono font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-[#0B3D3B]/20 inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-[#FF5A36]" />
              <span>{productToEdit ? 'Save Listing Changes' : 'Publish Listing Window'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
