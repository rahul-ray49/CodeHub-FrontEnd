import {ArrowLeft,Clapperboard,Info,UploadCloud,FileVideo} from "lucide-react";
import NavigationBar2 from "../../pages/NavigationBar2";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosClient from "../../utils/axiosClient";

const UploadVideoPage = () => {

    const navigate = useNavigate();

    const { problemId } = useParams();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [problemDetails, setProblemDetails] = useState(null);
    const {register,handleSubmit,setError,clearErrors,reset,formState:{errors}} = useForm();

    const fetchProblem = async () => {

            try{
                const response = await axiosClient.get(`/problem/problemById/${problemId}`);
                setProblemDetails(response?.data?.problem);
            }
            catch(err){
                console.log(err);
                alert(err?.response?.data?.message||"Something went wrong")
            }
        }
        useEffect(()=>{
            fetchProblem();
        },[]);

        const getUploadSignature = async () => {
            try {
                const response = await axiosClient.get(
                    `/video/create/${problemId}`
                );
                return response?.data;
            } catch (error) {
                console.log("SIGNATURE ERROR:", error);
                throw error;
            }

        };

        const onSubmit = async (data) => {
            if (!selectedFile) {
                 alert("Please Select a file to upload.");

                return;
            }
            try {
                setUploading(true);
                setUploadProgress(0);
                clearErrors();
                const signatureData = await getUploadSignature();
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("signature", signatureData.signature);
                formData.append("timestamp", signatureData.timestamp);
                formData.append("public_id", signatureData.public_id);
                formData.append("api_key", signatureData.api_key);
                const uploadResponse = await axios.post(
                        signatureData.upload_url,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            },
                            onUploadProgress: (progressEvent) => {

                                const progress = Math.round(
                                    (progressEvent.loaded * 100) /
                                    progressEvent.total
                                );

                                setUploadProgress(progress);

                            }
                        }
                    );
                    const cloudinaryResult = uploadResponse?.data;
                    await axiosClient.post("/video/save", {
                            problemId,
                            cloudinaryPublicId: cloudinaryResult?.public_id,
                            secureUrl: cloudinaryResult?.secure_url,
                            title: data?.title,
                            description: data?.description,
                        });
                    reset();
                    setSelectedFile(null);
                    alert('Video Uploaded Successfully');
                    navigate("/admin/video/upload");

            } catch (error) {
                console.log(error);
                alert(error?.response?.data?.message||"Some Error Occured");
            } finally {
                setUploading(false);
                setUploadProgress(0);
                clearErrors();
            }
        };

        const handleDelete = async (problemId) => {

                const confirmDelete = window.confirm(
                    "Are you sure you want to delete this video?"
                );
                if (!confirmDelete) return;
                try {
                    const response = await axiosClient.delete(
                        `/video/delete/${problemId}`
                    );
                    alert(response?.data?.message);
                    fetchProblems();
                } catch (error) {
                    console.log(error);
                    alert(
                        error?.response?.data?.message ||
                        "Failed to delete video."
                    );
                }
            };


            
    return (
        <>
        <NavigationBar2/>

        <div className="min-h-screen bg-[#0B1120] text-white">

            <main className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 py-8">

                
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
                >
                    <ArrowLeft size={18} />
                    Back to Video Management
                </button>

               
                <div className="flex items-center gap-4 mb-10">

                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

                        <Clapperboard
                            size={28}
                            className="text-blue-400"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl lg:text-4xl font-bold">

                            Upload Solution Video

                        </h1>

                        <p className="text-slate-400 mt-1">

                            Upload an official video explanation for this coding problem.

                        </p>

                    </div>

                </div>

               
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* LEFT SECTION */}

                    <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">

                        {/* Card Header */}

                        <div className="flex items-center gap-3 mb-8">

                            <Info
                                size={22}
                                className="text-blue-400"
                            />

                            <h2 className="text-xl font-semibold">

                                Video Information

                            </h2>

                        </div>

                        {/* Problem Details */}

                        <div className="space-y-6">

                            <div>

                                <label className="block text-sm text-slate-400 mb-2">

                                    Problem

                                </label>

                                <div className="bg-[#0B1120] border border-slate-700 rounded-xl p-5">

                                    <h2 className="text-xl font-semibold">

                                      #{problemDetails?.problemNumber}.{problemDetails?.title}

                                    </h2>

                                    <div className="flex flex-wrap gap-3 mt-4">

                                        <span className="px-3 py-1 rounded-full bg-slate-500/10 text-white border border-green-500/20 text-sm">

                                            {problemDetails?.difficulty}

                                        </span>

                                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm">

                                            {problemDetails?.tags}

                                        </span>

                                        <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm">

                                            Score : {problemDetails?.score}

                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Video Title */}

                            <div>

                                <label className="block text-sm text-slate-400 mb-2">

                                    Video Title

                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter video title..."
                                    {...register("title", {
                                    required: "Video title is required"
                                })}
                                className="w-full rounded-xl bg-[#0B1120] border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors?.title && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors?.title?.message}
                                    </p>
                                )}

                            </div>

                            {/* Description */}

                            <div>

                                <label className="block text-sm text-slate-400 mb-2">

                                    Description

                                </label>

                                <textarea
                                    rows={8}
                                    placeholder="Write a short description about this solution..."
                                    {...register("description", {
                                        required: "Description is required"
                                    })}
                                    className="w-full resize-none rounded-xl bg-[#0B1120] border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors?.description && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors?.description?.message}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SECTION */}

                    <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">

                        <div className="flex items-center gap-3 mb-8">

                            <UploadCloud
                                size={22}
                                className="text-blue-400"
                            />

                            <h2 className="text-xl font-semibold">

                                Upload Video

                            </h2>

                        </div>

                        {/* Upload Area */}


                        <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-blue-500 transition-all duration-300">

                            <UploadCloud
                                size={52}
                                className="mx-auto text-blue-400 mb-4"
                            />

                            <h3 className="text-xl font-semibold text-white">
                                Drag & Drop your video
                            </h3>

                            <p className="text-slate-400 mt-2">
                                or click below to browse from your device
                            </p>
                            <input
                                type="file"
                                accept="video/*"
                                disabled={uploading}
                                hidden
                                ref={fileInputRef}
                                onChange={(e) => {

                                    const file = e.target.files[0];
                                    if(!file) return;
                                    if(!file.type.startsWith("video/")){
                                    alert("Please select a valid video.");
                                    return;
                                    }
                                    if(file.size>100*1024*1024){
                                    alert("Maximum file size is 100 MB.");
                                    return;
                                    }

                                    setSelectedFile(file);

                                }}
                            />

                            <button
                                type="button"
                                disabled={uploading}
                                onClick={() => fileInputRef.current.click()}
                                className={`mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 font-medium ${uploading?"opacity-50 cursor-not-allowed":""}`}
                            >
                                Browse Video
                            </button>

                            <p className="mt-5 text-sm text-slate-500">
                                Supported Formats: MP4, MOV, WEBM
                            </p>

                            <p className="text-sm text-slate-500">
                                Maximum File Size: 100 MB
                            </p>

                        </div>

                        {/* Selected File */}

                        <div className="mt-8">

                            <h3 className="text-sm text-slate-400 mb-3">
                                Selected File
                            </h3>

                            <div className="bg-[#0B1120] border border-slate-700 rounded-xl p-5 flex items-center justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">

                                        <FileVideo
                                            size={24}
                                            className="text-blue-400"
                                        />

                                    </div>

                                    <div>

                                        <h4 className="font-medium">
                                              {selectedFile?.name || "No file selected"}
                                        </h4>

                                        <p className="text-sm text-slate-400">
                                            {selectedFile
                                            ? `${(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB`
                                            : "Select a video to upload"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Upload Progress */}
                        {
                            uploading && (

                                <div className="mt-8">
                                     <div className="flex justify-between mb-3">

                                            <span className="text-sm text-slate-400">
                                                Upload Progress
                                            </span>

                                            <span className="text-blue-400 font-medium">
                                                {uploadProgress}%
                                            </span>

                                        </div>

                                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

                                            <div
                                                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                                style={{width:`${uploadProgress}%`}}
                                            ></div>

                                        </div>
                                </div>

                            )
                        }

                        {/* Upload Tips */}

                        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">

                            <h3 className="font-semibold text-blue-300 mb-2">

                                Upload Guidelines

                            </h3>

                            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">

                                <li>Record the complete solution clearly.</li>

                                <li>Keep the explanation concise and easy to understand.</li>

                                <li>Avoid background noise.</li>

                                <li>Maximum upload size is 100 MB.</li>

                            </ul>

                        </div>

                        {/* Buttons */}

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                disabled={uploading}
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                            >
                                {uploading ? "Uploading..." : "Upload Video"}
                            </button>

                        </div>

                    </div>

                </div>
                </form>

            </main>

        </div>
        </>

    );

};

export default UploadVideoPage;