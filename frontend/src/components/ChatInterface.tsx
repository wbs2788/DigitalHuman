"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Mic, Volume2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatInterfaceProps {
    onSpeak: (text: string) => void;
}

export default function ChatInterface({ onSpeak }: ChatInterfaceProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello User. I am your Digital Human Assistant. How can I help?" }
    ]);
    const [loading, setLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Need to convert message history to format expected by backend
            const history = messages.map(m => ({ role: m.role, content: m.content }));

            const response = await axios.post('/api/chat', {
                message: userMsg.content,
                history: history
            });

            const aiMsg: Message = { role: 'assistant', content: response.data.response };
            setMessages(prev => [...prev, aiMsg]);

            // Trigger TTS
            onSpeak(aiMsg.content);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "System connection error." }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-4">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                            ? 'bg-blue-600/80 text-white rounded-br-none'
                            : 'bg-white/90 text-slate-800 rounded-bl-none shadow-lg'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/50 text-slate-800 p-3 rounded-2xl rounded-bl-none animate-pulse">
                            Processing...
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <div className="flex gap-2">
                <input
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Message Agent..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full transition disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
