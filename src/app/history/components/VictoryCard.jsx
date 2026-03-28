import { formatCFTime } from "@/lib/dateandtime";
import React from "react";

const DuelHistoryCard = ({
  opponent,
  starttime,
  endtime,
  problemid,
  status,
  currentUserHandle,
  roomcode,
}) => {
  const { date, time } = formatCFTime(starttime);

  // Calculate duration in minutes/seconds
  const durationSeconds = endtime - starttime;
  const mins = Math.floor(durationSeconds / 60);
  const secs = durationSeconds % 60;
  const durationText = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const isWin = status === "WIN";
  console.log(opponent);
  const opponentstring = opponent
    .filter((e) => e !== currentUserHandle)
    .map((e) => e)
    .join("; ");

  return (
    <div
      className={`glass-card p-4 rounded-xl border-l-4 flex items-center justify-between transition-all hover:translate-x-1 ${
        isWin
          ? "border-green-500 bg-green-500/5"
          : "border-red-500 bg-red-500/5"
      }`}
    >
      {/* Left Section: Status & Players */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center min-w-[70px]">
          <span
            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
              isWin
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {status}
          </span>
          <a
            href={`https://codeforces.com/problemset/problem/${problemid.slice(0, -1)}/${problemid.at(-1)}`}
            target="_blank"
          >
            <p className="text-lg font-black text-white mt-1 leading-none">
              {problemid}
            </p>
          </a>
        </div>

        <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase leading-none">
              Opponent
            </span>
            <span className="text-sm font-bold text-gray-200">
              {opponentstring}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Stats (Desktop Only) */}
      <div className="flex items-center justify-between">
        {roomcode.slice(0, 4).toUpperCase() == "DUEL" ? (
          <div className="px-3 py-1 text-sm font-medium bg-yellow-600/20 text-yellow-400 rounded-full border border-yellow-500/30 uppercase">
            DUEL
          </div>
        ) : (
          <div className="px-3 py-1 text-sm font-medium bg-purple-600/20 text-purple-400 rounded-full border border-purple-500/30 uppercase">
            MULTI
          </div>
        )}

        <div className="hidden md:flex flex-col items-center mx-4">
          <span className="text-[10px] text-gray-500 uppercase">Duration</span>
          <span className="text-sm font-mono text-blue-400 font-medium">
            {durationText}
          </span>
        </div>

        {/* Right Section: Date & Time */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-300">{date}</p>
          <p className="text-[10px] text-gray-500 font-mono">{time}</p>
        </div>
      </div>
    </div>
  );
};

export { DuelHistoryCard };
