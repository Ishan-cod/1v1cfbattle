import { getarenarating } from "@/lib/getarenarating";
import React from "react";

const UserWinLose = ({ wins, loss, userrating }) => {
  return (
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="glass-card p-4 rounded-xl text-center">
        <p class="text-xs text-gray-500 uppercase font-bold mb-1">Wins</p>
        <p class="text-2xl font-bold text-green-400">{wins}</p>
      </div>
      <div class="glass-card p-4 rounded-xl text-center">
        <p class="text-xs text-gray-500 uppercase font-bold mb-1">Losses</p>
        <p class="text-2xl font-bold text-red-400">{loss}</p>
      </div>
      <div class="glass-card p-4 rounded-xl text-center">
        <p class="text-xs text-gray-500 uppercase font-bold mb-1">
          Arena Rating
        </p>
        <p class="text-2xl font-bold text-blue-400">
          {getarenarating({
            win: wins,
            loss: loss,
            rating: userrating,
          }).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export { UserWinLose };
