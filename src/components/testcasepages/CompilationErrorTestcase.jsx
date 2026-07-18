import { Terminal, AlertTriangle } from "lucide-react";

function CompilationErrorTestcase({ compileOutput }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-red-400">
        <AlertTriangle size={20} />
        <h3 className="font-bold text-lg tracking-wide uppercase">
          Compilation Error
        </h3>
      </div>

      <div className="bg-[#050505] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-5 py-3 border-b border-slate-800 bg-[#0f172a] flex items-center gap-2">
          <Terminal size={16} className="text-red-500" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Compiler Logs
          </span>
        </div>
        <div className="p-5 overflow-x-auto">
          <pre className="text-sm text-red-400 font-mono leading-relaxed whitespace-pre-wrap">
            {compileOutput || "No output provided by the compiler."}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default CompilationErrorTestcase;