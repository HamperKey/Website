import React from "react";
import { Check, X, ShieldCheck, Heart, Sparkles, Building } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="bg-cream py-24 px-6 md:px-12 relative border-y border-rule/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          
          {/* Left panel: Dark gradient containing full brand mark */}
          <div className="lg:col-span-5 bg-dark rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px] shadow-xl relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial-gradient from-accent/15 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#fe0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Logo image mark inside dark vignette */}
            <div className="relative z-10 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border border-accent/20 transition-transform duration-500 group-hover:scale-[1.03]">
              <img
                src="/src/assets/images/hamperkey_logo_mark_1782062381198.jpg"
                alt="HamperKey Gold Vintage Crest"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-6 text-center z-10 relative">
              <span className="font-serif text-2xl tracking-[2px] font-medium text-warm-white block">
                HAMPER<span className="font-serif-italic italic text-accent-light">KEY</span>
              </span>
              <span className="text-[9px] uppercase tracking-[3px] font-bold text-accent-light mt-1.5 block">
                Pre-Arrival Gourmet Packages
              </span>
            </div>
          </div>

          {/* Right panel: Copy and stats */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-[10px] tracking-[3px] font-bold text-accent uppercase block">About Hamperkey</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-dark tracking-tight leading-tight">
              Not grocery delivery. <br />
              <span className="text-serif-italic text-accent">A welcome, already arranged.</span>
            </h2>
            
            <p className="text-sm text-mid/85 font-light leading-relaxed">
              We founded HamperKey to address the ultimate hospitality friction: the dreaded instant supermarket dash upon arriving at holiday rentals. Driving past gorgeous quiet country villages only to wait in a crowded car park for bread and milk breaks the magic of arriving.
            </p>
            <p className="text-sm text-mid/85 font-light leading-relaxed">
              Our service transforms your check-in day. We coordinate directly with accommodation hosts, boutique managers, and Airbnb operators to securely gain access before you arrive. Our team stocks the fridge, styles the grazing boards, and leaves your larder perfectly filled.
            </p>
            <p className="text-sm text-mid/85 font-light leading-relaxed">
              The idea for HamperKey was born in Hawaii and later accommodated to serve our UK guests, blending effortless island hospitality with the finest regional British craft. Your vacation starts the very second your key turns in the lock.
            </p>

            {/* Stat Callouts Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-rule/50">
              <div>
                <dt className="font-serif text-3xl md:text-4xl font-light text-accent">7+</dt>
                <dd className="text-[10px] tracking-wider uppercase font-bold text-light mt-1">Curated package ranges</dd>
              </div>
              <div>
                <dt className="font-serif text-3xl md:text-4xl font-light text-accent">3</dt>
                <dd className="text-[10px] tracking-wider uppercase font-bold text-light mt-1">Regions covered today</dd>
              </div>
              <div>
                <dt className="font-serif text-3xl md:text-4xl font-light text-accent">72hr</dt>
                <dd className="text-[10px] tracking-wider uppercase font-bold text-light mt-1">Minimum order notice</dd>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="border border-rule/50 rounded-2xl bg-warm-white shadow-sm overflow-hidden" id="comparison-panel">
          <div className="p-8 text-left border-b border-rule/50">
            <span className="text-[10px] tracking-[2.5px] font-bold text-accent uppercase block mb-1">How We Compare</span>
            <h3 className="text-2xl font-serif font-light text-dark">More than a grocery drop.</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-rule/50 bg-stone/20 text-[11px] font-bold text-light uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Service Features</th>
                  <th className="py-4 px-6 font-semibold bg-accent-pale/30 text-accent">HamperKey Welcome Crates</th>
                  <th className="py-4 px-6 font-semibold">Typical Grocery-Drop Service</th>
                </tr>
              </thead>
              <tbody className="text-xs text-mid divide-y divide-rule/30 font-light">
                <tr>
                  <td className="py-4 px-6 font-medium text-dark">Pre-Arrival In-Fridge Setup (unpacking & styling)</td>
                  <td className="py-4 px-6 bg-accent-pale/25 text-sage font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Yes · Prior to Check-in
                    </span>
                  </td>
                  <td className="py-4 px-6 text-light">❌ Left in plastic bags at doorstep or gate</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-dark">Local & Regional British Suppliers Sourced</td>
                  <td className="py-4 px-6 bg-accent-pale/25 text-sage font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Yes · 100% small-batch farms
                    </span>
                  </td>
                  <td className="py-4 px-6 text-light">❌ Standard supermarket chain supply</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-dark">Curated Milestone Occasion Themes (Champagne, Flowers)</td>
                  <td className="py-4 px-6 bg-accent-pale/25 text-sage font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Yes · Custom florists & wineries
                    </span>
                  </td>
                  <td className="py-4 px-6 text-light">❌ Not available / generic items</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-dark">Direct Integration with Property Safe Keys & Managers</td>
                  <td className="py-4 px-6 bg-accent-pale/25 text-sage font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Yes · Unified courier access
                    </span>
                  </td>
                  <td className="py-4 px-6 text-light">❌ Requires guest to wait at location</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-dark">Partner Host Commissions Enabled (10-20%)</td>
                  <td className="py-4 px-6 bg-accent-pale/25 text-sage font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Yes · Passive booking kickbacks
                    </span>
                  </td>
                  <td className="py-4 px-6 text-light">❌ Zero commission integrations</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-dark">Interactive & Fully Bespoke Custom Builder</td>
                  <td className="py-4 px-6 bg-accent-pale/25 text-sage font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Yes · Real-time computation
                    </span>
                  </td>
                  <td className="py-4 px-6 text-light">❌ Fixed mass catalogues only</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-dark">In-Stay Midweek Replenishment options</td>
                  <td className="py-4 px-6 bg-accent-pale/25 text-sage font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Yes · Coordinated repeat drops
                    </span>
                  </td>
                  <td className="py-4 px-6 text-light">❌ Rigid single-delivery slots</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
