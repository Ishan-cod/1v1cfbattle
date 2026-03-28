export function decideWinner({ roomdata }) {
  try {
    if (!roomdata) {
      throw new Error("ROOM DATA NOT PROVIDED");
    }

    if (roomdata.status === "CANCELLED") {
      return {
        success: false,
        roomwinner: "",
        submissiontime: {},
        wincount: {},
        allplayers: [],
      };
    }
    
    const host = roomdata.players.host;
    const guests = roomdata.players.guest;

    const allplayers = [...guests, host];
    if (!allplayers || allplayers.length === 0) {
      throw new Error("Players not found");
    }

    const problemdata = roomdata.match_data;
    if (!problemdata) throw new Error("cannot get set problems");

    // DECIDING WINNER
    const wincount = {};
    allplayers.forEach((plr) => {
      wincount[plr.handle] = 0;
    });

    for (let i = 0; i < problemdata.length; i++) {
      const problemobj = problemdata[i];
      if (!problemobj.winner) {
        continue;
      }

      const winner = problemobj.winner;
      if (wincount[winner] === undefined) {
        wincount[winner] = 1;
      } else wincount[winner] += 1;
    }

    let maxwin = 0;
    for (let key in wincount) {
      if (wincount[key] > maxwin) {
        maxwin = wincount[key];
      }
    }

    const winner = [];

    for (let key in wincount) {
      if (wincount[key] === maxwin) {
        winner.push(key);
      }
    }

    const submissiontime = {};

    problemdata.forEach((probobj, i) => {
      //   console.log("probj", probobj);
      const { winner, end_time, start_time } = probobj;

      if (!winner || !end_time) return;
      submissiontime[winner] ??= [];

      submissiontime[winner].push({
        problemindex: i,
        rating: probobj.problem.rating,
        timetaken: Number(end_time - start_time),
      });
    });

    let roomwinner;
    if (winner.length === 1) {
      roomwinner = winner[0];
    } else {
      let mintime = Infinity;

      for (let i = 0; i < winner.length; i++) {
        const winnerid = winner[i];
        let timesum = 0;
        submissiontime[winnerid].forEach((obj) => {
          timesum += obj.timetaken;
        });

        if (mintime > timesum) {
          mintime = timesum;
          roomwinner = winner[i];
        }
      }
    }
    // END

    return {
      success: true,
      roomwinner: roomwinner,
      submissiontime: submissiontime,
      wincount: wincount,
      allplayers: allplayers,
    };
  } catch (error) {
    console.error(error.message);
    return {
      success: false,
      message: error.message || "error deciding the winner",
      roomwinner: "",
      submissiontime: {},
      wincount: {},
      allplayers: [],
    };
  }
}
