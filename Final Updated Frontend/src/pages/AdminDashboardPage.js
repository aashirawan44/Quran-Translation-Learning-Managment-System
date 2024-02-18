import React from 'react'
import InstructorNavbar from '../components/instructor/InstructorNavbar'
import AddQuiz from '../components/quiz/AddQuiz'
import AdminNavbar from '../components/Navbar/AdminNavbar'
import AdminDashboard from '../components/Admin/AdminDashboard'

const AdminDashboardPage = () => {
  return (
    <>
   <AdminNavbar/>
   <AdminDashboard/>
    </>
  )
}

export default AdminDashboardPage