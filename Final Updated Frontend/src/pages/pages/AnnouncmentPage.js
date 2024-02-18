import React from 'react'
import { Route } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import { useParams } from 'react-router-dom';
// import CourseAnnouncements from '../components/courses/CourseAnnouncements';
import SecondaryHeader from '../components/courses/SecondaryHeader';
import CourseUserAnnouncements from '../components/courses/CourseUserAnnouncements';



const AnnouncementPage = ( ) => {
    const {courseid} = useParams();
    return ( 
        <>
        <Navbar/>
        <SecondaryHeader courseId={courseid}/> 
        <CourseUserAnnouncements/>
        
        </>
     );
}
 
export default AnnouncementPage;