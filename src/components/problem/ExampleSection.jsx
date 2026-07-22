import ExampleCard from "./ExampleCard";

const ExampleSection = ({ examples }) => {
  if (!examples || examples?.length === 0) return null;

  return (
    <div className="mb-10 animate-fade-in">
      
      <div className="flex items-center gap-3 mb-6 select-none">
        <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
          Examples
        </h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
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