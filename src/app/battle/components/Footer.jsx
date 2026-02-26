import { Loader2 } from "lucide-react";
import React from "react";

export function Footer({ verifysubmission, loading }) {
  return (
    <>
      {" "}
      <footer className="p-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <button
            id="verifyBtn"
            className="group relative w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3"
            disabled={loading}
            onClick={verifysubmission}
          >
            <span className="tracking-widest uppercase">
              {loading ? (
                <div className="w-full flex justify-center items-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "I Have Solved It — Verify My AC"
              )}
            </span>
          </button>
          <p className="text-center text-[10px] text-slate-600 mt-3 uppercase tracking-widest">
            Only click after getting "Accepted" on Codeforces
          </p>
        </div>
      </footer>
    </>
  );
}
