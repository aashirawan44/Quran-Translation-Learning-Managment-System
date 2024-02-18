import React from 'react'
import InstructorNavbar from "../components/instructor/InstructorNavbar"
import InstructorCoursecontentlist from '../components/courseContent/InstructorCoursecontentlist'
import InstructorChangePassword from '../components/forgotPassword/InstructorChangePassword'

const InstructorChangePasswordPage = () => {
  return (
    <>
    <InstructorNavbar/>
    <InstructorChangePassword/>
    </>

  )
}

export default InstructorChangePasswordPage