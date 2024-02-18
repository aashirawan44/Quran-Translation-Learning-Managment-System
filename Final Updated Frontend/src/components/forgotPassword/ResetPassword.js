// components/ResetPassword.js

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { verifyResetLink, setNewPassword } from '../../redux/actions/auth';
import { setAlert } from '../../redux/actions/alert';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const ResetPassword = ({ verifyResetLink, setNewPassword, setAlert }) => {
  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const verifyLink = async () => {
      try {
        await verifyResetLink(id, token);
        setIsVerified(true);
      } catch (error) {
        setIsVerified(false);
        // Handle error if needed
      }
    };

    verifyLink();
  }, [id, token, verifyResetLink]);

  const handleSetNewPassword = async () => {
    if (!isVerified) {
      return setAlert('Link not verified', 'danger');
    }

    if (!password.trim()) {
      setAlert('Password is required', 'danger');
      return;
    }

    try {
      await setNewPassword(id, token, password);
      setAlert('Password Changed', 'success');
      navigate('/login'); // Navigate to the login page
    } catch (error) {
      setAlert('Password Not Changed', 'danger');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">
            {isVerified ? 'Change Password' : 'Reset Password'}
          </h2>

          {!isVerified && (
            <button
              onClick={handleSetNewPassword}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline"
            >
              Verify Reset Link
            </button>
          )}

          {isVerified && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-500 mt-2 cursor-pointer focus:outline-none"
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
          )}

          {isVerified && (
            <button
              onClick={handleSetNewPassword}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Set New Password
            </button>
          )}

          {!isVerified && <p>Not Verified</p>}
          {isVerified && <p>Verified</p>}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  verifyResetLink,
  setNewPassword,
  setAlert,
};

export default connect(null, mapDispatchToProps)(ResetPassword);
