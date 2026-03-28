import React from "react";
import { CountSwitcher } from "./CountSwitcher";
import { ProblemChangeTooltip } from "./ProblemChangeTooltip";

const Options = ({ setqid, qid, qcount, matchfinished }) => {
  return (
    <div className="text-slate-400 uppercase text-[11px] font-semiboldbold">
      <div className="text-[10px] uppercase font-bold text-slate-500 my-1">
        Questions
      </div>
      <div>
        {/* <div
          className="font-mono py-1 hover:bg-slate-800 rounded-lg px-0.5 hover:cursor-pointer flex justify-between items-center text-xs"
          onClick={() => alert("This feature is under development")}
        >
          Change this problem
          <ProblemChangeTooltip />
        </div>   */}
        <div>
          <CountSwitcher qcount={qcount} qid={qid} setqid={setqid} />
          {matchfinished ? (
            <button
              className="  px-8 py-2  bg-transparent border-2 border-yellow-500/20 text-yellow-500 font-mono font-bold hover:bg-yellow-500 hover:text-black  transition-all duration-200 ease-in-out  clip-path-polygon-[10%_0,100%_0,100%_70%,90%_100%,0_100%,0%_30%]"
              onClick={() => setqid(-1)}
            >
              MATCH_SUMMARY
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export { Options };
