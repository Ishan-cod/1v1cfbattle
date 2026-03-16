import { RefreshCcw } from "lucide-react";
import React from "react";

const LiveFeed = ({ getlivefeed, livefeed }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-75">
      <div className="p-3 border-b border-slate-800 flex justify-between items-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          Live Feed
        </span>
        <div className="flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 panic-pulse animate-pulse"></span>

          <span className="hover:bg-slate-700 p-1 mx-2" onClick={getlivefeed}>
            <RefreshCcw size={18} />
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 mono text-[11px] space-y-3 overflow-y-auto">
        {livefeed.map((e, key) => {
          const time = new Date(e.submissiontime * 1000).toLocaleString();

          if (e.verdict === "system") {
            return (
              <p className="text-slate-500" key={key}>
                [{time}] Match started.
              </p>
            );
          } else if (e.verdict === "OK") {
            return (
              <p className="text-green-400" key={key}>
                <span className="text-slate-600">
                  [{time}] {e.player}:
                </span>{" "}
                {e.verdict} ({e.passedtestcase})
              </p>
            );
          } else {
            return (
              <p className="text-red-400" key={key}>
                <span className="text-slate-600">
                  [{time}] {e.player}:
                </span>{" "}
                {e.verdict} ({e.passedtestcase})
              </p>
            );
          }
        })}
      </div>
    </div>
  );
};

export { LiveFeed };
