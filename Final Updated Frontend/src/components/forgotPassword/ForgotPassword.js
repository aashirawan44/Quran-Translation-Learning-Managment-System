// components/ForgotPassword.js

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../redux/actions/auth';
import { setAlert } from '../../redux/actions/alert';

const ForgotPassword = ({ forgotPassword, setAlert }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setAlert('Email is required', 'danger');
      return;
    }

    forgotPassword(email);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">User Forget Password</h2> {/* Updated heading */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Reset Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  forgotPassword,
  setAlert,
};

export default connect(null, mapDispatchToProps)(ForgotPassword);

