import React from "react";
import { LiveFeed } from "./LiveFeed";
import { Options } from "./Options";

export function Opponent({
  opponentdata,
  getlivefeed,
  feed,
  setqid,
  qid,
  qcount,
}) {
  return (
    <>
      <section className="col-span-3 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 font-bold">
              OPP
            </div>
            <div>
              <h2 className="font-bold text-slate-200">
                {opponentdata.handle}
              </h2>
            </div>
          </div>

          {/* options */}
          <Options setqid={setqid} qcount={qcount} qid={qid} />
          {/* End here */}
        </div>

        <LiveFeed getlivefeed={getlivefeed} livefeed={feed} />
      </section>
    </>
  );
}
