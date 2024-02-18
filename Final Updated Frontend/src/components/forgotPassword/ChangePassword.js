import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../../redux/actions/auth';
import {CHANGE_PASSWORD_RESET_ERROR} from '../../redux/const'


const ChangePassword = ({changePassword, loading, success, error }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayError, setDisplayError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch changePassword action
    changePassword(currentPassword, newPassword);
  };
  useEffect(() => {
    
    // Reset success and error when the component is mounted
    setDisplayError(null);
   

    // Assuming your success state is boolean
    // If it's an object, you might need to dispatch a reset action
    // to clear the success state in the redux store
    // setSuccess(null); // Replace with the correct state variable
  }, []);


  useEffect(() => {
    // Set the error to be displayed
    if (error) {
      setDisplayError(error.errors && error.errors.length > 0 && error.errors[0].msg);
  
      // Clear the error after 5 seconds
      const errorTimeout = setTimeout(() => {
        error =null
        setDisplayError(null);
      }, 1000);
  
      return () => {
        setDisplayError(null); // Reset error when component is unmounted
        clearTimeout(errorTimeout);
      };
    } else {
      // Reset displayError when there is no error
      setDisplayError(null);
    }
  }, [error]);
  
  useEffect(() => {
    // Reset success after it has been displayed
    if (success) {
      const successTimeout = setTimeout(() => {
        // Reset the success state
        // Assuming your success state is boolean
        // If it's an object, you might need to dispatch a reset action
        // to clear the success state in the redux store
        // setSuccess(false); // Replace with the correct state variable
      }, 5000);

      return () => {
        clearTimeout(successTimeout);
        // Reset success when component is unmounted
        // setSuccess(null); // Replace with the correct state variable
      };
    }
  }, [success]);
 
  // Cleanup function for unmounting
  useEffect(() => {
    return () => {
      setDisplayError(null);
      // setSuccess(null); // Reset success when component is unmounted
    };
  }, []);

  // Cleanup function for resetting states on navigation
  useEffect(() => {
    setCurrentPassword('');
    setNewPassword('');
    setShowPassword(false);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="currentPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox mr-2"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-sm">Show Password</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            Change Password
          </button>
        </div>
      </form>
      {loading && <p className="text-center">Loading...</p>}
      {/* {success && <p className="text-center text-green-500">Password changed successfully!</p>} */}
      {/* {displayError && <p className="text-center text-red-500">{displayError}</p>} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  success: state.auth.success,
  error: state.auth.error,
});

const mapDispatchToProps = {
  changePassword,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
