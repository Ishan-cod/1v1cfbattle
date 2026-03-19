export const getarenarating = ({ win, loss, rating }) => {
  const wins = win || 0;
  const losses = loss || 0;
  const cfrating = rating || 0;

  return cfrating * 0.2 + (Math.pow(wins, 2) / (wins + losses + 1)) * 100;
};
