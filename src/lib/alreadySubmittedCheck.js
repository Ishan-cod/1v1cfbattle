async function alreadySubmittedCheck(user1, user2) {
  // getting user submission array
  const player1 = user1.trim();
  const player2 = user2.trim();

  const url_user1 = `https://codeforces.com/api/user.status?handle=${player1}`;
  const url_user2 = `https://codeforces.com/api/user.status?handle=${player2}`;

  try {
    const response_user1 = await fetch(url_user1);
    const response_user2 = await fetch(url_user2);

    const data_user1 = await response_user1.json();
    const data_user2 = await response_user2.json();

    const solvedquestions_user1 = data_user1.result.filter(
      (e) => e.verdict == "OK",
    );
    const solvedquestions_user2 = data_user2.result.filter(
      (e) => e.verdict == "OK",
    );

    const solved_question_set = new Set();

    // user1
    solvedquestions_user1.forEach((e) => {
      const contestID = e.problem.contestId;
      const problemindex = e.problem.index;

      const problemid = contestID + problemindex;

      solved_question_set.add(problemid);
    });

    // user2
    solvedquestions_user2.forEach((e) => {
      const contestID = e.problem.contestId;
      const problemindex = e.problem.index;

      const problemid = contestID + problemindex;

      solved_question_set.add(problemid);
    });

    return {
      error: false,
      message: "Fetch successfull",
      data_set: solved_question_set,
    };
  } catch (error) {
    return {
      error: true,
      message: "an error occured while getting" + error.message,
    };
  }
}

export { alreadySubmittedCheck };
