import dbconnect from "@/lib/dbconnect";
import roomModel from "@/model/room.model";

export async function POST(request) {
  await dbconnect();

  const body = await request.json();
  const { roomid, minrating, maxrating, timelimit} = body;
  const { tags } = body;

  if (!Array.isArray(tags)) {
    return Response.json(
      {
        success: false,
        message: "Tags not provided while setting",
      },
      { status: 400 },
    );
  }

  if (!minrating || !maxrating || !roomid || (minrating > maxrating)) {
    return Response.json({
      success: false,
      message: "Rating not provided",
    });
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
    room.settings = {
      rating_min: minrating,
      rating_max: maxrating,
      tags: tags,
      time_limit_mins : timelimit || 120
    };

    await room.save();
    return Response.json(
      {
        success: true,
        message: "Room settings changed",
        room: room,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error while setting match setting",
      },
      { status: 500 },
    );
  }
}
