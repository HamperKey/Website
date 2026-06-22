import React, { useState } from "react";
import { Menu, X, Landmark, ShieldCheck, MapPin, ShoppingBag } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Packages", href: "#packages" },
    { label: "Build Your Hamper", href: "#builder" },
    { label: "For Partners", href: "#partners" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* 1. Region delivery strip above navigation */}
      <div className="bg-dark text-stone text-[11px] py-2 px-6 text-center border-b border-rule/10">
        <span className="font-light tracking-wide text-xs">
          Currently delivering to <strong className="text-accent-light font-bold">London</strong>, <strong className="text-accent-light font-bold">South East England</strong> & <strong className="text-accent-light font-bold">East of England</strong> — more regions coming soon
        </span>
      </div>

      {/* 2. Primary Navigation Glass-Blended Bar */}
      <nav className="bg-cream/92 backdrop-blur-md border-b border-rule/40 px-6 md:px-12 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo design with mini crest */}
        <a href="#home" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-accent/20 bg-dark shrink-0 shadow-sm leading-none">
            <img
              src="/src/assets/images/hamperkey_logo_mark_1782062381198.jpg"
              alt="HamperKey Logo Small"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-sans text-[17px] font-normal text-dark tracking-[1px]">
            Hamper<span className="font-serif italic font-medium text-accent">Key</span>
          </span>
        </a>

        {/* Desktop Links list */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-mid/85 font-medium tracking-wide hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Dark Call-to-action & Shopping Basket */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            id="hk-cart-trigger"
            onClick={onOpenCart}
            className="p-2 px-4 rounded-full border border-rule/50 hover:border-accent bg-transparent text-dark hover:text-accent transition-all duration-300 flex items-center gap-2 relative cursor-pointer"
            title="Open basket"
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-accent" />
            <span className="text-xs uppercase tracking-wider font-semibold font-sans">Basket</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-dark text-stone text-[9px] font-bold flex items-center justify-center animate-pulse border border-accent/25">
                {cartCount}
              </span>
            )}
          </button>
          
          <a
            href="#builder"
            className="px-5 py-2 bg-dark hover:bg-accent text-stone hover:text-dark text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300"
          >
            Get Started
          </a>
        </div>

        {/* Mobile controls: Cart + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCart}
            className="p-2 rounded-full border border-rule/30 text-dark relative flex items-center justify-center cursor-pointer"
            aria-label="Open basket mobile"
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-dark" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-dark text-[8px] font-bold flex items-center justify-center border border-cream">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-dark p-2 hover:bg-stone/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream border-b border-rule/50 py-5 px-6 space-y-3 shadow-xl flex flex-col text-left absolute top-full left-0 w-full z-40 transition-all duration-300 animate-fadeUp">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-dark/85 font-medium tracking-wide py-1.5 hover:text-accent transition-colors border-b border-rule/10 last:border-0 block"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#builder"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block px-4 py-2.5 bg-dark hover:bg-accent text-stone hover:text-dark text-xs uppercase tracking-wider font-bold rounded-full transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
