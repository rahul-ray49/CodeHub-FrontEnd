


function WrongAnswerResult({passedCases,totalCases,runtime,memory}){



    return (
       <div>
        <div className="bg-[#2B1D1D] border border-red-500/20 rounded-xl p-6">

            <div className="flex items-center gap-4">

                <div className="text-5xl">
                    ❌
                </div>

                <div>

                    <h2 className="text-3xl font-bold text-red-500">
                        Wrong Answer
                    </h2>

                    <p className="text-gray-300 mt-1">
                        Your solution failed on one or more hidden test cases.
                    </p>

                </div>

            </div>

        </div>

         <div className="grid grid-cols-3 gap-4 mt-6">

                <div className="bg-[#1B2436] border border-slate-700 rounded-xl p-5 text-center">

                    <p className="text-gray-400 text-sm">
                        Passed
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-2">
                        {passedCases}/{totalCases}
                    </h2>

                </div>

                <div className="bg-[#1B2436] border border-slate-700 rounded-xl p-5 text-center">

                    <p className="text-gray-400 text-sm">
                        Runtime
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-2">
                        {runtime ?? "--"} ms
                    </h2>

                </div>

                <div className="bg-[#1B2436] border border-slate-700 rounded-xl p-5 text-center">

                    <p className="text-gray-400 text-sm">
                        Memory
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-2">
                        {memory ?? "--"} KB
                    </h2>

                </div>

        </div>

        <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-5">

            <h3 className="text-red-400 text-lg font-semibold">
                Some test cases failed
            </h3>

            <p className="text-gray-300 mt-2 leading-7">
                Your solution worked for some hidden test cases but did not
                produce the expected output for all of them.
                Review your logic and try again.
            </p>

        </div>


       </div>
    )
}
export default WrongAnswerResult;