import React from "react";
import { DuelHistoryCard } from "../components/VictoryCard";

const Page = () => {
  return (
    // Structure Example
    <div className="match-group border border-white/10 rounded-xl overflow-hidden bg-white/5">
      {/* Match Header */}
      <div className="flex justify-between bg-white/10 p-3 px-5 items-center">
        <div className="flex gap-4 items-center">
          <span className="text-purple-400 font-bold text-xs uppercase tracking-widest">
            Room: MULTI9951
          </span>
          <span className="text-gray-400 text-xs">vs. sohxm2k, manoord08</span>
        </div>
        <span className="text-gray-500 text-xs italic">March 28, 2026</span>
      </div>

      {/* Questions inside that match */}
      <div className="divide-y divide-white/5">
        
      </div>
    </div>
  );
};

export default Page;
