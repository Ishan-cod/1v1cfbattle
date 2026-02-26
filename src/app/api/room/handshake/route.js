import dbconnect from "@/lib/dbconnect";
import roomModel from "@/model/room.model";

export async function POST(request) {
  await dbconnect();
  const body = await request.json();

  const { userid, roomid } = body;

  if (!userid || !roomid) {
    return Response.json(
      {
        success: false,
        message: "Userid or roomid not provided while handshake",
      },
      { status: 400 },
    );
  }

  const room = await roomModel.findOne({ roomcode: roomid });

  if (!room) {
    return Response.json(
      {
        success: false,
        message: "Room donot exist",
      },
      { status: 404 },
    );
  }

  try {
    const hostid = room.players.host.handle;

    if (userid === hostid) {
      room.players.host.is_ready = true;

      if (room.players.guest.is_ready) {
        room.status = "READY";
      }
      await room.save();

    } else {
      room.players.guest.is_ready = true;
      if (room.players.host.is_ready) {
        room.status = "READY";
      }

      await room.save();
    }

    return Response.json(
      {
        success: true,
        message: "Handshake successfully done | Player readiness set",
      },
      { status: 200 },
    );
  } catch (error) {

    return Response.json(
      {
        success: false,
        message: "Error occured while user handshake",
      },
      { status: 500 },
    );
  }
}
