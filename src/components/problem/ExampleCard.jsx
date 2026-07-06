const ExampleCard = ({ example, index }) => {
  return (
          <div className="bg-slate-800/60 rounded-xl p-4 sm:p-5">

            <h3 className="font-semibold text-white text-base sm:text-lg mb-4">
              Example: {index + 1}
            </h3>

            <div className="space-y-3 text-sm sm:text-base text-gray-200">

              <div className="break-words">
                <span className="font-semibold text-blue-400">
                  Input:
                </span>

                <div className="mt-1 overflow-x-auto rounded-md bg-slate-900/60 p-2">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                    {example.input}
                  </pre>
                </div>
              </div>

              <div className="break-words">
                <span className="font-semibold text-green-400">
                  Output:
                </span>

                <div className="mt-1 overflow-x-auto rounded-md bg-slate-900/60 p-2">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                    {example.output}
                  </pre>
                </div>
              </div>

              <div className="break-words">
                <span className="font-semibold text-purple-400">
                  Explanation:
                </span>

                <p className="mt-1 whitespace-pre-wrap break-words">
                  {example.explanation}
                </p>
              </div>

            </div>

          </div>
  );
};

export default ExampleCard;