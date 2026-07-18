import { Play } from "lucide-react";

function EmptyResult() {
  return (
    <div className="h-full flex items-center justify-center p-8 animate-fade-in">
      <div className="max-w-sm text-center">
        
        <div className="mx-auto w-20 h-20 rounded-3xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-8 shadow-2xl relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full"></div>
          <Play size={32} className="text-slate-500" fill="currentColor" />
        </div>

        <h2 className="text-xl font-bold text-white mb-3">
          Ready to test?
        </h2>
        
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          Run your code to view the output or submit it to verify your solution against the test suite.
        </p>

        <div className="flex justify-center gap-3">
          <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-bold uppercase tracking-wider border border-slate-700">
            Run
          </span>
          <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/20">
            Submit
          </span>
        </div>

      </div>
    </div>
  );
}

export default EmptyResult;