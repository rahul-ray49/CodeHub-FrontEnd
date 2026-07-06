const ProblemHeader = ({ problem }) => {

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400";

      case "medium":
        return "bg-yellow-500/20 text-yellow-400";

      case "hard":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 sm:p-5 lg:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 break-words">
        {problem?.problemNumber.toString()}. {problem?.title}
      </h1>

      <div className="flex flex-wrap gap-2 sm:gap-3">

        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(
            problem?.difficulty
          )}`}
        >
          {problem?.difficulty?.charAt(0).toUpperCase() +
            problem?.difficulty?.slice(1)}
        </span>

        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs sm:text-sm break-words">
          {problem?.tags}
        </span>

        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs sm:text-sm whitespace-nowrap">
          {problem?.score} Points
        </span>

      </div>
    </div>
  );
};

export default ProblemHeader;