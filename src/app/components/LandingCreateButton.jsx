import { PlusCircle } from "lucide-react";
import React from "react";

const LandingCreateButton = ({setmode, mode}) => {
  return (
    <button
      onClick={() => setmode("create")}
      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${mode === "create" ? "bg-slate-800 text-white shadow-inner" : "text-slate-500 hover:text-slate-300"}`}
    >
      <PlusCircle size={14} /> Create
    </button>
  );
};

export { LandingCreateButton };
