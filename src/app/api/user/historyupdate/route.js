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
    const starttime = setproblemdata.start_time;
    const endtime = setproblemdata.end_time;
    const problemid = setproblemdata.problem.id + setproblemdata.problem.index;

    const roomplayers = roomdata.players;
    const player1 = roomplayers.host.handle;
    const player2 = roomplayers.guest.handle;

    let problemloser;
    if (player1 == problemwinner) {
      problemloser = player2;
    } else problemloser = player1;

    const winnerhistory = await historyModel.findOne({ handle: problemwinner });
    const loserhistory = await historyModel.findOne({ handle: problemloser });

    if (!winnerhistory || !loserhistory) {
      return Response.json(
        {
          success: false,
          message: "History model fetch request failed",
        },
        { status: 404 },
      );
    }

    const winnerarraypushdata = {
      roomcode: roomid,
      starttime: starttime,
      endtime: endtime,
      opponent: problemloser,
      problemid: problemid,
      status: "WIN",
    };

    const loserarraypushdata = {
      roomcode: roomid,
      starttime: starttime,
      endtime: endtime,
      opponent: problemwinner,
      problemid: problemid,
      status: "LOSS",
    };

    const winnermatcharray = winnerhistory.match;
    const losermatcharray = loserhistory.match;

    winnermatcharray.push(winnerarraypushdata);
    losermatcharray.push(loserarraypushdata);

    winnerhistory.match = winnermatcharray;
    await winnerhistory.save();

    loserhistory.match = losermatcharray;
    await loserhistory.save();

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
