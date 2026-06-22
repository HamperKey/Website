import React, { useState, useMemo } from "react";
import { PACKAGES } from "../data";
import { PackageItem } from "../types";
import { ShoppingBasket, Plus, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PackagesSectionProps {
  onSelectPackageInBuilder: (baseOptionId: string) => void;
  onAddToCart: (item: any) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Packages" },
  { id: "couples", label: "Couples" },
  { id: "families", label: "Families" },
  { id: "groups", label: "Groups" },
  { id: "occasions", label: "Occasions" },
];

export default function PackagesSection({ onSelectPackageInBuilder, onAddToCart }: PackagesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter package options based on category text match
  const filteredPackages = useMemo(() => {
    if (activeCategory === "all") return PACKAGES;
    return PACKAGES.filter((p) => p.category.includes(activeCategory));
  }, [activeCategory]);

  const handleSelectAndScroll = (pkgId: string) => {
    // Translate standard product id to builder step 1 options
    let optionId = "base-none";
    if (pkgId === "first-24-hours") optionId = "base-first-24";
    else if (pkgId === "classic-arrival") optionId = "base-classic";
    else if (pkgId === "wine-cheese-nibbles") optionId = "base-wine-cheese";
    else if (pkgId === "family-no-shop") optionId = "base-family";
    else if (pkgId === "group-house-starter") optionId = "base-group";
    
    // Select it in builder
    onSelectPackageInBuilder(optionId);

    // Scroll to compiler section
    const el = document.getElementById("builder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="packages" className="bg-stone py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[3px] font-bold text-accent uppercase block mb-3">The Cellar & Larder</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-dark tracking-tight leading-tight">
            Curated for every <span className="text-serif-italic text-accent">kind of stay</span>.
          </h2>
          <p className="text-xs md:text-sm text-mid/80 font-light mt-3 max-w-lg mx-auto">
            Choose a bespoke hamper designed for your arrival. Freshly filled with local ingredients and delivered straight to your room kitchen before you arrives.
          </p>

          {/* Filter Pill Buttons Grid */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8 max-w-xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 text-xs font-medium rounded-full cursor-pointer transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-dark text-stone font-semibold"
                    : "bg-cream text-mid/85 border border-rule/50 hover:border-mid/30"
                }`}
                id={`filter-tab-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Hampers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="packages-grid">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.90 }}
                transition={{ duration: 0.4 }}
                key={pkg.id}
                className="bg-cream border border-rule/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group"
                id={`package-card-${pkg.id}`}
              >
                <div>
                  {/* Photo/Gradient styled header card */}
                  <div className="h-48 relative overflow-hidden border-b border-rule/20 flex items-center justify-center">
                    {pkg.imageUrl ? (
                      <>
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-tr ${pkg.gradientFrom} ${pkg.gradientTo}`} />
                        <div className="absolute inset-0 bg-black/5" />
                      </>
                    )}
                    
                    {/* Floating Accent badges */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-dark/85 backdrop-blur-md text-warm-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md border border-[#d4af37]/15">
                        {pkg.badge === "Flagship" && <Star className="w-2.5 h-2.5 text-accent-light fill-accent-light" />}
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Emoji if no image, or as overlay center */}
                    {!pkg.imageUrl ? (
                      <div className="text-4xl filter drop-shadow relative z-10 transition-transform duration-500 group-hover:scale-110">
                        {pkg.emoji}
                      </div>
                    ) : (
                      <div className="absolute bottom-3 right-3 z-10 bg-dark/75 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-base">
                        {pkg.emoji}
                      </div>
                    )}
                  </div>

                  {/* Body description panel */}
                  <div className="p-6 text-left">
                    <h3 className="font-serif text-xl sm:text-2xl text-dark font-medium leading-tight mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-mid/70 leading-relaxed font-light min-h-[48px]">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                {/* Pricing and Cart Buttons row */}
                <div className="px-6 pb-6 pt-4 border-t border-rule/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] text-light uppercase tracking-wider block">Price Value</span>
                    <span className="font-serif text-lg font-semibold text-dark">
                      £{pkg.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Customize link */}
                    <button
                      onClick={() => handleSelectAndScroll(pkg.id)}
                      className="text-[10px] font-bold uppercase tracking-wider text-mid hover:text-accent transition-colors cursor-pointer"
                      title="Adjust items inside this package"
                    >
                      Customize
                    </button>

                    {/* Add to basket button */}
                    <button
                      onClick={() => onAddToCart({
                        id: pkg.id,
                        name: pkg.name,
                        price: pkg.price,
                        emoji: pkg.emoji,
                        imageUrl: pkg.imageUrl
                      })}
                      className="px-4 py-2 bg-dark hover:bg-accent text-warm-white hover:text-dark text-[10px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 flex items-center gap-1 cursor-pointer shadow-md"
                    >
                      <span>Add to Basket</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Minimal helper for custom builder */}
        <div className="mt-16 text-center border-t border-rule/40 pt-10 max-w-xl mx-auto">
          <p className="text-xs text-light leading-relaxed">
            Need something fully tailored to dietary needs or special occasions? Try our interactive custom hamper configurations to buy precisely what you want.
          </p>
          <a
            href="#builder"
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-light font-bold uppercase tracking-wider mt-3"
          >
            <span>Launch Custom Builder</span>
            <span className="text-serif-italic">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
