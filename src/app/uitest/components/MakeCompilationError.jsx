"use client";
import React, { useState, useEffect } from "react";
import { X, AlertCircle, CheckCircle2, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const CodeforcesErrorChallenge = ({ isOpen, setIsOpen, cfhandle }) => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [problem, setProblem] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | success | fail
  const [loading, setLoading] = useState(false);
  const [verificationloading, setverificationloading] = useState(false);

  const fetchRandomProblem = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://codeforces.com/api/problemset.problems",
      );
      const data = await response.json();
      if (data.status === "OK") {
        const problems = data.result.problems;
        const randomProblem =
          problems[Math.floor(Math.random() * problems.length)];
        setProblem(randomProblem);
        setStatus("idle");
      }
    } catch (error) {
      console.error("Failed to fetch problem:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchRandomProblem();
  }, [isOpen]);

  const verifyError = async () => {
    if (!problem) {
      console.log("CANNOT GET THE PROBLEM");
      return;
    }

    try {
      setverificationloading(true);

      const url = "/api/user/auth/checkCompError";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cfhandle: cfhandle,
          contestid: problem.contestId,
          index: problem.index,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const settokenurl = "/api/user/auth/settoken";
        const response = await fetch(settokenurl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cfhandle: cfhandle,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus("success");
        } else setStatus("fail");
      } else {
        setStatus("fail");
      }

      setverificationloading(false);
    } catch (error) {
      console.error("FAILED TO CHECK SUBMISSION");
      setStatus("fail");
      setverificationloading(false);
    }
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div>
            <h2 className="text-xl font-bold text-gray-100">
              Make a Compilation error !
            </h2>
            {problem && (
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                {problem.contestId}
                {problem.index} — {problem.name}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <RefreshCcw className="animate-spin text-indigo-500" size={32} />
              <p className="text-gray-400 font-medium">
                Fetching from Codeforces...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-indigo-300">
                  <AlertCircle size={16} />
                  <h3 className="text-xs font-bold uppercase tracking-tighter">
                    Objective
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Please submit a{" "}
                  <span className="text-red-600 uppercase font-semibold">
                    compilation error
                  </span>{" "}
                  to the problem below to verify your codeforce account.
                  <div className="flex justify-center">
                    <Image
                      src={"/sorry.png"}
                      width={200}
                      height={200}
                      className="flex items-center justify-center"
                      alt="SORRY_IMAGE"
                    />
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <div>
                      <span className="text-yellow-300 font-bold">
                        This verification is done only the first time you use
                        this website.
                      </span>
                      <br />
                      <span className="w-full flex items-center justify-center">
                        Sorry for the trouble!
                      </span>
                    </div>
                  </div>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-800 bg-gray-900/80 flex items-center gap-4">
          <button
            onClick={verifyError}
            disabled={loading && verificationloading}
            className="flex-1 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
          >
            {verificationloading ? (
              <Loader2 className="animate-spin flex w-full items-center justify-center size-8" />
            ) : (
              "Verify Compilation Error"
            )}
          </button>

          <a
            href={`https://codeforces.com/problemset/problem/${problem?.contestId}/${problem?.index}`}
            target="_blank"
          >
            <button
              className="py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl px-2 transition-all shadow-lg active:scale-95"
              type="button"
            >
              Open Problem
            </button>
          </a>

          <button
            onClick={fetchRandomProblem}
            disabled={loading}
            className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition"
            title="New Problem"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Result Toast Overlay */}
        {status !== "idle" && (
          <div
            className={`p-4 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${status === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}
          >
            {status === "success" ? (
              <>
                <CheckCircle2 size={20} />
                <span className="font-bold text-sm">
                  Success! Your ID successfully verified.
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={20} />
                <span className="font-bold text-sm">
                  Failed! Please retry for submission.
                </span>
              </>
            )}
            <button
              onClick={() => setStatus("idle")}
              className="ml-auto underline text-xs opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { CodeforcesErrorChallenge };
