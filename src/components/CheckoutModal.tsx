import React, { useState } from 'react';
import { CartItem, Currency, Order, ShippingAddress } from '../types';
import { formatPrice } from '../data/products';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Lock, 
  Printer, 
  PackageCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  discountPercent: number;
  appliedPromo: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  discountPercent,
  appliedPromo,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Form State
  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    street: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'volt_pay' | 'crypto'>('card');
  const [cardName, setCardName] = useState('ALEX MORGAN');
  const [cardNumber, setCardNumber] = useState('4532 8890 1234 5678');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('892');

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculations
  const subtotalUSD = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const discountAmountUSD = (subtotalUSD * discountPercent) / 100;
  const afterDiscountUSD = subtotalUSD - discountAmountUSD;
  const taxUSD = afterDiscountUSD * 0.08;
  const isFreeShipping = subtotalUSD >= 50 || appliedPromo === 'FREESHIP';
  const shippingUSD = isFreeShipping ? 0 : 9.99;
  const totalUSD = afterDiscountUSD + taxUSD + shippingUSD;

  const handleFormatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleFormatExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardExpiry(raw);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const steps = [
      "Establishing 256-bit SSL Encrypted Session...",
      "Verifying Card Credentials with Bank...",
      "Reserving Volt Care Warranty Protection...",
      "Order Confirmed!"
    ];

    let currentStep = 0;
    setProcessingStatus(steps[0]);

    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < steps.length - 1) {
        setProcessingStatus(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsProcessing(false);

        // Generate Order
        const newOrderId = `VG-${Math.floor(100000 + Math.random() * 900000)}`;
        const estDate = new Date();
        estDate.setDate(estDate.getDate() + 3);

        const order: Order = {
          orderId: newOrderId,
          items: [...cart],
          subtotal: subtotalUSD,
          discount: discountAmountUSD,
          tax: taxUSD,
          shipping: shippingUSD,
          total: totalUSD,
          currency,
          shippingAddress: { ...shipping },
          paymentMethod,
          status: 'Order Placed',
          createdAt: new Date().toLocaleString(),
          estimatedDelivery: estDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
        };

        setCompletedOrder(order);
        onOrderPlaced(order);
        setStep(3);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white">VoltGadgets Secure Checkout</h2>
          </div>
          {step !== 3 && (
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Steps Indicator */}
        {step !== 3 && (
          <div className="px-6 py-3 bg-slate-950 border-b border-slate-800/80 flex items-center justify-around text-xs">
            <div className={`flex items-center gap-2 font-semibold ${step === 1 ? 'text-indigo-400' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</span>
              <span>Shipping Address</span>
            </div>
            <div className="w-8 h-px bg-slate-800" />
            <div className={`flex items-center gap-2 font-semibold ${step === 2 ? 'text-indigo-400' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
              <span>Payment Details</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shipping.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shipping.street}
                    onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">State / Prov</label>
                    <input
                      type="text"
                      required
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={shipping.zip}
                      onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery method callout */}
              <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl flex items-center justify-between text-xs text-indigo-300">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Volt Express Courier (2-3 Business Days)</span>
                </span>
                <span className="font-bold">{isFreeShipping ? 'FREE' : formatPrice(shippingUSD, currency.rate, currency.symbol)}</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-600/30 text-xs flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              {/* Payment Type Selection */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('volt_pay')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'volt_pay' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Volt Pay / Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'crypto' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Crypto (USDT/BTC)</span>
                </button>
              </div>

              {/* Credit Card Preview Card */}
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div className="relative p-5 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 border border-slate-700/80 shadow-xl overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-extrabold tracking-widest text-indigo-400 uppercase">Volt Platinum Card</span>
                      <CreditCard className="w-6 h-6 text-slate-300" />
                    </div>
                    <div className="text-lg font-mono tracking-widest text-white mb-4">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-300 uppercase">
                      <div>
                        <p className="text-[9px] text-slate-500">Cardholder</p>
                        <p className="font-bold">{cardName || 'YOUR NAME'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500">Expires</p>
                        <p className="font-bold">{cardExpiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Name on Card</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={handleFormatCardNumber}
                        placeholder="4532 0000 0000 0000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Expiry</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={handleFormatExpiry}
                          placeholder="MM/YY"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-indigo-500 font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-indigo-500 font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'volt_pay' && (
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
                  <p className="text-sm font-bold text-white">Volt Instant 1-Click Pay</p>
                  <p className="text-xs text-slate-400">Authenticated via Apple Pay / Google Pay encrypted biometric passkey.</p>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2">
                  <Lock className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-sm font-bold text-white">USDT / BTC Instant Crypto Settlement</p>
                  <p className="text-xs text-slate-400">Decentralized zero-fee payment pipeline via Volt Chain.</p>
                </div>
              )}

              {/* Order Total & Submit */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400">Total Amount Due</p>
                  <p className="text-lg font-extrabold text-indigo-400">
                    {formatPrice(totalUSD, currency.rate, currency.symbol)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isProcessing}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 text-xs flex items-center gap-2 active:scale-95 transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Pay {formatPrice(totalUSD, currency.rate, currency.symbol)}</span>
                        <ShieldCheck className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {isProcessing && (
                <p className="text-center text-xs text-indigo-400 animate-pulse font-medium">
                  {processingStatus}
                </p>
              )}
            </form>
          )}

          {step === 3 && completedOrder && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Payment Received!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Order ID: <strong className="text-indigo-400 font-mono text-sm">{completedOrder.orderId}</strong>
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Ship To:</span>
                  <span className="text-slate-200 font-medium">{completedOrder.shippingAddress.fullName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Delivery:</span>
                  <span className="text-emerald-400 font-bold">{completedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-2">
                  <span>Items Ordered:</span>
                  <span className="text-slate-200 font-semibold">{completedOrder.items.length} Products</span>
                </div>
                <div className="flex justify-between text-slate-200 font-bold text-sm">
                  <span>Total Paid:</span>
                  <span className="text-indigo-400">{formatPrice(completedOrder.total, currency.rate, currency.symbol)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all"
                >
                  Return to Marketplace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
