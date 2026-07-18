import { Timer, CheckCircle2, Zap, BrainCircuit } from "lucide-react";

function TLEResult({ passedCases, totalCases }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0f172a] border border-amber-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <Timer size={32} className="text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Time Limit Exceeded</h2>
            <p className="text-slate-400 text-sm mt-1">
              Your solution is taking too long to execute.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Metric */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-slate-500" />
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Test Cases Passed</span>
        </div>
        <div className="text-xl font-bold text-white">
          {passedCases} / {totalCases}
        </div>
      </div>

      {/* Optimization Advice */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-amber-400 mb-4">
            <Zap size={20} />
            <h3 className="font-bold">Why this happened</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            The algorithm complexity might be too high for the given input constraints. 
            Ensure you aren't performing redundant operations or deep nested loops.
          </p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-blue-400 mb-4">
            <BrainCircuit size={20} />
            <h3 className="font-bold">Optimization Tips</h3>
          </div>
          <ul className="text-slate-400 text-sm space-y-2 list-none">
            <li className="flex items-center gap-2">● Use more efficient data structures.</li>
            <li className="flex items-center gap-2">● Consider dynamic programming or memoization.</li>
            <li className="flex items-center gap-2">● Check for I/O performance bottlenecks.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TLEResult;