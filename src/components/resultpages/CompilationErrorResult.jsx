


function CompilationErrorResult({ passedCases,totalCases,compileOutput}){



    return (
        <div>
            <div className="bg-[#2A2318] border border-orange-500/20 rounded-xl p-6">

                <div className="flex items-center gap-4">

                    <div className="text-5xl">
                        🛠️
                    </div>

                    <div>

                        <h2 className="text-3xl font-bold text-orange-500">
                            Compilation Error
                        </h2>

                        <p className="text-gray-300 mt-1">
                            Your code could not be compiled successfully.
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6 bg-[#111827] border border-orange-500/20 rounded-xl p-5 ">

                <h3 className="text-orange-400 font-semibold mb-3">
                    Compiler Output
                </h3>

                <pre className="text-sm text-red-300 whitespace-pre-wrap overflow-x-auto max-h-72 overflow-y-auto">
                    {compileOutput}
                </pre>

            </div>

            <div className="mt-6 bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">

                <h3 className="text-orange-400 font-semibold">
                    Fix Compilation Errors
                </h3>

                <p className="text-gray-300 mt-2">
                    Check for missing semicolons, unmatched brackets,
                    incorrect syntax, or undeclared variables before submitting again.
                </p>

            </div>
        </div>
    )
}
export default CompilationErrorResult;