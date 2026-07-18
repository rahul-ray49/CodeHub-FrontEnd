import React , {useRef} from "react";
import {
    PlayCircle,
    FileVideo,
    Clock3,
    MonitorPlay,
    CalendarDays,
} from "lucide-react";

const formatDuration = (seconds = 0) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
        return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${mins}:${String(secs).padStart(2, "0")}`;
};

const Editorial = ({ editorialData, editorialLoading = false ,problemId }) => {

    const storageKey = `editorial-video-${problemId}`;
    const videoRef = useRef(null);

    if (editorialLoading) {
        return (
            <div className="animate-pulse space-y-5">
                <div className="aspect-video rounded-xl bg-slate-800" />
                <div className="h-8 bg-slate-800 rounded w-1/2" />
                <div className="h-5 bg-slate-800 rounded w-full" />
                <div className="h-5 bg-slate-800 rounded w-5/6" />
            </div>
        );
    }

    if (!editorialData) {
        return (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-slate-700 rounded-xl bg-slate-900/40">

                <FileVideo
                    size={60}
                    className="text-slate-600 mb-4"
                />

                <h2 className="text-xl font-semibold text-slate-300">
                    Video Solution Not Available
                </h2>

                <p className="text-slate-500 mt-2 text-center max-w-md">
                    The editorial video for this problem hasn't been uploaded yet.
                </p>

            </div>
        );
    }

    return (

        <div className="space-y-6">

            {/* Heading */}

            <div>

                <h1 className="text-2xl font-bold text-white flex items-center gap-2">

                    <PlayCircle className="text-red-500" />

                    Editorial Video

                </h1>

                <p className="text-slate-400 mt-1">

                    Watch the complete explanation and solution walkthrough.

                </p>

            </div>

            {/* Video */}

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-black shadow-xl">

                <video
                    ref={videoRef}
                    controls
                    controlsList="nodownload"
                    className="w-full aspect-video"
                    poster={editorialData?.thumbnailUrl}
                    preload="metadata"
                    onTimeUpdate={() => {
                    if(!videoRef) return;
                    localStorage.setItem(
                        storageKey,
                        videoRef.current.currentTime
                    );
                }}
                onLoadedMetadata={() => {
                     if (!videoRef.current) return;
                    const savedTime = localStorage.getItem(storageKey);

                    if (savedTime) {
                        videoRef.current.currentTime = Number(savedTime);
                    }
                }}
                onEnded={() => {
                    localStorage.removeItem(storageKey);
                }}
                >
                    <source
                        src={editorialData?.secureUrl}
                        type={`video/${editorialData?.format}`}
                    />
                </video>

            </div>

            {/* Details */}

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="text-2xl font-bold text-white">

                    {editorialData?.title || "Problem Editorial"}

                </h2>

                <p className="text-slate-400 leading-7 mt-3">

                    {editorialData?.description ||
                        "Watch this editorial video to understand the optimal solution, intuition, dry run and implementation."}

                </p>

                {/* Metadata */}

                <div className="flex flex-wrap gap-3 mt-6">

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800">

                        <Clock3 size={16} />

                        <span className="text-sm">

                            {formatDuration(editorialData?.duration)}

                        </span>

                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800">

                        <MonitorPlay size={16} />

                        <span className="text-sm uppercase">

                            {editorialData?.format}

                        </span>

                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800">

                        <CalendarDays size={16} />

                        <span className="text-sm">

                            {new Date(editorialData?.createdAt).toLocaleDateString()}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Editorial;