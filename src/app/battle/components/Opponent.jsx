import React from "react";
import { LiveFeed } from "./LiveFeed";

export function Opponent({ opponentdata, getlivefeed, feed}) {
  return (
    <>
      <section className="col-span-3 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 font-bold">
              OPP
            </div>
            <div>
              <h2 className="font-bold text-slate-200">
                {opponentdata.handle}
              </h2>
            </div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-2/3 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          </div>
          <p className="text-[10px] text-right mt-1 text-slate-500 font-bold uppercase">
            Accuracy Gauge
          </p>
        </div>

        <LiveFeed getlivefeed={getlivefeed} livefeed={feed}/>
      </section>
    </>
  );
}
