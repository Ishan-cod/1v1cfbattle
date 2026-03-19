import { formatCFTime } from "@/lib/dateandtime";
import React from "react";

const LossCard = ({ user, opponent, timestring }) => {
  const { date, time } = formatCFTime(timestring);
  return (
    <div class="glass-card p-5 rounded-2xl flex items-center justify-between transition hover:border-red-500/40">
      <div class="flex items-center gap-6">
        <div class="hidden md:block">
          <span class="text-xs font-black text-red-500 uppercase py-1 px-3 bg-red-500/10 rounded-full">
            Defeat
          </span>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-sm font-bold text-white">{user}</p>
          </div>
          <div class="text-gray-600 font-black italic">VS</div>
          <div class="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=binary_beast"
              alt="Opponent"
              class="w-10 h-10 rounded-lg bg-white/5"
            />
            <div>
              <p class="text-sm font-bold text-white">{opponent}</p>
              <p class="text-[10px] text-gray-500 uppercase">Opponent</p>
            </div>
          </div>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm font-medium text-gray-300">{date}</p>
        <p class="text-[10px] text-gray-500 uppercase">{time}</p>
      </div>
    </div>
  );
};

export { LossCard };
