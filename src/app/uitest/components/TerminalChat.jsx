"use client";
import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { getSocket } from "@/lib/getSocket";
import { getTimeHHMM } from "@/lib/getTimeHHMM";
import { JoinChat } from "./JoinChat";
import { LeaveChat } from "./LeaveChat";
import { getRandomColor } from "@/lib/getRandomColor";

// const initialMessages = [
//   {
//     id: 1,
//     sender: "system",
//     type: "join",
//     time: "13:28",
//     text: "only_error",
//     accent: "",
//   },
//   {
//     id: 2,
//     sender: "anonymous-bear-CmtU5",
//     type: "chat",
//     time: "13:29",
//     text: "this video is awesome",
//     accent: "text-blue-400",
//   },
//   {
//     id: 3,
//     sender: "anonymous-bear-CmtU5",
//     type: "chat",
//     time: "13:29",
//     text: "this video is awesome",
//     accent: "text-blue-400",
//   },
//   {
//     id: 4,
//     sender: "system",
//     type: "leave",
//     time: "13:30",
//     text: "manaskumar10",
//     accent: "",
//   },
// ];

export function TerminalChatUI({ children, roomcode, currentuser }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const scrollRef = useRef(null);
  const usercolor = getRandomColor();

  // scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  // end

  // socket functions
  useEffect(() => {
    const socket = getSocket({ roomcode: roomcode, username: currentuser });
    if (!socket) return;
    console.log(currentuser)
    const onConnect = () => {
      // console.log("Connected to SOCKET", socket.id);
    };

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);

    socket.emit("join_room");

    const onRecieveMessage = (msgobj) => {
      setMessages((prev) => [...prev, msgobj]);
    };

    socket.on("message", onRecieveMessage);
    socket.on("recieve_message", onRecieveMessage);

    return () => {
      socket.off("message", onRecieveMessage);
      socket.off("connect", onConnect);
      socket.off("recieve_message", onRecieveMessage);
    };
  }, []);

  const sendMessage = () => {
    const socket = getSocket({ roomcode: roomcode, username: currentuser });

    const text = value.trim();
    if (!text) return;

    const msgobj = {
      id: Date.now(),
      sender: currentuser,
      time: getTimeHHMM(),
      text,
      accent: usercolor,
    };

    socket.emit("send_message", msgobj);
    setMessages((prev) => [...prev, msgobj]);
    setValue("");
  };
  // end

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-hidden">
      {children}

      {/*button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/90 px-4 py-3 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black ${
          open ? "pointer-events-none opacity-0 translate-y-2" : "opacity-100"
        }`}
        aria-label="Open chat"
      >
        <span className="bg-green-400 rounded-full p-1 animate-pulse"></span>
        <MessageCircle className="h-5 w-5 text-white" />
        <span className="text-sm font-medium uppercase">ROOMCHAT</span>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between bg-white/3">
            <div>
              <h1 className="text-sm md:text-base font- text-white/90 uppercase">
                Room Chat - &lt;\{roomcode}&gt;
              </h1>
              <p className="text-xs text-white/40 mt-1 font-mono">
                Sent to all players of the room
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/10 p-2 hover:bg-white/10 transition"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 font-mono"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            ref={scrollRef}
          >
            {messages.map((msg, key) => {
              if (!msg) return null;

              if (msg.sender === "system" && msg.type === "join") {
                return (
                  <>
                    <JoinChat name={msg.text} time={msg.time} key={msg.id} />
                  </>
                );
              } else if (msg.sender === "system" && msg.type === "leave") {
                return (
                  <LeaveChat name={msg.text} time={msg.time} key={msg.id} />
                );
              } else {
                return (
                  <div key={msg.id} className="leading-relaxed">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span
                        className={`${msg.accent} text-[8px] md:text-xs font-bold uppercase tracking-wide`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-white/35 text-[8px] md:text-xs">
                        {msg.time}
                      </span>
                    </div>
                    <div className="text-xs md:text-[14px] text-white/90 whitespace-pre-wrap break-words">
                      {msg.text}
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div className="border-t border-white/10 p-4 bg-black/70">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-emerald-400 font-mono text-sm">&gt;</span>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type message..."
                className="flex-1 bg-transparent outline-none text-xs md:text-sm font-mono placeholder:text-white/25"
              />
              <button
                onClick={sendMessage}
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
