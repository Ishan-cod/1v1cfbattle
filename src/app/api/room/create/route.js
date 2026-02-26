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

export async function POST(request) {
  await dbconnect();

  const { hostid } = await request.json();
  if (!hostid) {
    return Response.json(
      {
        success: false,
        message: "Host ID required",
      },
      { status: 400 },
    );
  }

  const roomid = generateroomcode();

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
    });

    return Response.json(
      {
        success: true,
        message: "New Room Created",
        roomcode : roomid
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
