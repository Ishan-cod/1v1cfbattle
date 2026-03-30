"use client";
import React, { useEffect, useMemo, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { getSocket } from "@/lib/getSocket";
import { getTimeHHMM } from "@/lib/getTimeHHMM";

const initialMessages = [
  {
    id: 1,
    sender: "YOU",
    time: "13:28",
    text: "Hi, wadddup big dog 🐕",
    accent: "text-emerald-400",
  },
  {
    id: 2,
    sender: "anonymous-bear-CmtU5",
    time: "13:29",
    text: "this video is awesome",
    accent: "text-blue-400",
  },
  {
    id: 3,
    sender: "YOU",
    time: "13:30",
    text: "this is real-time",
    accent: "text-emerald-400",
  },
];

export function TerminalChatUI({ children, roomcode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [currentuser, setcurrentuser] = useState("undefinied");

  useEffect(() => {
    const storagedata = localStorage.getItem("active_match");
    const localdata = JSON.parse(storagedata) || null;

    if (!localdata) return;
    const handle = localdata.cfhandle;
    if (!handle) return;

    setcurrentuser(handle);
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onConnect = () => {
      console.log("Connected to SOCKET", socket.id);
    };

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);

    socket.emit("join_room", roomcode);

    const onRecieveMessage = (msgobj) => {
      setMessages((prev) => [...prev, msgobj]);
    };
    socket.on("recieve_message", onRecieveMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("recieve_message", onRecieveMessage);
    };
  }, []);

  const sendMessage = () => {
    const socket = getSocket();

    const text = value.trim();
    if (!text) return;

    const msgobj = {
      id: Date.now(),
      sender: currentuser,
      time: getTimeHHMM(),
      text,
      accent: "text-emerald-400",
    };

    socket.emit("send_message", msgobj, roomcode);
    setMessages((prev) => [...prev, msgobj]);
    setValue("");
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-hidden">
      {/* Your page content stays untouched behind the chat */}
      {/* <div className="p-8 md:p-12 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          Main UI Content
        </h1>
        <p className="mt-4 text-white/60 max-w-2xl">
          The chat opens as an overlay sidebar from the right without disturbing the page layout.
        </p>
      </div> */}
      {children}
      {/* Floating button */}
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
          >
            {messages.map((msg) => (
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
            ))}
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
