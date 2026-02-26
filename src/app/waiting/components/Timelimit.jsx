import React from "react";

const Timelimit = ({ settimelimit }) => {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
        Time Limit {"(in min)"}
      </label>
      <select
        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          let timelimit = Number(e.target.value);
          settimelimit(timelimit);
        }}
        defaultValue={120}
      >
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option>30</option>
        <option>40</option>
        <option>50</option>
        <option>60</option>
        <option>70</option>
        <option>80</option>
        <option>90</option>
        <option>100</option>
        <option>110</option>
        <option>120</option>
      </select>
    </div>
  );
};

export { Timelimit };
