import React, { useState } from "react";
import { CartItem } from "../types";
import { X, Trash2, Plus, Minus, ShoppingBag, Lock, Calendar, MapPin, User, KeyRound, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [guestName, setGuestName] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [keySafeOrCode, setKeySafeOrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Derive final values if we have bespoke hampers already populated
  React.useEffect(() => {
    if (cart.length > 0) {
      // Pre-fill fields if a bespoke item has coordinates filled
      const bespokeItem = cart.find(item => (item as any).propertyName || (item as any).deliveryDate);
      if (bespokeItem) {
        if ((bespokeItem as any).guestName && !guestName) setGuestName((bespokeItem as any).guestName);
        if ((bespokeItem as any).propertyName && !propertyName) setPropertyName((bespokeItem as any).propertyName);
        if ((bespokeItem as any).deliveryDate && !deliveryDate) setDeliveryDate((bespokeItem as any).deliveryDate);
        if ((bespokeItem as any).keySafeOrCode && !keySafeOrCode) setKeySafeOrCode((bespokeItem as any).keySafeOrCode);
      }
    }
  }, [cart]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!propertyName || !deliveryDate) {
      setErrorMessage("Please enter both a Check-In Date and Property/Cottage Name for pre-arrival setup.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            details: item.details
          })),
          successUrl: `${window.location.origin}/`,
          cancelUrl: window.location.href,
          customerInfo: {
            guestName,
            propertyName,
            deliveryDate,
            keySafeOrCode
          }
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate Stripe credentials.");
      }

      if (data.url) {
        // Redirect to Stripe Checkout or Simulation success URL
        window.location.href = data.url;
      } else {
        throw new Error("No payment gateway URL returned.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected network error occurred. Please contact Support.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000]/60 backdrop-blur-sm z-50 pointer-events-auto"
            id="cart-backdrop"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-stone text-dark shadow-2xl z-50 flex flex-col pointer-events-auto border-l border-rule/30"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="p-6 border-b border-rule/25 flex items-center justify-between bg-warm-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="font-serif text-lg font-semibold tracking-tight text-dark">
                  Your Gourmet Basket
                </h2>
                <span className="bg-accent/15 border border-accent/25 text-dark font-sans font-bold text-[10px] uppercase px-2 py-0.5 rounded-full">
                  {cart.reduce((qty, i) => qty + i.quantity, 0)} Items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2.5 rounded-full hover:bg-neutral-100 text-mid hover:text-dark transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List scroll container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-dashed border-rule/40 flex items-center justify-center text-dark/30 mx-auto">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-light text-base text-dark/70">Your basket is empty</h3>
                    <p className="text-xs text-mid/60 mt-1 max-w-xs mx-auto font-light leading-relaxed">
                      Explore our farm packages or build a bespoke curation to fill your vacation cottage larder.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-[10px] font-bold tracking-wider uppercase text-accent border border-accent/30 rounded-full hover:bg-accent hover:text-dark transition-all duration-300 cursor-pointer"
                  >
                    Browse Packages
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-rule/10">
                    <span className="text-[10px] uppercase tracking-wider text-mid font-bold">Selected Items</span>
                    <button
                      onClick={onClearCart}
                      className="text-[9px] uppercase tracking-wider text-[#e45a5a] hover:underline font-bold"
                    >
                      Empty Basket
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-warm-white border border-rule/15 rounded-xl flex gap-3 relative hover:shadow-sm transition-all"
                    >
                      {/* Thumbnail photo */}
                      <div className="w-16 h-16 rounded-lg bg-stone flex items-center justify-center shrink-0 border border-rule/20 overflow-hidden relative">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-2xl">{item.emoji || "🎁"}</span>
                        )}
                      </div>

                      {/* Content panel */}
                      <div className="flex-1 text-left flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-semibold text-dark leading-tight">{item.name}</h4>
                            <span className="font-mono text-xs font-semibold text-dark">
                              £{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          {item.details && (
                            <p className="text-[9px] text-mid/80 mt-1 leading-relaxed line-clamp-2">
                              {item.details}
                            </p>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-rule/5">
                          <div className="flex items-center border border-rule/35 bg-stone rounded-full px-2 py-0.5 scale-90 origin-left">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="text-mid hover:text-dark transition-colors p-0.5 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-medium text-dark font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-mid hover:text-dark transition-colors p-0.5 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-mid hover:text-[#e45a5a] transition-all p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery logistics form - only rendered if items in cart */}
              {cart.length > 0 && (
                <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-rule/20 text-left">
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[10px] uppercase tracking-wider text-dark font-bold font-serif">
                      Pre-Arrival Delivery Parameters
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-light block">
                      Lead Guest Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-mid absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Margaret Thatcher"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-warm-white border border-rule/40 rounded-lg pl-9 pr-3 py-1.5 text-xs text-dark focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-light block">
                      Check-In Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-mid absolute left-3 top-2.5" />
                      <input
                        type="date"
                        required
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-warm-white border border-rule/40 rounded-lg pl-9 pr-3 py-1.5 text-xs text-dark focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-light block">
                      Cottage / Property Name & Address *
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-mid absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hill Cottage, Rye TN31 7HU"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="w-full bg-warm-white border border-rule/40 rounded-lg pl-9 pr-3 py-1.5 text-xs text-dark focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-light block">
                      Key Safe Code / Safe box status
                    </label>
                    <div className="relative">
                      <KeyRound className="w-3.5 h-3.5 text-mid absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. Code 4820 or 'Host will leave unlock'"
                        value={keySafeOrCode}
                        onChange={(e) => setKeySafeOrCode(e.target.value)}
                        className="w-full bg-warm-white border border-rule/40 rounded-lg pl-9 pr-3 py-1.5 text-xs text-dark focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-rule/25 bg-warm-white space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-light text-mid">
                    <span>Basket Subtotal</span>
                    <span>£{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-light text-mid">
                    <span>Pre-Arrival Setup & Packing</span>
                    <span className="text-sage font-semibold uppercase text-[10px] tracking-wide">Included (Free)</span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-semibold text-dark pt-2 border-t border-rule/10">
                    <span>Total Amount</span>
                    <span className="text-accent font-mono">£{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="text-[11px] text-[#e45a5a] text-center border border-[#e45a5a]/20 bg-[#e45a5a]/5 p-2 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3.5 bg-dark hover:bg-accent text-warm-white hover:text-dark font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 border border-[#d4af37]/15 disabled:opacity-55 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>Synchronizing Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>Checkout Securely with Stripe</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1 text-[10px] text-mid/60 font-light font-mono">
                  <CreditCard className="w-3 h-3" />
                  <span>Powered by Stripe. Encrypted, safe pre-arrival settlement.</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
