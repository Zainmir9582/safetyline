import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import SmoothImage from './SmoothImage';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  priority?: boolean;
  variant?: 'compact' | 'standard';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  priority = false,
  variant = 'standard'
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        opacity: { duration: 0.25 },
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }}
      onClick={onClick}
      id={`product-card-${product.slug}`}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Full Shape Product Image Container with Smooth Preload & Shimmer */}
        <div className="aspect-square bg-[#F8FAFB] relative overflow-hidden flex items-center justify-center p-3.5 border-b border-slate-100">
          <SmoothImage
            src={product.coverImage}
            alt={product.name}
            priority={priority}
            fallbackText={product.productCode}
            containerClassName="w-full h-full flex items-center justify-center"
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Product Code Badge */}
          <div className="absolute top-3 left-3 bg-[#0B3D3B] text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase shadow-xs z-10">
            {product.productCode}
          </div>

          {/* Category Tag Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#0B3D3B] border border-slate-200/80 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase z-10">
            {product.categoryName}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5A36] font-bold block">
            {product.material ? product.material.split(',')[0] : 'Technical Activewear'}
          </span>

          <h3 className="font-display font-bold text-base text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Features checklist snippet */}
          {product.features && product.features.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{product.features[0]}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0">
        <div className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-between transition-all bg-[#D9F0EC] group-hover:bg-[#0B3D3B] text-[#0B3D3B] group-hover:text-white">
          <span>View Specifications</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);
