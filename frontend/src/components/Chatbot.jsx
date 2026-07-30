import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ sender: 'bot', text: 'Hi! How can I help you with pet adoption today?' }]);
        }
    }, [isOpen, messages.length]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        
        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/chatbot/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });
            const data = await res.json();
            
            if (!res.ok) {
                // Throw an error with the message from the backend JSON response
                throw new Error(data.message || 'Failed to get response from server.');
            }

            const botMessage = { sender: 'bot', text: data.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            // The backend sends a `message` property in its error response.
            // If the error object itself has a message, we use it.
            const message = error.message || 'Sorry, I encountered an error. Please try again.';
            const errorMessage = { sender: 'bot', text: message };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="fixed bottom-5 right-5 bg-gradient-to-r from-red-500 to-orange-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 transform transition-transform hover:scale-110"
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-5 w-80 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-in">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-t-2xl text-center">
                        <h3 className="font-bold">Pet Adoption Assistant</h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`py-2 px-4 rounded-2xl max-w-[80%] break-words ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start mb-3">
                                <div className="py-2 px-4 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                                    <div className="flex items-center space-x-1">
                                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 border-t flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Ask a question..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button onClick={handleSend} disabled={isLoading} className="bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:bg-gray-400">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;