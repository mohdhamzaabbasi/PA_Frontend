import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Import Navbar
import { jwtDecode } from 'jwt-decode';


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("*******");
      console.log(token);
      const response = await axios.post('http://localhost:5000/api/conversations',{token});
      if (response.status === 200) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Get conversations error:', error.message);
    }
  };

  const handleConversationClick = async (convId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/conversations/${convId}`);
      if (response.status === 200) {
        setMessages(response.data.messages || []);
        setConversationId(convId);
      }
    } catch (error) {
      console.error('Error loading conversation:', error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {

      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/chat', {
        message,
        conversationId,
        token
      });

      if (response.status === 200) {
        const botReply = response.data.reply;
        const updatedConversationId = response.data.conversationId;

        const newMessages = [
          ...messages,
          { sender: 'user', text: message, timestamp: new Date() },
          { sender: 'bot', text: botReply, timestamp: new Date() },
        ];

        setMessages(newMessages);
        setConversationId(updatedConversationId);
        setMessage('');
        fetchConversations();
      }
    } catch (error) {
      console.error('Chat error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar onNewChat={() => {
  setMessages([]);
  setConversationId('');
}} />


      {/* Main Chat Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 border-r p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Past Conversations</h2>
            <div className="space-y-2">
            {conversations.map((conv, idx) => (
  <button
    key={idx}
    onClick={() => handleConversationClick(conv.conversationId)}
    className="block w-full text-left p-2 bg-white rounded-lg shadow hover:bg-blue-100 transition"
  >
    {conv.createdAt ? new Date(conv.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : `Conversation ${conversations.length - idx}`}
  </button>
))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                    } w-fit max-w-[70%]`}
                  >
                    {msg.text}
                    {msg.timestamp && (
                      <div className="text-xs text-gray-200 mt-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-gray-300 text-gray-800 w-fit max-w-[70%] animate-pulse">
                    Bot is typing...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Box */}
          <div className="border-t p-4 flex space-x-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Chat;
