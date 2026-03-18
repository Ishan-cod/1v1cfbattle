import dbconnect from "@/lib/dbconnect";
import roomModel from "@/model/room.model";

export async function GET(request, { params }) {
  await dbconnect();
  const { id } = await params;

  if (!id) {
    return Response.json(
      {
        success: false,
        message: "PARAMS NOT PROVIDED",
      },
      { status: 400 },
    );
  }

  const room = await roomModel.findOne({ roomcode: id });

  if (!room) {
    return Response.json(
      {
        success: false,
        message: "ROOM NOT FOUND",
      },
      { status: 404 },
    );
  }

  if (room.status != "ONGOING") {
    return Response.json(
      {
        success: false,
        message: "NO MATCH IS RUNNING IN THE ROOM",
      },
      { status: 400 },
    );
  }

  const players = room.players;
  const hostid = players.host.handle;
  const guestid = players.guest.handle;
  const roomproblemcount = room.settings.questioncount;
  const matchstarttime = room.match_data.start_time;

  const problemdata = [];
  for (let i = 0; i < roomproblemcount; i++) {
    problemdata.push(room.match_data[i].problem);
  }

  try {
    const [hostresponse, guestresponse] = await Promise.all([
      fetch(
        `https://codeforces.com/api/user.status?handle=${hostid}&from=1&count=20`,
      ),
      fetch(
        `https://codeforces.com/api/user.status?handle=${guestid}&from=1&count=20`,
      ),
    ]);

    if (!hostresponse.ok || !guestresponse.ok) {
      throw new Error("CODEFORCE RESPONSE FETCH FAILED");
    }

    const hostdata = await hostresponse.json();
    const guestdata = await guestresponse.json();

    const hostsubmissionarray = hostdata.result;
    const guestsubmissionarray = guestdata.result;

    const problemSet = new Set(problemdata.map((p) => `${p.id}-${p.index}`));

    let live_feed = [
      {
        player: "system",
        passedTestCount: 0,
        submissiontime: matchstarttime,
        verdict: "system",
        timeconsumed_ms: 0,
        memoryused_byte: 0,
      },
    ];

    hostsubmissionarray.forEach((e) => {
      if (
        e.creationTimeSeconds >= matchstarttime &&
        problemSet.has(`${e.problem.contestId}-${e.problem.index}`)
      ) {
        live_feed.push({
          player: hostid,
          passedtestcase: e.passedTestCount,
          submissiontime: e.creationTimeSeconds,
          verdict: e.verdict,
          timeconsumed_ms: e.timeConsumedMillis,
          memoryused_byte: e.memoryConsumedBytes,
        });
      }
    });

    guestsubmissionarray.forEach((e) => {
      if (
        e.creationTimeSeconds >= matchstarttime &&
        problemSet.has(`${e.problem.contestId}-${e.problem.index}`)
      ) {
        live_feed.push({
          player: guestid,
          passedtestcase: e.passedTestCount,
          submissiontime: e.creationTimeSeconds,
          verdict: e.verdict,
          timeconsumed_ms: e.timeConsumedMillis,
          memoryused_byte: e.memoryConsumedBytes,
        });
      }
    });

    live_feed.sort((a, b) => b.submissiontime - a.submissiontime);

    return Response.json(
      {
        success: true,
        message: "LIVE FEED FETCHED SUCCESSFULLY",
        feed: live_feed,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
