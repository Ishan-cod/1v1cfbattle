export async function fetchproblem(tags, min_rating, max_rating, count = 1) {
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

    const size = samplespace.length;
    if (size === 0) throw new Error("No problems found in this rating range");

    const problemset = [];
    for (let i = 0; i < count; i++) {
      const ind = Math.floor(Math.random() * size);
      problemset.push(samplespace[ind]);
    }

    return problemset;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error(error.message || "Error fetching problem");
  }
}
