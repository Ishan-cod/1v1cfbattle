import { Loader2 } from "lucide-react";
import React from "react";

const LandingJoinRoom = ({
  setroomid,
  loading,
  handlejoinroom,
  isbuttondisabled,
  setroomstatus,
}) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">
          Enter room type:
        </label>
        <select
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 uppercase"
          defaultValue={"duel (1 vs 1 room)"}
          onChange={(e) => {
            const val = e.target.value.toString().toLowerCase();
            if (val === "duel (1 vs 1 room)") {
              setroomstatus("duel");
            } else {
              setroomstatus("multi");
            }
          }}
        >
          <option>duel (1 vs 1 room)</option>
          <option>multi (N player room)</option>
        </select>
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">
          Enter Room Code
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="0000"
          maxLength={4}
          minLength={4}
          required
          onChange={(e) => {
            let val = e.target.value.trim();
            let roomcode = Number(val);
            setroomid(val);
          }}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono uppercase text-center tracking-widest"
        />
      </div>
      {isbuttondisabled ? (
        <button
          className="w-full py-4 bg-slate-400 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-900/20 uppercase tracking-widest text-sm"
          onClick={() => alert("Please verify CF ID")}
        >
          Join room
        </button>
      ) : (
        <button
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-900/20 uppercase tracking-widest text-sm"
          disabled={loading}
          onClick={handlejoinroom}
        >
          {loading ? (
            <>
              <div className="w-full flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            </>
          ) : (
            "Join room"
          )}
        </button>
      )}
    </div>
  );
};

export { LandingJoinRoom };
