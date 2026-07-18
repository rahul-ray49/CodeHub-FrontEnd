import { Bot } from "lucide-react";
import { AiOutlineSearch, AiOutlineExclamationCircle, AiOutlineThunderbolt, AiOutlineExperiment, AiOutlineFileText } from "react-icons/ai";

const AiAnalysisPanel = ({ analysis, loading }) => {
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-blue-500 mb-5">
          <Bot className="w-10 h-10"/>
        </div>
        <h2 className="text-2xl font-bold text-white">AI Code Analysis</h2>
        <p className="text-slate-400 mt-3 max-w-md">
          Click <span className="text-blue-400 font-semibold">Analyze Bug</span> to review your solution, detect bugs, and receive optimization suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 custom-scrollbar">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Bot className="text-blue-500" /> AI Code Analysis
          </h1>
          <p className="text-slate-400 mt-2">AI-driven insights for your submitted solution.</p>
        </div>

        {/* Overall Assessment */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Overall Assessment</h2>
              <p className="text-slate-400 mt-1">General quality of your solution.</p>
            </div>
            <div className={`px-4 py-2 rounded-xl border font-semibold ${getStatusColor(analysis?.overall?.status)}`}>
              {analysis?.overall?.status || "N/A"}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Status</p>
              <p className="text-lg font-semibold text-white mt-1">{analysis?.overall?.status || "N/A"}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Confidence</p>
              <p className="text-lg font-semibold text-white mt-1">{analysis?.overall?.confidence || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Issues */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <AiOutlineSearch className="text-blue-400" /> Issues Found
            </h2>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
              {analysis?.issues?.length || 0}
            </span>
          </div>

          {analysis?.issues?.length === 0 ? (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-emerald-400 font-medium">
              No issues found. Great job!
            </div>
          ) : (
            <div className="space-y-4">
              {analysis?.issues?.map((issue, index) => (
                <div key={index} className="rounded-xl border border-slate-700 bg-slate-900 p-5">
                  <div className={`inline-flex px-3 py-1 rounded-lg border text-sm font-medium ${getIssueColor(issue?.type)}`}>
                    {issue?.type || "General Issue"}
                  </div>
                  <p className="text-slate-300 mt-3 leading-7">{issue?.description || "No description provided."}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Complexity & Edge Cases */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <AiOutlineThunderbolt className="text-amber-400" /> Complexity
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Time Complexity</p>
                <p className="text-white mt-1 font-mono">{analysis?.complexity?.time || "N/A"}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Space Complexity</p>
                <p className="text-white mt-1 font-mono">{analysis?.complexity?.space || "N/A"}</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Optimization</p>
                <p className="text-slate-300 mt-2 leading-7">{analysis?.complexity?.optimization || "No specific optimization suggestions."}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <AiOutlineExperiment className="text-purple-400" /> Edge Cases
            </h2>
            <div className="space-y-4">
              {analysis?.edgeCases?.length > 0 ? (
                analysis?.edgeCases?.map((edge, index) => (
                  <div key={index} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <h3 className="font-semibold text-white">{edge?.type || edge?.case || `Edge Case ${index + 1}`}</h3>
                    <p className="text-slate-400 mt-1 text-sm">{edge?.description || edge?.analysis || edge}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No edge cases suggested.</p>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-900/10 to-cyan-900/10 border border-blue-500/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AiOutlineFileText className="text-blue-400" /> Overall Summary
          </h2>
          <p className="text-slate-300 leading-8">{analysis?.summary || "No summary provided."}</p>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Excellent":
    case "Correct":
      return "text-green-400 bg-green-500/15 border-green-500/30";
    case "Good":
      return "text-blue-400 bg-blue-500/15 border-blue-500/30";
    case "Needs Improvement":
      return "text-yellow-400 bg-yellow-500/15 border-yellow-500/30";
    case "Poor":
      return "text-red-400 bg-red-500/15 border-red-500/30";
    default:
      return "text-slate-300 bg-slate-800 border-slate-700";
  }
};

const getIssueColor = (type = "") => {
  const value = type.toLowerCase();
  if (value.includes("runtime")) return "bg-red-500/15 text-red-400 border-red-500/30";
  if (value.includes("logic")) return "bg-orange-500/15 text-orange-400 border-orange-500/30";
  if (value.includes("compile")) return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
  if (value.includes("overflow")) return "bg-purple-500/15 text-purple-400 border-purple-500/30";
  return "bg-blue-500/15 text-blue-400 border-blue-500/30";
};

export default AiAnalysisPanel;