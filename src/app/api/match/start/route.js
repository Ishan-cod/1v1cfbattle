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
    const { rating_min, rating_max, tags, questioncount } = room.settings;

    // getting user handle of the room

    // TODO: CURRENTLY CHECKING FOR UNIQUE SUBMISSION FOR THE FIRST TWO PLAYER IN THE MATCH
    // FIX: Beta version can have this but need to fix this problem in next update.

    const user1 = room.players.host.handle;
    const user2 = room.players.guest[0].handle;

    const problemArray = await fetchproblem(
      tags,
      rating_min,
      rating_max,
      questioncount,
      user1,
      user2,
    );

    let matchproblems = [];
    problemArray.forEach((e) => {
      const problemindex = e.index;
      const problemid = e.contestId;

      const problemURL = `https://codeforces.com/problemset/problem/${problemid}/${problemindex}`;

      const problemname = e.name;
      const problemrating = e.rating;
      const problemtag = e.tags;

      const add = {
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

      matchproblems.push(add);
    });

    room.match_data = matchproblems;

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
