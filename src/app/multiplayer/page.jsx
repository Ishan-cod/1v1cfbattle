"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LandingJoinRoom } from "../components/LandingJoinRoom";
import { LandingCreateRoom } from "../components/LandingCreateRoom";
import { LandingJoinButton } from "../components/LandingJoinButton";
import { LandingCreateButton } from "../components/LandingCreateButton";
import { LandingInput } from "../components/LandingInput";
import { LandingHeader } from "../components/LandingHeader";
import { FeatureUpdateBanner } from "../components/LandingFeatureUpdateBanner";

export default function Page() {
  const [mode, setMode] = useState("create");
  const [cfid, setcfid] = useState(null);
  const [roomid, setroomid] = useState(null);
  const [loading, setloading] = useState(false);
  const [buttondisabled, setbuttondisabled] = useState(true);
  const [userverified, setuserverified] = useState(false);
  const [verificationloading, setverificationloading] = useState(false);
  const [playercount, setplayercount] = useState(3);

  const router = useRouter();

  const handlegenerateroom = async () => {
    if (!cfid) {
      alert("Please provide codeforce ID");
      throw new Error("codeforce handle not provided");
    }
    const url = "/api/multiplayer/room/create";
    setloading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostid: cfid,
          playercount: 3,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message);
        throw new Error("Error creating new room");
      }

      const roomcode = data.roomcode;
      const roomnumber = roomcode.slice(4);

      const matchdata = {
        roomcode: roomnumber,
        cfhandle: cfid,
        role: "host",
      };

      localStorage.setItem("active_match", JSON.stringify(matchdata));

      router.push(`/waiting/${roomnumber}`);
    } catch (error) {
      alert("Error creating new room. Please try again !");
      setloading(false);
    }
  };

  const handlejoinroom = async () => {
    if (!roomid) {
      alert("Please provide ROOMID to join");
      throw new Error("ROOMID NOT PROVIDED");
    }
    if (!cfid) {
      alert("Please provide the codeforce ID");
      throw new Error("CFID NOT PROVIDED");
    }

    setloading(true);
    const url = "/api/room/join";
    try {
      const roomcode = "duel" + roomid;
      const roomurl = `/api/room/status/${roomcode}`;

      const roomresponse = await fetch(roomurl);
      const roomdata = await roomresponse.json();

      if (!roomdata.success) {
        alert(roomdata.message);
        throw new Error("ERROR IN ROOM FETCH");
      }

      if (roomdata.roomstatus.status !== "WAITING") {
        alert("Match for this room is either ended or ongoing");
        throw new Error("MATCH ENDED OR ONGOING");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestid: cfid,
          roomid: roomcode,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message);
        throw new Error(data.message);
      }
      const roomnumber = data.roomid.slice(4);

      const stored = localStorage.getItem("active_match");
      const alreadymatchdata = stored ? JSON.parse(stored) : null;
      if (alreadymatchdata) {
        const a_roomcode = alreadymatchdata.roomcode;
        const a_cfhandle = alreadymatchdata.cfhandle;
        const a_role = alreadymatchdata.role;

        if (
          a_roomcode == roomnumber &&
          a_role != "guest" &&
          a_cfhandle == cfid
        ) {
          alert("USER ALREADY IN ROOM AS HOST");
          throw new Error("USER ALREADY IN ROOM AS HOST");
        }
      }

      const matchdata = {
        roomcode: roomnumber,
        cfhandle: cfid,
        role: "guest",
      };

      localStorage.setItem("active_match", JSON.stringify(matchdata));
      router.push(`/waiting/${roomnumber}`);
    } catch (error) {
      setloading(false);
      throw new Error(error.message);
    }
  };

  const verifycfid = async () => {
    setverificationloading(true);
    try {
      if (!cfid) {
        throw new Error("Please provide CF ID");
      }

      const codeforceid = cfid.trim();
      const url = "/api/user/verify";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cfhandle: codeforceid,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      setbuttondisabled(false);
      setuserverified(true);
      setverificationloading(false);
    } catch (error) {
      setverificationloading(false);
      setbuttondisabled(true);
      setuserverified(false);
      alert(error.message);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col items-center justify-center p-6 font-sans bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <FeatureUpdateBanner />
      <LandingHeader />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/50">
        <LandingInput
          setcfid={setcfid}
          verifycfid={verifycfid}
          isloading={verificationloading}
          isverified={userverified}
          setisverified={setuserverified}
        />

        <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
          <LandingCreateButton setmode={setMode} mode={mode} />
          <LandingJoinButton setMode={setMode} mode={mode} />
        </div>

        {mode === "create" ? (
          <LandingCreateRoom
            loading={loading}
            handlecreateroom={handlegenerateroom}
            isbuttondisabled={buttondisabled}
          />
        ) : (
          <LandingJoinRoom
            setroomid={setroomid}
            loading={loading}
            handlejoinroom={handlejoinroom}
            isbuttondisabled={buttondisabled}
          />
        )}

        <div className="w-full flex justify-center my-2">
          <a
            href="/leaderboard"
            target="_blank"
            className="uppercase text-xs font-mono tracking-widest font-bold opacity-50"
          >
            check leaderboard
          </a>
        </div>
      </div>
    </div>
  );
}
