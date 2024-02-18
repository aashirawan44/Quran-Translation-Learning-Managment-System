import React from 'react'
import InstructorNavbar from '../components/instructor/InstructorNavbar'
import Submissions from '../components/instructor/Submissions'
import Navbar from '../components/Navbar/Navbar'
import ResetPassword from '../components/forgotPassword/ResetPassword'
import CustomNavbar from '../components/Navbar/CustomNavbar'
import SharedCourseContent from '../components/courseContent/SharedCourseContent'

const SubmissionsPage = () => {
  return (
    <>
    <InstructorNavbar/>
    <SharedCourseContent/>
    </>
  )
}

export default SubmissionsPage