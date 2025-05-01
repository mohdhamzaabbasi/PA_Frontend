import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', documents: [] });
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);

const response = await axios.get('http://localhost:5000/api/profile', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});


      if (response.status === 200) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error('Profile Fetch error:', error.message);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

const formData = new FormData();
formData.append('document', selectedFile); // ONLY document here




    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const response = await axios.post(`http://localhost:5000/api/upload-documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setMessage('Document uploaded successfully!');
        fetchProfile(); // Refresh user info after upload
      }
    } catch (error) {
      console.error('Upload error:', error.message);
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Your Profile</h2>

        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {userInfo.name}</p>
          <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Uploaded Documents</h3>
          {userInfo.documents.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {userInfo.documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents uploaded yet.</p>
          )}
        </div>

        {message && (
          <div className="text-green-600 text-center">{message}</div>
        )}

        <form onSubmit={handleUpload} className="flex flex-col space-y-4 mt-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 bg-gray-50"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Upload New Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
