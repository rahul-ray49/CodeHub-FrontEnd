const ExampleCard = ({ example, index }) => {
  return (
    <div className="bg-slate-800/60 rounded-xl p-4">

      <h3 className="font-semibold text-white mb-3">
        Example: {index + 1}
      </h3>

      <div className="space-y-2 text-sm">

        <p>
          <span className="font-semibold text-blue-400">Input:</span>{" "}
          {example.input}
        </p>

        <p>
          <span className="font-semibold text-green-400">Output:</span>{" "}
          {example.output}
        </p>

        <p>
          <span className="font-semibold text-purple-400">Explanation:</span>{" "}
          {example.explanation}
        </p>

      </div>

    </div>
  );
};

export default ExampleCard;