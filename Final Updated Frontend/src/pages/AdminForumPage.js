import React from 'react'
import InstructorNavbar from '../components/instructor/InstructorNavbar'
import AddQuiz from '../components/quiz/AddQuiz'
import AdminNavbar from '../components/Navbar/AdminNavbar'
import AdminDashboard from '../components/Admin/AdminDashboard'
import Posts from "../components/posts/Posts";
import AdminPostItems from '../components/Admin/AdminPostItems'
import AdminPosts from '../components/Admin/AdminPosts'

const AdminForumPage = () => {
  return (
    <>
   <AdminNavbar/>
   <AdminPosts/>
    </>
  )
}

export default AdminForumPage