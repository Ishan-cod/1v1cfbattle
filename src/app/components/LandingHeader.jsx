import { Swords } from "lucide-react";
import React from "react";

const LandingHeader = () => {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20 rotate-3 group hover:rotate-0 transition-transform duration-300">
        <Swords size={32} className="text-white" />
      </div>
      <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
        Battle your friend
      </h1>
      <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em] mt-2">
        The 1v1 Code Battle
      </p>
    </div>
  );
};

export { LandingHeader };
