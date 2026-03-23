import dbconnect from "@/lib/dbconnect";
import roomModel from "@/model/room.model";

function generateroomcode() {
  return (
    "duel" +
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
  );
}
function Multigenerateroomcode() {
  return (
    "multi" +
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
  );
}

export async function POST(request) {
  await dbconnect();

  const { hostid, playercount } = await request.json();
  if (!hostid || !playercount) {
    return Response.json(
      {
        success: false,
        message: "Host ID required or playercount not provided",
      },
      { status: 400 },
    );
  }

  let roomid;
  if (playercount > 2) {
    roomid = Multigenerateroomcode();
  } else roomid = generateroomcode();

  try {
    await roomModel.create({
      roomcode: roomid,
      status: "WAITING",
      players: {
        host: {
          handle: hostid,
          is_ready: false,
          is_verified: true,
        },
      },
      playercount: playercount,
    });

    return Response.json(
      {
        success: true,
        message: "New Room Created",
        roomcode: roomid,
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "error while creating room",
      },
      { status: 500 },
    );
  }
}
