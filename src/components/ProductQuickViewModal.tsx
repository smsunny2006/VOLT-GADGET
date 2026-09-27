import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';
import { 
  X, 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare 
} from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.gallery?.[0] || product.img);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Item #{product.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery Column */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img ? 'border-indigo-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Delivery & Warranty perk badges */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2 text-xs text-slate-300">
                <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Express Delivery in 24h</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2-Year VoltCare Warranty</span>
              </div>
            </div>
          </div>

          {/* Details & Tabs Column */}
          <div className="flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-2">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-extrabold text-white">
                  {formatPrice(product.price, currency.rate, currency.symbol)}
                </span>
                {product.originalPrice && (
                  <span className="text-slate-500 line-through text-sm">
                    {formatPrice(product.originalPrice, currency.rate, currency.symbol)}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-md">
                  {product.inStock ? `In Stock (${product.inventoryCount} left)` : 'Out of Stock'}
                </span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tech Specs
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Reviews ({product.reviews?.length || 0})
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'overview' && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-2 flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Highlights</h4>
                    <ul className="flex flex-col gap-1.5">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80">
                  <table className="w-full text-xs text-left">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-slate-900/60' : ''}>
                          <td className="py-2 px-3 text-slate-400 font-medium w-1/3">{key}</td>
                          <td className="py-2 px-3 text-slate-200 font-semibold">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-200">{rev.userName}</span>
                          <span className="text-[10px] text-slate-500">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-700'}`}
                            />
                          ))}
                          {rev.verified && (
                            <span className="text-[9px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded ml-2">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      No customer reviews submitted yet.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-900 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.inventoryCount, q + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-900 font-bold"
                >
                  +
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-pink-500/20 border-pink-500/50 text-pink-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500' : ''}`} />
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  onAddToCart(product, qty);
                  onClose();
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart ({formatPrice(product.price * qty, currency.rate, currency.symbol)})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
