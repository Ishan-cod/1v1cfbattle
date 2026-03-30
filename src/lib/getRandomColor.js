const getRandomColor = () => {
  const colors = [
    "text-blue-400",
    "text-cyan-400",
    "text-teal-400",
    "text-green-400",
    "text-lime-400",
    "text-emerald-400",
    "text-yellow-400",
    "text-amber-400",
    "text-orange-400",
    "text-red-400",
    "text-rose-400",
    "text-pink-400",
    "text-fuchsia-400",
    "text-purple-400",
    "text-violet-400",
    "text-indigo-400",
    "text-sky-400",
    "text-zinc-300",
    "text-neutral-300",
    "text-stone-300",
  ];

  return colors[Math.floor(Math.random() * 20)];
};

export { getRandomColor };
