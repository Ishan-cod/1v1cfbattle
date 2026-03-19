export function formatCFTime(startTimeSeconds) {
  const d = new Date(startTimeSeconds * 1000);

  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time };
}