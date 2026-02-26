import React from "react";

const Difficulty = ({ setminrating, setmaxrating }) => {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
        Minimum Rating
      </label>
      <select
        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          let minrating = Number(e.target.value);
          setminrating(minrating);
        }}
        defaultValue={800}
      >
        <option>800</option>
        <option>900 </option>
        <option>1000</option>
        <option>1100</option>
        <option>1200</option>
        <option>1300</option>
        <option>1400</option>
        <option>1500</option>
        <option>1600</option>
        <option>1700</option>
        <option>1800</option>
        <option>1900</option>
      </select>

      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
        Maximum Rating
      </label>
      <select
        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          let maxrating = Number(e.target.value);
          setmaxrating(maxrating);
        }}
        defaultValue={1900}
      >
        <option>800</option>
        <option>900 </option>
        <option>1000</option>
        <option>1100</option>
        <option>1200</option>
        <option>1300</option>
        <option>1400</option>
        <option>1500</option>
        <option>1600</option>
        <option>1700</option>
        <option>1800</option>
        <option>1900</option>
      </select>
    </div>
  );
};

export { Difficulty };
