import { LogIn } from "lucide-react";
import React from "react";

const LandingJoinButton = ({setMode, mode}) => {
  return (
    <button
      onClick={() => setMode("join")}
      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${mode === "join" ? "bg-slate-800 text-white shadow-inner" : "text-slate-500 hover:text-slate-300"}`}
    >
      <LogIn size={14} /> Join
    </button>
  );
};

export { LandingJoinButton };
