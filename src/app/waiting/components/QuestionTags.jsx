import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

const QuestionTags = ({ setquestiontags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setquestiontags(selectedTags);
  }, [selectedTags]);

  const availableTags = [
    "binary search",
    "bitmasks",
    "brute force",
    "chinese remainder theorem",
    "combinatorics",
    "communication",
    "constuctive algorithms",
    "data structures",
    "dfs and similar",
    "divide and conquer",
    "dp",
    "dsu",
    "expression parsing",
    "fft",
    "flows",
    "games",
    "geometry",
    "graph matchings",
    "graphs",
    "greedy",
    "hashing",
    "implementation",
    "math",
    "matrices",
    "meet-in-the-middle",
    "number theory",
    "probabilities",
    "schedules",
    "shortest paths",
    "sortings",
    "strings",
    "ternary search",
    "trees",
    "two pointers",
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2 tracking-wider">
        Question tags
      </label>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-slate-950 border ${isOpen ? "border-blue-500" : "border-slate-800"} rounded-lg px-3 py-2 text-sm flex items-center justify-between text-slate-300 transition-all focus:outline-none`}
        >
          <span className="truncate">
            {selectedTags.length === 0
              ? "Select tags..."
              : `${selectedTags.join(", ")}`}
          </span>
          <span
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <ChevronDown />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 p-3 bg-slate-950 border border-slate-800 rounded-lg shadow-xl animate-in fade-in zoom-in duration-150">
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1 rounded-full text-[11px] font-medium transition-all border
                      ${
                        isSelected
                          ? "bg-blue-600/20 border-blue-500 text-blue-400"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }
                    `}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] uppercase font-bold text-blue-500 hover:text-blue-400 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default QuestionTags;
