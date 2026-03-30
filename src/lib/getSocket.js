import { io } from "socket.io-client";

let socket;
const URL = process.env.NEXT_PUBLIC_CHATSERVER_URL;

export const getSocket = () => {
  if (typeof window === "undefined") return null;

  if (!socket) {
    socket = io(URL);
  }

  return socket;
};
