import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onNewChat }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate('/')}
      >
        DocAI
      </div>

      <div className="flex space-x-6">
        <button
          onClick={onNewChat}
          className="text-gray-700 hover:text-blue-600 font-semibold"
        >
          New Chat
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="text-gray-700 hover:text-blue-600 font-semibold"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
