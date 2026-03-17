import React from "react";

export function Player({ playerdata, live_feed }) {
  const filtered_feed = live_feed.filter((e) => e.player == playerdata.handle);
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
            {filtered_feed.map((e, key) => {
              if (e.verdict == "WRONG_ANSWER") {
                return (
                  <div
                    className="text-xs mono p-2 rounded bg-slate-950 border border-slate-800 text-red-400"
                    key={key}
                  >
                    WA - Test {e.passedtestcase}
                  </div>
                );
              } else if (e.verdict == "OK") {
                return (
                  <div
                    className="text-xs mono p-2 rounded bg-slate-950 border border-slate-800 text-green-400"
                    key={key}
                  >
                    OK - Test {e.passedtestcase}
                  </div>
                );
              } else {
                return (
                  <div
                    className="text-xs mono p-2 rounded bg-slate-950 border border-slate-800 text-blue-400"
                    key={key}
                  >
                    {e.verdict}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
}
