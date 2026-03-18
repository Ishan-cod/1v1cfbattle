"use client";
import React, { useEffect, useState } from "react";

export function BattleHeader({
  roomid,
  starttime,
  timelimit,
  roomdata,
  cancelmatch,
}) {
  const [timeleft, settimeleft] = useState("");

  useEffect(() => {
    const endtimems = starttime * 1000 + timelimit * 60 * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = endtimems - now;

      if (remaining <= 0) {
        clearInterval(interval);
        settimeleft("Match Over");
        cancelmatch();
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      settimeleft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [starttime, timelimit, cancelmatch]);

  return (
    <>
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="bg-blue-600 text-[10px] font-extrabold px-2 py-1 rounded tracking-widest">
              LIVE
            </span>
            <h1 className="font-bold text-lg tracking-tight">
              ROOM:{" "}
              <span className="text-blue-400 mono">
                #DUEL-{roomid.slice(4)}
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              Time Remaining
            </span>
            <span
              className="text-3xl font-black mono text-yellow-300 tracking-tighter"
              id="timer"
            >
              {roomdata.status === "FINISHED" || roomdata.status === "CANCELLED"
                ? `THANK YOU FOR PLAYING`
                : timeleft}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-xs font-bold text-slate-400 hover:text-white transition"
              onClick={cancelmatch}
            >
              SURRENDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
