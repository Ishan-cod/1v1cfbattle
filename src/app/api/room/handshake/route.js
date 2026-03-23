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
      const guestlist = room.players.guest;
      room.players.host.is_ready = true;

      const isRoomFull = room.playercount === guestlist.length + 1;

      const areAllGuestsReady = room.players.guest.every(
        (guest) => guest.is_ready,
      );

      if (isRoomFull && areAllGuestsReady) {
        room.status = "READY";
      }

      await room.save();
    } else {
      const guestlist = room.players.guest;
      const index = guestlist.findIndex((obj) => obj.handle == userid);

      if (index == -1) {
        return Response.json(
          {
            success: false,
            message: "guest is not the part of the room",
          },
          { status: 404 },
        );
      }

      room.players.guest[index].is_ready = true;

      const isRoomFull = room.playercount === guestlist.length + 1;

      const areAllGuestsReady = room.players.guest.every(
        (guest) => guest.is_ready,
      );

      const isHostReady = room.players.host.is_ready;

      if (isRoomFull && areAllGuestsReady && isHostReady) {
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
    // console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error occured while user handshake",
      },
      { status: 500 },
    );
  }
}
