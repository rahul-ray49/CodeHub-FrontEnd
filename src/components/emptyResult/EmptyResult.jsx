import { PlayCircle } from "lucide-react";

function EmptyResult() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl h-full flex items-center justify-center p-6 sm:p-8">
      <div className="max-w-md text-center">

        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
          <PlayCircle
            size={40}
            className="text-blue-400 sm:w-12 sm:h-12"
          />
        </div>

       
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          No Results Yet
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-7">
          Your program hasn't been executed yet.
          <br className="hidden sm:block" />
          Click <span className="text-blue-400 font-medium">Run</span> to test
          your solution or{" "}
          <span className="text-green-400 font-medium">Submit</span> to evaluate
          it against hidden test cases.
        </p>

        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
          <p className="text-xs sm:text-sm text-slate-400">
            💡 The execution result, console output, and verdict will appear
            here after running your code.
          </p>
        </div>

      </div>
    </div>
  );
}

export default EmptyResult;