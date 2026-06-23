

import ExampleCard from "./ExampleCard";

const ExampleSection = ({ examples }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">

      <h2 className="text-xl font-semibold text-white mb-4">
        Examples
      </h2>

      <div className="space-y-4">
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