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

          {/* Color swatch previews if available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex items-center -space-x-1">
                {product.colors.map((c) => {
                  const lower = c.toLowerCase();
                  let dotColor = 'bg-[#FF5A36]';
                  if (lower.includes('yellow')) dotColor = 'bg-amber-400 border border-amber-500/40';
                  else if (lower.includes('white')) dotColor = 'bg-white border border-slate-300 shadow-2xs';
                  else if (lower.includes('black')) dotColor = 'bg-neutral-900 border border-neutral-700';
                  else if (lower.includes('red')) dotColor = 'bg-red-600 border border-red-700/40';
                  else if (lower.includes('blue')) dotColor = 'bg-blue-600 border border-blue-700/40';
                  else if (lower.includes('brown')) dotColor = 'bg-[#B58863] border border-[#8A5A36]/40';
                  return (
                    <span
                      key={c}
                      title={c}
                      className={`w-3.5 h-3.5 rounded-full inline-block shadow-2xs ${dotColor}`}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] text-slate-400 font-mono ml-1">
                {product.colors.length} Colors
              </span>
            </div>
          )}

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
