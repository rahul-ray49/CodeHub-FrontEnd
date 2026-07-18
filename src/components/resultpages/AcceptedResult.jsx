import { CheckCircle2, Clock, Database, Award } from "lucide-react";

function AcceptedResult({ passedCases, totalCases, runtime, memory }) {
  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-[#0f172a] border border-emerald-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Accepted</h2>
            <p className="text-slate-400 text-sm mt-1">
              Your solution passed all test cases successfully.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Passed", value: `${passedCases}/${totalCases}`, icon: CheckCircle2 },
          { label: "Runtime", value: runtime ? `${Number(runtime).toFixed(3)}ms` : "--", icon: Clock },
          { label: "Memory", value: memory ? `${memory}KB` : "--", icon: Database },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <item.icon size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item?.label}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{item?.value}</h3>
          </div>
        ))}
      </div>

      {/* Motivational Section */}
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 flex gap-4">
        <div className="text-emerald-400 mt-1">
          <Award size={24} />
        </div>
        <div>
          <h3 className="text-emerald-400 font-semibold text-lg">Excellent Work!</h3>
          <p className="text-slate-400 text-sm leading-relaxed mt-1">
            Your solution is efficient and correct. Keep pushing your boundaries and tackle the next challenge!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AcceptedResult;