const ProblemDescription = ({ description }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">

      <h2 className="text-2xl font-semibold text-white mb-4">
        Description:
      </h2>

      <p className="text-slate-300 leading-7">
        {description}
      </p>

    </div>
  );
};

export default ProblemDescription;