import React from 'react'
import EnrolledStudens from '../components/instructor/EnrolledStudents';
import InstructorNavbar from "../components/instructor/InstructorNavbar";
import UserProfile from '../components/displayProfile/UserProfile';




const EnrolledStudentsPage = () => {
    return ( 
        <>
       <InstructorNavbar/>
       <UserProfile/>
        </>
     );
}
 
export default EnrolledStudentsPage;