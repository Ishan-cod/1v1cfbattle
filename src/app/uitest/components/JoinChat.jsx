import React from "react";

const JoinChat = ({ name, time }) => {
  return (
    <div class="flex items-center space-x-2 font-mono text-sm my-6">
      <span class="text-emerald-500 font-bold">[+]</span>
      <span class="text-gray-500 font-bold uppercase text-[10px]">
        [{time}]
      </span>
      <p class="text-emerald-400/90 ">
        Joined : user{" "}
        <span class="text-white underline decoration-emerald-500/50">
          {name}
        </span>{" "}
        has joined the room...
      </p>
    </div>
  );
};

export { JoinChat };
