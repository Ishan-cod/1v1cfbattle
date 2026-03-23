import dbconnect from "@/lib/dbconnect";
import { getusersubmission } from "@/lib/getusersubmissions";
import roomModel from "@/model/room.model";
import userModel from "@/model/user.model";
import mongoose from "mongoose";

// provide 1 based indexing
export async function POST(request) {
  await dbconnect();
  const body = await request.json();

  const { cfhandle, roomid, sol_id } = body;
  if (!cfhandle || !roomid || !sol_id) {
    return Response.json(
      {
        success: false,
        message: "Codeforce ID or roomid not provided",
      },
      { status: 400 },
    );
  }

  const pid = parseInt(sol_id) - 1;

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

  if (room.status !== "ONGOING") {
    return Response.json(
      {
        success: false,
        message: "THIS MATCH IS EITHER ENDED OR NOT STARTED",
      },
      { status: 400 },
    );
  }

  const hosthandle = room.players.host.handle;
  const guestarray = room.players.guest;
  const guestindex = guestarray.findIndex((guest) => guest.handle == cfhandle);

  const totalproblem_room = room.settings.questioncount;

  if (pid < 0 || pid >= totalproblem_room) {
    return Response.json(
      {
        success: false,
        message:
          "The provided problem index donot exist in the room problem statement",
      },
      { status: 400 },
    );
  }

  const problemobject = room.match_data[pid];

  if (problemobject.winner) {
    return Response.json(
      {
        success: false,
        message: "This problem already solved",
      },
      { status: 409 },
    );
  }

  if (hosthandle !== cfhandle && guestindex === -1) {
    return Response.json(
      {
        success: false,
        message: "Player donot exist in the match",
      },
      { status: 500 },
    );
  }

  try {
    const contestid = room.match_data[pid].problem.id;
    const problemindex = room.match_data[pid].problem.index;

    const usersubmissions = await getusersubmission(
      cfhandle,
      contestid,
      problemindex,
    );

    let submitted = false;
    usersubmissions.forEach((e) => {
      if (e.verdict == "OK") {
        submitted = true;
      }
    });

    if (submitted) {
      room.match_data[pid].end_time = Math.floor(Date.now() / 1000);
      room.match_data[pid].winner = cfhandle;

      // Check if all problem solved or not --
      let allsolved = true;
      const roomproblems = room.match_data;

      for (let i = 0; i < totalproblem_room; i++) {
        if (i == pid) continue;
        if (!roomproblems[i].winner) {
          allsolved = false;
          break;
        }
      }
      if (allsolved) room.status = "FINISHED";

      // END

      await room.save();

      // UPDATE IN USER MODEL AS THE WINNER AND LOSER
      
      const session = await mongoose.startSession();
      try {
        session.startTransaction();

        const guestHandles = guestarray.map((guest) => guest.handle);

        const allParticipantHandles = [hosthandle, ...guestHandles];

        const loserHandles = allParticipantHandles.filter(
          (handle) => handle !== cfhandle,
        );

        // MULTI UPDATE IN LOSER
        const loserUpdate = await userModel.updateMany(
          { handle: { $in: loserHandles } },
          { $inc: { losses: 1 } },
          { session },
        );

        const winnerUpdate = await userModel.updateOne(
          { handle: cfhandle },
          { $inc: { wins: 1 } },
          { session },
        );

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
      } finally {
        session.endSession();
      }

      // ** END **

      return Response.json(
        {
          success: true,
          message: "Problem submission verified",
        },
        { status: 200 },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Submission cannot be verified",
        },
        { status: 406 },
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error occured while checking submission",
      },
      { status: 500 },
    );
  }
}
