import React from "react";

export function Opponent({opponentdata}) {
  return (
    <>
      <section className="col-span-3 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 font-bold">
              OPP
            </div>
            <div>
              <h2 className="font-bold text-slate-200">{opponentdata.handle}</h2>
            </div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-2/3 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          </div>
          <p className="text-[10px] text-right mt-1 text-slate-500 font-bold uppercase">
            Accuracy Gauge
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-75">
          <div className="p-3 border-b border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Live Feed
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 panic-pulse"></span>
          </div>
          <div className="flex-1 p-4 mono text-[11px] space-y-3 overflow-y-auto">
            <p className="text-slate-500">[12:04] Match started.</p>
            <p className="text-red-400">
              <span className="text-slate-600">benq:</span> WRONG ANSWER (Test 4)
            </p>
            <p className="text-amber-400 panic-pulse">
              <span className="text-slate-600">benq:</span> TESTING TEST 12...
            </p>
            <p className="text-slate-400">
              <span className="text-slate-600">tourist:</span> COMPILATION ERROR
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
