import { getCFColor } from "@/lib/getrankcolor";
import { getCFRank } from "@/lib/getuserrank";
import React from "react";

const UserRating = ({ userating }) => {
  const colorcode = getCFColor(userating);
  return (
    <div
      className="glass-card p-5 rounded-2xl w-full md:w-56 border-l-4 glow-blue"
      style={{ borderLeftColor: colorcode }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">
          Codeforces Rating
        </span>
        <svg
          className="w-4 h-4"
          style={{ color: colorcode }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M1 9h4v11H1zM7 5h4v15H7zM13 10h4v10h-4zM19 13h4v7h-4z" />
        </svg>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-white italic">
          {userating}
        </span>
        <span
          className="text-xs font-bold uppercase tracking-tight"
          style={{ color: colorcode }}
        >
          {getCFRank(userating)}
        </span>
      </div>
    </div>
  );
};

export { UserRating };
