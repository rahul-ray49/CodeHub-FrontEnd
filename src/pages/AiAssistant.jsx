import { useState, useEffect, useRef } from "react";
import axiosClient from "../utils/axiosClient";
import ChatHeader from "../components/AI/ChatHeader";
import ChatInput from "../components/AI/ChatInput";
function AiAssistant() {

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const initialMessages = [
    {
        role: "model",
        parts: [
            {
                text: "👋 Hello! I'm CodeHub AI. Ask me anything about programming, DSA, Web Development, DBMS, OS, or coding interviews."
            }
        ]
    }
];
    const [messages, setMessages] = useState(initialMessages);
    const messagesEndRef = useRef(null);
    const suggestions = [
    {
        emoji: "💡",
        text: "Explain Binary Search"
    },
    {
        emoji: "⚛️",
        text: "Explain React Hooks"
    },
    {
        emoji: "🐞",
        text: "Debug my C++ code"
    },
    {
        emoji: "🚀",
        text: "Teach me Dynamic Programming"
    }
];

    useEffect(() => {

            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });

        }, [messages, loading]);



    const handleSend = async(prompt=input) => {

            if (!prompt.trim()) return;

            const newMessage = {
                role: "user",
                parts: [
                    {
                        text: prompt
                    }
                ]
            };
            const updatedMessages = [...messages, newMessage];

            setMessages(updatedMessages);
            setInput("");

             try {

                    setLoading(true);

                    const response = await axiosClient.post(
                        "/ai/chat",
                        {
                            contents: updatedMessages
                        }
                    );

                    const aiMessage = {
                        role: "model",
                        parts: [
                            {
                                text: response.data.reply
                            }
                        ]
                    };

                    setMessages(prev => [...prev, aiMessage]);

                }
                catch (error) {

                    console.log(error);
                    alert(error.response.data.message||"Some Problem Occured")

                }
                finally {

                    setLoading(false);

                }
        };
       








        return (
        <div className="min-h-screen bg-[#0B1120] text-white px-4 sm:px-6 lg:px-8 py-8">

            <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">

                

               <ChatHeader setLoading={setLoading} setMessages={setMessages} initialMessages={initialMessages} setInput={setInput} messages={messages}/>

           

                <div
                    className="
                    bg-slate-900/80
                    border
                    border-slate-700
                    rounded-2xl
                    h-[80vh] sm:h-[78vh] lg:h-[75vh]
                    flex
                    flex-col
                    "
                >

                 

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">

                         {
                            messages.length === 1 ? (

                                <div
                                    className="
                                    h-full
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    text-center
                                    px-2
                                    sm:px-8
                                    "
                                >

                                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-5">
                                        🤖
                                    </div>

                                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                                        Welcome to CodeHub AI
                                    </h2>

                                    <p
                                        className="
                                        text-slate-400
                                        mt-3
                                        max-w-md sm:max-w-lg lg:max-w-xl
                                        text-sm
                                        sm:text-base
                                        leading-6 sm:leading-7
                                        "
                                    >
                                        Ask doubts related to
                                        <span className="text-blue-400"> DSA</span>,
                                        <span className="text-blue-400"> Programming</span>,
                                        <span className="text-blue-400"> Web Development</span>,
                                        <span className="text-blue-400"> DBMS</span>,
                                        <span className="text-blue-400"> Operating Systems</span>
                                        and much more.
                                    </p>
                                    <div className="mt-8 w-full max-w-3xl">

                                        <h3 className="text-sm sm:text-base text-slate-400 mb-4">

                                            Try asking...

                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                            {

                                                suggestions.map((item, index) => (

                                                    <button
                                                        key={index}
                                                        onClick={() => handleSend(item.text)}
                                                        disabled={loading}
                                                        className="
                                                        w-full

                                                        rounded-2xl

                                                        border
                                                        border-slate-700

                                                        bg-slate-800

                                                        p-4

                                                        text-left

                                                        hover:border-blue-500
                                                        hover:bg-slate-700

                                                        transition-all
                                                        duration-300

                                                        disabled:opacity-60
                                                        disabled:cursor-not-allowed
                                                        "
                                                    >

                                                        <div className="flex items-center gap-3">

                                                            <span className="text-2xl">

                                                                {item.emoji}

                                                            </span>

                                                            <span className="font-medium text-sm sm:text-base">

                                                                {item.text}

                                                            </span>

                                                        </div>

                                                    </button>

                                                ))

                                            }

                                        </div>

                                    </div>

                                </div>

                            ) : (

                                <div className="space-y-4 sm:space-y-5">

                                    {
                                        messages.map((message, index) => (

                                            <div
                                                key={index}
                                                className={`flex ${
                                                    message.role === "user"
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >

                                                <div
                                                    className={`
                                                    max-w-[92%]
                                                    sm:max-w-[85%]
                                                    md:max-w-[75%]
                                                    lg:max-w-[65%]
                                                    rounded-2xl
                                                    px-3 sm:px-4 lg:px-5
                                                    py-2.5 sm:py-3
                                                    text-sm md:text-base
                                                    whitespace-pre-wrap
                                                    ${
                                                        message.role === "user"
                                                            ? "bg-blue-600"
                                                            : "bg-slate-800 border border-slate-700"
                                                    }
                                                    `}
                                                >

                                                    {message.parts[0].text}

                                                </div>

                                            </div>

                                        ))
                                    }

                                    {
                                        loading && (

                                            <div className="flex justify-start">

                                                <div
                                                    className="
                                                    max-w-[92%]
                                                    sm:max-w-[85%]
                                                    md:max-w-[75%]
                                                    lg:max-w-[65%]

                                                    rounded-2xl
                                                    bg-slate-800
                                                    border
                                                    border-slate-700

                                                    px-4
                                                    sm:px-5

                                                    py-3
                                                    "
                                                >

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex gap-1">

                                                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>

                                                            <span
                                                                className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                                                                style={{ animationDelay: "0.15s" }}
                                                            ></span>

                                                            <span
                                                                className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                                                                style={{ animationDelay: "0.3s" }}
                                                            ></span>

                                                        </div>

                                                        <p className="text-sm text-slate-300">

                                                            CodeHub AI is thinking...

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    }
                                    <div ref={messagesEndRef}></div>

                                </div>

                            )
                        }

                    </div>


                    <ChatInput loading={loading} handleSend={handleSend} setInput={setInput} input={input}/>

                </div>

            </div>

        </div>
    );
}

export default AiAssistant;