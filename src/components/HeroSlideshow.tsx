import React, { useState, useEffect, useRef } from "react";
import { HERO_SLIDES } from "../data";
import { ChevronLeft, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Static imports of the generated premium assets so Vite compiles & copies them correctly
import apartmentSpreadImg from "../assets/images/gourmet_apartment_spread_1782066271656.jpg";
import wickerHamperImg from "../assets/images/wicker_hamper_classic_1782066288761.jpg";
import gourmetArrivalImg from "../assets/images/gourmet_arrival_spread_1782062398589.jpg";
import celebrationImg from "../assets/images/celebration_candlelit_spread_1782066317226.jpg";

export default function HeroSlideshow() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoAdvance = () => {
    stopAutoAdvance();
    timerRef.current = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % HERO_SLIDES.length);
    }, 6000);
  };

  const stopAutoAdvance = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoAdvance();
    return () => stopAutoAdvance();
  }, []);

  const handlePrev = () => {
    stopAutoAdvance();
    setCurrentIdx((prevIdx) => (prevIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    startAutoAdvance();
  };

  const handleNext = () => {
    stopAutoAdvance();
    setCurrentIdx((prevIdx) => (prevIdx + 1) % HERO_SLIDES.length);
    startAutoAdvance();
  };

  const handleSelectDot = (idx: number) => {
    stopAutoAdvance();
    setCurrentIdx(idx);
    startAutoAdvance();
  };

  const currentSlide = HERO_SLIDES[currentIdx];

  // Premium pre-arrival photo assets for all 4 rotating slides
  const slideBgs = [
    apartmentSpreadImg,
    wickerHamperImg,
    gourmetArrivalImg,
    celebrationImg
  ];

  return (
    <section id="home" className="h-[90vh] min-h-[580px] w-full bg-dark text-stone relative overflow-hidden flex items-center">
      {/* Slides Backgrounds with Dissolving Crossroads */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0.1, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <>
              <img
                src={slideBgs[currentIdx]}
                alt={currentSlide.headlinePrefix + currentSlide.italicWord}
                className="w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.05] transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/60" />
            </>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Warm Ambient Noise Map or Grid */}
      <div className="absolute inset-0 z-5 bg-[linear-gradient(rgba(20,19,15,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,19,15,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Main Content Overlay Area */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-9 lg:col-span-8 flex flex-col justify-center text-left">
          
          {/* Eyebrow/Kicker Overlay */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[1px] w-6 bg-accent-light" />
            <span className="text-[10px] tracking-[3px] font-bold text-accent-light uppercase">
              Pre-Arrival Food & Drinks · London · South East & East
            </span>
          </div>

          {/* Animate-Change Slide Headers */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-warm-white tracking-tight leading-[1.10] max-w-2xl">
                {currentSlide.headlinePrefix}
                <span className="font-serif-italic text-accent-light italic">
                  {currentSlide.italicWord}
                </span>
                {currentSlide.headlineSuffix}
              </h1>

              <p className="text-sm sm:text-base text-stone/80 font-light max-w-lg leading-relaxed mt-2">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href="#builder"
              className="px-6 py-3.5 bg-accent hover:bg-accent-light text-dark text-xs tracking-wider uppercase font-bold rounded-full transition-all duration-300 shadow-md flex items-center gap-2 pointer-events-auto cursor-pointer"
            >
              <span>Build Your Hamper</span>
            </a>
            <a
              href="#packages"
              className="px-6 py-3.5 border border-rule/35 bg-transparent hover:border-warm-white/60 hover:bg-warm-white/5 text-warm-white text-xs tracking-wider uppercase font-semibold rounded-full transition-all duration-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Packages</span>
            </a>
          </div>
        </div>
      </div>

      {/* Manual Swiping Nav Buttons and Status Indicators */}
      <div className="absolute bottom-10 left-6 md:left-12 right-6 md:right-12 flex justify-between items-center z-10">
        
        {/* Left Side: slide location pin */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone/60">
          <MapPin className="w-3.5 h-3.5 text-accent-light" />
          <span>Hand-packed & direct delivered to your doorstep</span>
        </div>

        {/* Right Side Controls & Dot Navigation */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Arrow Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-10 h-10 border border-rule/20 hover:border-accent-light text-stone/70 hover:text-accent-light rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-10 h-10 border border-rule/20 hover:border-accent-light text-stone/70 hover:text-accent-light rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dot indices */}
          <div className="flex gap-2.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectDot(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIdx === idx ? "w-6 bg-accent-light" : "w-2 bg-stone/35 hover:bg-stone/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
