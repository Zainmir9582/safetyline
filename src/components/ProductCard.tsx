import React from 'react';
import { ArrowRight } from 'lucide-react';
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
}) => {
  return (
    <article
      onClick={onClick}
      id={`product-card-${product.slug}`}
      className="group cursor-pointer bg-white rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors duration-150 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Clean Studio Image Ground */}
        <div className="aspect-square bg-[#F7F6F2] relative overflow-hidden flex items-center justify-center p-5 border-b border-[#E2DFD7]">
          <SmoothImage
            src={product.coverImage}
            alt={product.name}
            priority={priority}
            fallbackText={product.productCode}
            style={{ mixBlendMode: 'multiply' }}
            containerClassName="w-full h-full flex items-center justify-center"
            className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Unboxed Editorial Metadata & Title */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono tabular-nums text-[#525957]">
            <span className="font-semibold text-[#D92227] uppercase tracking-wider">
              {product.productCode}
            </span>
            <span className="truncate">
              {product.material ? product.material.split(',')[0] : product.categoryName}
            </span>
          </div>

          <h3 className="font-display font-bold text-base text-[#141918] group-hover:text-[#D92227] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[#525957] text-xs font-normal leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Hairline Footer Row */}
      <div className="px-5 py-3.5 border-t border-[#ECE9E1] flex items-center justify-between text-xs font-semibold text-[#141918] group-hover:text-[#D92227] transition-colors">
        <span className="uppercase tracking-wider text-[11px] font-mono">View Specification</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
      </div>
    </article>
  );
};

export default React.memo(ProductCard);
