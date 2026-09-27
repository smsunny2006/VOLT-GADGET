import React, { useState } from 'react';
import { Currency } from '../types';
import { CURRENCIES, formatPrice } from '../data/products';
import { 
  Zap, 
  Search, 
  X, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  PackageCheck, 
  Globe 
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  cartCount: number;
  cartSubtotalUSD: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIModal: () => void;
  onOpenOrderTracker: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  currency,
  setCurrency,
  cartCount,
  cartSubtotalUSD,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAIModal,
  onOpenOrderTracker,
}) => {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-200">
      {/* Top Banner Announcement Strip */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-cyan-900/60 border-b border-slate-800/50 py-1.5 px-4 text-xs font-medium text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
          Special Offer
        </span>
        <span>Use code <strong className="text-white bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">VOLT20</strong> for 20% off all audio & wearables!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => setSearchQuery('')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/30 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              VoltGadgets
            </span>
            <span className="hidden sm:block text-[10px] text-indigo-400/90 uppercase font-semibold tracking-widest -mt-1">
              Tech Marketplace
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gadgets, ANC headphones, 4K drones..."
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-sm rounded-full pl-10 pr-10 py-2 outline-none transition-all duration-200 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Actions Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Advisor Button */}
          <button
            onClick={onOpenAIModal}
            className="relative group overflow-hidden rounded-full p-px font-medium text-xs text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-pulse group-hover:opacity-100 opacity-80" />
            <span className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-950/90 group-hover:bg-slate-900/90 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-spin-slow" />
              <span className="bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent font-semibold hidden sm:inline">
                Ask Volt AI
              </span>
            </span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1 text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-2.5 py-2 rounded-full transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{currency.code}</span>
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c as Currency);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      currency.code === c.code ? 'text-indigo-400 bg-indigo-950/40' : 'text-slate-300'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span>{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Track Order Button */}
          <button
            onClick={onOpenOrderTracker}
            title="Track Recent Order"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-full transition-colors hidden sm:flex items-center justify-center"
          >
            <PackageCheck className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-300 hover:text-pink-400 hover:bg-slate-900 rounded-full transition-colors"
            title="View Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce-short">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-400 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {formatPrice(cartSubtotalUSD, currency.rate, currency.symbol)}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gadgets, audio, drones..."
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm rounded-full pl-10 pr-10 py-2 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
