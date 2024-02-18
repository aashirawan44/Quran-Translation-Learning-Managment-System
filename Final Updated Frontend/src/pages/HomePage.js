import React from 'react'

import Header from '../components/Header/Header'

import InstructorNavbar from '../components/instructor/InstructorNavbar'
import Card from '../components/Cards/Card'
import InstructorCard from '../components/Cards/InstructorCard'

const Home = () => {
  return (
    <div>
        <InstructorNavbar/>
        <Header/>
        <InstructorCard/>
    </div>
  )
}

export default Home