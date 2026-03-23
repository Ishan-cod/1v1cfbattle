import { Loader2 } from "lucide-react";

export function LobbyHeader({ roomid, handshake, loader }) {
  return (
    <>
      <div className="w-full max-w-5xl flex justify-between items-end mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
            waiting room to fill
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Lets code it
            </p>
          </div>
        </div>

        <div className="flex items-end gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Room Code
            </span>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
              <code className="text-blue-400 font-mono font-bold text-lg uppercase">
                {roomid}
              </code>
            </div>
          </div>

          {/* New Ready Button */}
          {loader ? (
            <button
              className="h-11.5 px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-tighter rounded-lg transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
              disabled
            >
              <Loader2 className="animate-spin" />
            </button>
          ) : (
            <button
              className="h-11.5 px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-tighter rounded-lg transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
              onClick={handshake}
            >
              Ready
            </button>
          )}
        </div>
      </div>
    </>
  );
}
