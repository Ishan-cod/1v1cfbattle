"use client";

import React, { act, use, useEffect, useState } from "react";
import { BattleHeader } from "../components/Header";
import { Player } from "../components/Player";
import { Question } from "../components/Question";
import { Opponent } from "../components/Opponent";
import { Footer } from "../components/Footer";
import Error from "next/error";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const unwrappedparam = use(params);
  const roomcode = unwrappedparam.id;

  const router = useRouter();
  const [roomfound, setroomfound] = useState(false);
  const [roommessage, setroommessage] = useState("");
  const [roomdata, setroomdata] = useState(null);
  const [activeuser, setactiveuser] = useState({ handle: "", role: "" });
  const [verifyloading, setverifyloading] = useState(false);

  useEffect(() => {
    try {
      const storagedata = localStorage.getItem("active_match");
      const localdata = JSON.parse(storagedata) || null;

      if (!localdata) {
        throw new Error("ERROR GETTING USER DATA");
      }

      setactiveuser({ handle: localdata.cfhandle, role: localdata.role });
    } catch (error) {
      alert("CURRENT USER DATA CANNOT PLEASE TRY REJOINING MATCH");
      router.push("/");
    }

    const fetchroomdata = async () => {
      const url = `/api/room/status/duel${roomcode}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        setroomfound(false);
        setroommessage(data.message);

        throw new Error("Error founding room status");
      }

      setroomdata(data.roomstatus);
    };

    fetchroomdata();
  }, [roomcode]);

  const verifysubmission = async () => {
    setverifyloading(true);

    try {
      const roomid = "duel" + roomcode;
      const url = "/api/match/verify";
      const cfhandle = activeuser.handle;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cfhandle: cfhandle,
          roomid: roomid,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      setverifyloading(false);
      alert(error.message);
    }

    try {
      const url = `/api/room/status/duel${roomcode}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setroomdata(data.roomstatus);
    } catch (error) {
      setverifyloading(false);
      alert(error.message);
    }

    setverifyloading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let failure = 0;
      const fetchroomdata = async () => {
        try {
          const url = `/api/room/status/duel${roomcode}`;
          const response = await fetch(url);
          const data = await response.json();

          if (!data.success) {
            setroomfound(false);
            setroommessage(data.message);

            throw new Error("Error founding room status");
          }

          setroomdata(data.roomstatus);
          if (data.roomstatus.status === "FINISHED") {
            clearInterval(interval);
          }
        } catch (error) {
          failure += 1;
          if (failure >= 5) {
            alert("ERROR GETTING MATCH DATA! PLEASE TRY AGAIN");
            clearInterval(interval);
            router.push("/");
          }
        }
      };

      fetchroomdata();
    }, 6000);

    return () => clearInterval(interval);
  });

  if (!roomdata) {
    return (
      <>
        <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col">
          <div>{/* Loading screen here */}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col">
        <BattleHeader
          roomid={roomdata.roomcode}
          starttime={roomdata.match_data.start_time}
          timelimit={roomdata.settings.time_limit_mins}
          roomdata={roomdata}
        />

        <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 p-6">
          <Player playerdata={roomdata.players[activeuser.role]} />
          <Question
            problemdata={roomdata.match_data.problem}
            roomdata={roomdata}
          />
          <Opponent
            opponentdata={
              activeuser.role === "host"
                ? roomdata.players.guest
                : roomdata.players.host
            }
          />
        </div>

        <Footer verifysubmission={verifysubmission} loading={verifyloading} />
      </div>
    </>
  );
}
