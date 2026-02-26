import React from "react";

export function Host({ host }) {
  return (
    <>
      <div className="bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-6 relative overflow-hidden shadow-2xl shadow-blue-500/10">
        <div className="absolute top-0 right-0 bg-blue-500 text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg">
          Host
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
            {host.handle.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{host.handle}</h3>
          </div>
        </div>
        <div className="mt-8">
          <button className="w-full py-3 bg-slate-800 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-bold rounded-xl transition-all uppercase tracking-widest text-xs">
            {host.is_ready ? "Ready " : "Not Ready"}
          </button>
        </div>
      </div>
    </>
  );
}
