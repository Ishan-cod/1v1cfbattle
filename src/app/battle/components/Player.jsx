import TerminalChatUI from "@/app/uitest/components/TerminalChat";
import { Loader2 } from "lucide-react";
import React from "react";
import { Opponent } from "./Opponent";

export function Player({
  playerdata,
  live_feed,
  verifysubmission,
  verifysubmissionloader,
}) {
  const filtered_feed = live_feed.filter((e) => e.player == playerdata.handle);
  return (
    <>
      <section className="col-span-3 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4 p-1.5 rounded bg-black">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-green-500 flex items-center justify-center text-green-400 font-bold uppercase">
              {playerdata.handle[0]}
            </div>
            <div>
              <h2 className="font-bold text-sm font-mono">
                {playerdata.handle} (YOU)
              </h2>
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

        <div>
          {verifysubmissionloader ? (
            <button
              className="w-full rounded-xl border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 font-semibold text-emerald-200 backdrop-blur-sm shadow-[0_0_20px_rgba(52,211,153,0.15)] transition-all duration-200 hover:bg-emerald-400/25 hover:text-white hover:shadow-[0_0_25px_rgba(52,211,153,0.25)] active:scale-[0.98] justify-center flex"
              disabled
            >
              <Loader2 className="animate-spin" />
            </button>
          ) : (
            <button
              className="w-full rounded-xl border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 font-semibold text-emerald-200 backdrop-blur-sm shadow-[0_0_20px_rgba(52,211,153,0.15)] transition-all duration-200 hover:bg-emerald-400/25 hover:text-white hover:shadow-[0_0_25px_rgba(52,211,153,0.25)] active:scale-[0.98]"
              onClick={verifysubmission}
            >
              Verify submission for this question
            </button>
          )}
        </div>
      </section>
    </>
  );
}
