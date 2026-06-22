import React from "react";

interface AdPlaceholderProps {
  width: number;
  height: number;
  label?: string;
  className?: string;
}

export function AdPlaceholder({ width, height, label = "Premium Placeholders", className = "" }: AdPlaceholderProps) {
  return (
    <div
      className={`border-2 border-dashed border-rule/70 bg-cream/50 rounded-lg flex flex-col items-center justify-center text-center p-4 select-none ${className}`}
      style={{ minWidth: `${width}px`, width: `${width}px`, height: `${height}px` }}
      id={`ad-${width}x${height}`}
    >
      <span className="text-[10px] tracking-[2px] font-bold text-light uppercase mb-2">Advertisement</span>
      <div className="font-mono text-xs text-accent font-medium mb-1">
        {width} &times; {height}
      </div>
      <p className="text-[11px] text-light leading-relaxed max-w-[130px]">
        {label || "Gourmet partnerships & private transport placements"}
      </p>
    </div>
  );
}

export function StickySidebarAd({ position }: { position: "left" | "right" }) {
  return (
    <aside
      className={`hidden xl:block w-[160px] shrink-0 sticky top-[95px] h-[calc(100vh-140px)] flex flex-col justify-between py-2 ${
        position === "left" ? "mr-4" : "ml-4"
      }`}
      id={`sticky-sidebar-${position}`}
    >
      <div className="flex flex-col gap-6">
        <AdPlaceholder
          width={160}
          height={480}
          label="Your local estate or boutique vineyard featured here."
        />
        <div className="text-center p-2 text-[10px] text-light leading-normal">
          Interested in partnering as a local supplier? <br />
          <a href="#partners" className="text-accent underline font-medium hover:text-accent-light">
            Read For Partners
          </a>
        </div>
      </div>
    </aside>
  );
}
