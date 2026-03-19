import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";

const FeatureUpdateBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-sm">
        {/* Icon */}
        <div className="bg-white/20 p-1.5 rounded-lg">
          <Sparkles size={16} className="text-blue-100" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col pr-2">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
            New Update
          </span>
          <p className="text-sm font-semibold whitespace-nowrap">
            Leaderboard section have match history.
          </p>
          <p className="text-sm font-semibold whitespace-nowrap">
            May take some time to add previous match data
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-white/10 p-1 rounded-md transition-colors"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export { FeatureUpdateBanner };
