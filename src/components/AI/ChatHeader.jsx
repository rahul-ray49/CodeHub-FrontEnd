import { Link } from "react-router-dom";
import { Bot, Plus, ArrowLeft } from "lucide-react";

function ChatHeader({ setMessages, setInput, setLoading, messages, initialMessages }) {
    function handleNewChat() {
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

    return (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30">
                    <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    CodeHub AI
                </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handleNewChat}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    New Chat
                </button>
                
                <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium transition-all duration-300 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Home
                </Link>
            </div>
        </div>
    );
}

export default ChatHeader;