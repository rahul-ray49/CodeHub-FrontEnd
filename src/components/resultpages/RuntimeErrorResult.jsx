


function RuntimeErrorResult({passedCases,totalCases,runtimeOutput}){



    return (
    <div>
        <div className="bg-[#231A2A] border border-purple-500/20 rounded-xl p-4 sm:p-5 lg:p-6">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                <div className="text-4xl sm:text-5xl flex-shrink-0">
                    ⚠️
                </div>

                <div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-purple-400">
                        Runtime Error
                    </h2>

                    <p className="text-sm sm:text-base text-gray-300 mt-2 leading-6">
                        Your program crashed while executing one or more hidden test cases.
                    </p>

                </div>

            </div>

        </div>
        <div className="mt-6 bg-[#111827] border border-purple-500/20 rounded-xl p-4 sm:p-5">

            <h3 className="text-purple-400 font-semibold mb-3 text-base sm:text-lg">
                Runtime Error
            </h3>
             <div className="overflow-x-auto overflow-y-auto max-h-72 rounded-lg bg-slate-900/60 p-3">

            <pre className="text-red-300 text-xs sm:text-sm whitespace-pre-wrap break-words font-mono">

                {runtimeOutput}

            </pre>

            </div>

        </div>

        <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 sm:p-5">

            <h3 className="text-purple-400 font-semibold text-lg sm:text-xl">
                Debug Your Code
            </h3>

            <p className="text-sm sm:text-base text-gray-300 mt-2 leading-6 sm:leading-7">
                Your program encountered an error while executing. Check for null pointer access,
                array index out of bounds, division by zero, or invalid memory access before submitting again.
            </p>

        </div>





    </div>
    )
}
export default RuntimeErrorResult;