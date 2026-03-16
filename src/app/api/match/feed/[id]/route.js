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
      { status: 500 },
    );
  }

  const players = room.players;

  const hostid = players.host.handle;
  const guestid = players.guest.handle;

  const problemdata = room.match_data.problem;
  const problemindex = problemdata.index;
  const problemid = problemdata.id;
  const matchstarttime = room.match_data.start_time;

  try {
    const hosturl = `https://codeforces.com/api/user.status?handle=${hostid}&from=1&count=10`;
    const guesturl = `https://codeforces.com/api/user.status?handle=${guestid}&from=1&count=10`;

    const hostresponse = await fetch(hosturl);
    const guestresponse = await fetch(guesturl);

    if (hostresponse.status !== 200 || guestresponse.status !== 200) {
      throw new Error("CODEFORCE RESPONSE FETCH FAILED");
    }

    const hostdata = await hostresponse.json();
    const guestdata = await guestresponse.json();

    const hostsubmissionarray = hostdata.result;
    const guestsubmissionarray = guestdata.result;

    const filteredhost = hostsubmissionarray.filter(
      (e) =>
        e.creationTimeSeconds >= matchstarttime &&
        e.problem.contestId == problemid &&
        e.problem.index == problemindex,
    );

    const filteredguest = guestsubmissionarray.filter(
      (e) =>
        e.creationTimeSeconds >= matchstarttime &&
        e.problem.contestId == problemid &&
        e.problem.index == problemindex,
    );

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
    filteredhost.map((e) => {
      const add = {
        player: hostid,
        passedtestcase: e.passedTestCount,
        submissiontime: e.creationTimeSeconds,
        verdict: e.verdict,
        timeconsumed_ms: e.timeConsumedMillis,
        memoryused_byte: e.memoryConsumedBytes,
      };

      live_feed.push(add);
    });

    filteredguest.map((e) => {
      const add = {
        player: guestid,
        passedtestcase: e.passedTestCount,
        submissiontime: e.creationTimeSeconds,
        verdict: e.verdict,
        timeconsumed_ms: e.timeConsumedMillis,
        memoryused_byte: e.memoryConsumedBytes,
      };

      live_feed.push(add);
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
    console.log
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
