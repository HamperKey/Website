import React, { useState, useMemo } from "react";
import { BUILDER_STEPS } from "../data";
import { BuilderOption } from "../types";
import { Check, Calendar, MapPin, KeyRound, AlertTriangle, Sparkles, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveBuilderProps {
  baseId: string;
  setBaseId: (id: string) => void;
  onAddCustomToCart: (item: any) => void;
}

export default function InteractiveBuilder({ baseId, setBaseId, onAddCustomToCart }: InteractiveBuilderProps) {
  // Step 2: Breakfast selection (defaults to traditional full-english element or none)
  const [breakfastId, setBreakfastId] = useState<string>("breakfast-traditional");

  // Step 3: Dinner selection (defaults to dinner-none)
  const [dinnerId, setDinnerId] = useState<string>("dinner-none");

  // Step 4: Finishing touches (multi-select, starts empty)
  const [finishingTouches, setFinishingTouches] = useState<string[]>([]);

  // Simple checkout fields
  const [deliveryDate, setDeliveryDate] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [hostName, setHostName] = useState("");
  const [keySafeOrCode, setKeySafeOrCode] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Toggle for multi-select
  const handleToggleTouch = (id: string) => {
    setFinishingTouches((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Find selected options to count pricing
  const selections = useMemo(() => {
    const list: { name: string; price: number; step: string }[] = [];

    // Step 1
    const baseOpt = BUILDER_STEPS[0].options.find((o) => o.id === baseId);
    if (baseOpt && baseOpt.price > 0) {
      list.push({ name: baseOpt.name, price: baseOpt.price, step: "Base Package" });
    }

    // Step 2
    const breakfastOpt = BUILDER_STEPS[1].options.find((o) => o.id === breakfastId);
    if (breakfastOpt && breakfastOpt.price > 0) {
      list.push({ name: breakfastOpt.name, price: breakfastOpt.price, step: "Breakfast Box" });
    }

    // Step 3
    const dinnerOpt = BUILDER_STEPS[2].options.find((o) => o.id === dinnerId);
    if (dinnerOpt && dinnerOpt.price > 0) {
      list.push({ name: dinnerOpt.name, price: dinnerOpt.price, step: "First-Night Dinner" });
    }

    // Step 4
    finishingTouches.forEach((id) => {
      const opt = BUILDER_STEPS[3].options.find((o) => o.id === id);
      if (opt) {
        list.push({ name: opt.name, price: opt.price, step: "Finishing Touch" });
      }
    });

    return list;
  }, [baseId, breakfastId, dinnerId, finishingTouches]);

  // Grand total calculation
  const totalAmount = useMemo(() => {
    return selections.reduce((sum, item) => sum + item.price, 0);
  }, [selections]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyName || !deliveryDate) {
      alert("Please provide at least a check-in date and property name.");
      return;
    }

    // Capture the custom steps chosen by the customer
    const detailedPills: string[] = [];
    
    const baseOpt = BUILDER_STEPS[0].options.find((o) => o.id === baseId);
    if (baseOpt) detailedPills.push(`Base: ${baseOpt.name}`);

    const breakfastOpt = BUILDER_STEPS[1].options.find((o) => o.id === breakfastId);
    if (breakfastOpt && breakfastOpt.price > 0) detailedPills.push(`Breakfast: ${breakfastOpt.name}`);

    const dinnerOpt = BUILDER_STEPS[2].options.find((o) => o.id === dinnerId);
    if (dinnerOpt && dinnerOpt.price > 0) detailedPills.push(`Dinner: ${dinnerOpt.name}`);

    finishingTouches.forEach((touchId) => {
      const opt = BUILDER_STEPS[3].options.find((o) => o.id === touchId);
      if (opt) detailedPills.push(opt.name);
    });

    const detailsStr = detailedPills.join(", ");

    onAddCustomToCart({
      id: "bespoke-hamper-" + Date.now(),
      name: "Bespoke Custom Curation",
      price: totalAmount,
      quantity: 1,
      emoji: "🧑‍🍳",
      details: detailsStr,
      imageUrl: "/src/assets/images/gourmet_apartment_spread_1782066271656.jpg",
      category: "Bespoke",
      guestName: hostName || "Guest",
      propertyName: propertyName,
      deliveryDate: deliveryDate,
      keySafeOrCode: keySafeOrCode || "Self-CheckIn"
    });

    setOrderSubmitted(true);
  };

  const resetBuilder = () => {
    setBreakfastId("breakfast-traditional");
    setDinnerId("dinner-none");
    setFinishingTouches([]);
    setDeliveryDate("");
    setPropertyName("");
    setHostName("");
    setKeySafeOrCode("");
    setOrderSubmitted(false);
  };

  return (
    <section id="builder" className="bg-dark text-stone py-20 px-6 md:px-12 rounded-3xl overflow-hidden my-12 relative">
      <div className="absolute inset-0 bg-radial-gradient from-accent/10 to-transparent pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center md:text-left mb-16">
          <span className="text-[10px] tracking-[3px] font-bold text-accent-light uppercase block mb-3">Custom Curation</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-warm-white tracking-tight leading-tight">
            Design your <span className="text-serif-italic text-accent-light">perfect hamper</span>.
          </h2>
          <p className="text-sm md:text-base text-stone/70 font-light mt-4 max-w-2xl">
            Tailor your pre-arrival provisions exactly to your party's appetite. Simply adjust the steps below to compute your custom larder packages live.
          </p>
        </div>

        {orderSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1c1a17] border border-accent/25 rounded-2xl p-8 max-w-2xl mx-auto text-center"
            id="order-success-screen"
          >
            <div className="w-16 h-16 bg-accent-pale/20 border border-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-accent-light" />
            </div>
            <h3 className="text-2xl font-serif font-light text-warm-white mb-3">Loaded into your Basket!</h3>
            <p className="text-stone/70 text-sm max-w-md mx-auto mb-6">
              Your bespoke curation has been successfully created and added to your shopping cart for <span className="text-accent-light font-semibold">{propertyName}</span> arriving <span className="text-accent-light font-semibold">{deliveryDate}</span>.
            </p>

            <div className="border border-rule/10 bg-dark/40 rounded-xl p-5 mb-8 text-left max-w-md mx-auto">
              <h4 className="text-xs uppercase tracking-[2px] font-bold text-accent-light mb-3">Your Tailored Details</h4>
              <ul className="space-y-2 text-xs font-mono text-stone/80">
                {selections.map((s, index) => (
                  <li key={index} className="flex justify-between border-b border-rule/5 pb-1">
                    <span>{s.name}</span>
                    <span className="text-accent-light">£{s.price}</span>
                  </li>
                ))}
                <li className="flex justify-between font-sans font-bold text-warm-white text-sm pt-2">
                  <span>Subtotal Curation:</span>
                  <span className="text-accent-light">£{totalAmount}</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={resetBuilder}
                className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-light text-dark font-bold text-[10px] tracking-wider uppercase transition-all duration-300 pointer-events-auto cursor-pointer shadow-lg w-full sm:w-auto"
              >
                Create Another Hamper
              </button>
              
              <button
                onClick={() => {
                  // This will let App trigger opening of the Cart panel
                  const cartBtn = document.getElementById("hk-cart-trigger");
                  if (cartBtn) cartBtn.click();
                }}
                className="px-6 py-2.5 rounded-full bg-dark hover:bg-neutral-800 text-stone border border-rule/20 hover:border-rule/40 font-bold text-[10px] tracking-wider uppercase transition-all duration-300 pointer-events-auto cursor-pointer w-full sm:w-auto"
              >
                View Shopping Basket
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Steps Grid */}
            <div className="lg:col-span-8 space-y-12">
              {/* Step 1 */}
              <div className="space-y-6" id="builder-step-1">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-accent/40 bg-accent/20 flex items-center justify-center font-serif text-sm text-accent-light font-bold">1</div>
                  <div>
                    <h3 className="text-lg font-serif font-light text-warm-white">{BUILDER_STEPS[0].title}</h3>
                    <p className="text-xs text-stone/60 font-light">{BUILDER_STEPS[0].description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BUILDER_STEPS[0].options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setBaseId(opt.id)}
                      className={`border p-4 rounded-xl cursor-all-scroll transition-all duration-200 text-left cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden ${
                        baseId === opt.id
                          ? "border-accent-light bg-accent/10"
                          : "border-rule/10 bg-neutral-900/50 hover:border-rule/30"
                      }`}
                      id={`builder-opt-${opt.id}`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-base text-warm-white font-medium">{opt.name}</h4>
                          {baseId === opt.id && (
                            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-dark" />
                            </div>
                          )}
                        </div>
                        {opt.description && (
                          <p className="text-[11px] text-stone/50 font-light line-clamp-2 mt-1 pr-6 leading-relaxed">
                            {opt.description}
                          </p>
                        )}
                      </div>
                      <div className="font-mono text-xs text-accent-light font-semibold mt-2">
                        {opt.price === 0 ? "No Additional Cost" : `£${opt.price}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-6" id="builder-step-2">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-accent/40 bg-accent/20 flex items-center justify-center font-serif text-sm text-accent-light font-bold">2</div>
                  <div>
                    <h3 className="text-lg font-serif font-light text-warm-white">{BUILDER_STEPS[1].title}</h3>
                    <p className="text-xs text-stone/60 font-light">{BUILDER_STEPS[1].description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BUILDER_STEPS[1].options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setBreakfastId(opt.id)}
                      className={`border p-4 rounded-xl cursor-all-scroll transition-all duration-200 text-left cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden ${
                        breakfastId === opt.id
                          ? "border-accent-light bg-accent/10"
                          : "border-rule/10 bg-neutral-900/50 hover:border-rule/30"
                      }`}
                      id={`builder-opt-${opt.id}`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-base text-warm-white font-medium">{opt.name}</h4>
                          {breakfastId === opt.id && (
                            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-dark" />
                            </div>
                          )}
                        </div>
                        {opt.description && (
                          <p className="text-[11px] text-stone/50 font-light line-clamp-2 mt-1 pr-6 leading-relaxed">
                            {opt.description}
                          </p>
                        )}
                      </div>
                      <div className="font-mono text-xs text-accent-light font-semibold mt-2">
                        {opt.price === 0 ? "No Breakfast Box" : `£${opt.price}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-6" id="builder-step-3">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-accent/40 bg-accent/20 flex items-center justify-center font-serif text-sm text-accent-light font-bold">3</div>
                  <div>
                    <h3 className="text-lg font-serif font-light text-warm-white">{BUILDER_STEPS[2].title}</h3>
                    <p className="text-xs text-stone/60 font-light">{BUILDER_STEPS[2].description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BUILDER_STEPS[2].options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setDinnerId(opt.id)}
                      className={`border p-4 rounded-xl cursor-all-scroll transition-all duration-200 text-left cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden ${
                        dinnerId === opt.id
                          ? "border-accent-light bg-accent/10"
                          : "border-rule/10 bg-neutral-900/50 hover:border-rule/30"
                      }`}
                      id={`builder-opt-${opt.id}`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-base text-warm-white font-medium">{opt.name}</h4>
                          {dinnerId === opt.id && (
                            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-dark" />
                            </div>
                          )}
                        </div>
                        {opt.description && (
                          <p className="text-[11px] text-stone/50 font-light line-clamp-2 mt-1 pr-6 leading-relaxed">
                            {opt.description}
                          </p>
                        )}
                      </div>
                      <div className="font-mono text-xs text-accent-light font-semibold mt-2">
                        {opt.price === 0 ? "No Dinner Box" : `£${opt.price}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-6" id="builder-step-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-accent/40 bg-accent/20 flex items-center justify-center font-serif text-sm text-accent-light font-bold">4</div>
                  <div>
                    <h3 className="text-lg font-serif font-light text-warm-white">{BUILDER_STEPS[3].title}</h3>
                    <p className="text-xs text-stone/60 font-light">{BUILDER_STEPS[3].description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BUILDER_STEPS[3].options.map((opt) => {
                    const isSelected = finishingTouches.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleToggleTouch(opt.id)}
                        className={`border p-4 rounded-xl cursor-all-scroll transition-all duration-200 text-left cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden ${
                          isSelected
                            ? "border-accent-light bg-accent/10"
                            : "border-rule/10 bg-neutral-900/50 hover:border-rule/30"
                        }`}
                        id={`builder-opt-${opt.id}`}
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-base text-warm-white font-medium">{opt.name}</h4>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-accent" : "border border-rule/30 bg-transparent"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-dark" />}
                            </div>
                          </div>
                          {opt.description && (
                            <p className="text-[11px] text-stone/50 font-light line-clamp-2 mt-1 pr-6 leading-relaxed">
                              {opt.description}
                            </p>
                          )}
                        </div>
                        <div className="font-mono text-xs text-accent-light font-semibold mt-2">
                          +£{opt.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <div
                className="bg-[#1a1815] border border-accent/20 rounded-2xl p-6 shadow-2xl relative"
                id="builder-order-summary-card"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <ShoppingBag className="w-24 h-24 text-accent-light" />
                </div>

                <h3 className="font-serif text-xl text-warm-white mb-4 border-b border-rule/10 pb-3 flex items-center justify-between">
                  <span>Hamper Order</span>
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-accent-light">Bespoke</span>
                </h3>

                {selections.length === 0 ? (
                  <div className="py-8 text-center text-stone/40 text-xs font-light">
                    Your bespoke basket is empty. Select options from the steps on the left to start configuring.
                  </div>
                ) : (
                  <ul className="space-y-4 max-h-[220px] overflow-y-auto pr-2 mb-6">
                    {selections.map((item, index) => (
                      <li key={index} className="flex justify-between gap-4 border-b border-rule/5 pb-2 text-xs">
                        <div className="text-left">
                          <span className="block font-[500] text-stone/90">{item.name}</span>
                          <span className="text-[10px] text-accent/80 uppercase tracking-wider font-semibold">
                            {item.step}
                          </span>
                        </div>
                        <span className="font-mono text-accent-light font-medium shrink-0">£{item.price}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Live update total */}
                <div className="flex justify-between items-baseline pt-4 border-t border-rule/15 mb-6">
                  <span className="text-xs text-stone/60 font-light uppercase tracking-wider">Total Est. Price</span>
                  <span className="font-serif text-3xl text-accent-light font-medium tracking-tight">
                    £{totalAmount}
                  </span>
                </div>

                {/* Dynamic warning box for 72 hour rule */}
                <div className="p-3 bg-[#241f17] border border-accent/30 rounded-xl text-xs text-stone/80 mb-6 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent-light shrink-0 mt-0.5" />
                  <div className="leading-relaxed text-left">
                    <span className="font-bold text-accent-light">72-Hour Notice:</span> Orders must be finalized at least 72 hours before check-in.
                  </div>
                </div>

                {/* Delivery details form integrated directly into React for authentic interaction */}
                <form onSubmit={handleCreateOrder} className="space-y-4 pt-2 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-stone/50 block">Check-In Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-accent absolute left-3 top-3" />
                      <input
                        type="date"
                        required
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-dark/60 border border-rule/10 rounded-lg pl-9 pr-3 py-2 text-xs text-warm-white focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-stone/50 block">Property & Room Name</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-accent absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Red Cottage, Lake District"
                        required
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="w-full bg-dark/60 border border-rule/10 rounded-lg pl-9 pr-3 py-2 text-xs text-warm-white focus:outline-none focus:border-accent placeholder-stone/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-stone/50 block">Lead Guest / Host</label>
                      <input
                        type="text"
                        placeholder="Lead Name"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        className="w-full bg-dark/60 border border-rule/10 rounded-lg px-3 py-2 text-xs text-warm-white focus:outline-none focus:border-accent placeholder-stone/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-stone/50 block">Key Safe / Code</label>
                      <div className="relative">
                        <KeyRound className="w-3.5 h-3.5 text-accent absolute left-2.5 top-3" />
                        <input
                          type="text"
                          placeholder="Or 'Self-CheckIn'"
                          value={keySafeOrCode}
                          onChange={(e) => setKeySafeOrCode(e.target.value)}
                          className="w-full bg-dark/60 border border-rule/10 rounded-lg pl-7 pr-2 py-2 text-xs text-warm-white focus:outline-none focus:border-accent placeholder-stone/30"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={selections.length === 0}
                    className="w-full mt-4 py-3 bg-accent hover:bg-accent-light text-dark font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    id="builder-submit-btn"
                  >
                    <span>Add Custom Hamper to Basket</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
