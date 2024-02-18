import React from 'react'
import InstructorNavbar from "../components/instructor/InstructorNavbar"
import UpdateMarks from '../components/instructor/UpdateMarks'
import AdminNavbar from '../components/Navbar/AdminNavbar'
import VerifiedInstructor from '../components/Admin/VerifiedInstructor'
import AdminDashboard from '../components/Admin/AdminDashboard';

const VerifiedInstructorPage = () => {
  return (
    <div>
       <AdminNavbar/>
       {/* <AdminDashboard/> */}
       <VerifiedInstructor/>
    </div>
  )
}

export default VerifiedInstructorPage