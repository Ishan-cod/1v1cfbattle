import { Loader2 } from "lucide-react";
import React from "react";

const LandingCreateRoom = ({
  loading,
  handlecreateroom,
  isbuttondisabled,
  setplayercount,
}) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">
          Enter the number of players
        </label>
        <select
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          defaultValue={2}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setplayercount(val);
          }}
        >
          <option>2</option>
          <option>3 </option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <p className="text-xs text-slate-500 text-center px-4 leading-relaxed">
        Start a new private match. You'll get a room code to invite your
        opponent.
      </p>
      {isbuttondisabled ? (
        <button
          className="w-full py-4 bg-slate-400 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest text-sm mt-2"
          onClick={() => alert("Please verify the CF ID")}
        >
          Generate room
        </button>
      ) : (
        <button
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest text-sm mt-2"
          onClick={handlecreateroom}
        >
          {loading ? (
            <>
              <div className="w-full flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            </>
          ) : (
            "Generate room"
          )}
        </button>
      )}
    </div>
  );
};

export { LandingCreateRoom };
