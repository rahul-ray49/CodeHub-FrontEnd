import { 
  ArrowLeft, BookOpen, Code2, Terminal, 
  TriangleAlert, CheckCircle2, XCircle, FileWarning
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationBar2 from "./NavigationBar2";

const codeTemplate = `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}`;

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-blue-500/30">
      <NavigationBar2 />
      
      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Page Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" /> CodeHub Documentation
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Submission Guidelines
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ensure your program compiles, runs smoothly, and is evaluated correctly by the online judge by following these formatting rules.
          </p>
        </header>

        <div className="space-y-8">
          
          {/* Writing Your Solution Section */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 hover:border-slate-700 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Writing Your Solution</h2>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-8 max-w-4xl">
              Write your complete solution inside the <code className="bg-slate-800 px-2 py-1 rounded text-blue-300 text-sm">main()</code> function. 
              Begin your program with the required header file and namespace declaration. Use the following structure for every C++ submission.
            </p>

            {/* Code Editor Mockup */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#0d1117] shadow-xl shadow-black/50">
              <div className="flex items-center gap-2 border-b border-slate-700/50 px-4 py-3 bg-[#161b22]">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-3 text-xs font-mono text-slate-400">template.cpp</span>
              </div>
              <pre className="p-6 overflow-x-auto">
                <code className="text-sm font-mono leading-relaxed text-blue-300">
                  <span className="text-pink-400">#include</span> <span className="text-green-400">&lt;bits/stdc++.h&gt;</span>{'\n'}
                  <span className="text-pink-400">using namespace</span> <span className="text-amber-300">std</span>;{'\n\n'}
                  <span className="text-pink-400">int</span> <span className="text-blue-400">main</span>() {'{\n'}
                  <span className="text-slate-500">    // Write your code here</span>{'\n\n'}
                  <span className="text-pink-400">    return</span> <span className="text-purple-400">0</span>;{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </section>

          {/* I/O Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Reading Input */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                  <Terminal className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Reading Input</h2>
              </div>
              
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                The platform automatically provides input during execution. Read all values directly using <code className="text-white">cin</code>. Never ask the user to enter input manually.
              </p>

              <div className="space-y-4">
                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium mb-3 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Correct Approach
                  </div>
                  <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
{`int n;
cin >> n;
vector<int> arr(n);
for(int i = 0; i < n; i++) cin >> arr[i];`}
                  </pre>
                </div>

                <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-400 font-medium mb-3 text-sm">
                    <XCircle className="w-4 h-4" /> Incorrect Approach
                  </div>
                  <pre className="text-sm font-mono text-slate-400 overflow-x-auto">
<span className="text-red-300/50 line-through">cout &lt;&lt; "Enter n: ";</span>{'\n'}
cin &lt;&lt; n;
                  </pre>
                </div>
              </div>
            </section>

            {/* Printing Output */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-500/10 p-3 rounded-2xl border border-purple-500/20">
                  <Terminal className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Printing Output</h2>
              </div>
              
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                Print only the exact required answer using <code className="text-white">cout</code>. Do not print formatting labels, prompts, or additional text unless explicitly asked.
              </p>

              <div className="space-y-4">
                <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium mb-3 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Correct Approach
                  </div>
                  <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
{`cout << answer << endl;`}
                  </pre>
                </div>

                <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-400 font-medium mb-3 text-sm">
                    <XCircle className="w-4 h-4" /> Incorrect Approach
                  </div>
                  <pre className="text-sm font-mono text-slate-400 overflow-x-auto">
<span className="text-red-300/50 line-through">cout &lt;&lt; "The answer is: "</span> &lt;&lt; answer;
                  </pre>
                </div>
              </div>
            </section>
          </div>

          {/* Do's and Don'ts Section */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
                <TriangleAlert className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Important Guidelines</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recommended */}
              <div className="bg-slate-950/50 border border-emerald-900/30 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-6 border-b border-emerald-900/30 pb-4">
                  <CheckCircle2 className="w-5 h-5" /> Recommended Practices
                </h3>
                <ul className="space-y-4">
                  {[
                    "Write your core logic strictly inside the main() function.",
                    "Include all necessary standard header files.",
                    "Use cin and cout strictly for input and output.",
                    "Return 0 at the end of the program to signal success.",
                    "Follow the expected output format to the letter."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avoid */}
              <div className="bg-slate-950/50 border border-red-900/30 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 text-red-400 font-bold mb-6 border-b border-red-900/30 pb-4">
                  <FileWarning className="w-5 h-5" /> Strictly Avoid
                </h3>
                <ul className="space-y-4">
                  {[
                    "Printing interactive messages like 'Enter Number:'.",
                    "Hardcoding input values or test cases.",
                    "Adding extra spaces, tabs, or blank lines in output.",
                    "Ignoring edge cases or maximum constraint values.",
                    "Using platform-dependent headers (e.g., conio.h)."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-red-500 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button 
            onClick={() => navigate('/')} 
            className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            Ready to solve? Happy Coding <span className="text-lg">🚀</span>
          </div>
        </div>

      </main>
    </div>
  );
};

export default HelpPage;