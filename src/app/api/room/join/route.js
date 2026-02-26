import dbconnect from "@/lib/dbconnect";
import roomModel from "@/model/room.model";

export async function POST(request) {
  await dbconnect();

  const { guestid, roomid } = await request.json();

  if (!guestid || !roomid) {
    return Response.json(
      {
        success: false,
        message: "Params not provided",
      },
      { status: 400 },
    );
  }

  const room = await roomModel.findOne({ roomcode: roomid });

  if (!room) {
    return Response.json(
      {
        success: false,
        message: "Room not found",
      },
      { status: 404 },
    );
  }

  try {
    room.status = "WAITING";
    room.players.host.is_ready = false;
    room.players.guest = {
      handle: guestid,
      is_ready: false,
    };

    await room.save();

    return Response.json({
      success: true,
      message: "User 2 joined successfully",
      roomid: roomid,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error occur while joining the guest",
      },
      { status: 500 },
    );
  }
}
