import ProblemHeader from "../components/problem/ProblemHeader";
import ProblemDescription from "../components/problem/ProblemDescription";
import ExampleSection from "../components/problem/ExampleSection";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
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
import EmptyResult from "../components/emptyResult/EmptyResult";
import { useSelector } from "react-redux";
import SolutionWarning from "../components/solution/SolutionWarning";
import AiAnalysisPanel from "../components/AI/AiAnalysisPanel";
import { 
    FileText, BookOpen, Lightbulb, History, 
    Code2, Terminal, CheckCircle2, Sparkles, 
    Play, Send, TerminalSquare, ChevronDown,RotateCcw
} from "lucide-react";
import Editorial from "../components/editorial/Editorial";

const ProblemPage = () => {
    const user = useSelector((state) => state.auth.user);
    const userId = user._id;

    const { problemId } = useParams();
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState(null);
    const [activeLeftTab, setActiveLeftTab] = useState("description");
    const [activeRightTab, setActiveRightTab] = useState("code");
    const [selectedLanguage, setSelectedLanguage] = useState("c++");
    const [languageCodes, setLanguageCodes] = useState({});
    const [runResult, setRunResult] = useState(null);
    const [runLoading, setRunLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);
    const [submissions, setSubmissionsData] = useState([]);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [runClicked, setRunClicked] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [editorial, setEditorial] = useState(null);
    const [editorialLoading, setEditorialLoading] = useState(false);

    const getStorageKey = (userId, problemId, language) => {
        return `code-${userId}-${problemId}-${language}`;
    };

    const rightTabs = ["code", "testcase", "result"];

    const getMonacoLanguage = (language) => {
        switch (language) {
            case "c++": return "cpp";
            case "javascript": return "javascript";
            case "java": return "java";
            default: return "javascript";
        }
    };

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axiosClient.get(
                    `/problem/problemById/${problemId}`
                );
                setProblem(response?.data?.problem);
            } catch (error) {
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
            const savedCode = localStorage.getItem(
                getStorageKey(userId, problemId, item.language)
            );
            initialCodes[item.language] = savedCode || item.initialCode;
        });
        setLanguageCodes(initialCodes);
    }, [problem]);

    useEffect(() => {
        if (activeLeftTab === 'submissions') {
            getSubmissions();
        }
        else{
            if(activeLeftTab === 'editorial'){
                fetchEditorial();
            }
        }
    }, [activeLeftTab]);

    if (loading) {
        return (
            <>
            <NavigationBar2/>
            <div className="min-h-screen flex flex-col justify-center items-center bg-[#0b1120]">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-medium">Setting up workspace...</p>
            </div>
            </>
        );
    }

    if (!problem) {
        return <Page404 />;
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
            setRunClicked(true);
            setRunResult(response?.data);
            setActiveRightTab("testcase");
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Internal server Error or no code has been provided");
            setSubmitResult(null);
            setRunResult(null);
            setActiveRightTab("testcase");
        } finally {
            setRunLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitLoading(true);
            const response = await axiosClient.post(
                `/submission/submit/${problemId}`,
                {
                    code: languageCodes[selectedLanguage],
                    language: selectedLanguage
                }
            );
            setSubmitResult(response?.data);
            setSubmitClicked(true);
            setActiveRightTab("result");
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Internal server Error or no code has been provided");
            setRunResult(null);
            setSubmitResult(null);
            setActiveRightTab("result");
        } finally {
            setSubmitLoading(false);
        }
    }

    const getSubmissions = async () => {
        try {
            setSubmissionLoading(true);
            const res = await axiosClient.get(`/history/submittedProblem/${problemId}`);
            if (!res.data.success) return;
            setSubmissionsData(res?.data?.submissions);
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || 'Failed to fetch submission history.....');
        } finally {
            setSubmissionLoading(false);
        }
    };

    const handleAnalyzeBug = async () => {
        if (analysisLoading) return;
        if (!languageCodes[selectedLanguage]?.trim()) {
            alert("Please write some code before analyzing.");
            return;
        }
        try {
            setAnalysisLoading(true);
            const response = await axiosClient.post(
                `/ai/analyze/${problemId}`,
                {
                    code: languageCodes[selectedLanguage],
                    language: selectedLanguage,
                    runResult
                }
            );
            setAnalysis(response?.data?.analysis);
            setActiveRightTab("ai");
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Failed to analyze code.");
        } finally {
            setAnalysisLoading(false);
        }
    };


  const fetchEditorial = async () => {
        try {
            setEditorialLoading(true);

            const { data } = await axiosClient.get(`/problem/video/${problemId}`);

            if (data?.success) {
                setEditorial(data?.video);
            } else {
                setEditorial(null);
            }

        } catch (error) {
            console.error("Error fetching editorial:", error);
            setEditorial(null);
        } finally {
            setEditorialLoading(false);
        }
    };


    const handleReset = () => {
                if (!problem || !problem.startCode) return;
                
                const initialForLang = problem.startCode.find(
                    (item) => item.language === selectedLanguage
                );
                
                if (initialForLang) {
                    const codeToReset = initialForLang.initialCode;
                    
                    setLanguageCodes((prev) => ({
                        ...prev,
                        [selectedLanguage]: codeToReset
                    }));
                    
                    localStorage.removeItem(getStorageKey(userId, problemId, selectedLanguage));
                }
            };

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1120] text-slate-300 font-sans selection:bg-blue-500/30">
            <NavigationBar2 />

            <div className="flex-1 max-w-[1920px] w-full mx-auto p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col xl:flex-row gap-4 h-auto xl:h-[calc(100vh-100px)]">

                    {/* LEFT PANEL */}
                    <div className="w-full xl:w-1/2 flex flex-col bg-[#0f172a] border border-slate-800 rounded-2xl shadow-xl overflow-hidden h-[60vh] xl:h-full">
                        
                        {/* Left Tabs Header */}
                        <div className="flex items-center px-2 pt-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto hide-scrollbar">
                            {[
                                { id: "description", label: "Description", icon: FileText },
                                { id: "editorial", label: "Editorial", icon: BookOpen },
                                { id: "solutions", label: "Solutions", icon: Lightbulb },
                                { id: "submissions", label: "Submissions", icon: History }
                            ].map((tab) => (
                                <button
                                    key={tab?.id}
                                    onClick={() => setActiveLeftTab(tab?.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                                        activeLeftTab === tab?.id 
                                        ? "border-blue-500 text-white bg-slate-800/50 rounded-t-lg" 
                                        : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-t-lg"
                                    }`}
                                >
                                    <tab.icon size={16} className={activeLeftTab === tab?.id ? "text-blue-400" : "text-slate-500"} />
                                    {tab?.label}
                                </button>
                            ))}
                        </div>

                        {/* Left Content Area */}
                        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-5">
                            {activeLeftTab === "description" && (
                                <div className="space-y-6">
                                    <ProblemHeader problem={problem} />
                                    <ProblemDescription description={problem?.description} />
                                    <ExampleSection examples={problem?.visibleTestCases} />
                                </div>
                            )}

                            {activeLeftTab === "solutions" && (
                                !showSolution ? (
                                    <SolutionWarning onReveal={() => setShowSolution(true)} />
                                ) : (
                                    <div className="space-y-8 animate-fade-in">
                                        {problem?.referenceSolution?.map((sol) => (
                                            <div key={sol?.language} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                                                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center">
                                                    <span className="text-blue-400 font-mono text-sm font-semibold uppercase">{sol?.language}</span>
                                                </div>
                                                <div className="p-4 overflow-x-auto hide-scrollbar">
                                                    <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                                                        {sol?.completeCode}
                                                    </pre>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}

                           {activeLeftTab === "editorial" && (
                                    editorialLoading ? (
                                        <div className="flex items-center justify-center h-full text-blue-500">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : (
                                        <Editorial editorialData={editorial} editorialLoading={editorialLoading} problemId={problemId}/>
                                    )
                                )}

                            {activeLeftTab === "submissions" && (
                                <div className="overflow-x-auto">
                                    <SubmissionHistory
                                        submissionLoading={submissionLoading}
                                        submissions={submissions}
                                    />
                                </div>
                            )}
                        </div>
                    </div>


                    {/* RIGHT PANEL */}
                    <div className="w-full xl:w-1/2 flex flex-col bg-[#0f172a] border border-slate-800 rounded-2xl shadow-xl overflow-hidden h-[80vh] xl:h-full">
                        
                        {/* Right Tabs Header */}
                        <div className="flex items-center justify-between px-2 pt-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto hide-scrollbar">
                            <div className="flex gap-1">
                                {[
                                    { id: "code", label: "Code", icon: Code2 },
                                    { id: "testcase", label: "Testcases", icon: Terminal },
                                    { id: "result", label: "Result", icon: CheckCircle2 },
                                    { id: "ai", label: "AI Analysis", icon: Sparkles }
                                ].map((tab) => (
                                    <button
                                        key={tab?.id}
                                        onClick={() => setActiveRightTab(tab?.id)}
                                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                                            activeRightTab === tab?.id 
                                            ? "border-blue-500 text-white bg-slate-800/50 rounded-t-lg" 
                                            : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 rounded-t-lg"
                                        }`}
                                    >
                                        <tab.icon size={16} className={
                                            activeRightTab === tab?.id 
                                            ? (tab?.id === 'ai' ? 'text-purple-400' : 'text-blue-400') 
                                            : 'text-slate-500'
                                        } />
                                        <span className={tab?.id === 'ai' && activeRightTab === tab?.id ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 font-bold' : ''}>
                                            {tab?.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 min-h-0 flex flex-col">
                            {activeRightTab === "code" && (
                                <div className="flex flex-col h-full">
                                
                                    <div className="flex items-center bg-black border-b border-slate-800 px-4 py-2">
                                        <div className="relative">
                                            <select
                                                value={selectedLanguage}
                                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                                className="appearance-none bg-black hover:bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors"
                                            >
                                                {problem?.startCode?.map((item) => (
                                                    <option key={item?.language} value={item?.language}>
                                                        {item?.language}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Editor Container */}
                                    <div className="flex-1 relative">
                                        <Editor 
                                            height="100%"
                                            language={getMonacoLanguage(selectedLanguage)}
                                            value={languageCodes[selectedLanguage] || ""}
                                            onChange={(value) => {
                                                const updatedCode = value || "";
                                                setLanguageCodes((prev) => ({
                                                    ...prev,
                                                    [selectedLanguage]: updatedCode
                                                }));
                                                localStorage.setItem(
                                                    getStorageKey(userId, problemId, selectedLanguage),
                                                    updatedCode
                                                );
                                            }}
                                            theme="hc-black"
                                            options={{
                                                automaticLayout: true,

                                                minimap: {
                                                    enabled: false,
                                                },

                                                fontSize: 14,
                                                lineHeight: 22,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontLigatures: true,

                                                smoothScrolling: true,
                                                cursorBlinking: "smooth",
                                                cursorSmoothCaretAnimation: "on",

                                                scrollBeyondLastLine: false,

                                                padding: {
                                                    top: 18,
                                                    bottom: 18,
                                                },

                                                lineNumbers: "on",
                                                lineNumbersMinChars: 3,

                                                glyphMargin: false,
                                                folding: true,

                                                renderLineHighlight: "gutter",

                                                renderWhitespace: "selection",

                                                guides: {
                                                    indentation: false,
                                                    bracketPairs: false,
                                                    highlightActiveIndentation: false,
                                                },

                                                bracketPairColorization: {
                                                    enabled: false,
                                                },

                                                matchBrackets: "near",

                                                occurrencesHighlight: "singleFile",
                                                selectionHighlight: true,

                                                overviewRulerBorder: false,

                                                scrollbar: {
                                                    verticalScrollbarSize: 6,
                                                    horizontalScrollbarSize: 6,
                                                    useShadows: false,
                                                },

                                                roundedSelection: true,

                                                wordWrap: "off",

                                                contextmenu: true,

                                                mouseWheelZoom: true,
                                                }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Testcase Tab */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {activeRightTab === "testcase" && !runClicked && <EmptyResult />}
                                
                                {activeRightTab === "testcase" && runResult && (
                                    <div className="p-4 sm:p-5">
                                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-4">
                                            <div className="flex justify-between items-center px-5 py-3.5 border-b border-slate-800 bg-slate-900/50">
                                                <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                                    <TerminalSquare size={16} className="text-slate-500" /> Execution Result
                                                </h2>
                                                <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide border
                                                    ${runResult?.resultType === "Accepted" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}
                                                `}>
                                                    {runResult?.resultType}
                                                </span>
                                            </div>
                                            
                                            <div className="p-5">
                                                {runResult?.resultType === "Compilation Error" && (
                                                    <CompilationErrorTestcase compileOutput={runResult?.compileOutput} />
                                                )}
                                                {runResult?.resultType === "Runtime Error" && (
                                                    <RuntimeErrorTestcase runtimeOutput={runResult?.runtimeOutput} />
                                                )}
                                                {(runResult?.resultType === "Accepted" || runResult?.resultType === "Wrong Answer") && (
                                                    <AcceptedORWrongAnswerTestcase runResult={runResult} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Result Tab */}
                                {activeRightTab === "result" && !submitClicked && <EmptyResult />}
                                
                                {activeRightTab === "result" && submitResult && (
                                    <div className="p-4 sm:p-6 animate-fade-in">
                                        {submitResult?.resultType === "Accepted" && (
                                            <AcceptedResult
                                                passedCases={submitResult?.passedCases}
                                                totalCases={submitResult?.totalCases}
                                                runtime={submitResult?.runtime}
                                                memory={submitResult?.memory}
                                            />
                                        )}
                                        {submitResult?.resultType === "Wrong Answer" && (
                                            <WrongAnswerResult
                                                passedCases={submitResult?.passedCases}
                                                totalCases={submitResult?.totalCases}
                                                runtime={submitResult?.runtime}
                                                memory={submitResult?.memory}
                                            />
                                        )}
                                        {submitResult?.resultType === "Compilation Error" && (
                                            <CompilationErrorResult
                                                passedCases={submitResult?.passedCases}
                                                totalCases={submitResult?.totalCases}
                                                compileOutput={submitResult?.compileOutput}
                                            />
                                        )}
                                        {submitResult?.resultType === "Runtime Error" && (
                                            <RuntimeErrorResult
                                                passedCases={submitResult?.passedCases}
                                                totalCases={submitResult?.totalCases}
                                                runtimeOutput={submitResult?.runtimeOutput}
                                            />
                                        )}
                                        {submitResult?.resultType === "Time Limit Exceeded" && (
                                            <TLEResult
                                                passedCases={submitResult?.passedCases}
                                                totalCases={submitResult?.totalCases}
                                            />
                                        )}
                                    </div>
                                )}

                                {/* AI Analysis Tab */}
                                {activeRightTab === "ai" && (
                                    <div className="p-4 h-full">
                                        <AiAnalysisPanel
                                            analysis={analysis}
                                            loading={analysisLoading}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="bg-slate-900 border-t border-slate-800 p-3 sm:px-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                            
                            <button className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <TerminalSquare size={16} /> Console
                            </button>

                            <button 
                                onClick={handleReset}
                                className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-900/20 transition-colors flex items-center justify-center gap-2"
                            >
                               <RotateCcw size={14} /> Reset Code
                            </button>

                            <div className="flex w-full sm:w-auto gap-3">
                                <button
                                    onClick={handleAnalyzeBug}
                                    disabled={analysisLoading}
                                    className="flex-1 cursor-pointer sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md hover:shadow-purple-500/20 disabled:opacity-50"
                                >
                                    {analysisLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Sparkles size={16} />}
                                    {analysisLoading ? "Analyzing..." : "AI Analyze"}
                                </button>

                                <button
                                    onClick={handleRun}
                                    disabled={runLoading}
                                    className="flex-1 cursor-pointer sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-colors disabled:opacity-50"
                                >
                                    {runLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Play size={16} />}
                                    {runLoading ? "Running" : "Run"}
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    disabled={submitLoading}
                                    className="flex-1 cursor-pointer sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(5,150,105,0.2)] hover:shadow-[0_0_20px_rgba(5,150,105,0.4)] disabled:opacity-50"
                                >
                                    {submitLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Send size={16} />}
                                    {submitLoading ? "Submitting" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;