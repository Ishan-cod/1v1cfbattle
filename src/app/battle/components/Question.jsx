import React from "react";
import Winner from "./Winner";

export function Question({ problemdata, roomdata, qid }) {
  const player1 = roomdata.players.host.handle;
  const player2 = roomdata.players.guest.handle;

  let player1win = 0;
  let player2win = 0;

  roomdata.match_data.forEach((e) => {
    if (e.winner == player1) player1win += 1;
    else if (e.winner == player2) player2win += 1;
  });

  let roomwinner;
  if (player1win > player2win) {
    roomwinner = player1;
  } else roomwinner = player2;

  if (roomdata.status == "FINISHED") {
    return (
      <>
        <section className="col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
            <div className="font-bold font-mono">Match Status : FINISHED</div>
            <div className="font-bold font-mono text-yellow-400 uppercase">
              Winner : {roomwinner}
            </div>
            <div className="font-bold font-mono">
              Players :{" "}
              <div className="flex-col">
                <div>Player1 : {player1}</div>
                <div>Player2 : {player2}</div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (roomdata.status == "CANCELLED") {
    return (
      <>
        <section className="col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
            <div className="font-bold font-mono text-red-500">
              Match Status : CANCELLED
            </div>
            <div className="font-bold font-mono">
              Players :{" "}
              <div className="flex-col">
                <div>Player1 : {player1}</div>
                <div>Player2 : {player2}</div>
              </div>
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
            <Winner winnerid={roomdata.match_data[qid - 1].winner} />
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
