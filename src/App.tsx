/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSlideshow from "./components/HeroSlideshow";
import AboutSection from "./components/AboutSection";
import PackagesSection from "./components/PackagesSection";
import InteractiveBuilder from "./components/InteractiveBuilder";
import PartnersSection from "./components/PartnersSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import AiAssistant from "./components/AiAssistant";
import CartDrawer from "./components/CartDrawer";
import { StickySidebarAd, AdPlaceholder } from "./components/SidebarAd";
import { MapPin, Sparkles, Percent, Calendar, Heart, ShieldAlert, Award, Check, ExternalLink, Sparkle } from "lucide-react";
import { CartItem } from "./types";

export default function App() {
  // Master state for the selected package choice, communicated between Packages and Builder
  const [selectedBaseId, setSelectedBaseId] = useState<string>("base-first-24");

  // Persistent shopping cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("hk_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [successDetails, setSuccessDetails] = useState<{
    sessionId: string;
    guestName?: string;
    propertyName?: string;
    deliveryDate?: string;
    total?: string;
    isSimulated?: boolean;
  } | null>(null);

  // Sync cart state with LocalStorage
  useEffect(() => {
    localStorage.setItem("hk_cart", JSON.stringify(cart));
  }, [cart]);

  // Hook up URL parameter parsing for successful Stripe redirections on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (sessionId) {
      setSuccessDetails({
        sessionId,
        guestName: params.get("guestName") || undefined,
        propertyName: params.get("propertyName") || undefined,
        deliveryDate: params.get("deliveryDate") || undefined,
        total: params.get("total") || undefined,
        isSimulated: params.get("simulated") === "true",
      });

      // Wipe out URL params so they don't prompt on page refreshes
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      // Successfully processed pre-arrival payload - clear active cart larder
      setCart([]);
      localStorage.removeItem("hk_cart");
    }
  }, []);

  // Cart operations
  const handleAddToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-stone selection:bg-accent-pale selection:text-dark">
      {/* 1 & 2. Top-bar Availability + Header Sticky Menu */}
      <Header cartCount={cart.reduce((qty, i) => qty + i.quantity, 0)} onOpenCart={() => setCartDrawerOpen(true)} />

      {/* 3. Immersive Hero Rotating Slideshow */}
      <HeroSlideshow />

      {/* 4. Coverage Banner (pale gold background, full width) */}
      <section className="bg-accent-pale/45 py-8 border-y border-rule/30 px-6" id="coverage-banner">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-medium text-dark flex items-center justify-center md:justify-start gap-1">
              <MapPin className="w-5 h-5 text-accent" />
              <span>📍 Where we deliver today</span>
            </h3>
            <p className="text-xs text-mid/80 font-light">
              Direct pre-arrival delivery slots booked dynamically to cottage safes or resort desks.
            </p>
          </div>

          {/* Active pills */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 shrink-0">
            {["London (Zones 1-6)", "South East England", "East of England"].map((region) => (
              <span
                key={region}
                className="bg-warm-white border border-rule/65 text-dark font-semibold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Main content area uses a 3-column layout on desktop */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 flex items-start gap-6 justify-center">
        {/* Sticky Left Ad Sidebar */}
        <StickySidebarAd position="left" />

        {/* Centered Main Core Section Group (max-width 1100px) */}
        <main className="w-full max-w-[1100px] shrink grow space-y-1">
          
          {/* 6. About Section - Detailed stories & comparison tables */}
          <AboutSection />

          {/* 7. Packages Showcase Section - Displays 9 available boxes */}
          <PackagesSection onSelectPackageInBuilder={setSelectedBaseId} onAddToCart={handleAddToCart} />

          {/* 8. Mid-page Horizontal Ad Banner Placeholder (dashed, 970x120) */}
          <div className="py-8 flex justify-center overflow-x-auto w-full max-w-full" id="mid-page-ad">
            <AdPlaceholder
              width={970}
              height={120}
              label="Luxury country lifestyle brands, transport transfers & regional heritage winery spotlights."
              className="max-w-full scale-90 sm:scale-100 origin-center shrink-0"
            />
          </div>

        </main>

        {/* Sticky Right Ad Sidebar */}
        <StickySidebarAd position="right" />
      </div>

      {/* 9. Build Your Own Hamper - Interactive Custom Builder */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <InteractiveBuilder baseId={selectedBaseId} setBaseId={setSelectedBaseId} onAddCustomToCart={handleAddToCart} />
      </div>

      {/* 10. "Why HamperKey" Differentiator Strip (pale sage background, full width) */}
      <section className="bg-sage-pale/40 py-20 px-6 md:px-12 border-y border-rule/30" id="why-hamperkey">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[3px] font-bold text-sage uppercase block mb-3">Core Differences</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-dark tracking-tight">
              Pre-arrival logistics, <span className="text-serif-italic text-sage">uncompromisingly refined</span>.
            </h2>
            <p className="text-xs md:text-sm text-mid/85 font-light mt-3 max-w-md mx-auto">
              Our bespoke welcome packages are packed at regional farm hubs and loaded into key boxes securely, before your vacation countdown starts.
            </p>
          </div>

          {/* 4-column grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3.5 text-left bg-warm-white/70 border border-rule/20 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-sage-pale flex items-center justify-center text-sage shrink-0 border border-sage/10">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-dark">Regional Coverage</h3>
              <p className="text-xs text-mid/70 leading-relaxed font-light">
                Direct farm connections spanning London, Surrey, Kent, Sussex, Suffolk, Norfolk, and Cambridgeshire.
              </p>
            </div>

            <div className="space-y-3.5 text-left bg-warm-white/70 border border-rule/20 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-sage-pale flex items-center justify-center text-sage shrink-0 border border-sage/10">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-dark">Occasion Packages</h3>
              <p className="text-xs text-mid/70 leading-relaxed font-light">
                Celebrate birthdays, anniversaries, or honeymoons with hand-arranged wildflower vases and reserve Champagne.
              </p>
            </div>

            <div className="space-y-3.5 text-left bg-warm-white/70 border border-rule/20 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-sage-pale flex items-center justify-center text-sage shrink-0 border border-sage/10">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-dark">Every Property Type</h3>
              <p className="text-xs text-mid/70 leading-relaxed font-light">
                Compatible with remote holiday cottages, serviced flats, boutique resort suites, and grand villas alike.
              </p>
            </div>

            <div className="space-y-3.5 text-left bg-warm-white/70 border border-rule/20 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-sage-pale flex items-center justify-center text-sage shrink-0 border border-sage/10">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-dark">Partner Commission</h3>
              <p className="text-xs text-mid/70 leading-relaxed font-light">
                Generous 10% to 20% passive revenue splits on all guest hamper sales with zero setup fees for hosts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. For Partners Section (cream background) */}
      <PartnersSection />

      {/* 12. FAQ Section (stone background) */}
      <FaqSection />

      {/* 13. Deep Dark Footer */}
      <Footer />

      {/* 14. Floating Gourmet AI Concierge Widget */}
      <AiAssistant selectedBaseId={selectedBaseId} setSelectedBaseId={setSelectedBaseId} />

      {/* 15. Luxury Sliding Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* 16. Checkout Success Celebration Modal Overlay */}
      {successDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
          <div className="bg-stone text-dark rounded-3xl p-8 max-w-lg w-full border border-accent/25 shadow-2xl relative overflow-hidden text-center">
            {/* Elegant luxury ambient accent */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-sage/10 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing gold success badge */}
            <div className="w-20 h-20 bg-dark text-accent rounded-full border border-accent/30 flex items-center justify-center mx-auto mb-6 shadow-xl relative animate-bounce">
              <Check className="w-10 h-10" />
              <Sparkle className="w-4 h-4 text-accent absolute top-2 right-2 animate-pulse" />
            </div>

            <span className="text-[10px] tracking-[4px] uppercase font-bold text-accent mb-2 block font-mono">
              Pre-Arrival Confirmed
            </span>
            <h2 className="font-serif text-3xl font-light text-dark tracking-tight mb-3">
              Your Vacation Larder is Secured!
            </h2>
            <p className="text-xs text-mid/80 max-w-sm mx-auto leading-relaxed font-light mb-6">
              Our regional logistics coordinators have already updated your host safe registry. Your welcome provisions will be stacked neatly in the larder before you slide the front door open.
            </p>

            {/* Render dynamically passed coordinates securely */}
            <div className="bg-warm-white border border-rule/20 rounded-2xl p-5 mb-6 text-left space-y-3.5 text-xs">
              <h4 className="font-serif font-semibold text-dark border-b border-rule/10 pb-1.5 uppercase tracking-wider text-[10px] text-accent flex items-center justify-between">
                <span>Pre-Arrival Setup Slate</span>
                <span className="font-mono text-[9px] text-mid bg-stone px-2 py-0.5 rounded">Ordered</span>
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-light block uppercase font-bold">Host Lead Guest</span>
                  <span className="font-semibold text-dark">{successDetails.guestName || "Margaret Thatcher"}</span>
                </div>
                <div>
                  <span className="text-[9px] text-light block uppercase font-bold">Check-In Date</span>
                  <span className="font-semibold text-dark">{successDetails.deliveryDate || "Arrival Day"}</span>
                </div>
              </div>
              <div>
                <span className="text-[9px] text-light block uppercase font-bold">Accommodation Address</span>
                <span className="font-semibold text-dark">{successDetails.propertyName || "Curated Country Cottage"}</span>
              </div>
              <div className="pt-2 border-t border-rule/10 flex justify-between font-mono font-bold text-dark text-xs items-baseline">
                <span>Total Settled via Stripe:</span>
                <span className="text-accent underline decoration-accent-pale decoration-2">
                  £{successDetails.total ? Number(successDetails.total).toFixed(2) : "89.00"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSuccessDetails(null)}
              className="w-full py-3 bg-dark hover:bg-accent text-warm-white hover:text-dark font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md cursor-pointer"
            >
              Exquisite, thank you
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
