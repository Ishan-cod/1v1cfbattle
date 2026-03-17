import dbconnect from "@/lib/dbconnect";
import { fetchproblem } from "@/lib/problemfetch";
import roomModel from "@/model/room.model";

export async function POST(request) {
  await dbconnect();
  const body = await request.json();

  const { roomid } = body;
  if (!roomid) {
    return Response.json(
      {
        success: false,
        message: "room id not provided",
      },
      { status: 401 },
    );
  }

  const room = await roomModel.findOne({ roomcode: roomid });

  if (!room) {
    return Response.json(
      {
        success: false,
        message: "room not found",
      },
      { status: 404 },
    );
  }

  // TODO:
  if (room.status == "ONGOING") {
    return Response.json(
      {
        success: false,
        message: "Match already started",
      },
      { status: 400 },
    );
  }
  if (room.status != "READY") {
    return Response.json(
      {
        success: false,
        message: "Players not ready",
      },
      { status: 400 },
    );
  }

  try {
    const { rating_min, rating_max, tags } = room.settings;

    // getting user handle of the room
    const user1 = room.players.host.handle;
    const user2 = room.players.guest.handle;

    const problemArray = await fetchproblem(
      tags,
      rating_min,
      rating_max,
      1,
      user1,
      user2,
    );

    const problemindex = problemArray[0].index;
    const problemid = problemArray[0].contestId;

    const problemURL = `https://codeforces.com/problemset/problem/${problemid}/${problemindex}`;

    const problemname = problemArray[0].name;
    const problemrating = problemArray[0].rating;
    const problemtag = problemArray[0].tags;

    room.match_data = {
      problem: {
        id: problemid,
        index: problemindex,
        name: problemname,
        url: problemURL,
        rating: problemrating,
        tags: problemtag,
      },
      start_time: Math.floor(Date.now() / 1000),
    };

    room.status = "ONGOING";

    await room.save();

    return Response.json(
      {
        success: true,
        message: "Match data set",
        room: room,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error occur while setting match data",
      },
      { status: 500 },
    );
  }
}
