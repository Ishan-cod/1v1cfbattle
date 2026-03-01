import dbconnect from "@/lib/dbconnect";
import { getusersubmission } from "@/lib/getusersubmissions";
import roomModel from "@/model/room.model";
import userModel from "@/model/user.model";
import mongoose from "mongoose";

export async function POST(request) {
  await dbconnect();
  const body = await request.json();

  const { cfhandle, roomid } = body;
  if (!cfhandle || !roomid) {
    return Response.json(
      {
        success: false,
        message: "Codeforce ID or roomid not provided",
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

  if (room.status !== "ONGOING") {
    return Response.json(
      {
        success: false,
        message: "THIS MATCH IS EITHER ENDED OR NOT STARTED",
      },
      { status: 400 },
    );
  }

  const player1 = room.players.host.handle;
  const player2 = room.players.guest.handle;

  if (player1 !== cfhandle && player2 !== cfhandle) {
    return Response.json(
      {
        success: false,
        message: "Player donot exist in the match",
      },
      { status: 500 },
    );
  }

  let probable_winner;
  let probable_loser;

  if (player1 === cfhandle) {
    probable_winner = player1;
    probable_loser = player2;
  } else {
    probable_winner = player2;
    probable_loser = player1;
  }

  try {
    const contestid = room.match_data.problem.id;
    const problemindex = room.match_data.problem.index;

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
      room.match_data.end_time = Math.floor(Date.now() / 1000);
      room.match_data.winner = cfhandle;
      room.status = "FINISHED";

      await room.save();

      // UPDATE IN USER MODEL AS THE WINNER AND LOSER

      const session = await mongoose.startSession();

      try {
        const winner = await userModel.findOne(
          { handle: probable_winner },
          null,
          { session },
        );

        const loser = await userModel.findOne(
          { handle: probable_loser },
          null,
          { session },
        );

        if (!winner || !loser) {
          throw new Error("USER NOT FOUND");
        }

        winner.wins = winner.wins + 1;
        loser.losses = loser.losses + 1;

        await winner.save({ session });
        await loser.save({ session });

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
    return Response.json(
      {
        success: false,
        message: "Error occured while checking submission",
      },
      { status: 500 },
    );
  }
}
