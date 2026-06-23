import ProblemHeader from "../components/problem/ProblemHeader";
import ProblemDescription from "../components/problem/ProblemDescription";
import ExampleSection from "../components/problem/ExampleSection";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import Page404 from "./Page404";

const ProblemPage = () => {
    const {problemId}=useParams();
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState(null);
    const [activeLeftTab, setActiveLeftTab] = useState("description");
    const [activeRightTab, setActiveRightTab] = useState("code");

    const rightTabs = ["code","testcase","result"];
               
  
    const activeColor="cursor-pointer px-5 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-blue-600 transition-all duration-300 ease-out";

            useEffect(() => {

                const fetchProblem = async () => {

                    try {

                        const response = await axiosClient.get(
                            `/problem/problemById/${problemId}`
                        );

                        console.log(response.data);

                        setProblem(response.data);

                    } catch(error) {

                        console.log(error);

                    } finally {

                        setLoading(false);

                    }
                }

                fetchProblem();

         }, [problemId]);






           
               if (loading) {
                return (
                    <div className="min-h-screen flex justify-center items-center bg-slate-900/80">
                    <span className="loading loading-spinner loading-lg"></span>
                    </div>
                     );
           }

 
            
              if (!problem) {
                return (
                    <Page404></Page404>
                );
            }





                return (
                        <div className="min-h-screen p-6 bg-slate-900/80">

                            <div className="max-w-8xl mx-auto">

                            <div className="flex gap-6">

                                {/* LEFT PANEL */}
                                

                                <div className="w-1/2 space-y-6 border border-slate-800 p-4 rounded-lg">

                               

                                    {/* Tabs */}

                                    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-3 flex justify-between gap-2 mb-4">

                                        <button  className={`cursor-pointer ${activeLeftTab==="description"&&(activeColor)}`}
                                        onClick={() => setActiveLeftTab("description")}
                                        >
                                        Description
                                        </button>

                                        <button  className={`cursor-pointer ${activeLeftTab==="editorial"&&(activeColor)}`}
                                        onClick={() => setActiveLeftTab("editorial")}
                                        >
                                        Editorial
                                        </button>

                                        <button   className={`cursor-pointer ${activeLeftTab==="solutions"&&(activeColor)}`}
                                        onClick={() => setActiveLeftTab("solutions")}
                                        >
                                        Solutions
                                        </button>

                                        <button   className={`cursor-pointer ${activeLeftTab==="submissions"&&(activeColor)}`}
                                        onClick={() => setActiveLeftTab("submissions")}
                                        >
                                        Submissions
                                        </button>

                                    </div>

                                    {/* Content */}



                                    {activeLeftTab === "description" && (
                                           <>
                                                <ProblemHeader problem={problem} />

                                                <ProblemDescription
                                                description={problem.description}
                                                />

                                                <ExampleSection
                                                examples={problem.visibleTestCases}
                                                />
                                            </>
                                           )}

                                        {activeLeftTab === "solutions" && (
                                            
                                            <div className="p-2">
                                                {problem.referenceSolution.map((sol, index) => (
                                                    <>

                                                <div key={index}>
                                                    <h3 className=" inline-block px-3 py-1 mb-4 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 font-semibold text-2xl uppercase tracking-wide">
                                                    {sol.language}</h3>

                                                    <pre>
                                                    {sol.completeCode}
                                                    </pre>
                                                </div>
                                                <br></br>
                                                <br></br>
                                                </>
                                                ))}
                                               
                                            </div>
                                            
                                            )}
                                         

                                         {activeLeftTab === "editorial" && (
                                                <div>
                                                    Editorial Coming Soon
                                                </div>
                                            )}


                                            {activeLeftTab === "submissions" && (
                                                <div>
                                                    No Submissions Yet
                                                </div>
                                            )}


                                    </div>





                            

                                {/* RIGHT PANEL */}

                                    <div className="w-1/2">

                                        <div className="bg-slate-900/80 border border-slate-700 rounded-xl h-[80vh] flex flex-col">

                                            {/* Top Tabs */}

                                             

                                                {/* Buttons */}
                                                 <div className="bg-slate-900/80 border border-slate-700 rounded-xl py-3 px-5 flex justify-between  mb-4">

                                                        <button  className={`cursor-pointer ${activeRightTab==="code"&&(activeColor)}`}
                                                        onClick={() => setActiveRightTab("code")}
                                                        >
                                                        Code{"</>"}
                                                        </button>

                                                        <button  className={`cursor-pointer ${activeRightTab==="testcase"&&(activeColor)}`}
                                                        onClick={() => setActiveRightTab("testcase")}
                                                        >
                                                        TestCase
                                                        </button>

                                                        <button   className={`cursor-pointer ${activeRightTab==="result"&&(activeColor)}`}
                                                        onClick={() => setActiveRightTab("result")}
                                                        >
                                                        Result
                                                        </button>
                                               </div>


                                             

                                            {/* Content Area */}

                                        <div className="flex-1">

                                            <div className="flex-1 flex justify-center items-center text-slate-400">

                                                        {activeRightTab === "code" && (
                                                            <p>Monaco Editor Coming Soon 🚀</p>
                                                        )}

                                                        {activeRightTab === "testcase" && (
                                                            <p>Run your code to test it</p>
                                                        )}

                                                        {activeRightTab === "result" && (
                                                            <p>Submit your solution to see result</p>
                                                        )}

                                            </div>

                                         </div>

                                            {/* Bottom Action Bar */}

                                            <div className="border-t border-slate-700 p-4">

                                                <div className="border-t border-slate-700 p-4 flex justify-between">

                                                        <button
                                                        className=" px-4 py-2 rounded-lg bg-slate-800 text-slate-300 cursor-pointer "
                                                        >
                                                        Console
                                                        </button>

                                                         <div className="flex gap-3">

                                                            <button
                                                            className="
                                                            px-4 py-2
                                                            rounded-lg
                                                            bg-slate-800
                                                            text-slate-200
                                                            cursor-pointer
                                                            "
                                                            >
                                                            Run
                                                            </button>

                                                            <button
                                                            className="
                                                            px-4 py-2
                                                            rounded-lg
                                                            bg-blue-600
                                                            text-white
                                                            cursor-pointer
                                                            "
                                                            >
                                                            Submit
                                                            </button>

                                                        </div>

                                                    </div>
                                               
                                            </div>

                                        </div>

                                    </div>

                              </div>

                            </div>

                        </div>
                        
                );
};

export default ProblemPage;