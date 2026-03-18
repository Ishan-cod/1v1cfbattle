import { useState } from "react";

export function CountSwitcher({ setqid, qid, qcount }) {
  const arr = [];

  for (let i = 1; i <= qcount; i++) {
    arr.push(i);
  }

  return (
    <div className="flex gap-1 my-2">
      {arr.map((num) => (
        <button
          key={num}
          onClick={() => setqid(num)}
          className={`px-4 py-2 rounded-xl transition-all duration-200
            ${
              qid === num
                ? "bg-yellow-400 text-black scale-110 font-bold"
                : "bg-gray-600 hover:bg-gray-500 text-white/85"
            }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
