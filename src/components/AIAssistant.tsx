import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  ChevronDown,
  RefreshCw,
  MoreVertical,
  Volume2
} from 'lucide-react';
import Groq from 'groq-sdk';
import { useChatStore, ChatMessage } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

// Removed dotenv usage in the frontend bundle.
// For demonstration, read the API key from available runtime sources (SSR process.env, bundler import.meta.env, or fallback).
const GROQ_API_KEY =
  (typeof (globalThis as any).process !== 'undefined' && (globalThis as any).process.env?.GROQ_API_KEY) ||
  (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_GROQ_API_KEY : undefined) ||
  'your-groq-api-key-here';

const AIAssistant = () => {
  
  const { messages, addMessage, updateMessage, isTyping, setIsTyping } = useChatStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    addMessage({ role: 'user', content: userMessage });

    setIsTyping(true);

    try {
      const groq = new Groq({
        apiKey: GROQ_API_KEY,
        dangerouslyAllowBrowser: true // Required for frontend-only demo
      });

      const assistantMsgId = addMessage({
        role: 'assistant',
        content: '',
        difficulty: 'intermediate'
      });

      const stream = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful AI tutor for LearnFlow AI. Explain concepts simply and adapt to the user's level. Also Give In short Not lenghty." },
          { role: "user", content: userMessage }
        ],
        model: "openai/gpt-oss-120b", // Updated to match user request
        stream: true,
      });

      setIsTyping(false);

      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content || "";
        if (content) {
          updateMessage(assistantMsgId, content);
        }
      }
    } catch (error) {
      console.error("Groq API Error:", error);
      setIsTyping(false);
      updateMessage(addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure your API key is configured.'
      }), '');
    }
  };

  const handleSimplify = async (messageContent: string) => {
    setInput(`Can you simplify this for me: "${messageContent}"`);
    // Wait a bit for state to update
    setTimeout(() => handleSend(), 100);
  };

  const handleReadAloud = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-[400px] bg-white border-l border-border h-screen flex flex-col shadow-premium">
      <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-text-primary">AI Tutor</h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-medium text-text-secondary uppercase">Adaptive Mode Active</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'assistant' ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary'
                }`}>
                {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-background text-text-primary rounded-tl-none border border-border shadow-sm'
                  }`}>
                  {msg.content}
                </div>
                {msg.role === 'assistant' && msg.content && (
                  <div className="mt-2 flex items-center gap-3">
                    <button 
                      onClick={() => handleSimplify(msg.content)}
                      className="flex items-center gap-1 text-[10px] font-medium text-primary hover:bg-primary/5 p-1 rounded-md transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" /> Simplify
                    </button>
                    <button 
                      onClick={() => handleReadAloud(msg.content)}
                      className="flex items-center gap-1 text-[10px] font-medium text-text-secondary hover:bg-gray-100 p-1 rounded-md transition-colors"
                    >
                      <Volume2 className="w-3 h-3" /> Read Aloud
                    </button>
                  </div>
                )}
              </div>
            </div>
            <span className="text-[10px] text-text-secondary mt-1 px-10">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-background border border-border p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-white sticky bottom-0">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask anything..."
            className="w-full bg-background border border-border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-3 bottom-3 p-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-text-secondary mt-2">
          AI generated content can contain errors. LearnFlow adapts to your style.
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
