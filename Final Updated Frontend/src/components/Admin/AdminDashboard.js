import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 px-12">
      <h1 className="text-3xl font-semibold mb-6 mt-6">Admin Panel</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          className={`bg-blue-300 p-6 rounded-lg shadow-md hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-1.05 ${
            activeTab === 'verifiedInstructors' ? 'bg-blue-400' : ''
          }`}
          onClick={() => handleTabClick('verifiedInstructors')}
        >
          <h2 className="text-xl font-semibold mb-2">Verified Instructors</h2>
          <p className="text-gray-600 text-lg">Get All Verified Instructor Delete or Block</p>
        </div>
        <div
          className={`bg-orange-300 p-6 rounded-lg shadow-md hover:bg-orange-400 transition duration-300 ease-in-out transform hover:scale-1.05 ${
            activeTab === 'unverifiedInstructors' ? 'bg-orange-400' : ''
          }`}
          onClick={() => handleTabClick('unverifiedInstructors')}
        >
          <h2 className="text-xl font-semibold mb-2">Unverified Instructors</h2>
          <p className="text-gray-600 text-lg">Delete all the Unverified Instructors Approve Request or Delete</p>
        </div>
        <div
          className={`bg-green-300 p-6 rounded-lg shadow-md hover:bg-green-400 transition duration-300 ease-in-out transform hover:scale-1.05 ${
            activeTab === 'users' ? 'bg-green-400' : ''
          }`}
          onClick={() => handleTabClick('users')}
        >
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600 text-lg">Get All the User Delete or Block</p>
        </div>
        <div
          className={`bg-purple-300 p-6 rounded-lg shadow-md hover:bg-purple-400 transition duration-300 ease-in-out transform hover:scale-1.05 ${
            activeTab === 'courses' ? 'bg-purple-400' : ''
          }`}
          onClick={() => handleTabClick('courses')}
        >
          <h2 className="text-xl font-semibold mb-2">Courses</h2>
          <p className="text-gray-600 text-lg">Get All Courses Delete </p>
        </div>

        <div
          className={`bg-yellow-300 p-6 rounded-lg shadow-md hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-1.05 ${
            activeTab === 'forums' ? 'bg-yellow-400' : ''
          }`}
          onClick={() => handleTabClick('forums')}
        >
          <h2 className="text-xl font-semibold mb-2">Forums</h2>
          <p className="text-gray-600 text-lg">Get All Forums </p>
        </div>
        <div
          className={`bg-pink-300 p-6 rounded-lg shadow-md hover:bg-pink-400 transition duration-300 ease-in-out transform hover:scale-1.05 ${
            activeTab === 'Requests' ? 'bg-pink-400' : ''
          }`}
          onClick={() => handleTabClick('Requests')}
        >
          <h2 className="text-xl font-semibold mb-2">Request</h2>
          <p className="text-gray-600 text-lg">Get All Request and Problem from Users </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
