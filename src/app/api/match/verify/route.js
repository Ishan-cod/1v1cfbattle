import dbconnect from "@/lib/dbconnect";
import { getusersubmission } from "@/lib/getusersubmissions";
import roomModel from "@/model/room.model";

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
