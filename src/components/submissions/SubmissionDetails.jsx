import { useParams } from "react-router-dom";
import NavigationBar2 from "../../pages/NavigationBar2";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";







function SubmissionDetails(){

    const {sid}=useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);



                const getSubmissionDetails= async () => {

                try{

                    const res = await axiosClient.get(
                        `/history/submission-history-details/${sid}`
                    );

                    if(res.data.success){
                        setSubmission(res.data.submission);
                    }

                }
                catch(err){

                    console.log(err);
                    alert(err.response?.data?.message||"couldnot fetch submission details")

                }
                finally{

                    setLoading(false);

                }

            }


            useEffect(()=>{
                if(!sid) return;

            getSubmissionDetails();


            },[sid])

















            if (loading){

                 return (
                        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">

                            <div className="flex flex-col items-center gap-4">

                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                                <p className="text-gray-400">
                                    Loading ....
                                </p>

                            </div>

                        </div>
                    );
            }


    return (
                <div className="min-h-screen bg-slate-900/80">

                    <NavigationBar2 />

                    <div className="max-w-7xl mx-auto px-6 py-8">

                        {/* Back Button */}

                        <button onClick={()=>window.history.back()}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={20} />
                            Back
                        </button>

                        {/* Heading */}

                        <h1 className="text-3xl font-bold text-white mt-8">
                            Submission Details
                        </h1>

                        {/* Information Card */}

                        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-6">

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Status
                                    </p>

                                    <p className={`font-semibold mt-1 ${submission?.status==="Accepted"?"text-green-600":"text-red-600"}`}>
                                        {submission?.status}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Language
                                    </p>

                                    <p className="text-white mt-1">
                                        {submission?.status}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Runtime
                                    </p>

                                    <p className="text-white mt-1">
                                        {submission?.runtime?submission.runtime:"--"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Memory
                                    </p>

                                    <p className="text-white mt-1">
                                         {submission?.memory?submission.memory:"--"} KB
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Passed
                                    </p>

                                    <p className="text-white mt-1">
                                        {submission?.testCasesPassed} / {submission?.testCasesTotal}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Submitted At
                                    </p>

                                    <p className="text-white mt-1">
                                     {new Date(submission?.createdAt).toLocaleString()}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Code Section */}

                        <div className="mt-8">

                            <h2 className="text-2xl font-semibold text-white mb-4">
                                Submitted Code
                            </h2>

                            <div className="rounded-xl border border-slate-700 bg-[#0d1117] overflow-auto">

                                <pre className="p-6 text-sm text-gray-300 whitespace-pre-wrap">
                                        {submission?.code}
                                </pre>

                            </div>

                        </div>

                    </div>

                </div>

            );

        }

export default SubmissionDetails;