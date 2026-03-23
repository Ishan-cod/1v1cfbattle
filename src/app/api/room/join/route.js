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

  if (room.status !== "WAITING") {
    return Response.json(
      {
        success: false,
        message: "Room started, or cancelled",
      },
      { status: 400 },
    );
  }

  try {
    room.status = "WAITING";
    room.players.host.is_ready = false;

    const currentguests = room.players.guest;
    const possibleplayerinroom = room.playercount;

    // possibleplayer - 1 = for host
    if (currentguests.length >= possibleplayerinroom - 1) {
      return Response.json(
        {
          success: false,
          message: "Room already full",
        },
        { status: 400 },
      );
    }
    const newguest = {
      handle: guestid,
      is_ready: false,
    };
    room.players.guest.push(newguest);

    await room.save();

    return Response.json({
      success: true,
      message: "New guest joined successfully",
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
