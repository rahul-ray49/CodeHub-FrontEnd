

function ChatInput({handleSend,loading,setInput,input}){


    return (
        <>

                   <div
                        className="
                        border-t
                        border-slate-700
                        p-3 sm:p-4
                        "
                    >

                        <div className="flex gap-2 sm:gap-3">

                            <input
                                 onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend();
                                }
                               }}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask any coding question..."
                                className="
                                flex-1
                                bg-slate-800
                                rounded-xl
                                px-3 sm:px-4
                                py-2.5 sm:py-3
                                text-sm sm:text-base
                                outline-none
                                border
                                border-slate-700
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/20
                                transition-all
                                duration-300
                                "
                            />

                            <button
                            onClick={handleSend}
                            disabled={loading}
                            className="
                            px-4 sm:px-6
                            text-sm sm:text-base
                            font-medium
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-500
                            disabled:bg-blue-800
                            disabled:cursor-not-allowed
                            transition-all duration-300
                            "
                        >
                        {loading?"Thinking...":"Send"}
                        </button>

                        </div>

                    </div> 
        </>
    )
}
export default ChatInput;