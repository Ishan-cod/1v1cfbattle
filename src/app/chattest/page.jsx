"use client";
import { getSocket } from "@/lib/getSocket";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [chat, setchat] = useState([]);
  const [message, setmessage] = useState("");
  const [room, setroom] = useState(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onConnect = () => {
      const msg = `connect to ${socket.id}`;
      setchat((prev) => [...prev, msg]);
    };

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("recieve", (message) => {
      setchat((prev) => [...prev, message]);
    });

    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  const handlesend = () => {
    const socket = getSocket();
    socket.emit("send", message);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <div className="bg-sky-950 p-2">
          <div>Chat area</div>
          {chat.map((chat, key) => {
            return (
              <>
                <div key={key}>
                  {`#${key + 1}`}-{chat}
                </div>
              </>
            );
          })}
        </div>
        <input
          className="bg-white text-black p-2 mx-1"
          onChange={(e) => setmessage(e.target.value)}
          value={message}
          placeholder="Enter message"
        ></input>
        <input
          className="bg-white text-black p-2"
          onChange={(e) => {
            const roomid = String(e.target.value);
            setroom(roomid);
          }}
          value={room}
          placeholder="ROOM NUMBER"
        ></input>
        {message === "" ? (
          <button className="bg-yellow-400 rounded p-2 text-black" disabled>
            SEND
          </button>
        ) : (
          <button
            className="bg-yellow-400 rounded p-2 text-black"
            onClick={handlesend}
          >
            SEND
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
