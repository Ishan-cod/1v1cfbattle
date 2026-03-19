export function getCFRank(userrating) {
  if (userrating < 1200) {
    return "newbie";
  } else if (userrating < 1400) {
    return "pupil";
  } else if (userrating < 1600) {
    return "specialist";
  } else if (userrating < 1900) {
    return "expert";
  } else if (userrating < 2100) {
    return "candidate master";
  } else if (userrating < 2300) {
    return "master";
  } else if (userrating < 2400) {
    return "international master";
  } else if (userrating < 2600) {
    return "grandmaster";
  } else if (userrating < 3000) {
    return "international grandmaster";
  } else {
    return "legendary grandmaster";
  }
}
