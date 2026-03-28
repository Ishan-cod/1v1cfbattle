"use client";
import React, { use, useEffect, useState } from "react";
import { UserImage } from "../components/UserImage";
import { UserDetail } from "../components/UserDetail";
import { UserRating } from "../components/UserRating";
import { UserWinLose } from "../components/UserWinLose";
import { DuelHistoryCard } from "../components/VictoryCard";
import { Loader2 } from "lucide-react";

const Page = ({ params }) => {
  const unwrappedparam = use(params);
  const cfid = unwrappedparam.id;

  const [userdata, setuserdata] = useState(null);
  const [userhistory, setuserhistory] = useState(null);

  useEffect(() => {
    const fetchuserdata = async () => {
      const handle = cfid.trim().toLowerCase();
      const url = `/api/user/fetchuser/${handle}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
          throw new Error("Failed to get user data");
        }

        const sortedMatch = data.historydata.match.toSorted(
          (a, b) => new Date(b.starttime) - new Date(a.starttime),
        );

        const updatedHistory = {
          ...data.historydata,
          match: sortedMatch,
        };

        setuserdata(data.userdata);
        setuserhistory(updatedHistory);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchuserdata();
  }, [cfid]);

  if (!userdata || !userhistory) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={50} />
        <div className="mx-2">Loading ...</div>
      </div>
    );
  }

  return (
    <div className="text-gray-200 min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-16">
          <UserImage imageurl={userdata.avatar} />

          <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-6">
            <UserDetail userid={userdata.handle} userrating={userdata.rating} />
            <UserRating userating={userdata.rating} />
          </div>
        </div>

        <UserWinLose
          wins={userdata.wins}
          loss={userdata.losses}
          userrating={userdata.rating}
        />

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
            Recent Battles
          </h2>

          {userhistory.match.map((e, key) => {
            return (
              <DuelHistoryCard
                key={key}
                currentUserHandle={userdata.handle}
                endtime={e.endtime}
                problemid={e.problemid}
                opponent={e.opponent}
                starttime={e.starttime}
                status={e.status}
                roomcode={e.roomcode}
              />
            );
          })}
        </div>

        <div className="w-full items-center justify-center flex font-mono text-white/60 font-bold mt-5">
          * Please wait while the developer is adding your previous match data
          *{" "}
        </div>
      </div>
    </div>
  );
};

export default Page;
