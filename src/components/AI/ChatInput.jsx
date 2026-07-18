import { Send, Loader2 } from "lucide-react";

function ChatInput({ handleSend, loading, setInput, input }) {
    return (
        <div className="border-t border-slate-700/50 p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="flex gap-3 max-w-4xl mx-auto">
                <input
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) {
                            handleSend();
                        }
                    }}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a technical question..."
                    disabled={loading}
                    className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-500 disabled:opacity-50"
                />
                
                <button
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    className="flex items-center justify-center px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </button>
            </div>
            <p className="text-[10px] sm:text-xs text-center text-slate-500 mt-3">
                CodeHub AI may provide inaccurate information. Verify critical code snippets.
            </p>
        </div>
    );
}

export default ChatInput;