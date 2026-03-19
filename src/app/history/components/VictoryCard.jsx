import { formatCFTime } from "@/lib/dateandtime";
import React from "react";

const DuelHistoryCard = ({
  opponent,
  starttime,
  endtime,
  problemid,
  status,
  currentUserHandle,
}) => {
  const { date, time } = formatCFTime(starttime);

  // Calculate duration in minutes/seconds
  const durationSeconds = endtime - starttime;
  const mins = Math.floor(durationSeconds / 60);
  const secs = durationSeconds % 60;
  const durationText = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const isWin = status === "WIN";

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
          <p className="text-lg font-black text-white mt-1 leading-none">
            {problemid}
          </p>
        </div>

        <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase leading-none">
              Opponent
            </span>
            <span className="text-sm font-bold text-gray-200">{opponent}</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Stats (Desktop Only) */}
      <div className="hidden md:flex flex-col items-center">
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
  );
};

export { DuelHistoryCard };
