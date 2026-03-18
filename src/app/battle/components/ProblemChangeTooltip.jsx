import { AlertCircle } from "lucide-react";
import React from "react";

const ProblemChangeTooltip = () => {
  return (
    <div className="relative group inline-block">
      <AlertCircle size={18} className="cursor-pointer" />

      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      bg-gray-800 text-white text-2xs px-2 py-1 rounded-md
                      whitespace-break-spaces"
      >
        Only Host can change the problem statement.
      </div>
    </div>
  );
};

export { ProblemChangeTooltip };
