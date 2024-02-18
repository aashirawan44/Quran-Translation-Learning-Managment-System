import React from 'react'
import InstructorNavbar from "../components/instructor/InstructorNavbar"
import UpdateMarks from '../components/instructor/UpdateMarks'
import AdminNavbar from '../components/Navbar/AdminNavbar'
import VerifiedInstructor from '../components/Admin/VerifiedInstructor'
import AdminDashboard from '../components/Admin/AdminDashboard';
import UnverifiedInstructor from '../components/Admin/UnverifiedInstructor'

const UnverifiedInstructorPage = () => {
  return (
    <div>
       <AdminNavbar/>
       <UnverifiedInstructor/>
    </div>
  )
}

export default UnverifiedInstructorPage