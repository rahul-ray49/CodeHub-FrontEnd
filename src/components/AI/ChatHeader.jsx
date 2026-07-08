import { Link } from "react-router-dom";

function ChatHeader({setMessages,setInput,setLoading,messages,initialMessages}){

    function handleNewChat(){
        if (messages.length > 1) {

        const confirmChat = window.confirm(
            "Start a new chat? Your current conversation will be cleared."
        );

        if (!confirmChat) return;
    }
        setMessages(initialMessages);
        setInput("");
        setLoading(false);
    }


    return(
        <>
        <div className="mb-4 sm:mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2">
                        🤖 CodeHub AI
                    </h1>

                    <p className="text-slate-400 text-sm sm:text-base mt-1">
                        Your personal programming assistant.
                    </p>

                </div>

                <div className="flex flex-col sm:flex-row gap-2">

                    <button
                        onClick={handleNewChat}
                        className="
                        w-full
                        sm:w-auto

                        px-4
                        py-2.5

                        rounded-xl

                        bg-blue-600
                        hover:bg-blue-500

                        transition-all
                        duration-300

                        font-medium
                        "
                    >
                        + New Chat
                    </button>

                    <Link
                        to="/"
                        className="
                        w-full
                        sm:w-auto

                        px-4
                        py-2.5

                        rounded-xl

                        border
                        border-slate-700

                        bg-slate-800
                        hover:bg-slate-700

                        transition-all
                        duration-300

                        text-center
                        font-medium
                        "
                    >
                        ← Return Home
                    </Link>

                </div>

        </div>
                    
        </>
    )
}
export default ChatHeader;