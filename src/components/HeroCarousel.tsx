import React, { useState, useEffect } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Zap, 
  Star 
} from 'lucide-react';

interface HeroCarouselProps {
  products: Product[];
  currency: Currency;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  currency,
  onAddToCart,
  onQuickView,
}) => {
  const featured = products.slice(0, 3); // AeroSound, Apex Chrono, Falcon Drone
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const current = featured[currentIndex] || products[0];

  return (
    <div className="relative mb-8">
      {/* Main Hero Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl min-h-[420px] flex items-center">
        {/* Ambient Glowing Background Effect */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content Column */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                {current.badge}
              </span>
              <span className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {current.rating} ({current.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {current.name}
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-xl">
              {current.description}
            </p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 my-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {formatPrice(current.price, currency.rate, currency.symbol)}
              </span>
              {current.originalPrice && (
                <span className="text-slate-500 line-through text-lg font-medium">
                  {formatPrice(current.originalPrice, currency.rate, currency.symbol)}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-2 w-full sm:w-auto">
              <button
                onClick={() => onAddToCart(current)}
                className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 text-sm"
              >
                <span>Add to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onQuickView(current)}
                className="flex-1 sm:flex-none bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-semibold px-5 py-3 rounded-2xl border border-slate-700/80 transition-colors text-sm text-center"
              >
                Explore Tech Specs
              </button>
            </div>
          </div>

          {/* Image Showcase Column */}
          <div className="relative flex justify-center items-center h-64 sm:h-80 md:h-96">
            <div className="relative w-full h-full max-w-md rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/60 shadow-2xl group">
              <img
                src={current.img}
                alt={current.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Highlight Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Top Spec</p>
                  <p className="text-xs text-slate-200 font-medium truncate">
                    {current.highlights?.[0] || "High-Performance Electronics"}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded-md">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % featured.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {featured.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-indigo-500' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Value Proposition Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Free Express Delivery</p>
            <p className="text-[11px] text-slate-400">On all orders over $50</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">2-Year VoltCare Warranty</p>
            <p className="text-[11px] text-slate-400">Full hardware protection</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">30-Day Money-Back</p>
            <p className="text-[11px] text-slate-400">Hassle-free return policy</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">24/7 Tech Support</p>
            <p className="text-[11px] text-slate-400">Expert gadget advice</p>
          </div>
        </div>
      </div>
    </div>
  );
};
