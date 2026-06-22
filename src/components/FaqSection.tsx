import React, { useState } from "react";
import { FAQ_GROUPS } from "../data";
import { Plus, CheckCircle2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FaqSection() {
  // Use a unique composite ID as state to manage single open accordion
  const [openId, setOpenId] = useState<string | null>("Booking & Timing-0");

  const handleToggle = (compositeId: string) => {
    setOpenId((prev) => (prev === compositeId ? null : compositeId));
  };

  return (
    <section id="faq" className="bg-stone py-24 px-6 md:px-12 relative border-t border-rule/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[3px] font-bold text-accent uppercase block mb-3">Questions & Help</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-dark tracking-tight leading-tight">
            Frequently asked <span className="text-serif-italic text-accent">answers</span>.
          </h2>
          <p className="text-xs md:text-sm text-mid/85 font-light mt-3 max-w-lg mx-auto">
            Everything you need to understand regarding our farmer sourcing, key security protocols, and 72-hour fresh scheduling procedures.
          </p>
        </div>

        {/* Group list mapping */}
        <div className="space-y-12">
          {FAQ_GROUPS.map((group, groupIdx) => (
            <div key={group.category} className="space-y-4">
              {/* Category label */}
              <h3 className="text-xs uppercase tracking-[2px] font-bold text-accent border-b border-rule/40 pb-2 text-left">
                {group.category}
              </h3>

              <div className="space-y-2.5">
                {group.items.map((item, itemIdx) => {
                  const compositeId = `${group.category}-${itemIdx}`;
                  const isOpen = openId === compositeId;

                  return (
                    <div
                      key={itemIdx}
                      className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                        item.isLongNotice
                          ? "border border-accent/40 bg-accent-pale/15"
                          : "border border-rule/30 bg-cream hover:border-rule/50"
                      }`}
                      id={`faq-item-${compositeId}`}
                    >
                      {/* Accordion header button */}
                      <button
                        onClick={() => handleToggle(compositeId)}
                        className="w-full text-left py-4.5 px-6 font-serif text-base font-medium text-dark flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="flex items-center gap-2">
                          {item.isLongNotice && (
                            <span className="shrink-0 bg-accent text-dark p-0.5 rounded-full block text-[10px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <span>{item.question}</span>
                        </span>
                        <span
                          className={`w-6 h-6 rounded-full border border-rule/50 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-45 text-accent" : "text-mid"
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </span>
                      </button>

                      {/* Expandable answers */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-5 text-xs text-mid/80 leading-relaxed font-light text-left whitespace-pre-line border-t border-rule/20 pt-4 bg-warm-white/45">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal helper */}
        <div className="mt-16 text-center bg-cream border border-rule/40 p-6 rounded-2xl">
          <HelpCircle className="w-5 h-5 text-accent mx-auto mb-2" />
          <p className="text-xs text-mid/80 font-light max-w-md mx-auto">
            Still have queries or custom dietary requirements? Send us an email at{" "}
            <a href="mailto:concierge@hamperkey.co.uk" className="text-accent underline font-semibold">
              concierge@hamperkey.co.uk
            </a>
            , and our delivery managers will assist you directly.
          </p>
        </div>
      </div>
    </section>
  );
}
