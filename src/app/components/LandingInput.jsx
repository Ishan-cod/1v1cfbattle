import { MousePointerClick } from "lucide-react";
import { Loader2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import React, { useState } from "react";

const LandingInput = ({
  setcfid,
  verifycfid,
  isverified,
  isloading,
  setisverified,
}) => {
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
            setisverified(false);
            setcfid(id);
          }}
        />
        {isverified ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400">
            <ShieldCheck size={20} />
          </div>
        ) : isloading ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black bg-slate-500 p-1.5 rounded-full hover:cursor-pointer">
            <Loader2 size={20} className="animate-spin" />
          </div>
        ) : (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black bg-slate-500 p-1.5 rounded-full hover:cursor-pointer"
            onClick={verifycfid}
          >
            <MousePointerClick size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export { LandingInput };
