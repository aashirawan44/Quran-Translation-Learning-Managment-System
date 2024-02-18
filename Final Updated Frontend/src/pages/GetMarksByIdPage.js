import React from 'react'
import InstructorNavbar from "../components/instructor/InstructorNavbar"
import GetMarks from '../components/instructor/GetMarks'
import GetMarksById from '../components/instructor/GetMarksById'

const GetMarksByIdPage = () => {
  return (
    <div>
       <InstructorNavbar/>
       <GetMarksById/>
    </div>
  )
}

export default GetMarksByIdPage