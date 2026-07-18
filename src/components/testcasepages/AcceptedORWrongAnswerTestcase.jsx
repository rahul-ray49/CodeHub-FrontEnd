import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function AcceptedORWrongAnswerTestcase({ runResult }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">Test Case Results</h3>
        <span className="text-sm font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
          {runResult?.passedCases} / {runResult?.totalCases} Passed
        </span>
      </div>

      <div className="space-y-3">
        {runResult?.testCases.map((tc, index) => {
          const isPassed = tc?.status_id === 3;
          const isExpanded = expandedIndex === index;

          return (
            <div key={index} className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full flex justify-between items-center px-5 py-4 hover:bg-slate-800/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  {isPassed ? (
                    <CheckCircle2 className="text-emerald-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                  <span className="font-semibold text-slate-200">Test Case #{index + 1}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp size={18} className="text-slate-500" />
                ) : (
                  <ChevronDown size={18} className="text-slate-500" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800">
                  <div className="md:col-span-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Input</p>
                    <pre className="bg-[#050505] rounded-xl p-4 text-sm text-slate-300 font-mono overflow-x-auto border border-slate-800/50">
                      {tc?.stdin}
                    </pre>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Expected Output</p>
                    <pre className="bg-[#050505] rounded-xl p-4 text-sm text-emerald-400 font-mono overflow-x-auto border border-slate-800/50">
                      {tc?.expected_output}
                    </pre>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Your Output</p>
                    <pre className={`bg-[#050505] rounded-xl p-4 text-sm font-mono overflow-x-auto border border-slate-800/50 ${isPassed ? "text-emerald-400" : "text-red-400"}`}>
                      {tc?.stdout || "No Output"}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AcceptedORWrongAnswerTestcase;