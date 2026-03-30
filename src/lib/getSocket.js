import { io } from "socket.io-client";
import { getRandomColor } from "./getRandomColor";

let socket;
// const URL = "http://localhost:4000";
const URL = process.env.NEXT_PUBLIC_CHATSERVER_URL;

export const getSocket = ({ username, roomcode }) => {
  if (typeof window === "undefined") return null;

  if (!socket) {
    socket = io(URL, {
      auth: {
        username: username,
        roomcode: roomcode,
        color: getRandomColor(),
      },
    });
  }

  return socket;
};
