import React from 'react'
import EnrolledStudens from '../components/instructor/EnrolledStudents';
import InstructorNavbar from "../components/instructor/InstructorNavbar";




const EnrolledStudentsPage = () => {
    return ( 
        <>
       <InstructorNavbar/>
       <EnrolledStudens/>
        </>
     );
}
 
export default EnrolledStudentsPage;