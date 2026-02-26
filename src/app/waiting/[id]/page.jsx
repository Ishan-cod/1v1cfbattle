"use client";
import React, { use, useEffect, useState } from "react";
import { LobbyHeader } from "../components/LobbyHeader";
import { Host } from "../components/Host";
import { MatchSetting } from "../components/MatchSetting";
import { useRouter } from "next/navigation";
import { WaitingGuest } from "../components/WaitingGuest";
import ReadyGuest from "../components/ReadyGuest";

export default function Page({ params }) {
  const unwrappedparam = use(params);
  const roomid = unwrappedparam.id;
  const router = useRouter();

  const [minrating, setminrating] = useState(800);
  const [maxrating, setmaxrating] = useState(1900);
  const [timeduration, settimeduration] = useState(120);

  const [activeuser, setactiveuser] = useState({ handle: "", role: "" });
  const [hostdata, sethostdata] = useState();
  const [guestdata, setguestdata] = useState();
  const [readyroom, setreadyroom] = useState(false);
  const [questiontags, setquestiontags] = useState([]);
  const [startmatchloader, setstartmatchloader] = useState(false);
  const [handshakeloader, sethandshakeloader] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const val = localStorage.getItem("active_match");
        const parsedval = JSON.parse(val) || null;
        if (!parsedval) {
          throw new Error("CANNOT GET USER DATA");
        }

        const { cfhandle, role } = parsedval;
        const roomcode = "duel" + roomid;
        const response = await fetch(`/api/room/status/${roomcode}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message);
        }

        const playerdata = data.roomstatus.players;
        const role_id = playerdata[role].handle;

        if (role_id !== cfhandle) {
          throw new Error("USER ROLE AND ID DONOT MATCH");
        }
        setactiveuser({ handle: cfhandle, role: role });
      } catch (error) {
        alert(error.message);
        router.push("/");
      }
    };

    verify();
  }, [roomid]);

  useEffect(() => {
    let failurecount = 0;
    const interval = setInterval(async () => {
      try {
        const roomcode = "duel" + roomid;
        const url = `/api/room/status/${roomcode}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
          throw new Error("Error fetching room data");
        }

        const players = data.roomstatus.players;
        sethostdata(players.host || null);
        setguestdata(players.guest || null);

        // console.log(players.guest)

        const status = data.roomstatus.status;
        if (status === "READY") {
          setreadyroom(true);
        }

        if (data.roomstatus.status === "ONGOING") {
          clearInterval(interval);
          const redirecturl = `/battle/${roomid}`;
          router.push(redirecturl);
        }
      } catch (error) {
        failurecount += 1;
        if (failurecount >= 5) {
          alert("Error connecting to match, please retry");
          clearInterval(interval);
          router.push("/");
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [roomid]);

  const handshake = async () => {
    sethandshakeloader(true);
    try {
      const roomcode = "duel" + roomid;
      const cfhandle = activeuser.handle;

      const url = "/api/room/handshake";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: cfhandle,
          roomid: roomcode,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error("Handshake failure! Try again");
      }

      alert("HANDSHAKE SUCCESSFULL");
      sethandshakeloader(false);
    } catch (error) {
      sethandshakeloader(false);
      console.error(error.message);
    }
  };

  const startmatch = async () => {
    const roomcode = "duel" + roomid;
    setstartmatchloader(true);

    try {
      const settingurl = "/api/room/setting";
      const settingresponse = await fetch(settingurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomid: roomcode,
          minrating: minrating,
          maxrating: maxrating,
          tags: questiontags,
          timelimit: timeduration || 120,
        }),
      });

      const settingdata = await settingresponse.json();
      if (!settingdata.success) {
        throw new Error("Error setting match settings");
      }
    } catch (error) {
      setstartmatchloader(false);
      alert("ERROR WHILE SETTING! TRY AGAIN");
    }

    try {
      const url = `/api/room/status/${roomcode}`;
      const response = await fetch(url);

      const data = await response.json();
      if (!data.success) {
        throw new Error("ERROR GETTING ROOM DATA");
      }

      if (data.roomstatus.status !== "READY") {
        throw new Error("ROOM IS NOT READY");
      }
    } catch (error) {
      setstartmatchloader(false);
      alert("PROBLEM IN STARTING THE MATCH! PLEASE TRY AGAIN");
    }

    try {
      const url = "/api/match/start";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomid: roomcode,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      router.push(`/battle/${roomid}`);
    } catch (error) {
      setstartmatchloader(false);
      alert(error.message);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col items-center p-8 font-sans">
      <LobbyHeader roomid={roomid} handshake={handshake} />

      <div className="w-full max-w-5xl grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {hostdata ? <Host host={hostdata} /> : <WaitingGuest />}
          {guestdata ? <ReadyGuest guest={guestdata} /> : <WaitingGuest />}
        </div>

        {/* 3. Sidebar (Match Settings) */}
        <MatchSetting
          roomready={readyroom}
          maxrating={maxrating}
          minrating={minrating}
          setmaxrating={setmaxrating}
          setminrating={setminrating}
          settimeduration={settimeduration}
          setquestiontags={setquestiontags}
          startmatch={startmatch}
          loading={startmatchloader}
          activeuser={activeuser}
        />
      </div>
    </div>
  );
}
