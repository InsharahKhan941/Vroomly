import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen, Message } from '../types';
import { MOCK_CONVERSATIONS } from '../constants';

const MessagesScreen: React.FC = () => {
    const { setScreen } = useAppContext();
    const [conversation] = useState(MOCK_CONVERSATIONS[0]);
    const [messages, setMessages] = useState<Message[]>(conversation.messages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const msg: Message = {
            id: Date.now(),
            text: newMessage,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };

    return (
        <div className="w-full h-full flex flex-col text-white">
            <header className="p-4 flex items-center border-b border-white/10">
                <button onClick={() => setScreen(Screen.DASHBOARD)} className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <img src={conversation.avatar} alt={conversation.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h1 className="text-lg font-bold">{conversation.name}</h1>
                    <p className="text-xs text-green-400">Online</p>
                </div>
            </header>

            <main className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-[#FFA8A8] text-[#3A3A69] rounded-br-none' : 'bg-white/10 text-white rounded-bl-none'}`}>
                            <p>{msg.text}</p>
                        </div>
                        <span className="text-xs text-white/50 mt-1">{msg.timestamp}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 border-t border-white/10">
                <form onSubmit={handleSend} className="flex items-center bg-[#2E2E55] rounded-full p-1">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow bg-transparent text-white px-4 py-2 focus:outline-none"
                    />
                    <button type="submit" className="bg-[#FFA8A8] rounded-full p-3 text-[#3A3A69] hover:bg-pink-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default MessagesScreen;
