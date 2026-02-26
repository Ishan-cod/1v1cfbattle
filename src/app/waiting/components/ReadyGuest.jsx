import React from "react";

const ReadyGuest = ({guest}) => {
  return (
    <div className="bg-slate-900 border-2 border-green-600 rounded-2xl p-6 relative overflow-hidden shadow-2xl shadow-blue-500/10">
      <div className="absolute top-0 right-0 bg-green-500 text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg">
        Guest
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-green-500 to-green-900 flex items-center justify-center text-2xl font-black text-white shadow-lg">
          {guest.handle.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{guest.handle}</h3>
        </div>
      </div>
      <div className="mt-8">
        <button className="w-full py-3 bg-slate-800 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-bold rounded-xl transition-all uppercase tracking-widest text-xs">
          {guest.is_ready ? "READY" : "NOT READY"}
        </button>
      </div>
    </div>
  );
};

export default ReadyGuest;
