export function getCFColor(userrating) {
  if (userrating < 1200) {
    return "#808080";
  } else if (userrating < 1400) {
    return "#008000";
  } else if (userrating < 1600) {
    return "#03A89E";
  } else if (userrating < 1900) {
    return "#0000FF";
  } else if (userrating < 2100) {
    return "#AA00AA";
  } else if (userrating < 2300) {
    return "#FF8C00";
  } else if (userrating < 2400) {
    return "#FF8C00";
  } else if (userrating < 2600) {
    return "#FF0000";
  } else if (userrating < 3000) {
    return "#FF0000";
  } else {
    return "#FF0000";
  }
}
