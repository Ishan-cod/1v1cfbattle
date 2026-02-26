export async function getusersubmission(userhandle, problemid, problemindex) {
  if (!userhandle || !problemid || !problemindex) {
    throw new Error("Required data not provided");
  }

  const handle = userhandle.trim();
  
  const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`;

  const response = await fetch(url);
  const data = await response.json();

  const contestid = parseInt(problemid);
  const neededsubmissions = data.result.filter(
    (e) => e.problem.contestId == contestid && e.problem.index == problemindex,
  );

  const filtereddata = [];

  neededsubmissions.forEach((val) => {
    const pusher = {
      id: val.id,
      submissiontimeinsec: val.creationTimeSeconds,
      passedcase: val.passedTestCount,
      verdict: val.verdict,
    };
    filtereddata.push(pusher);
  });

  return filtereddata;
}
