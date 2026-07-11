const AiAnalysisPanel = ({ analysis, loading }) => {

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">

                <div className="text-6xl mb-5">
                    🤖
                </div>

                <h2 className="text-2xl font-bold text-white">
                    AI Code Analysis
                </h2>

                <p className="text-slate-400 mt-3 max-w-md">
                    Click <span className="text-blue-400 font-semibold">Analyze Bug</span> to
                    review your solution, detect bugs, identify edge cases,
                    and receive optimization suggestions.
                </p>

            </div>
        );
    }

    return (

                    <div className="w-full h-full overflow-y-auto p-6">

                    <div className="mx-auto max-w-5xl space-y-6">

                    {/* Heading */}

                    <div>

                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">

                    🤖 AI Code Analysis

                    </h1>

                    <p className="text-slate-400 mt-2">

                    AI review of your submitted solution.

                    </p>

                    </div>

                    {/* Overall */}

                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                    <h2 className="text-xl font-semibold text-white">

                    Overall Assessment

                    </h2>

                    <p className="text-slate-400 mt-1">

                    General quality of your solution.

                    </p>

                    </div>

                    <div
                    className={`px-4 py-2 rounded-xl border font-semibold ${getStatusColor(
                    analysis.overall.status
                    )}`}
                    >

                    {analysis.overall.status}

                    </div>

                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="bg-slate-800 rounded-xl p-4">

                    <p className="text-slate-400 text-sm">

                    Status

                    </p>

                    <p className="text-lg font-semibold text-white mt-1">

                    {analysis.overall.status}

                    </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">

                    <p className="text-slate-400 text-sm">

                    Confidence

                    </p>

                    <p className="text-lg font-semibold text-white mt-1">

                    {analysis.overall.confidence}

                    </p>

                    </div>

                    </div>

                    </div>

                    {/* Issues */}

                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

                            <div className="flex items-center justify-between mb-6">

                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    🔍 Issues Found
                                </h2>

                                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                                    {analysis.issues.length}
                                </span>

                            </div>

                            {
                                analysis.issues.length === 0 ? (

                                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">

                                        <p className="text-green-400 font-medium">
                                            🎉 No issues found. Great job!
                                        </p>

                                    </div>

                                ) : (

                                    <div className="space-y-4">

                                        {analysis.issues.map((issue, index) => (

                                            <div
                                                key={index}
                                                className="rounded-xl border border-slate-700 bg-slate-800 p-5"
                                            >

                                                <div className="inline-flex px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">

                                                    {issue.type}

                                                </div>

                                                <p className="text-slate-300 mt-4 leading-7">

                                                    {issue.description}

                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                )

                            }

                        </div>

                        {/* Complexity & Edge Cases */}

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                            {/* Complexity */}

                            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

                                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                                    ⚡ Complexity
                                </h2>

                                <div className="space-y-4">

                                    <div className="bg-slate-800 rounded-xl p-4">

                                        <p className="text-sm text-slate-400">
                                            Time Complexity
                                        </p>

                                        <p className="text-lg font-semibold text-white mt-2">
                                            {analysis.complexity.time}
                                        </p>

                                    </div>

                                    <div className="bg-slate-800 rounded-xl p-4">

                                        <p className="text-sm text-slate-400">
                                            Space Complexity
                                        </p>

                                        <p className="text-lg font-semibold text-white mt-2">
                                            {analysis.complexity.space}
                                        </p>

                                    </div>

                                    <div className="bg-slate-800 rounded-xl p-4">

                                        <p className="text-sm text-slate-400">
                                            Optimization
                                        </p>

                                        <p className="text-slate-300 mt-2 leading-7">
                                            {analysis.complexity.optimization}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Edge Cases */}

                            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

                                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                                    🧪 Edge Cases
                                </h2>

                                <div className="space-y-4">

                                    {
                                        analysis.edgeCases.length === 0 ? (

                                            <p className="text-slate-400">
                                                No edge cases suggested.
                                            </p>

                                        ) : (

                                            analysis.edgeCases.map((edge, index) => (

                                                <div
                                                    key={index}
                                                    className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                                                >

                                                    <h3 className="font-semibold text-white">

                                                        {edge.type || edge.case || `Edge Case ${index + 1}`}

                                                    </h3>

                                                    <p className="text-slate-300 mt-2 leading-7">

                                                        {edge.description || edge.analysis || edge}

                                                    </p>

                                                </div>

                                            ))

                                        )
                                    }

                                </div>

                            </div>

                            {/* Summary */}

                            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">

                                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                                    📝 Overall Summary
                                </h2>

                                <p className="text-slate-300 leading-8">

                                    {analysis.summary}

                                </p>

                            </div>

                        </div>

                    </div>

                    </div>

                    );

   };

const getStatusColor = (status) => {

    switch (status) {

        case "Excellent":
        case "Correct":
            return "text-green-400 bg-green-500/15 border-green-500/30";

        case "Good":
            return "text-blue-400 bg-blue-500/15 border-blue-500/30";

        case "Needs Improvement":
            return "text-yellow-400 bg-yellow-500/15 border-yellow-500/30";

        case "Poor":
            return "text-red-400 bg-red-500/15 border-red-500/30";

        default:
            return "text-slate-300 bg-slate-800 border-slate-700";
    }

};

const getIssueColor = (type = "") => {

    const value = type.toLowerCase();

    if (value.includes("runtime"))
        return "bg-red-500/15 text-red-400 border-red-500/30";

    if (value.includes("logic"))
        return "bg-orange-500/15 text-orange-400 border-orange-500/30";

    if (value.includes("compile"))
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";

    if (value.includes("overflow"))
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";

    return "bg-blue-500/15 text-blue-400 border-blue-500/30";

};

export default AiAnalysisPanel;