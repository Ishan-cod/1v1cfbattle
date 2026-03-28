import React from "react";
import { Timer } from "lucide-react";

const Winner = ({ winnerid, totalTime }) => {
  const totalSeconds = Number(totalTime) || 0;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return (
    <div className="max-w-sm mx-auto">
      <div className="rounded-xl border border-white/10 bg-slate-900/70 px-5 py-4 backdrop-blur-sm hover:border-white/20 transition">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400 uppercase tracking-wide">
            Question Solved
          </span>
          <span className="text-xs text-emerald-400 font-medium">VERIFIED</span>
        </div>

        {/* User */}
        <h2 className="text-lg font-semibold text-white truncate mb-3">
          {winnerid}
        </h2>

        {/* Time */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            <span>Time</span>
          </div>

          <span className="font-mono text-white">
            {totalTime !== null && totalTime !== undefined
              ? `${mins}m ${secs}s`
              : "--"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Winner;
