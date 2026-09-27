import React, { useState } from 'react';
import { 
  Zap, 
  Mail, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock, 
  ChevronDown 
} from 'lucide-react';

interface FooterProps {
  onShowToast: (title: string, description?: string, type?: 'success' | 'info') => void;
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowToast, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onShowToast('Subscribed to Volt VIP!', 'Check your inbox for an exclusive $15 welcome code.', 'success');
    setEmail('');
  };

  const faqs = [
    {
      q: "What is the delivery timeframe for Volt Express?",
      a: "All orders placed before 2 PM EST are dispatched same-day. Express courier delivery takes 1 to 3 business days depending on location."
    },
    {
      q: "How does the 2-Year VoltCare Warranty work?",
      a: "Every gadget includes 24 months of full hardware protection against manufacturer defects, battery degradation, or component failure with 1-to-1 replacement."
    },
    {
      q: "What is VoltGadgets' return policy?",
      a: "We offer a 30-day hassle-free money-back guarantee. If you are not 100% satisfied with your tech gadget, return it in original packaging for a full refund."
    }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-16 text-slate-400 text-xs">
      {/* Top VIP Newsletter Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Volt Insider VIP
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Unlock $15 Off Your First Order
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Get exclusive access to flash tech sales, gadget teardowns, and VIP promo codes.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all shrink-0 active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links & FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4 fill-white/20" />
            </div>
            <span className="text-base font-extrabold text-white">VoltGadgets</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Your premier destination for high-performance audio, smart wearables, 4K drones, and gaming hardware.
          </p>
          <div className="flex items-center gap-2 pt-2 text-slate-300 font-semibold">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Bank-Grade SSL Encrypted</span>
          </div>
        </div>

        {/* Categories Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Categories</h4>
          <ul className="space-y-2">
            {['Audio', 'Wearables', 'Cameras', 'Gaming', 'Smart Home', 'Power & Accessories'].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onSelectCategory(cat)}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ Accordion */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Frequently Asked Questions</h4>
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-3 text-left font-bold text-slate-200 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-3 border-t border-slate-800 text-slate-400 leading-relaxed bg-slate-950/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="bg-slate-950/90 border-t border-slate-800/80 py-4 px-4 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} VoltGadgets Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Volt Care Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
