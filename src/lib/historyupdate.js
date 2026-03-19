import roomModel from "@/model/room.model";
import dbconnect from "./dbconnect";

export async function updatehistory({ winner, loser, roomid }) {
    await dbconnect();

    const room = await roomModel({})
}
