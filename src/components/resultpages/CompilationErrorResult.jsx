import { AlertTriangle, Terminal, Wrench } from "lucide-react";

function CompilationErrorResult({ compileOutput }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0f172a] border border-amber-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <AlertTriangle size={32} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Compilation Error</h2>
            <p className="text-slate-400 text-sm mt-1">
              The compiler encountered issues while processing your code.
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
          <Terminal size={16} className="text-amber-500" />
          <span className="text-sm font-semibold text-slate-300">Compiler Logs</span>
        </div>
        <div className="p-4 bg-[#050505] overflow-x-auto">
          <pre className="text-xs sm:text-sm text-red-400 font-mono leading-relaxed min-h-[150px]">
            {compileOutput || "No output provided by the compiler."}
          </pre>
        </div>
      </div>

      {/* Actionable Advice */}
      <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 flex gap-4">
        <div className="text-amber-500 mt-1">
          <Wrench size={24} />
        </div>
        <div>
          <h3 className="text-amber-500 font-semibold text-lg">Troubleshooting Tips</h3>
          <p className="text-slate-400 text-sm leading-relaxed mt-1">
            Ensure all syntax requirements are met. Check for missing semicolons, 
            unmatched brackets, or incorrect imports. Review the logs above to identify 
            the exact line causing the failure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompilationErrorResult;