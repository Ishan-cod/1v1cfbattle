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
  activeuser,
  ismatchfinished
}) {
  const allplayerhandle = [];
  if (opponentdata.host.handle != activeuser.handle)
    allplayerhandle.push(opponentdata.host.handle);

  console.log(activeuser);

  opponentdata.guest.forEach((guest) => {
    if (guest.handle != activeuser.handle) allplayerhandle.push(guest.handle);
  });
  return (
    <>
      <section className="col-span-3 space-y-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Opponents</h2>
              <p className="text-sm text-slate-400"></p>
            </div>

            <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
              {allplayerhandle?.length || 0} online
            </div>
          </div>

          <div className="grid gap-3">
            {allplayerhandle.length > 0 ? (
              allplayerhandle.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-300 font-bold">
                      {item?.[0].toUpperCase() || "O"}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-200 text-xs font-mono">
                        {item}
                      </h3>
                      <p className="text-xs text-slate-500">opponent</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 px-4 py-8 text-center">
                <p className="text-slate-400">
                  Waiting for opponents to join...
                </p>
              </div>
            )}
          </div>

          <div className="mt-5">
            <Options setqid={setqid} qcount={qcount} qid={qid} matchfinished={ismatchfinished}/>
          </div>
        </div>
      </section>
    </>
  );
}
