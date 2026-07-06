


function CompilationErrorResult({ passedCases,totalCases,compileOutput}){



    return (
        <div>
            <div className="bg-[#2A2318] border border-orange-500/20 rounded-xl p-4 sm:p-5 lg:p-6">

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                    <div className="text-4xl sm:text-5xl flex-shrink-0">                                          
                        🛠️
                    </div>

                    <div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
                            Compilation Error
                        </h2>

                        <p className="text-sm sm:text-base text-gray-300 mt-2 leading-6">
                            Your code could not be compiled successfully.
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6 bg-[#111827] border border-orange-500/20 rounded-xl p-4 sm:p-5">

                <h3 className="text-base sm:text-lg text-orange-400 font-semibold mb-3">
                    Compiler Output
                </h3>
                <div className="overflow-x-auto overflow-y-auto max-h-72 rounded-lg bg-slate-900/60 p-3">
                <pre className="text-xs sm:text-sm text-red-300 whitespace-pre-wrap break-words font-mono">
                    {compileOutput}
                </pre>
                </div>

            </div>

            <div className="mt-6 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 sm:p-5">

                <h3 className="text-lg sm:text-xl text-orange-400 font-semibold">
                    Fix Compilation Errors
                </h3>

                <p className="text-sm sm:text-base text-gray-300 mt-2 leading-6 sm:leading-7">
                    Check for missing semicolons, unmatched brackets,
                    incorrect syntax, or undeclared variables before submitting again.
                </p>

            </div>
        </div>
    )
}
export default CompilationErrorResult;