"use client";
import React, { useEffect, useState } from "react";
import { Difficulty } from "./Difficulty";
import { Timelimit } from "./Timelimit";
import { Settings } from "lucide-react";
import QuestionTags from "./QuestionTags";
import { Loader2 } from "lucide-react";
import { NumberOfQuestion } from "./NumberOfQuestion";

const MatchSetting = ({
  minrating,
  setminrating,
  maxrating,
  setmaxrating,
  settimeduration,
  roomready,
  setquestiontags,
  startmatch,
  loading,
  activeuser,
  setquestioncount
}) => {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6 text-slate-400">
          <Settings size={18} />
          <h2 className="font-bold uppercase tracking-widest text-sm">
            Match Settings
          </h2>
        </div>

        <div className="space-y-4">
          <Difficulty setmaxrating={setmaxrating} setminrating={setminrating} />
          <Timelimit settimelimit={settimeduration} />
          <NumberOfQuestion setquestioncount={setquestioncount}/>
          <QuestionTags setquestiontags={setquestiontags} />
        </div>

        {maxrating < minrating ? (
          <div className="text-red-600 text-xs font-mono">
            maximum rating cannot be less than minimum rating
          </div>
        ) : (
          <></>
        )}
      </div>

      {roomready && activeuser.role === "host" ? (
        <button
          className="w-full py-5 bg-green-400 text-black font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:bg-green-700 hover:cursor-pointer"
          onClick={startmatch}
        >
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            "Start Battle"
          )}
        </button>
      ) : (
        <button
          disabled
          className="w-full py-5 bg-slate-800 text-slate-500 font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl cursor-not-allowed"
        >
          Start Battle
        </button>
      )}

      <p className="text-[10px] text-center text-slate-600 font-bold uppercase italic">
        Waiting for players to ready up...
      </p>
    </div>
  );
};

export { MatchSetting };
