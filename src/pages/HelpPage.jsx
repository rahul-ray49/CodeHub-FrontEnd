import { ArrowLeft, BookOpen, Code2, Terminal, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const codeTemplate = `#include <bits/stdc++.h>
using namespace std;

int main() {

    // Write your code here

    return 0;
}`;

const HelpPage = () => {

    const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <section className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-14">

          <div className="flex items-center gap-4 mb-5">
            <BookOpen className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold">Help Center</h1>
          </div>

          <p className="text-slate-400 text-lg leading-8 max-w-4xl">
            Welcome to <span className="font-semibold text-white">CodeHub</span>.
            Before submitting your solution, please read these guidelines carefully.
            Following the correct coding format ensures that your program compiles,
            runs successfully, and is evaluated correctly by the online judge.
          </p>

        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-5">
            <Code2 className="text-cyan-400" />
            <h2 className="text-2xl font-semibold">Writing Your Solution</h2>
          </div>

          <p className="text-slate-400 leading-8 mb-6">
            Write your complete solution inside the
            <span className="text-white font-medium"> main() </span>
            function. Begin your program with the required header file and namespace declaration.
            Use the following structure for every C++ submission.
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117]">

            <div className="flex items-center gap-2 border-b border-slate-700 px-5 py-3">

              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>

              <span className="ml-3 text-sm text-slate-400">
                C++ Template
              </span>

            </div>

            <pre className="overflow-x-auto p-6">
              <code className="text-green-400 text-sm font-mono">
                {codeTemplate}
              </code>
            </pre>

          </div>

        </section>


        <div className="grid lg:grid-cols-2 gap-8">


          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <div className="flex items-center gap-3 mb-5">
              <Terminal className="text-green-400" />
              <h2 className="text-xl font-semibold">Reading Input</h2>
            </div>

            <p className="text-slate-400 leading-7 mb-6">
              The platform automatically provides input during execution.
              Read all values using <code className="text-white">cin</code>.
              Never ask the user to enter input manually.
            </p>

            <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">

              <p className="text-green-400 font-medium mb-3">✔ Correct</p>

              <pre className="text-sm text-slate-300 overflow-x-auto">
                    {`int n;
                    cin >> n;

                    vector<int> arr(n);

                    for(int i = 0; i < n; i++)
                        cin >> arr[i];`}
              </pre>

            </div>

            <div className="bg-slate-950 rounded-lg p-4 border border-red-900 mt-5">

              <p className="text-red-400 font-medium mb-3">✖ Incorrect</p>

              <pre className="text-sm text-slate-300 overflow-x-auto">
                        {`cout << "Enter n";
                        cin >> n;`}
              </pre>

            </div>

          </section>


          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <div className="flex items-center gap-3 mb-5">
              <Terminal className="text-yellow-400" />
              <h2 className="text-xl font-semibold">Printing Output</h2>
            </div>

            <p className="text-slate-400 leading-7 mb-6">
              Print only the required answer using
              <code className="text-white"> cout</code>.
              Do not print labels, prompts, or additional messages.
            </p>

            <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">

              <p className="text-green-400 font-medium mb-3">✔ Correct</p>

              <pre className="text-sm text-slate-300">
                    {`cout << answer;`}
              </pre>

            </div>

            <div className="bg-slate-950 rounded-lg p-4 border border-red-900 mt-5">

              <p className="text-red-400 font-medium mb-3">✖ Incorrect</p>

              <pre className="text-sm text-slate-300">
                {`cout << "Answer = " << answer;`}
              </pre>

            </div>

          </section>

        </div>


        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <TriangleAlert className="text-orange-400" />
            <h2 className="text-2xl font-semibold">
              Important Guidelines
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            <div>

              <h3 className="text-green-400 text-lg font-semibold mb-4">
                ✔ Recommended
              </h3>

              <ul className="space-y-3 text-slate-300 list-disc pl-5">

                <li>Write your logic inside the <code>main()</code> function.</li>

                <li>Include all necessary header files.</li>

                <li>Use <code>cin</code> for input.</li>

                <li>Use <code>cout</code> for output.</li>

                <li>Return <code>0</code> at the end of the program.</li>

                <li>Follow the expected input and output format carefully.</li>

              </ul>

            </div>

            <div>

              <h3 className="text-red-400 text-lg font-semibold mb-4">
                ✖ Avoid
              </h3>

              <ul className="space-y-3 text-slate-300 list-disc pl-5">

                <li>Printing messages like "Enter Number".</li>

                <li>Hardcoding input values.</li>

                <li>Printing unnecessary text.</li>

                <li>Changing the required output format.</li>

                <li>Adding extra spaces or blank lines.</li>

                <li>Ignoring edge cases.</li>

              </ul>

            </div>

          </div>

        </section>


        <div className="flex justify-between items-center border-t border-slate-800 pt-8">

          <button onClick={()=>navigate('/')} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition px-5 py-3 rounded-xl">

            <ArrowLeft size={18} />

            Back to Home

          </button>

          <p className="text-slate-500 text-sm">
            Happy Coding 🚀
          </p>

        </div>

      </div>

    </div>
  );
};

export default HelpPage;