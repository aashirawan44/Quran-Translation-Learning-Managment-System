import React from 'react'
import { Route } from 'react-router-dom';
// import Navbar from "../components/layout/Navbar";
import { useParams } from 'react-router-dom';
import CourseAnnouncements from '../components/courses/CourseAnnouncements';
import AddAnnouncements from '../components/courses/AddAnnouncements';
import InstructorNavbar from '../components/instructor/InstructorNavbar';
// import SecondaryHeader from '../components/courses/SecondaryHeader';
import InstructorSecondaryHeader from '../components/instructor/InstructorSecondaryHeader';



const InstructorAnnouncementPage = () => {
    const {courseid} = useParams();
    
    return ( 
        <div>

        <InstructorNavbar/>
        <InstructorSecondaryHeader courseId={courseid}/>
        
        <AddAnnouncements/>
        {/* <CourseAnnouncements /> */}
        
        </div>
        
     );
}
 
export default InstructorAnnouncementPage;