import { getCFRank } from "@/lib/getuserrank";
import React from "react";

const UserDetail = ({ userid, userrating }) => {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
        {userid}
      </h1>
      <div className="flex items-center gap-3 justify-center md:justify-start">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
          {getCFRank(userrating)}
        </span>
      </div>
    </div>
  );
};

export { UserDetail };
