import { alreadySubmittedCheck } from "./alreadySubmittedCheck";

export async function fetchproblem(
  tags,
  min_rating,
  max_rating,
  count = 1,
  user1 = null,
  user2 = null,
) {
  if (!Array.isArray(tags)) throw new Error("Tags must be an array of strings");
  if (!Number.isInteger(count)) throw new Error("Count must be an integer");

  const reqtag = tags.join(";");

  try {
    const url = `https://codeforces.com/api/problemset.problems?tags=${reqtag}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(data.comment || "Codeforces API Error");
    }

    let problems = data.result.problems;

    let samplespace = problems.filter(
      (p) => p.rating >= min_rating && p.rating <= max_rating,
    );

    if (samplespace.length === 0) {
      console.warn(
        "No problems found with specific tags/ratings. Falling back to rating only.",
      );

      const fallbackUrl = "https://codeforces.com/api/problemset.problems";
      const fbResponse = await fetch(fallbackUrl);
      const fbData = await fbResponse.json();

      samplespace = fbData.result.problems.filter(
        (p) => p.rating >= min_rating && p.rating <= max_rating,
      );
    }

    // getting already solved problem set
    let alreadysolved;
    console.log(user1);
    console.log(user2);

    if (user1 && user2) {
      alreadysolved = await alreadySubmittedCheck(user1, user2);
    }

    const solvedset = alreadysolved?.data_set || new Set();
    // already solved set resolve

    const size = samplespace.length;
    if (size === 0) throw new Error("No problems found in this rating range");

    const problemset = [];

    // TODO:
    // console.log(solvedset);

    for (let i = 0; i < count; i++) {
      let retry = 0;
      let ind = Math.floor(Math.random() * size);

      let problemid = `${samplespace[ind].contestId}${samplespace[ind].index}`;
      console.log("problemid" + problemid);


      // Retrying 10 times before giving random problem
      while (solvedset.has(problemid) && retry <= 10) {
        ind = Math.floor(Math.random() * size);
        problemid = `${samplespace[ind].contestId}${samplespace[ind].index}`;

        console.log("problemid" + problemid);
        retry += 1;

        console.log("retry" - retry);
      }

      // retry fail or pass set probelm.
      problemset.push(samplespace[ind]);
    }

    return problemset;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error(error.message || "Error fetching problem");
  }
}
