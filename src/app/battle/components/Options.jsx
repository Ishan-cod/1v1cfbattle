import React from "react";
import { CountSwitcher } from "./CountSwitcher";
import { ProblemChangeTooltip } from "./ProblemChangeTooltip";

const Options = ({ setqid, qid, qcount }) => {
  return (
    <div className="text-slate-400 uppercase text-[11px] font-semiboldbold">
      <div className="text-[10px] uppercase font-bold text-slate-500 my-1">
        Options
      </div>
      <div>
        <div
          className="font-mono py-1 hover:bg-slate-800 rounded-lg px-0.5 hover:cursor-pointer flex justify-between items-center text-xs"
          onClick={() => alert("This feature is under development")}
        >
          Change this problem
          <ProblemChangeTooltip />
        </div>  
        <div>
          <CountSwitcher qcount={qcount} qid={qid} setqid={setqid} />
        </div>
      </div>
    </div>
  );
};

export { Options };
