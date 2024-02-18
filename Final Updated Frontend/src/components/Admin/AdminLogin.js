import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAdmin} from '../../redux/actions/auth';
import PropTypes from 'prop-types';
import { useState } from "react";

const AdminLogin = ({ loginAdmin, isAuthenticated }) => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { email, password } = formData;
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
  
    const onSubmit = (e) => {
      e.preventDefault();
      loginAdmin(email, password);
    };
  
    if (isAuthenticated) {
        return <Navigate to="/AdminDashboard" />;
      }

    return (
        <>
            <div>
                <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                    <div>
                        <a href="/">
                            <h3 className="text-4xl font-bold text-[#00A86B]">
                            Quran LMS
                            </h3>
                            <h2>Sign In as Admin</h2>
                        </a>
                    </div>
                    <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                        <form onSubmit={onSubmit}>

                            <div className="mt-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 undefined"
                                >
                                    Email
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        className="block w-full mt-1 p-2 bg-gray-100 outline-none rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                         <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 undefined"
        >
          Password
        </label>
        <div className="flex flex-col items-start">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={onChange}
            className="block w-full p-2 bg-gray-100 outline-none mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <div className="mt-2">
            <input
              type="checkbox"
              id="showPassword"
              onChange={toggleShowPassword}
              checked={showPassword}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show Password
            </label>
          </div>
        </div>
      </div>
                    <Link to='/'>
                            <a
                                href="#"
                                className="text-xs text-[#00A86B] hover:underline"
                            >
                                Forget Password?
                            </a>
                            </Link>
                            <div className="flex items-center mt-4">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#00A86B] rounded-md hover:bg-[#00b371] focus:outline-none focus:bg-purple-600">
                                    Login
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center w-full my-4">
                            <hr className="w-full" />
                            <p className="px-3 ">OR</p>
                            <hr className="w-full" />
                        </div>
                      
                    </div>
                </div>
            </div>
        </>
    );
}

AdminLogin.propTypes = {
    loginAdmin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { loginAdmin })(AdminLogin);