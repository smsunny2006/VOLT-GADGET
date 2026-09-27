import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  ShoppingCart, 
  CheckCircle2, 
  Zap, 
  HelpCircle 
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const quickPrompts = [
    "Headphones under $200 with active noise cancellation for gym & travel",
    "Best drone for travel 4K filming and beginner safety",
    "High performance mechanical gaming keyboard with thocky switches",
    "Smart watch with long battery life and GPS tracking"
  ];

  const handleAskAI = async (userPrompt?: string) => {
    const promptToUse = userPrompt || query;
    if (!promptToUse.trim()) return;

    setLoading(true);
    setAdvice(null);
    setRecommendedProducts([]);
    setErrorMsg('');

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: promptToUse,
          products,
          budget: budget ? parseFloat(budget) : undefined,
        }),
      });

      const data = await res.json();
      if (data.advice) {
        setAdvice(data.advice);
        if (data.recommendedIds && Array.isArray(data.recommendedIds)) {
          const recs = products.filter((p) => data.recommendedIds.includes(p.id));
          setRecommendedProducts(recs);
        }
      } else {
        setErrorMsg('Unable to process AI recommendation at this time.');
      }
    } catch (err: any) {
      console.error('AI assistant error:', err);
      setErrorMsg('Failed to connect to Volt AI service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Volt AI Tech Advisor</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider">
                  Gemini Powered
                </span>
              </h2>
              <p className="text-xs text-slate-400">Personalized gadget finder and specification comparisons</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Quick Suggestion Chips */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Popular Recommendation Prompts</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(prompt);
                    handleAskAI(prompt);
                  }}
                  className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl text-left transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* User Input Controls */}
          <div className="space-y-3 bg-slate-950 p-4 border border-slate-800 rounded-2xl">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">What are you looking for?</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., I need a gym headset with deep bass and waterproof design under $200..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Max Budget:</span>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="200"
                    className="w-24 bg-slate-900 border border-slate-800 rounded-xl pl-6 pr-2 py-1 text-xs text-white outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={() => handleAskAI()}
                disabled={loading || !query.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-2 px-5 rounded-xl shadow-lg shadow-indigo-600/30 text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Ask Volt AI</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl">
              {errorMsg}
            </p>
          )}

          {/* AI Advice Output */}
          {advice && (
            <div className="p-4 bg-indigo-950/30 border border-indigo-800/60 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Volt AI Recommendation:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                {advice}
              </p>
            </div>
          )}

          {/* Recommended Product Cards */}
          {recommendedProducts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matched Inventory Items</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendedProducts.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex gap-3 items-center">
                    <img src={p.img} alt={p.name} className="w-14 h-14 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{p.name}</h5>
                      <p className="text-xs font-extrabold text-indigo-400">{formatPrice(p.price, currency.rate, currency.symbol)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onAddToCart(p)}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                        <button
                          onClick={() => onQuickView(p)}
                          className="text-slate-400 hover:text-white text-[11px] underline"
                        >
                          Specs
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
