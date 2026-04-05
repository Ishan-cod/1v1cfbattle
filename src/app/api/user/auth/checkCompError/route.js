export async function POST(request) {
  const { cfhandle, contestid, index } = await request.json();
  if (!cfhandle || !contestid || !index) {
    return Response.json(
      {
        success: false,
        message: "required params not provided",
      },
      { status: 400 },
    );
  }

  try {
    const handle = cfhandle.trim();
    const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`;

    const response = await fetch(url);
    const data = await response.json();

    const problemid = parseInt(contestid);

    const neededsubmissions = data.result.filter(
      (e) => e.problem.contestId == problemid && e.problem.index == index,
    );

    let found = false;
    neededsubmissions.forEach((sub) => {
      if (sub.verdict === "COMPILATION_ERROR") {
        found = true;
        return;
      }
    });

    if (found) {
      return Response.json(
        {
          success: true,
          message: "user account verified",
        },
        { status: 200 },
      );
    }

    return Response.json(
      {
        success: false,
        message: "user submission not verified",
      },
      { status: 404 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "fail to check user submission",
      },
      { status: 500 },
    );
  }
}
