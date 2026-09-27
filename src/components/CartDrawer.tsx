import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../data/products';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Tag, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQty: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  appliedPromo: string;
  setAppliedPromo: (promo: string) => void;
  discountPercent: number;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  appliedPromo,
  setAppliedPromo,
  discountPercent,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotalUSD = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const discountAmountUSD = (subtotalUSD * discountPercent) / 100;
  const afterDiscountUSD = subtotalUSD - discountAmountUSD;
  const taxUSD = afterDiscountUSD * 0.08;

  const FREE_SHIPPING_THRESHOLD = 50;
  const isFreeShipping = subtotalUSD >= FREE_SHIPPING_THRESHOLD || appliedPromo === 'FREESHIP';
  const shippingUSD = isFreeShipping ? 0 : 9.99;
  const remainingForFreeShipUSD = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalUSD);

  const totalUSD = afterDiscountUSD + taxUSD + shippingUSD;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();

    if (code === 'VOLT20') {
      setAppliedPromo('VOLT20');
      setPromoInput('');
    } else if (code === 'TECH10') {
      setAppliedPromo('TECH10');
      setPromoInput('');
    } else if (code === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try VOLT20, TECH10, or FREESHIP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold">
                {cart.reduce((acc, item) => acc + item.qty, 0)} Items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-slate-950 border-b border-slate-800 px-5 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-cyan-400" />
                {isFreeShipping ? (
                  <strong className="text-emerald-400 font-semibold">🎉 FREE Express Shipping unlocked!</strong>
                ) : (
                  <span>Add <strong>{formatPrice(remainingForFreeShipUSD, currency.rate, currency.symbol)}</strong> more for FREE shipping</span>
                )}
              </span>
              <span className="text-slate-500 font-mono text-[10px]">{Math.min(100, Math.round((subtotalUSD / FREE_SHIPPING_THRESHOLD) * 100))}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (subtotalUSD / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-4">
                  Explore our electronics, ANC headphones, smartwatches, and drones!
                </p>
                <button
                  onClick={onClose}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl flex gap-3 items-center group"
                >
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-extrabold text-indigo-400 mt-0.5">
                      {formatPrice(item.product.price, currency.rate, currency.symbol)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg">
                        <button
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. VOLT20)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-indigo-500 uppercase placeholder:normal-case placeholder:text-slate-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-rose-400">{promoError}</p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-indigo-950/50 border border-indigo-800/60 p-2 rounded-xl text-indigo-300">
                  <span className="flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Code applied: <strong>{appliedPromo}</strong>
                  </span>
                  <button
                    onClick={() => setAppliedPromo('')}
                    className="text-slate-400 hover:text-white text-[10px] underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-semibold">{formatPrice(subtotalUSD, currency.rate, currency.symbol)}</span>
                </div>

                {discountAmountUSD > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmountUSD, currency.rate, currency.symbol)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-200">{formatPrice(taxUSD, currency.rate, currency.symbol)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-400">FREE</strong> : formatPrice(shippingUSD, currency.rate, currency.symbol)}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Payable</span>
                  <span className="text-indigo-400">{formatPrice(totalUSD, currency.rate, currency.symbol)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
