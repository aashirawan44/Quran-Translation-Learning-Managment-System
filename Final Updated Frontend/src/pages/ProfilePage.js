import React from 'react'
import InstructorNavbar from '../components/instructor/InstructorNavbar'
import Profile from '../components/displayProfile/Profile'
import CustomNavbar from '../components/Navbar/CustomNavbar'

const ProfilePage = () => {
  return (
    <div>
        <CustomNavbar/>
        <Profile/>
    </div>
  )
}

export default ProfilePage