import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import UploadCoursecontent from '../components/instructor/UploadCoursecontent'
import InstructorNavbar from '../components/instructor/InstructorNavbar';
import SearchByWord from '../components/Quransearch/SearchByWord';

const AddCourseContentPage = () => {
  return (
    <div>
        <InstructorNavbar/>
        {/* <SearchByWord/> */}
        <UploadCoursecontent/>
    </div>
  )
}

export default AddCourseContentPage