import React from "react";
import Winner from "./Winner";
import { decideWinner } from "@/lib/decideWinner";

export function Question({ problemdata, roomdata, qid }) {
  if (roomdata.status == "FINISHED" && qid === -1) {
    const deciderobj = decideWinner({ roomdata: roomdata });
    const roomwinner = deciderobj.roomwinner;
    return (
      <>
        <section className="col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
            <div className="font-bold font-mono">Match Status : FINISHED</div>
            <div className="font-bold font-mono text-yellow-400 uppercase">
              Winner : {roomwinner}
            </div>
            <div className="font-mono w-full flex flex-col items-center">
              <p className="text-sm font-bold text-slate-300 mb-2">Players</p>

              <div className="w-full max-w-xs space-y-1">
                {/* Host */}
                <div className="flex justify-between px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">1.</span>
                  <span className="flex-1 ml-2 text-slate-100">
                    {roomdata.players.host.handle}{" "}
                    <span className="text-yellow-400">[H]</span>
                  </span>
                  <span className="text-yellow-400">
                    {deciderobj.wincount[roomdata.players.host.handle]}
                  </span>
                </div>

                {/* Guests */}
                {roomdata.players.guest.map((e, key) => {
                  return (
                    <div
                      key={key}
                      className="flex justify-between px-3 py-1.5 rounded bg-slate-950 border border-slate-800"
                    >
                      <span className="text-slate-400">{key + 2}.</span>
                      <span className="flex-1 ml-2 text-slate-200">
                        {e.handle} [G]
                      </span>
                      <span>{deciderobj.wincount[e.handle]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (roomdata.status == "CANCELLED" && qid === -1) {
    return (
      <>
        <section className="col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
            <div className="font-bold font-mono text-red-500">
              Match Status : CANCELLED
            </div>
            <div className="w-full max-w-xs space-y-1 flex flex-col justify-center">
              {/* Host */}
              <div className="flex justify-between px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">1.</span>
                <span className="flex-1 ml-2 text-slate-200">
                  {roomdata.players.host.handle}
                </span>
                <span className="text-[10px] text-yellow-400">HOST</span>
              </div>

              {/* Guests */}
              {roomdata.players.guest.map((e, key) => {
                return (
                  <div
                    key={key}
                    className="flex justify-between px-3 py-1.5 rounded bg-slate-950 border border-slate-800"
                  >
                    <span className="text-slate-400">{key + 2}.</span>
                    <span className="flex-1 ml-2 text-slate-200">
                      {e.handle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="col-span-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
          <div>
            <span className="text-blue-500 font-bold text-sm mono">
              {problemdata.id}
              {problemdata.index}
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              {problemdata.name}
            </h2>
            <div className="flex justify-center gap-2 mt-3">
              {problemdata.tags.map((e) => (
                <span
                  key={e}
                  className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold"
                >
                  {e}
                </span>
              ))}
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                {problemdata.rating} RATING
              </span>
            </div>
          </div>

          <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-left text-sm text-slate-400 leading-relaxed">
            {problemdata.url}
          </div>

          {roomdata.match_data[qid - 1].winner ? (
            <Winner
              winnerid={roomdata.match_data[qid - 1].winner}
              totalTime={
                roomdata.match_data[qid - 1].end_time -
                roomdata.match_data[qid - 1].start_time
              }
            />
          ) : (
            <></>
          )}

          <a
            href={problemdata.url}
            target="_blank"
            className="inline-block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/20"
          >
            OPEN PROBLEM ON CODEFORCES ↗
          </a>
        </div>
      </section>
    </>
  );
}
