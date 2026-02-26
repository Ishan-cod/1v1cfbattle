import React from "react";

export function Player({ playerdata }) {
  return (
    <>
      <section className="col-span-3 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 font-bold">
              ME
            </div>
            <div>
              <h2 className="font-bold">{playerdata.handle}</h2>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold text-slate-500">
              My Submissions
            </p>
            <div className="text-xs mono p-2 rounded bg-slate-950 border border-slate-800 text-red-400">
              WA - Test 4
            </div>
            <div className="text-xs mono p-2 rounded bg-slate-950 border border-slate-800 text-blue-400">
              CE - Compilation Error
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
