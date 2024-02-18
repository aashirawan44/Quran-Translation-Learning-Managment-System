
import React, { Fragment, useEffect } from 'react';
import './navbar.css'
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';
import { getCurrentProfileUser } from '../../redux/actions/profile';
import { fetchUnreadNotificationCount, fetchNotifications, markNotificationAsRead } from "../../redux/actions/notification"
import { AiFillBell } from 'react-icons/ai';

import { Link, useLocation } from "react-router-dom"
import Azam from "../img/Azam.jpg"
import a from "../img/WhatsApp Image 2023-08-01 at 06.50.49.jpeg"
// import CustomButton from '../CustomButton/CustomButton'

const AdminNavbar = ({auth: { isAuthenticated }, logout,}) => {

    useEffect(() => {
       
    }, );

    // console.log(notification.notification.data);
    const [notificationsVisible, setNotificationsVisible] = useState(false);


    // console.log(profile.profile.user._id);
    

   

    




    const [toggle, setToggle] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };
    const location = useLocation();
    const authLinks = (
        <div className='bg-white'>
            <div className='max-w-[1240px] px-[15px] py-[15px] items-center flex justify-between mx-auto'>
                <div className='flex items-center gap-10'>
                    {toggle ?
                        <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                        :
                        <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                    }
                    <div className='text-3xl font-bold text-[#00A86B]'>
                       ADMIN Panel of Quran LMS
                        {/* <img className="w-28 h-28" src={a} alt="" onClick={toggleDropdown} /> */}
                    </div>
                    
                    {/* Responsive menu */}

                    <ui className={` duration-300 md:hidden fixed text-start bg-black z-40 text-white top-[70px] w-full h-screen list-none 
           ${toggle ? 'left-[-100%]' : 'left-[0]'}`}>
                        
                       
                        {/* <Link to="/profiles"><li>Users</li></Link> */}
                    </ui>
                </div>

                <div className="relative flex flex-col items-center space-x-4">
                    <div className="w-full flex relative">
                       

                        {/* Notification display component */}
                      
                    </div>
                </div>


                <div className="flex flex-col items-center space-x-4">
                <span className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center border border-gray-500" onClick={toggleDropdown}>
    A
  </span>


                    <div className="font-medium dark:text-white">
                        {/* Add content for the profile page */}
                    </div>
                    {isDropdownVisible && (
                        <div className="absolute bg-white rounded-md shadow-lg z-10 mt-10">
                            {/* Add your buttons here */}
                           
                            
    
                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-40" onClick={logout}>LogOut</button>
                        </div>
                    )}
                </div>



            </div>
        </div>
    );

    const guestLinks = (
        <div className='bg-white'>
            <div className='max-w-[1240px] px-[15px] py-[15px] items-center flex justify-between mx-auto'>
                <div className='flex items-center gap-10'>
                    {toggle ?
                        <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                        :
                        <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-black text-2xl md:hidden block' />
                    }
                    <div className='text-3xl font-bold text-[#00A86B]'>
                       Admin Quran LMS
                    </div>
                  

                    {/* Responsive menu */}

                    <ui className={` duration-300 md:hidden fixed text-start bg-black z-40 text-white top-[70px] w-full h-screen list-none 
           ${toggle ? 'left-[-100%]' : 'left-[0]'}`}>
                        
                    </ui>
                </div>

                

            </div>
        </div>
    );


    return (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    )
}

AdminNavbar.propTypes = {
    logout: PropTypes.func.isRequired,
  
    auth: PropTypes.object.isRequired,
    
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    
});

export default connect(mapStateToProps, { logout, })(AdminNavbar);