import { ShieldCheck } from "lucide-react";
import React from "react";

const LandingInput = ({ setcfid }) => {
  return (
    <div className="mb-8">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">
        Your Codeforces Handle
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="e.g. only_error"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
          onChange={(e) => {
            let id = e.target.value.trim().toLowerCase();
            setcfid(id);
          }}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700">
          <ShieldCheck size={20} />
        </div>
      </div>
    </div>
  );
};

export { LandingInput };
