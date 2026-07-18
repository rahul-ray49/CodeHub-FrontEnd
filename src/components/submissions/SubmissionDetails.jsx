import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
    ArrowLeft, Code2, Clock, Database, CheckCircle2, 
    XCircle, AlertCircle, Hash, Calendar, FileCode
} from "lucide-react";
import axiosClient from "../../utils/axiosClient";
import NavigationBar2 from "../../pages/NavigationBar2";

function SubmissionDetails() {
    const { sid } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSubmissionDetails = async () => {
        try {
            const res = await axiosClient.get(`/history/submission-history-details/${sid}`);
            if (res.data.success) setSubmission(res.data.submission);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (sid) getSubmissionDetails(); }, [sid]);

    const getStatusUI = (status) => {
        const baseClass = "px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit";
        switch (status) {
            case "Accepted": return <span className={`${baseClass} text-emerald-400 bg-emerald-500/10 border-emerald-500/20`}><CheckCircle2 size={14} /> Accepted</span>;
            case "Wrong Answer": return <span className={`${baseClass} text-red-400 bg-red-500/10 border-red-500/20`}><XCircle size={14} /> Wrong Answer</span>;
            case "Runtime Error": return <span className={`${baseClass} text-amber-400 bg-amber-500/10 border-amber-500/20`}><AlertCircle size={14} /> Runtime Error</span>;
            default: return <span className={`${baseClass} text-slate-400 bg-slate-800 border-slate-700`}>{status}</span>;
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0b1120] flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-200">
            <NavigationBar2 />
            <div className="max-w-5xl mx-auto px-6 py-10">
                
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-8">
                    <ArrowLeft size={16} /> Back to History
                </button>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Submission Result</h1>
                        <p className="text-slate-500 text-sm">Review your code performance and execution details.</p>
                    </div>
                    {getStatusUI(submission?.status)}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Runtime", value: `${Number(submission?.runtime ?? 0).toFixed(3) ?? 0}ms`, icon: Clock },
                        { label: "Memory", value: `${submission?.memory || 0}KB`, icon: Database },
                        { label: "Test Cases", value: `${submission?.testCasesPassed}/${submission?.testCasesTotal}`, icon: Hash },
                        { label: "Language", value: submission?.language?.toUpperCase(), icon: FileCode }
                    ].map((m, i) => (
                        <div key={i} className="bg-[#0f172a] border border-slate-800 p-4 rounded-2xl">
                            <div className="flex items-center gap-2 text-slate-500 mb-2">
                                <m.icon size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
                            </div>
                            <div className="text-lg font-semibold text-white">{m.value}</div>
                        </div>
                    ))}
                </div>

                {/* Code Block */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                    <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <Code2 size={16} className="text-blue-500" /> Source Code
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono">{new Date(submission?.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="text-sm font-mono text-slate-300 leading-7">
                            <code>{submission?.code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmissionDetails;