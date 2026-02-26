"use client";
import React, { useState } from "react";
import { LandingHeader } from "./components/LandingHeader";
import { LandingInput } from "./components/LandingInput";
import { LandingCreateRoom } from "./components/LandingCreateRoom";
import { LandingJoinRoom } from "./components/LandingJoinRoom";
import { LandingCreateButton } from "./components/LandingCreateButton";
import { LandingJoinButton } from "./components/LandingJoinButton";
import Error from "next/error";
import { useRouter } from "next/navigation";

export default function Page() {
  const [mode, setMode] = useState("create");
  const [cfid, setcfid] = useState(null);
  const [roomid, setroomid] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handlegenerateroom = async () => {
    if (!cfid) {
      alert("Please provide codeforce ID");
      throw new Error("codeforce handle not provided");
    }
    const url = "/api/room/create";
    setloading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostid: cfid,
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

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col items-center justify-center p-6 font-sans bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <LandingHeader />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/50">
        <LandingInput setcfid={setcfid} />

        <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
          <LandingCreateButton setmode={setMode} mode={mode} />
          <LandingJoinButton setMode={setMode} mode={mode} />
        </div>

        {mode === "create" ? (
          <LandingCreateRoom
            loading={loading}
            handlecreateroom={handlegenerateroom}
          />
        ) : (
          <LandingJoinRoom
            setroomid={setroomid}
            loading={loading}
            handlejoinroom={handlejoinroom}
          />
        )}
      </div>
    </div>
  );
}
