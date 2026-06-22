import React from "react";
import { PARTNER_TYPES } from "../data";
import { Home, Building, Hotel, Sparkles, ArrowRight, Mail } from "lucide-react";

export default function PartnersSection() {
  // Translate string names from data.ts to Lucide objects
  const renderIcon = (name: string) => {
    switch (name) {
      case "Home":
        return <Home className="w-6 h-6 text-accent" />;
      case "Building":
        return <Building className="w-6 h-6 text-accent" />;
      case "Hotel":
        return <Hotel className="w-6 h-6 text-accent" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-accent" />;
      default:
        return <Home className="w-6 h-6 text-accent" />;
    }
  };

  return (
    <section id="partners" className="bg-cream py-24 px-6 md:px-12 relative border-t border-rule/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[3px] font-bold text-accent uppercase block mb-3">Host & Owner Integration</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-dark tracking-tight leading-tight">
            Add revenue to every <span className="text-serif-italic text-accent">booking</span>.
          </h2>
          <p className="text-xs md:text-sm text-mid/80 font-light mt-3 leading-relaxed">
            Partner with HamperKey to easily elevate guest hospitality scorecards while earning healthy passive commission on every order. We provide full digital listings kits, support, and direct room drop-offs—completely managed by our couriers.
          </p>

          {/* Highlighted launch offer */}
          <div className="inline-block mt-6 px-4 py-1.5 rounded-full border border-sage bg-sage-pale/40 text-sage font-bold text-[10px] uppercase tracking-wider">
            ⚡ Founder Partnership: £0 Setup Fee For First 10 Registered Properties
          </div>
        </div>

        {/* 4-column grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {PARTNER_TYPES.map((type) => (
            <div
              key={type.id}
              className="bg-warm-white border border-rule/40 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between"
              id={`partner-card-${type.id}`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-stone/50 border border-rule/30 flex items-center justify-center mb-5 shrink-0">
                  {renderIcon(type.iconName)}
                </div>
                <h3 className="font-serif text-xl font-medium text-dark mb-2">{type.title}</h3>
                <p className="text-xs text-mid/70 leading-relaxed font-light mb-4">{type.description}</p>
              </div>

              <div className="text-[10px] tracking-wide uppercase font-bold text-accent mt-4 border-t border-rule/10 pt-4">
                {type.propertiesRange}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1C1C1D] text-stone p-8 md:p-12 rounded-2xl max-w-4xl mx-auto text-center border border-rule/10 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none" />
          <h3 className="text-2xl font-serif font-light text-warm-white mb-2">Passive Commission, Instant Uplift</h3>
          <p className="text-xs text-stone/70 max-w-xl mx-auto font-light leading-relaxed mb-8">
            Simply add your exclusive partner code to check-in guides or booking emails. We handle 100% of the fulfillment, coordinate scheduling with your housekeeping safe codes, and wire you 10-20% commission on every hamper booked.
          </p>

          <a
            href="mailto:partners@hamperkey.co.uk?subject=HamperKey Partner Inquiry - Interested in Hosting"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-dark font-medium text-xs tracking-wider uppercase rounded-full transition-all text-center"
            id="partner-contact-btn"
          >
            <Mail className="w-4 h-4" />
            <span>Become a Partner</span>
          </a>
        </div>
      </div>
    </section>
  );
}
