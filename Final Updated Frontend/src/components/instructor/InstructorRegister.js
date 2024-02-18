import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alert';
import { registerInstructor } from '../../redux/actions/auth';
import Navbar from '../../components/Navbar/Navbar';
import PropTypes from 'prop-types';

const InstructorRegister = ({ setAlert, registerInstructor, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { firstName,lastName, email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

  const onSubmit = async (e) => {
    e.preventDefault();
   
    registerInstructor({ firstName,lastName, email, password });
    
  };

  if (isAuthenticated) {
     return <Navigate to="/instructordashboard" />;
   }

  return (
    <>
       <Navbar/>
       <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
         <div>
          <a href="/">
             <h3 className="text-4xl font-bold text-[#00A86B]">
               Quran LMS
             </h3>
             <h2 className="text-1xl font-bold text-[#black]">
               Instructor Registration
             </h2>
           </a>
         </div>
         <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
           <form onSubmit={onSubmit}>
             <div>
               <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                First Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Last Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
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
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#00A86B] rounded-md hover:bg-[#00b371] focus:outline-none focus:bg-[#00b371]">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link to="/instructorlogin" className="text-[#00A86B] hover:underline">
                Log in
              </Link>
            </span>
          </div>
         
        </div>
      </div>
    </>
  );
};

InstructorRegister.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerInstructor: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registerInstructor })(InstructorRegister);
