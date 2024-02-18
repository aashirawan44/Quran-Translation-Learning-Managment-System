import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Assignments from '../components/courses/Assignments';
import ChangePassword from '../components/forgotPassword/ChangePassword';




const ChangePasswordPage = () => {
    return ( 
        <>
        <Navbar/>
        <ChangePassword/>
        </>
     );
}
 
export default ChangePasswordPage;