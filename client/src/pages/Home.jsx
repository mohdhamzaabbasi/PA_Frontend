import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center flex-1 text-center bg-gradient-to-b from-blue-600 to-blue-400 text-white p-8">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to DocAI</h1>
        <p className="text-xl mb-6">Your personal AI assistant for understanding any document.</p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
          >
            Try Demo
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-16 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">What Can DocAI Do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Upload Documents</h3>
            <p className="text-gray-600">Upload insurance papers, loan documents, agreements, or any file you want DocAI to read.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Ask Anything</h3>
            <p className="text-gray-600">Confused about terms? Need a summary? Just ask — DocAI will find answers from your documents instantly.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Save Conversations</h3>
            <p className="text-gray-600">All your chats are saved — revisit any time to continue your smart conversation journey.</p>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="py-16 bg-blue-50 px-8 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
          <div className="max-w-xs">
            <div className="text-4xl font-extrabold text-blue-600 mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Upload Your Document</h3>
            <p className="text-gray-600">Sign up and upload your files securely.</p>
          </div>
          <div className="max-w-xs">
            <div className="text-4xl font-extrabold text-blue-600 mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Ask Your Questions</h3>
            <p className="text-gray-600">Chat with DocAI and get instant answers based on your documents.</p>
          </div>
          <div className="max-w-xs">
            <div className="text-4xl font-extrabold text-blue-600 mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Save and Revisit</h3>
            <p className="text-gray-600">Your conversations and uploaded files stay saved for your future use.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500">
        © {new Date().getFullYear()} DocAI. All rights reserved.
      </footer>
      
    </div>
  );
};

export default Home;
