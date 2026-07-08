const ProblemDescription = ({ description }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 sm:p-5 lg:p-6">

      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-5 underline">
        Description:
      </h2>

      <p className="text-sm sm:text-base text-slate-300 leading-6 sm:leading-7 break-words whitespace-pre-wrap">
        {description}
      </p>

    </div>
  );
};

export default ProblemDescription;