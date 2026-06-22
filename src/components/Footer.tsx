import React from "react";
import { Mail, MapPin, Landmark, ExternalLink } from "lucide-react";

export default function Footer() {
  const regions = ["London (Zones 1-6)", "Kent & Sussex", "Suffolk & Norfolk", "Essex & Hertfordshire"];

  return (
    <footer className="bg-dark text-stone pt-20 pb-8 px-6 md:px-12 border-t border-rule/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-rule/10 text-left">
          
          {/* Column 1: Brand & Desc */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded border border-accent/20 bg-stone overflow-hidden shrink-0">
                <img
                  src="/src/assets/images/hamperkey_logo_mark_1782062381198.jpg"
                  alt="HamperKey Logo Footer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-sans text-base font-normal text-warm-white tracking-wider">
                Hamper<span className="font-serif italic font-medium text-accent-light">Key</span>
              </span>
            </a>
            <p className="text-xs text-stone/60 font-light leading-relaxed max-w-xs">
              UK's premier pre-access accommodation food and drink styling service. Delivering farm-to-larder gourmet provisions direct to bedrooms and kitchens since 2024.
            </p>
            <div className="text-xs text-accent-light/80 font-serif-italic font-medium">
              "The key to a perfect arrival"
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#B2AA9C]">Grid Directory</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="text-stone/70 hover:text-accent-light transition-colors">
                  Welcome Lobby
                </a>
              </li>
              <li>
                <a href="#about" className="text-stone/70 hover:text-accent-light transition-colors">
                  Our Hospitality Comparison
                </a>
              </li>
              <li>
                <a href="#packages" className="text-stone/70 hover:text-accent-light transition-colors">
                  Ready Hampers
                </a>
              </li>
              <li>
                <a href="#builder" className="text-stone/70 hover:text-accent-light transition-colors">
                  Live Custom Builder
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#B2AA9C]">Host Alliances</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#partners" className="text-stone/70 hover:text-accent-light transition-colors">
                  Passive Host Commission
                </a>
              </li>
              <li>
                <a href="mailto:partners@hamperkey.co.uk?subject=Supplier Application" className="text-stone/70 hover:text-accent-light transition-colors">
                  Supplier Sourcing Program
                </a>
              </li>
              <li>
                <a href="#faq" className="text-stone/70 hover:text-accent-light transition-colors">
                  Booking & Safe-Key FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact and Regions */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#B2AA9C]">Concierge</h4>
            <div className="space-y-3.5 text-xs text-stone/70 font-light">
              <a href="mailto:concierge@hamperkey.co.uk" className="flex items-center gap-2 hover:text-accent-light transition-colors">
                <Mail className="w-3.5 h-3.5 text-accent-light" />
                <span>concierge@hamperkey.co.uk</span>
              </a>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-accent-light shrink-0" />
                <div className="space-y-1">
                  <span className="block font-bold text-stone/80 text-[10px] uppercase">Active Hubs</span>
                  <div className="flex flex-wrap gap-1">
                    {regions.map((reg) => (
                      <span key={reg} className="bg-white/5 px-2 py-0.5 rounded text-[9px] text-stone/80">
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-stone/50 font-mono tracking-wider">
          <div>
            &copy; {new Date().getFullYear()} HamperKey Ltd. Sourced organically across Great Britain.
          </div>
          <div className="flex gap-4">
            <a href="#faq" className="hover:text-accent-light transition-all">72h NOTICE TERMS</a>
            <span>&middot;</span>
            <a href="#faq" className="hover:text-accent-light transition-all">CANCELLATION RULES</a>
            <span>&middot;</span>
            <a href="#about" className="hover:text-accent-light transition-all font-sans font-bold flex items-center gap-0.5">
              <span>UK QUALITY TRUST</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
