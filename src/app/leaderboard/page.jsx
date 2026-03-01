"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

const page = () => {
  const [players, setplayers] = useState([]);
  const [isloading, setloading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      try {
        const url = "/api/leaderboard";
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message);
        }
        setplayers(data.data);
        setloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchdata();
  }, []);

  const getPowerIndex = (p) => {
    const wins = p.wins || 0;
    const losses = p.losses || 0;
    const cfrating = p.rating || 0;

    return cfrating * 0.2 + (Math.pow(wins, 2) / (wins + losses + 1)) * 100;
  };

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const indexA = getPowerIndex(a);
      const indexB = getPowerIndex(b);

      return indexB - indexA;
    });
  }, [players]);

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col items-center justify-center p-6 font-sans bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
            Global Rankings
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Top Arena Combatants
          </p>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
              <th className="px-8 py-4">Rank</th>
              <th className="px-8 py-4">Handle</th>
              <th className="px-8 py-4">Rating</th>
              <th className="px-8 py-4 text-right">W / L</th>
              <th className="px-8 py-4 text-right">Arena Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {isloading ? (
              <>
                <span className="w-full flex justify-center">
                  <Loader2 className="animate-spin" />
                </span>
              </>
            ) : (
              <>
                {sortedPlayers.map((player, index) => (
                  <tr
                    key={player.handle}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <span
                        className={`font-mono font-bold ${index < 3 ? "text-blue-400" : "text-slate-500"}`}
                      >
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-500 border border-slate-700">
                          {player.handle[0].toUpperCase()}
                        </div>
                        <a
                          href={`https://codeforces.com/profile/${player.handle}`}
                          target="_blank"
                        >
                          <span className="font-bold text-slate-200 group-hover:text-white">
                            {player.handle}
                          </span>
                        </a>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-blue-400 font-mono font-bold">
                      {player.rating}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-emerald-500 font-bold">
                        {player.wins}W
                      </span>
                      <span className="text-slate-600 mx-2">/</span>
                      <span className="text-red-500 font-bold">
                        {player.losses}L
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-yellow-300 font-mono font-bold">
                        {Math.floor(getPowerIndex(player))}
                      </span>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
