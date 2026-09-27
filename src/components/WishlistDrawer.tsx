import React from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: Currency;
  onAddToCart: (product: Product) => void;
  onRemoveWishlist: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onAddToCart,
  onRemoveWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500/20" />
              <h2 className="text-base font-bold text-white">Your Saved Wishlist</h2>
              <span className="text-xs bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full font-semibold">
                {wishlist.length} Saved
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 text-slate-600">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">No saved items</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-4">
                  Tap the heart icon on any gadget card to save it for later.
                </p>
                <button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
                  Explore Gadgets
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div key={product.id} className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl flex gap-3 items-center">
                  <img src={product.img} alt={product.name} className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                    <p className="text-xs font-extrabold text-indigo-400 mt-0.5">
                      {formatPrice(product.price, currency.rate, currency.symbol)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveWishlist(product);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
