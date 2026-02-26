import { Loader2 } from "lucide-react";
import React from "react";

const LandingCreateRoom = ({ loading, handlecreateroom }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-xs text-slate-500 text-center px-4 leading-relaxed">
        Start a new private match. You'll get a room code to invite your
        opponent.
      </p>
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
    </div>
  );
};

export { LandingCreateRoom };
