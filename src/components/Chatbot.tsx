"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sprout, Info } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello! I'm the HY-ARIA Assistant. I see your 3-layer aeroponic prototype is ready. How can I help you optimize your leafy greens today?" }
    ]);
    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input;
        const newMessages = [...messages, { role: "user", text: userMsg }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const apiMessages = newMessages.map(m => ({
                role: m.role === "bot" ? "assistant" : "user",
                content: m.text
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages })
            });

            if (!res.ok) throw new Error("API Error");

            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
        } catch (error: any) {
            setMessages(prev => [...prev, { role: "bot", text: error.message || "Sorry, I'm currently unable to process your request." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center text-white cursor-pointer"
            >
                <MessageCircle size={32} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-28 right-8 z-[100] w-[400px] h-[600px] glass rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="p-6 bg-primary flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <Bot />
                                <div>
                                    <div className="font-bold text-sm leading-none">Agri-Bot AI</div>
                                    <div className="text-[10px] opacity-80 uppercase tracking-widest mt-1 font-bold">HY-ARIA Specialist</div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-grow p-6 overflow-y-auto space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white/5 border border-white/10 text-white'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] p-4 rounded-2xl text-sm bg-white/5 border border-white/10 text-white flex gap-2 items-center">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75" />
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about setup, harvest, or nutrients..."
                                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all"
                                />
                                <button
                                    id="send-btn"
                                    onClick={handleSend}
                                    className="p-3 bg-primary rounded-xl text-white hover:bg-primary-dark transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                <QuickChip text="How to setup?" onClick={() => { setInput("How should I setup my plant?"); setTimeout(() => document.getElementById("send-btn")?.click(), 100); }} />
                                <QuickChip text="Harvest time?" onClick={() => { setInput("When can I harvest?"); setTimeout(() => document.getElementById("send-btn")?.click(), 100); }} />
                                <QuickChip text="Pump logic" onClick={() => { setInput("What should be my pump logic?"); setTimeout(() => document.getElementById("send-btn")?.click(), 100); }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function QuickChip({ text, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="whitespace-nowrap px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] text-text-muted hover:bg-primary/20 hover:text-primary transition-all"
        >
            {text}
        </button>
    );
}
