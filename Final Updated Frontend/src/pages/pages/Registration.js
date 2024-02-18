import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../redux/actions/alert';
import { register } from '../redux/actions/auth';
import Navbar from '../components/Navbar/Navbar';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
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
    }

  const onSubmit = async (e) => {
    e.preventDefault();
   
      register({ firstName,lastName, email, password });
    
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
       <Navbar />
       <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
         <div>
          <a href="/">
             <h3 className="text-4xl font-bold text-[#00A86B]">
               Quran LMS
             </h3>
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
            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#00A86B] rounded-md hover:bg-[#00b371] focus:outline-none focus:bg-[#00b371]">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link to="/Login" className="text-[#00A86B] hover:underline">
                Log in
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { signupRequest } from "../redux/actions/userAction";
// import Navbar from "../components/Navbar/Navbar";

// function Registration({ signupUser }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = (e) => {
//     e.preventDefault();

//     const userData = {
//       firstName,
//       lastName,
//       email,
//       password,
//     };

//     // Dispatch the signup request action
//     signupUser(userData);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
//         <div>
//           <a href="/">
//             <h3 className="text-4xl font-bold text-[#00A86B]">
//               Quran LMS
//             </h3>
//           </a>
//         </div>
//         <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
//           <form onSubmit={handleSignup}>
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 First Name
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 Last Name
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 />
//               </div>
//             </div>
//             <div className="mt-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 Email
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   type="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 />
//               </div>
//             </div>
//             <div className="mt-4">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 Password
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   type="password"
//                   name="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center mt-4">
//               <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#00A86B] rounded-md hover:bg-[#00b371] focus:outline-none focus:bg-[#00b371]">
//                 Register
//               </button>
//             </div>
//           </form>
//           <div className="mt-4 text-grey-600">
//             Already have an account?{" "}
//             <span>
//               <Link to="/Login" className="text-[#00A86B] hover:underline">
//                 Log in
//               </Link>
//             </span>
//           </div>
//           <div className="flex items-center w-full my-4">
//             <hr className="w-full" />
//             <p className="px-3 ">OR</p>
//             <hr className="w-full" />
//           </div>
//           <div className="my-6 space-y-2">
//             <button
//               aria-label="Login with Google"
//               type="button"
//               className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 32 32"
//                 className="w-5 h-5 fill-current"
//               >
//                 <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
//               </svg>
//               <p>Login with Google</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Map the dispatch function to props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     signupUser: (userData) => dispatch(signupRequest(userData)),
//   };
// };

// export default connect(null, mapDispatchToProps)(Registration);
