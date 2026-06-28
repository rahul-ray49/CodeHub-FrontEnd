function AcceptedORWrongAnswerTestcase({runResult}){


    return(
        <div className="space-y-4">


        <div className="mb-5">

                <p className="text-slate-400 text-sm">

                    Passed {runResult.passedCases} / {runResult.totalCases} Test Cases

                </p>

        </div>

        <div className="space-y-5">

                {runResult.testCases.map((tc, index) => (

                    <div key={index} className="bg-slate-950 border border-slate-700 rounded-xl">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700">

                            <h3 className="text-white font-medium">
                                Test Case #{index + 1}
                            </h3>

                            <span className={`px-3 py-1 rounded-md text-xs font-medium ${tc.status_id === 3 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>

                                {tc.status}

                            </span>

                        </div>

                        <div className="p-4">

                        <div className="mb-4">

                            <p className="text-xs uppercase text-slate-500 mb-2">
                                Input
                            </p>

                            <pre className="bg-slate-900 rounded-lg p-3 text-slate-200 overflow-x-auto">
                                {tc.stdin}
                            </pre>

                        </div>


                        <div className="mb-4">

                                <p className="text-xs uppercase text-slate-500 mb-2">
                                    Expected Output
                                </p>

                                <pre className="bg-slate-900 rounded-lg p-3 text-green-400 overflow-x-auto">
                                    {tc.expected_output}
                                </pre>

                        </div>

                        <div className="mb-4">

                                <p className="text-xs uppercase text-slate-500 mb-2">
                                    Your Output
                                </p>

                                <pre className={`bg-slate-900 rounded-lg p-3 overflow-x-auto ${tc.status_id === 3 ? "text-green-400" : "text-red-400"}`}>
                                    {tc.stdout || "No Output"}
                                </pre>

                        </div>

                        </div>



                    </div>

                ))}

        </div>

    </div>


    )
}
export default AcceptedORWrongAnswerTestcase;