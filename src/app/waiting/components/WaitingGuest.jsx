import React from "react";
import { Users } from "lucide-react";

const WaitingGuest = () => {
  return (
    <>
      <div className="bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:border-slate-700 transition-colors">
        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin mb-4"></div>
        <h3 className="text-lg font-bold text-slate-400">
          Waiting for Opponent
        </h3>
        <p className="text-xs text-slate-500 max-w-50 mt-2 leading-relaxed">
          Share the room code with a friend to start the duel.
        </p>
      </div>
    </>
  );
};

export { WaitingGuest };
