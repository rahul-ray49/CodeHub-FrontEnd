import { useState, useEffect, useRef } from "react";
import axiosClient from "../utils/axiosClient";
import ChatHeader from "../components/AI/ChatHeader";
import ChatInput from "../components/AI/ChatInput";
import { Lightbulb, Atom, Bug, Rocket } from "lucide-react";
import {Bot} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import NavigationBar2 from "./NavigationBar2";
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
        { icon: <Lightbulb className="text-amber-400 w-6 h-6" />, text: "Explain Binary Search" },
        { icon: <Atom className="text-blue-400 w-6 h-6" />, text: "Explain React Hooks" },
        { icon: <Bug className="text-emerald-400 w-6 h-6" />, text: "Debug my C++ code" },
        { icon: <Rocket className="text-rose-400 w-6 h-6" />, text: "Teach me Dynamic Programming" }
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
                                text: response?.data?.reply
                            }
                        ]
                    };

                    setMessages(prev => [...prev, aiMessage]);

                }
                catch (error) {

                    console.log(error);
                    alert(error?.response?.data?.message||"Some Problem Occured")

                }
                finally {

                    setLoading(false);

                }
        };
       








       return (
        <>
            <NavigationBar2 />
            <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    <ChatHeader setLoading={setLoading} setMessages={setMessages} initialMessages={initialMessages} setInput={setInput} messages={messages} />

                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl h-[75vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                            {messages?.length === 1 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="p-4 bg-blue-500/10 rounded-full">
                                        <Bot className="w-16 h-16 text-blue-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                            Welcome to CodeHub AI
                                        </h2>
                                        <p className="text-slate-400 mt-2 max-w-md">Your intelligent partner for coding challenges, debugging, and tech interviews.</p>
                                    </div>
                                    {/* ... your suggestion buttons ... */}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {messages?.map((message, index) => (
                                        <div key={index} className={`flex ${message?.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-[15px] leading-relaxed shadow-sm ${
                                                message?.role === "user" 
                                                ? "bg-blue-600 text-white rounded-tr-sm" 
                                                : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm"
                                            }`}>
                                                {/* Use ReactMarkdown here for code blocks */}
                                                <ReactMarkdown>
                                                    {message?.parts?.[0]?.text}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="flex justify-start">
                                            <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                                                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                                                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-900 border-t border-slate-800">
                            <ChatInput loading={loading} handleSend={handleSend} setInput={setInput} input={input} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
          
}

export default AiAssistant;