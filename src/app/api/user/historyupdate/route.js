import dbconnect from "@/lib/dbconnect";
import historyModel from "@/model/history.model";
import roomModel from "@/model/room.model";

// pid is one based indexing

export async function POST(request) {
  await dbconnect();
  const body = await request.json();
  const { roomid, pid } = body;

  const roomdata = await roomModel.findOne({ roomcode: roomid });

  if (!roomdata) {
    return Response.json(
      {
        success: false,
        message: "Cannot find the room",
      },
      { status: 404 },
    );
  }

  const problemcountinroom = roomdata.settings.questioncount;
  try {
    const problemindex = parseInt(pid) - 1;

    if (problemindex >= problemcountinroom || problemcountinroom < 0) {
      return Response.json(
        {
          success: false,
          message: "PID EXCEED ROOM PROBLEM COUNT",
        },
        { status: 400 },
      );
    }

    const setproblemdata = roomdata.match_data[problemindex];

    if (!setproblemdata) {
      return Response.json({
        success: false,
        message: "Cannot get the problem data",
      });
    }

    const problemwinner = setproblemdata.winner;

    if (!problemwinner) {
      return Response.json(
        {
          success: false,
          message: "The winner is not declared in this problem",
        },
        { status: 404 },
      );
    }

    const starttime = setproblemdata.start_time;
    const endtime = setproblemdata.end_time;
    const problemid = setproblemdata.problem.id + setproblemdata.problem.index;

    const roomplayers = roomdata.players;

    const hosthandle = roomplayers.host.handle;
    const guesthandles = roomplayers.guest.map((guest) => guest.handle);
    const allplayers = [hosthandle, ...guesthandles];
    const loserplayers = allplayers.filter((plyr) => plyr !== problemwinner);

    // Winner history update
    const winnerhistory = await historyModel.findOne({ handle: problemwinner });
    if (!winnerhistory) {
      return Response.json(
        {
          success: false,
          message: "Winner not found",
        },
        { status: 404 },
      );
    }

    const winnerarraypushdata = {
      roomcode: roomid,
      starttime: starttime,
      endtime: endtime,
      opponent: allplayers,
      winner: problemwinner,
      problemid: problemid,
      status: "WIN",
    };

    winnerhistory.match.push(winnerarraypushdata);
    await winnerhistory.save();
    // END

    // Loser historyupdate
    const loserMatchData = {
      roomcode: roomid,
      starttime: starttime,
      endtime: endtime,
      opponent: allplayers,
      winner: problemwinner,
      problemid: problemid,
      status: "LOSS",
    };

    const result = await historyModel.updateMany(
      { handle: { $in: loserplayers } },
      { $push: { match: loserMatchData } },
    );
    // END

    return Response.json(
      {
        success: true,
        message: "Loser and winner history saved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "CANNOT SET THE USER MATCH HISTORY, INTERNAL SERVER ERROR",
      },
      { status: 500 },
    );
  }
}
