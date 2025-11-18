
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { chatMessages } from '../data/mockData';
import type { ChatMessage } from '../types';
import { PaperAirplaneIcon } from '../components/icons';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      senderId: 0, // 0 is the current user (Coach)
      senderName: 'Coach',
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMsg.text,
        config: {
          systemInstruction: 'Anda adalah Asisten Pelatih Bola Voli yang berpengalaman, cerdas, dan suportif. Tugas Anda adalah membantu Pelatih Utama dengan strategi permainan, ide latihan (drills), analisis performa, dan motivasi tim. Berikan jawaban yang ringkas, praktis, dan dalam Bahasa Indonesia yang natural.',
        },
      });

      if (response.text) {
        const aiMsg: ChatMessage = {
          id: Date.now() + 1,
          senderId: 99,
          senderName: 'Asisten AI',
          text: response.text,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMsg: ChatMessage = {
          id: Date.now() + 1,
          senderId: 99,
          senderName: 'System',
          text: "Maaf, terjadi kesalahan saat menghubungi asisten AI. Silakan coba lagi.",
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Obrolan Tim & AI</h2>
        <p className="text-gray-400">Diskusi strategi dengan Tim dan Asisten AI</p>
      </div>

      <div className="flex-grow overflow-y-auto space-y-4 pb-28 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.senderId === 0 ? 'justify-end' : 'justify-start'}`}
          >
            {msg.senderId !== 0 && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${msg.senderId === 99 ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-indigo-400'}`}>
                {msg.senderId === 99 ? 'AI' : msg.senderName.charAt(0)}
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.senderId === 0
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.senderId !== 0 && <p className="text-xs font-bold text-indigo-300 mb-1">{msg.senderName}</p>}
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.senderId === 0 ? 'text-indigo-200' : 'text-gray-500'} text-right`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
             <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-sm text-indigo-400 flex-shrink-0">
                    AI
                </div>
                <div className="bg-slate-700 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                     <p className="text-xs font-bold text-indigo-300 mb-1">Asisten AI</p>
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="fixed bottom-[57px] left-0 right-0 max-w-md mx-auto bg-slate-800 p-3 border-t border-slate-700 flex items-center space-x-2"
        aria-label="Message Input Form"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={isLoading ? "Sedang berpikir..." : "Tanya strategi, latihan, atau chat tim..."}
          disabled={isLoading}
          className="flex-grow bg-slate-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Message Input"
        />
        <button
          type="submit"
          disabled={isLoading || newMessage.trim() === ''}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold p-3 rounded-full shadow-lg transition-colors flex-shrink-0"
          aria-label="Send Message"
        >
          <PaperAirplaneIcon className="h-5 w-5 -mt-px" />
        </button>
      </form>
    </div>
  );
};

export default ChatView;
