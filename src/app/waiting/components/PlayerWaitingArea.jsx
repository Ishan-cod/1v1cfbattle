import React from "react";
import { WaitingCardHost } from "./WaitingCardHost";
import WaitingCardGuest from "./WaitingCardGuest";

const PlayerWaitingArea = ({
  hostdata,
  guestarray,
  playercount,
  roomreadystatus,
}) => {
  const allplayers = [hostdata, ...guestarray];
  return (
    <div class="bg-[#0f172a] border border-white/10 rounded-2xl p-5 w-full mx-auto shadow-lg flex flex-col min-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-white text-lg font-semibold">Room Players</h2>
        <div>
          <span class="text-xs  bg-yellow-50 p-1 rounded text-black font-bold">
            Multi Battle
          </span>
          <span className="text-xs text-white/50 mx-2">
            Total Players: {playercount}
          </span>
        </div>
      </div>

      <div class="space-y-3">
        {allplayers.map((player, index) => {
          if (player.handle == hostdata.handle) {
            return (
              <WaitingCardHost
                key={index}
                handle={player.handle}
                readystatus={player.is_ready}
              />
            );
          }

          return (
            <WaitingCardGuest
              key={index}
              handle={player.handle}
              readystatus={player.is_ready}
            />
          );
        })}

        {!roomreadystatus ? (
          <div class="flex items-center justify-center border border-dashed border-white/10 rounded-xl py-3 text-white/40 text-sm">
            Waiting for player...
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export { PlayerWaitingArea };
