import ProblemHeader from "../components/problem/ProblemHeader";
import ProblemDescription from "../components/problem/ProblemDescription";
import ExampleSection from "../components/problem/ExampleSection";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import Page404 from "./Page404";
import Editor from "@monaco-editor/react";
import AcceptedResult from "../components/resultpages/AcceptedResult";
import CompilationErrorResult from "../components/resultpages/CompilationErrorResult";
import RuntimeErrorResult from "../components/resultpages/RuntimeErrorResult";
import TLEResult from "../components/resultpages/TLEResult";
import WrongAnswerResult from "../components/resultpages/WrongAnswerResult";
import CompilationErrorTestcase from "../components/testcasepages/CompilationErrorTestcase";
import RuntimeErrorTestcase from "../components/testcasepages/RuntimeErrorTestcase";
import AcceptedORWrongAnswerTestcase from "../components/testcasepages/AcceptedORWrongAnswerTestcase";
import NavigationBar2 from "./NavigationBar2";
import SubmissionHistory from "../components/submissions/SubmissionHistory";
import React from "react";
const ProblemPage = () => {
    const {problemId}=useParams();
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState(null);
    const [activeLeftTab, setActiveLeftTab] = useState("description");
    const [activeRightTab, setActiveRightTab] = useState("code");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [languageCodes, setLanguageCodes] = useState({});
    const [runResult, setRunResult] = useState(null);
    const [runLoading, setRunLoading] = useState(false);
    const [submitLoading,setSubmitLoading] = useState(false);
    const [submitResult,setSubmitResult] = useState(null);
    const [submissions,setSubmissionsData]=useState([]);
    const [submissionLoading,setSubmissionLoading]=useState(false);

    const rightTabs = ["code","testcase","result"];



    const getMonacoLanguage = (language) => {

            switch(language){

                case "c++":
                return "cpp";

                case "javascript":
                return "javascript";

                case "java":
                return "java";

                default:
                return "javascript";
                }
    }
               
  
    const activeColor="cursor-pointer px-5 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-blue-600 transition-all duration-300 ease-out";

            useEffect(() => {

                const fetchProblem = async () => {

                    try {

                        const response = await axiosClient.get(
                            `/problem/problemById/${problemId}`
                        );

                        setProblem(response.data.problem);

                    } catch(error) {

                        console.log(error);
                        alert(error?.response?.data?.message || "Error fetching problem data");

                    } finally {

                        setLoading(false);

                    }
                }

                fetchProblem();

         }, [problemId]);

           

               useEffect(() => {

                    if (!problem) return;

                    const initialCodes = {};

                    problem?.startCode?.forEach((item) => {
                        initialCodes[item.language] = item.initialCode;
                    });

                    setLanguageCodes(initialCodes);

            }, [problem]);


              useEffect(()=>{
                    if(activeLeftTab==='submissions'){
                        getSubmissions();
                    }

                },[activeLeftTab])






           
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
              







            const handleRun = async () => {

                        try {

                            setRunLoading(true);

                            const response = await axiosClient.post(
                            `/submission/run/${problemId}`,
                            {
                                code: languageCodes[selectedLanguage],
                                language: selectedLanguage
                            }
                            );

                            console.log(response.data);

                            setRunResult(response.data);
                            setActiveRightTab("testcase");

                        }
                        catch(err){

                            console.log(err);
                            alert(err?.response?.data?.message || "Internal server Error or no code has been provided");
                            setSubmitResult(null);
                            setRunResult(null);
                            setActiveRightTab("testcase");

                        }
                        finally{

                            setRunLoading(false);

                        }

                };
              
            
                const handleSubmit = async()=>{

                        try{

                            setSubmitLoading(true);

                            const response = await axiosClient.post(
                            `/submission/submit/${problemId}`,
                            {
                                code: languageCodes[selectedLanguage],
                                language: selectedLanguage
                            }
                            );

                            setSubmitResult(response.data);
                            console.log(response.data);

                            setActiveRightTab("result");

                        }
                        catch(err){

                            console.log(err);
                            alert(err?.response?.data?.message || "Internal server Error or no code has been provided");
                            setRunResult(null);
                            setSubmitResult(null);
                            setActiveRightTab("result");

                        }
                        finally{

                            setSubmitLoading(false);

                        }

                    }




                    const getStatusColor = (resultType) => {

                        switch(resultType){

                            case "Accepted":
                                return "text-green-500";

                            case "Wrong Answer":
                                return "text-red-500";

                            case "Compilation Error":
                                return "text-orange-500";

                            case "Runtime Error":
                                return "text-purple-500";

                            case "Time Limit Exceeded":
                                return "text-yellow-400";

                            default:
                                return "text-white";
                        }

                    }

                    const getStatusIcon = (resultType) => {

                            switch(resultType){

                                case "Accepted":
                                    return "✅";

                                case "Wrong Answer":
                                    return "❌";

                                case "Compilation Error":
                                    return "🟠";

                                case "Runtime Error":
                                    return "⚠️";

                                case "Time Limit Exceeded":
                                    return "⏳";

                                default:
                                    return "";
                            }

                        }



                        const getSubmissions = async () => {
                                try {
                                    setSubmissionLoading(true);

                                    const res = await axiosClient.get(`/history/submittedProblem/${problemId}`);
                                    if(!res.data.success) return;

                                    setSubmissionsData(res.data.submissions);

                                } catch (err) {
                                    console.log(err);
                                    alert(err?.response?.data?.message || 'Failed to fetch submission history.....');
                                } finally {
                                    setSubmissionLoading(false);
                                }
                            };


                            
                          


                return (

                       
                        <div className="min-h-screen pb-6 pl-6 pr-6 bg-slate-900/80">

                            <NavigationBar2/>

                            <div className="max-w-8xl mx-auto">

                            <div className="flex gap-6">

                                {/* LEFT PANEL */}
                                

                                <div className="w-1/2 space-y-6 border border-slate-700 border-2 p-4 rounded-lg">

                               

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
                                        onClick={() => {
                                            setActiveLeftTab("submissions");
                                        }}
                                        >
                                        Submissions
                                        </button>

                                    </div>

                                    {/* Content */}



                                    {activeLeftTab === "description" && (
                                           <>
                                                <ProblemHeader problem={problem} />

                                                <ProblemDescription
                                                description={problem?.description}
                                                />

                                                <ExampleSection
                                                examples={problem?.visibleTestCases}
                                                />
                                            </>
                                           )}

                                        {activeLeftTab === "solutions" && (
                                            
                                            <div className="p-2">
                                                {problem?.referenceSolution?.map((sol, index) => (
                                                    <React.Fragment key={sol?.language}>

                                                <div>
                                                    <h3 className=" inline-block px-3 py-1 mb-4 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 font-semibold text-2xl uppercase tracking-wide">
                                                    {sol?.language}</h3>

                                                    <pre>
                                                    {sol?.completeCode}
                                                    </pre>
                                                </div>
                                                <br></br>
                                                <br></br>
                                                </React.Fragment>
                                                ))}
                                               
                                            </div>
                                            
                                            )}
                                         

                                         {activeLeftTab === "editorial" && (
                                                <div>
                                                    Editorial Coming Soon
                                                </div>
                                            )}


                                            {activeLeftTab === "submissions" && (
                                                <SubmissionHistory
                                                    submissionLoading={submissionLoading}
                                                    submissions={submissions}
                                                />
                                            )}


                                    </div>





                            

                                {/* RIGHT PANEL */}

                                    <div className="w-1/2">

                                       <div className="bg-slate-900/80 border border-slate-700 rounded-xl  flex flex-col">

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

                                            <div className="text-slate-400 px-3 ">

                                                        {activeRightTab === "code" && (

                                                            <div >
                                                                <select
                                                                    value={selectedLanguage}
                                                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                                                    className="
                                                                    bg-slate-800
                                                                    border border-slate-700
                                                                    rounded-lg
                                                                    px-3 py-2
                                                                    text-slate-200
                                                                    outline-none
                                                                    "
                                                                >
                                                                    {problem?.startCode?.map((item) => (
                                                                    <option
                                                                        key={item?.language}
                                                                        value={item?.language}
                                                                    >
                                                                        {item?.language}
                                                                    </option>
                                                                    ))}
                                                                </select>

                                                                <Editor className="mt-2 p-2 rounded-2xl" height="65vh" 
                                                                language={getMonacoLanguage(selectedLanguage)} 
                                                                value={languageCodes[selectedLanguage] || ""}
                                                                onChange={(value) => {
                                                                setLanguageCodes((prev) => ({
                                                                    ...prev,
                                                                    [selectedLanguage]: value || ""
                                                                }));

                                                                }}
                                                                 theme="hc-black"
                                                                  options={{padding:{
                                                                    top:20,
                                                                    bottom:20
                                                                  }}}
                                                                    />
                                                            </div>
                                                        )}

                                                {activeRightTab === "testcase" && runResult && (


                                                        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">

                                                            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-700">

                                                                <h2 className="text-lg font-semibold text-white">
                                                                    Result
                                                                </h2>

                                                                <span className={`
                                                                    px-3 py-1 rounded-lg text-sm font-medium
                                                                    ${
                                                                        runResult.resultType==="Accepted"
                                                                        ? "bg-green-500/20 text-green-400"
                                                                        : "bg-red-500/20 text-red-400"
                                                                    }
                                                                `}>

                                                                {runResult.resultType}

                                                               </span>

                                                            </div>

                                                     


                                                        <div className="p-5">
                                                             {/* Compilation Error */}

                                                            {
                                                                 

                                                                runResult.resultType==="Compilation Error" && (

                                                                    <CompilationErrorTestcase compileOutput={runResult.compileOutput}/>

                                                                )
                                                            }

                                                              {/*Runtime Error*/}



                                                            {
                                                                runResult.resultType==="Runtime Error" && (

                                                               <RuntimeErrorTestcase runtimeOutput={runResult.runtimeOutput}/>

                                                                )
                                                            }

                                                            {/* Accepted + Wrong Answer */}


                                                            {
                                                                (runResult.resultType==="Accepted" || runResult.resultType==="Wrong Answer")&& (

                                                                <AcceptedORWrongAnswerTestcase runResult={runResult}/>

                                                                )
                                                            }

                                                        </div>
                                                                                                                        
                                                       

                                                    </div>

                                                        )}



                                                    {activeRightTab === "result" && submitResult && (

                                                       <div className="p-6 text-white">

                                                            <div>

                                                                {submitResult.resultType === "Accepted" && (
                                                                    <AcceptedResult
                                                                        passedCases={submitResult.passedCases}
                                                                        totalCases={submitResult.totalCases}
                                                                        runtime={submitResult.runtime}
                                                                        memory={submitResult.memory}
                                                                    />

                                                                )}

                                                                {submitResult.resultType === "Wrong Answer" && (
                                                                    <WrongAnswerResult 
                                                                        passedCases={submitResult.passedCases}
                                                                        totalCases={submitResult.totalCases}
                                                                        runtime={submitResult.runtime}
                                                                        memory={submitResult.memory}
                                                                        />
                                                                )}

                                                                {submitResult.resultType === "Compilation Error" && (
                                                                    <CompilationErrorResult
                                                                        passedCases={submitResult.passedCases}
                                                                        totalCases={submitResult.totalCases}
                                                                        compileOutput={submitResult.compileOutput}
                                                                    
                                                                    />
                                                                )}

                                                                {submitResult.resultType === "Runtime Error" && (
                                                                   <RuntimeErrorResult
                                                                        passedCases={submitResult.passedCases}
                                                                        totalCases={submitResult.totalCases}
                                                                        runtimeOutput={submitResult.runtimeOutput}
                                                                   />
                                                                )}

                                                                {submitResult.resultType === "Time Limit Exceeded" && (
                                                                    <TLEResult
                                                                        passedCases={submitResult.passedCases}
                                                                        totalCases={submitResult.totalCases}
                                                                    />
                                                                )}

                                                            </div>

                                                       </div>
                                                                    
                                                    )

                                                      
                                                        
                                                }

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
                                                            disabled={runLoading}
                                                            onClick={()=>handleRun()}
                                                            >
                                                            {runLoading && (
                                                                <span className="loading loading-spinner loading-xs"></span>
                                                            )}
                                                             {runLoading ? "Running..." : "Run"}
                                                            </button>

                                                         <button
                                                            onClick={handleSubmit}
                                                            disabled={submitLoading}
                                                            className="
                                                                px-4 py-2
                                                                rounded-lg
                                                                bg-green-600
                                                                text-white
                                                                font-medium
                                                                flex items-center gap-2
                                                                cursor-pointer
                                                            "
                                                            >
                                                            {submitLoading && (
                                                                <span className="loading loading-spinner loading-xs"></span>
                                                            )}

                                                            {submitLoading ? "Submitting..." : "Submit"}
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