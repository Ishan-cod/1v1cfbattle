import React from "react";
import Winner from "./Winner";

export function Question({ problemdata, roomdata }) {
  return (
    <>
      <section className="col-span-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
          <div>
            <span className="text-blue-500 font-bold text-sm mono">
              {problemdata.id}
              {problemdata.index}
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              {problemdata.name}
            </h2>
            <div className="flex justify-center gap-2 mt-3">
              {problemdata.tags.map((e) => (
                <span
                  key={e}
                  className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold"
                >
                  {e}
                </span>
              ))}
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                {problemdata.rating} RATING
              </span>
            </div>
          </div>

          <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-left text-sm text-slate-400 leading-relaxed">
            {problemdata.url}
          </div>

          {roomdata.status === "FINISHED" ? (
            <Winner winnerid={roomdata.match_data.winner} />
          ) : (
            <></>
          )}

          <a
            href={problemdata.url}
            target="_blank"
            className="inline-block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/20"
          >
            OPEN PROBLEM ON CODEFORCES ↗
          </a>
        </div>
      </section>
    </>
  );
}
