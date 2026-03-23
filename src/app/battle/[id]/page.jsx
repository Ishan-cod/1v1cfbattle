"use client";

import React, { act, use, useEffect, useState } from "react";
import { BattleHeader } from "../components/Header";
import { Player } from "../components/Player";
import { Question } from "../components/Question";
import { Opponent } from "../components/Opponent";
import { Footer } from "../components/Footer";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Page({ params }) {
  const unwrappedparam = use(params);
  const roomcode = unwrappedparam.id;

  const router = useRouter();
  const [roomfound, setroomfound] = useState(false);
  const [roommessage, setroommessage] = useState("");
  const [roomdata, setroomdata] = useState(null);
  const [activeuser, setactiveuser] = useState({ handle: "", role: "" });
  const [verifyloading, setverifyloading] = useState(false);
  const [livefeed, setlivefeed] = useState([]);
  const [qid, setqid] = useState(1);

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
      const url = `/api/room/status/${roomcode}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        setroomfound(false);
        setroommessage(data.message);

        throw new Error("Error founding room status");
      }

      setroomdata(data.roomstatus);
    };

    const getlivefeed = async () => {
      try {
        const url = `/api/match/feed/${roomcode}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
          throw new Error("failed to get live feed");
        }

        const feed = data.feed;
        setlivefeed(feed);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchroomdata();
    getlivefeed();
  }, [roomcode]);

  const verifysubmission = async () => {
    setverifyloading(true);

    try {
      const roomid = roomcode;
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
          sol_id: qid,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      // if verification success (update history)
      try {
        const hurl = "/api/user/historyupdate";
        const hresponse = await fetch(hurl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomid: roomid,
            pid: qid,
          }),
        });

        const data = await hresponse.json();
        if (!data.success) {
          throw new Error("error setting history of winner and loser");
        }
      } catch (error) {
        console.error("error setting loser and winner history");
      }
      // END
    } catch (error) {
      setverifyloading(false);
      alert("PROBLEM CANNOT BE VERIFIED");
    }

    try {
      const url = `/api/room/status/${roomcode}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setroomdata(data.roomstatus);
    } catch (error) {
      setverifyloading(false);
      alert("ERROR GETTING ROOM STATUS");
    }

    setverifyloading(false);
  };

  useEffect(() => {
    let failure = 0;
    let interval;

    const fetchroomdata = async () => {
      try {
        const url = `/api/room/status/${roomcode}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
          setroomfound(false);
          setroommessage(data.message);
          throw new Error("Error finding room status");
        }

        setroomdata(data.roomstatus);

        if (data.roomstatus.status === "CANCELLED") {
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

    interval = setInterval(fetchroomdata, 15000);
    fetchroomdata();
    return () => clearInterval(interval);
  }, [roomcode, router]);

  const cancelmatch = async () => {
    const roomid = roomcode;
    const url = `/api/room/cancel/${roomid}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {}
  };

  const getlivefeed = async () => {
    try {
      const url = `/api/match/feed/${roomcode}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        throw new Error("failed to get live feed");
      }

      const feed = data.feed;
      setlivefeed(feed);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!roomdata) {
    return (
      <>
        <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col w-full">
          <div>
            <Loader2 />
            <span className="mx-2 font-mono font-semibold text-white/85">
              Getting to battle arena. Please Wait!
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col">
        <BattleHeader
          roomid={roomdata.roomcode}
          starttime={roomdata.match_data[0].start_time}
          timelimit={roomdata.settings.time_limit_mins}
          roomdata={roomdata}
          cancelmatch={cancelmatch}
        />

        <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 p-6">
          {activeuser.role == "host" ? (
            <Player
              playerdata={roomdata.players.host}
              live_feed={livefeed}
              verifysubmission={verifysubmission}
              verifysubmissionloader={verifyloading}
            />
          ) : (
            <Player
              playerdata={
                roomdata.players["guest"][
                  roomdata.players["guest"].findIndex(
                    (guest) => guest.handle === activeuser.handle,
                  )
                ]
              }
              live_feed={livefeed}
              verifysubmission={verifysubmission}
              verifysubmissionloader={verifyloading}
            />
          )}

          <Question
            problemdata={roomdata.match_data[qid - 1].problem}
            roomdata={roomdata}
            qid={qid}
          />
          <Opponent
            opponentdata={roomdata.players}
            feed={livefeed}
            getlivefeed={getlivefeed}
            qid={qid}
            setqid={setqid}
            qcount={roomdata.settings.questioncount}
            activeuser={activeuser}
          />
        </div>
      </div>
    </>
  );
}
