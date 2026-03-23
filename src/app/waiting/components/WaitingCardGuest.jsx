import React from "react";

const WaitingCardGuest = ({ handle, readystatus }) => {
  return (
    <div class="flex items-center justify-between bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
            G
          </div>
          {readystatus ? (
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0f172a] rounded-full"></span>
          ) : (
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-yellow-400 border-2 border-[#0f172a] rounded-full"></span>
          )}
        </div>

        <div>
          <p class="text-white text-sm font-medium">{handle}</p>
          <p class="text-xs text-gray-400">Guest</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        {readystatus ? (
          <span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-md">
            READY
          </span>
        ) : (
          <span class="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md">
            NOT READY
          </span>
        )}
        <span class="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded-md">
          GUEST
        </span>
      </div>
    </div>
  );
};

export default WaitingCardGuest;
