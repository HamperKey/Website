import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  X, 
  MessageSquare, 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Loader2,
  Maximize2,
  Minimize2,
  Calendar,
  Compass
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendationId?: string; // e.g. "base-wine-cheese" parsed out of the text
}

interface AiAssistantProps {
  selectedBaseId: string;
  setSelectedBaseId: (id: string) => void;
}

// Map option IDs to friendly descriptive titles and emoji matching database
const RECOMMENDATION_MAP: Record<string, { title: string; emoji: string }> = {
  "base-first-24": { title: "First 24 Hours Sorted (Flagship)", emoji: "🌟" },
  "base-wine-cheese": { title: "Wine, Cheese & Nibbles (Premium)", emoji: "🍷" },
  "base-classic": { title: "Classic Arrival Pack (Cozy)", emoji: "☕" },
  "base-family": { title: "Family No-Shop Bundle (Family)", emoji: "🏡" },
  "base-group": { title: "Group House Starter (Group)", emoji: "🏰" },
  "base-none": { title: "Custom Hamper Selection (Scratch)", emoji: "🥖" },
};

export default function AiAssistant({ selectedBaseId, setSelectedBaseId }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Good day, traveler. I am your HamperKey Specialist Concierge. 🍷✨\n\nI am here to ensure your first 24 hours in your accommodation are entirely sorted. I can coordinate with your host, curate artisan cheeses, suggest fine reserve pairings, or answer questions about our strict 72-hour fresh-prep notice.\n\nHow may I help elevate your upcoming UK arrival today?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAppliedToast, setShowAppliedToast] = useState(false);
  const [appliedPackageName, setAppliedPackageName] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Quick replies
  const QUICK_PROMPTS = [
    { label: "🍷 Plan a romantic couple's arrival", query: "Can you recommend a romantic package for a couple's weekend getaway?" },
    { label: "🕒 Why the 72h rule?", query: "Could you explain why you require a 72-hour notice period?" },
    { label: "🔑 How is delivery handled?", query: "How does HamperKey get access to the property before I check in?" },
    { label: "🏡 Suggest family provisions", query: "What package do you recommend for a family arriving with children?" }
  ];

  // Parse [RECOMMEND: base-id] from text response
  const parseMessage = (text: string): { cleanContent: string; recommendationId?: string } => {
    const rx = /\[RECOMMEND:\s*([a-zA-Z0-9_-]+)\]/i;
    const match = text.match(rx);
    if (match) {
      const recId = match[1].toLowerCase().trim();
      const cleanContent = text.replace(rx, "").trim();
      return { cleanContent, recommendationId: recId };
    }
    return { cleanContent: text };
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Form message history for context
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!res.ok) {
        throw new Error("Local backend response is unavailable.");
      }

      const data = await res.json();
      const parsed = parseMessage(data.content);

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: parsed.cleanContent,
          recommendationId: parsed.recommendationId
        }
      ]);
    } catch (err) {
      console.warn("Real-time proxy failed, executing premium local fallback concierge sequence:", err);
      
      // Sophisticated rule-based local sommelier responses
      setTimeout(() => {
        let responseContent = "";
        let recId: string | undefined;

        const lower = textToSend.toLowerCase();
        if (lower.includes("couple") || lower.includes("romantic") || lower.includes("anniversary") || lower.includes("spouse") || lower.includes("wine")) {
          responseContent = "For an intimate couple's weekend, I highly recommend our premium **Wine, Cheese & Nibbles** package (£65). I coordinate with your host to place a chilled reserve bottle of English sparkling or hand-selected red in your accommodation, accompanied by award-winning local cheeses, crackers, and house rosemary almonds. Truly splendid for stepping inside and pouring a glass immediately.\n\nWould you like me to configure this selection for your larder? [RECOMMEND: base-wine-cheese]";
          recId = "base-wine-cheese";
        } else if (lower.includes("72") || lower.includes("notice") || lower.includes("cancel") || lower.includes("time")) {
          responseContent = "Our direct-from-farm pipeline is the key! To prevent food waste and guarantee absolute freshness, our regional dairy farmers, butchers, and bakers prepare sourdoughs and harvest produce *dynamically upon booking order*. This is why we strictly enforce our **72-hour minimum notice period**. Inside this 72h window, foods are already dispatched, so cancellations are non-refundable.";
        } else if (lower.includes("key") || lower.includes("access") || lower.includes("delivery") || lower.includes("how") || lower.includes("safe")) {
          responseContent = "Ah, the magic of the Hamper*Key* system! You do not need to wait around or meet a courier. We coordinate directly with your cottage manager, hotel concierge, or Airbnb host prior to check-in. They unlock the property for our courier, who stocks the perishables inside your fridge and sets up your breakfast bread on the counter, then departs before you arrive.";
        } else if (lower.includes("family") || lower.includes("child") || lower.includes("kid") || lower.includes("shop")) {
          responseContent = "For families, our comprehensive **Family No-Shop Bundle** (£149) is a brilliant choice. It covers your basic breakfast and snacking needs for the first stay cycle, featuring pre-placed organic pancakes, a seasonal fruit basket, snacks, and a simple gastro spaghetti dinner kit to keep preparation stress-free.\n\nWould you like me to load this in your customization builder now? [RECOMMEND: base-family]";
          recId = "base-family";
        } else if (lower.includes("group") || lower.includes("party") || lower.includes("grand") || lower.includes("castle") || lower.includes("many")) {
          responseContent = "For grand weekend house gatherings and larger parties, our **Group House Starter** (£299) is an spectacular feast. It features expansive grazing boards loaded with charcuterie, local cider flutes and beers, and double brunch size packs so everyone has their breakfast sorted.\n\nWould you like me to prepare your group's starter packet? [RECOMMEND: base-group]";
          recId = "base-group";
        } else {
          responseContent = "I would be absolutely delighted to help you coordinate. For general arrivals, we highly recommend our flagship **First 24 Hours Sorted** (£89) package which provides fresh sourdough, pasture eggs, outdoor cured bacon, butter, and charcuterie for your initial morning.\n\nWould you like me to select our Flagship kit in your custom builder below? [RECOMMEND: base-first-24]";
          recId = "base-first-24";
        }

        const parsedLocal = parseMessage(responseContent);

        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            role: "assistant",
            content: parsedLocal.cleanContent,
            recommendationId: parsedLocal.recommendationId || recId
          }
        ]);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  // Perform programmatic integration action - selects base ID and scrolls down to builder
  const handleApplyRecommendation = (recId: string) => {
    if (!recId) return;
    
    // Choose the correct builder ID
    let convertedId = recId;
    if (recId.startsWith("base-")) {
      convertedId = recId;
    } else {
      convertedId = `base-${recId}`;
    }

    setSelectedBaseId(convertedId);

    // Form friendly name
    const pName = RECOMMENDATION_MAP[convertedId]?.title || "Custom Package Base";
    setAppliedPackageName(pName);
    setShowAppliedToast(true);

    // Scroll to builder section
    const builderEl = document.getElementById("builder");
    if (builderEl) {
      setTimeout(() => {
        builderEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }

    // Hide Toast after 4 seconds
    setTimeout(() => {
      setShowAppliedToast(false);
    }, 4000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Toast Confirmation Panel */}
      <AnimatePresence>
        {showAppliedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 right-0 w-80 bg-[#1c1a17] border border-[#d4af37]/30 p-4 rounded-xl shadow-2xl flex items-start gap-3 z-50"
            id="builder-toast"
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent-light shrink-0 mt-0.5">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-left flex-1">
              <h4 className="text-xs uppercase tracking-widest font-bold text-accent-light">Package Loaded!</h4>
              <p className="text-[11px] text-stone/85 mt-1 font-light leading-relaxed">
                <span className="font-semibold text-warm-white">{appliedPackageName}</span> has been selected as your active foundation inside the bespoke builder below.
              </p>
            </div>
            <button 
              onClick={() => setShowAppliedToast(false)}
              className="text-stone/40 hover:text-stone/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Closed Float Button */}
        {!isOpen && (
          <div className="relative group">
            {/* Close/Hide button for the floating chat launcher */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-dark hover:bg-[#e45a5a] border border-neutral-800 text-stone/65 hover:text-warm-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer z-10"
              title="Close Assistant"
            >
              <X className="w-3" />
            </button>

            <motion.button
              layoutId="concierge-trigger"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-4 bg-dark text-stone hover:text-accent-light border border-[#d4af37]/20 hover:border-[#d4af37]/40 rounded-full shadow-2xl shadow-accent/5 transition-all duration-300 relative cursor-pointer"
              id="concierge-open-btn"
            >
              {/* Elegant glowing indicator */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent flex items-center justify-center animate-pulse border-2 border-dark" />
              
              <Sparkles className="w-4 h-4 text-accent animate-pulse shrink-0" />
              <span className="text-xs uppercase tracking-[2px] font-bold font-serif text-warm-white hover:text-accent-light transition-colors">
                Gourmet Concierge
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Open Chat Box */}
        {isOpen && (
          <motion.div
            layoutId="concierge-trigger"
            className={`bg-[#0f0e0c]/98 border border-[#d4af37]/25 rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right ${
              isMinimized ? "w-80 h-14" : "w-[380px] sm:w-[420px] h-[550px] sm:h-[600px]"
            }`}
            id="concierge-chat-panel"
          >
            {/* Header section (premium gold highlights) */}
            <div className="bg-[#171512] px-4 py-3.5 border-b border-[#d4af37]/15 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#27211a] border border-[#d4af37]/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xs font-semibold text-warm-white uppercase tracking-wider flex items-center gap-1.5">
                    <span>Gourmet Specialist</span>
                    <span className="text-[8px] bg-accent/20 border border-accent/25 text-accent-light font-sans font-bold px-1.5 py-0.5 rounded-md uppercase tracking-normal">AI Concierge</span>
                  </h3>
                  <p className="text-[9px] text-stone/50 font-light font-mono">Status: Pre-Arrival Logistics On-Call</p>
                </div>
              </div>

              {/* Minimize/Close actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 px-1.5 text-stone/40 hover:text-stone/80 hover:bg-neutral-800/50 rounded-md transition-colors"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-1 text-stone/40 hover:text-[#e45a5a] hover:bg-neutral-800/50 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body & Log */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-stone/10 scrollbar-track-transparent">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-6.5 h-6.5 select-none rounded-md bg-[#241d16] border border-[#d4af37]/25 flex items-center justify-center font-serif text-[10px] text-accent-light shrink-0">
                          HK
                        </div>
                      )}
                      
                      <div className="space-y-2 max-w-[80%]">
                        <div
                          className={`rounded-xl px-4 py-3 text-xs leading-relaxed text-left whitespace-pre-wrap font-light border ${
                            msg.role === "user"
                              ? "bg-[#27221a] border-[#d4af37]/20 text-warm-white"
                              : "bg-[#181613]/85 border-neutral-800/80 text-stone/90"
                          }`}
                        >
                          {msg.content}
                        </div>

                        {/* Recommendation loading integrations */}
                        {msg.role === "assistant" && msg.recommendationId && (
                          <div className="bg-[#1d1914] border border-[#d4af37]/20 rounded-lg p-2.5 text-left flex flex-col gap-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent-light uppercase tracking-wider font-semibold">
                              <span>Recommended Foundation:</span>
                              <span className="text-warm-white italic">
                                {RECOMMENDATION_MAP[msg.recommendationId]?.emoji || "🎁"}{" "}
                                {RECOMMENDATION_MAP[msg.recommendationId]?.title.split(" (")[0] || RECOMMENDATION_MAP["base-" + msg.recommendationId]?.title.split(" (")[0] || "Custom Foundation"}
                              </span>
                            </div>
                            <button
                              onClick={() => handleApplyRecommendation(msg.recommendationId!)}
                              className="w-full py-1.5 rounded bg-accent hover:bg-accent-light text-dark font-sans font-semibold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Load foundation into Builder</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start items-center gap-2.5">
                      <div className="w-6.5 h-6.5 rounded-md bg-[#241d16] border border-[#d4af37]/25 flex items-center justify-center font-serif text-[10px] text-accent-light shrink-0">
                        HK
                      </div>
                      <div className="bg-[#181613]/85 border border-rule/5 rounded-xl px-4 py-2.5 text-stone/50 text-xs flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 text-accent animate-spin" />
                        <span>Curating premium recommendation...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Fixed quick reply chips helper inside logs */}
                {messages.length < 4 && (
                  <div className="px-4 py-2 bg-[#12110F]/60 border-t border-neutral-900 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2 shrink-0">
                    {QUICK_PROMPTS.map((qp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(qp.query)}
                        className="inline-block bg-[#1f1b15]/90 hover:bg-[#2d251d] text-stone/80 hover:text-accent-light border border-neutral-800/80 rounded-full px-3.5 py-1.5 text-[10px] font-medium transition-colors cursor-pointer shrink-0"
                      >
                        {qp.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input block footer */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputValue);
                  }}
                  className="p-3 bg-[#13110e] border-t border-neutral-900 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about fine wines, key boxes, cottages..."
                    disabled={isLoading}
                    className="flex-1 bg-[#1c1a17] border border-neutral-800/60 focus:border-[#d4af37]/45 rounded-xl px-3.5 py-2.5 text-xs text-stone placeholder-stone/40 focus:outline-none disabled:opacity-40"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="w-9 h-9 rounded-xl bg-accent hover:bg-accent-light text-dark flex items-center justify-center shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
