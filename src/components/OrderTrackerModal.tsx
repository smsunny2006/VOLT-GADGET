import React, { useState } from 'react';
import { Order, Currency } from '../types';
import { formatPrice } from '../data/products';
import { X, PackageCheck, Search, CheckCircle2, Clock, Truck, Home } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
  currency: Currency;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  currency,
}) => {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(
    recentOrders.length > 0 ? recentOrders[recentOrders.length - 1] : null
  );

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = recentOrders.find((o) => o.orderId.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setActiveOrder(found);
    } else {
      alert('Order ID not found in recent local session orders.');
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received & Authorized', icon: CheckCircle2 },
    { title: 'Picked & Packed', desc: 'Volt Fulfillment Hub', icon: Clock },
    { title: 'In Transit', desc: 'Express Courier Dispatch', icon: Truck },
    { title: 'Delivered', desc: 'Sign at Destination', icon: Home },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Volt Order Tracker</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchOrder} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID (e.g. VG-849201)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white outline-none focus:border-indigo-500 font-mono"
            />
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl">
            Lookup
          </button>
        </form>

        {/* Order Details View */}
        {activeOrder ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Order Reference:</span>
                <span className="font-mono font-bold text-indigo-400 text-sm">{activeOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Order Placed:</span>
                <span className="text-slate-200">{activeOrder.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Delivery:</span>
                <span className="text-emerald-400 font-bold">{activeOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount:</span>
                <span className="text-white font-extrabold">{formatPrice(activeOrder.total, currency.rate, currency.symbol)}</span>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fulfillment Status</h4>
              <div className="grid grid-cols-4 gap-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx === 0 || idx === 1; // Simulated progress
                  return (
                    <div key={idx} className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 ${
                      isDone ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4 mb-0.5" />
                      <span className="text-[10px] font-bold leading-tight">{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Summary */}
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {activeOrder.items.map((item) => (
                <div key={item.product.id} className="p-2 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.product.img} alt={item.product.name} className="w-8 h-8 rounded object-cover" />
                    <span className="text-slate-200 truncate max-w-[180px] font-medium">{item.product.name}</span>
                  </div>
                  <span className="text-slate-400 font-mono">x{item.qty} ({formatPrice(item.product.price * item.qty, currency.rate, currency.symbol)})</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            No recent orders placed in this session yet.
          </div>
        )}
      </div>
    </div>
  );
};
