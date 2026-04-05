import { decideWinner } from "./decideWinner.js";

const data = await fetch("http://localhost:3000/api/room/status/duel5897");
const response = await data.json();
const test = decideWinner({roomdata : response.roomstatus})

console.log(JSON.stringify(test));