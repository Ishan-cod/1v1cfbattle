import React from "react";

const LeaveChat = ({ name, time }) => {
  return (
    <div class="flex items-center space-x-2 font-mono text-sm my-6">
      <span class="text-rose-500 font-bold">[-]</span>
      <span class="text-gray-500 font-bold uppercase text-[10px]">
        [{time}]
      </span>
      <p class="text-rose-400/90">
        Connection lost:{" "}
        <span class="text-white underline decoration-red-800">{name}</span>
        <span> left the room.</span>
      </p>
    </div>
  );
};

export { LeaveChat };
