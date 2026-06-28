


function RuntimeErrorResult({passedCases,totalCases,runtimeOutput}){



    return (
    <div>
        <div className="bg-[#231A2A] border border-purple-500/20 rounded-xl p-6">

            <div className="flex items-center gap-4">

                <div className="text-5xl">
                    ⚠️
                </div>

                <div>

                    <h2 className="text-3xl font-bold text-purple-400">
                        Runtime Error
                    </h2>

                    <p className="text-gray-300 mt-1">
                        Your program crashed while executing one or more hidden test cases.
                    </p>

                </div>

            </div>

        </div>
        <div className="mt-6 bg-[#111827] border border-purple-500/20 rounded-xl p-5">

            <h3 className="text-purple-400 font-semibold mb-3">
                Runtime Error
            </h3>

            <pre className="text-red-300 text-sm whitespace-pre-wrap overflow-x-auto max-h-72 overflow-y-auto">

                {runtimeOutput}

            </pre>

        </div>

        <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-xl p-5">

            <h3 className="text-purple-400 font-semibold">
                Debug Your Code
            </h3>

            <p className="text-gray-300 mt-2 leading-7">
                Your program encountered an error while executing. Check for null pointer access,
                array index out of bounds, division by zero, or invalid memory access before submitting again.
            </p>

        </div>





    </div>
    )
}
export default RuntimeErrorResult;