import React from "react";

const Winner = ({ winnerid }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6 flex flex-col items-center justify-center min-w-70 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px w-8 bg-emerald-500/50"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
          Winner
        </span>
        <div className="h-px w-8 bg-emerald-500/50"></div>
      </div>

      <div className="relative">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {winnerid}
        </h2>

        <div className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
      </div>

      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full"></div>
    </div>
  );
};

export default Winner;
