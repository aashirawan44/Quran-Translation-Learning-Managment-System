import React from 'react'
// import AddCourse from '../components/Instructor/AddCourse';
// import Navbar from '../components/layout/Navbar';
// import Assignments from '../components/courses/Assignments';
import InstructorNavbar from '../components/instructor/InstructorNavbar';
// import InstructorSecondaryHeader from '../components/Instructor/InstructorSecondaryHeader';
import InstructorAssignments from '../components/instructor/InstructorAssignments';




const InstructorAssignmentsPage = () => {

    return ( 
        <>
        <InstructorNavbar/>
        
        <InstructorAssignments/>
        
        </>
     );
}
 
export default InstructorAssignmentsPage;