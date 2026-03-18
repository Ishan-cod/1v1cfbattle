import React from "react";

const NumberOfQuestion = ({ setquestioncount }) => {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
        Number of questions {"(for this room)"}
      </label>
      <select
        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          let count = Number(e.target.value);
          setquestioncount(count);
        }}
        defaultValue={1}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  );
};

export { NumberOfQuestion };
