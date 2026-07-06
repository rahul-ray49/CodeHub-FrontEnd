

import ExampleCard from "./ExampleCard";

const ExampleSection = ({ examples }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 sm:p-5 lg:p-6">

      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-5">
        Examples
      </h2>

      <div className="space-y-4 sm:space-y-5">
        {examples?.map((example, index) => (
          <ExampleCard
            key={index}
            example={example}
            index={index}
          />
        ))}
      </div>

    </div>
  );
};

export default ExampleSection;