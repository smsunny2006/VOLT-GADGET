import React from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';
import { Star, Heart, Eye, ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Top Image Section */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="bg-slate-950/85 backdrop-blur-md border border-slate-800 text-indigo-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            {product.badge}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-200 ${
            isWishlisted
              ? 'bg-pink-500/20 border-pink-500/50 text-pink-500'
              : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500' : ''}`} />
        </button>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-700/80 flex items-center justify-center gap-1.5 shadow-lg transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Quick View Specs</span>
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-indigo-400 font-semibold tracking-wide uppercase text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm font-bold text-white hover:text-indigo-300 transition-colors line-clamp-2 leading-snug cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Quick Highlight Specs */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-[10px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md truncate max-w-full">
                {product.highlights[0]}
              </span>
            </div>
          )}
        </div>

        {/* Footer Price & Add To Cart */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-slate-100">
              {formatPrice(product.price, currency.rate, currency.symbol)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-500 line-through">
                {formatPrice(product.originalPrice, currency.rate, currency.symbol)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
