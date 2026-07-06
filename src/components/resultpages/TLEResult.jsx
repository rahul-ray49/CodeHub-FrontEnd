



function TLEResult({ passedCases,totalCases}){



    return (
        <div>
            <div className="bg-[#2A2618] border border-yellow-500/20 rounded-xl p-4 sm:p-5 lg:p-6">

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                    <div className="text-4xl sm:text-5xl flex-shrink-0">
                        ⏳
                    </div>

                    <div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                            Time Limit Exceeded
                        </h2>

                        <p className="text-gray-300 mt-2 leading-6 text-sm sm:text-base">
                            Your solution exceeded the allowed execution time.
                        </p>

                    </div>

                </div>

            </div>
            <div className="mt-6">

                <div className="bg-[#1B2436] border border-slate-700 rounded-xl p-4 sm:p-5 text-center">

                    <p className="text-sm text-gray-400">
                        Passed
                    </p>

                    <h2 className="text-xl sm:text-2xl  font-bold text-white mt-2">
                        {passedCases}/{totalCases}
                    </h2>

                </div>

            </div>
            <div className="mt-6 bg-[#111827] border border-yellow-500/20 rounded-xl p-4 sm:p-5">

                <h3 className="text-yellow-400 font-semibold text-lg sm:text-xl">
                    Execution Time Exceeded
                </h3>

                <p className="text-gray-300 mt-3 leading-6 sm:leading-7 text-sm sm:text-base">
                    Your program took longer than the allowed execution time.
                    This usually happens when the algorithm is not efficient enough
                    for large input sizes.
                </p>

            </div>
            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 sm:p-5">

                <h3 className="text-yellow-400 font-semibold text-lg sm:text-xl">
                    Optimization Tips
                </h3>

                <ul className="mt-3 text-sm sm:text-base text-gray-300 space-y-2 list-disc list-inside leading-6">

                    <li>Try reducing the time complexity of your algorithm.</li>

                    <li>Avoid unnecessary nested loops.</li>

                    <li>Use efficient data structures whenever possible.</li>

                </ul>

            </div>
        </div>
    )
}
export default TLEResult;



