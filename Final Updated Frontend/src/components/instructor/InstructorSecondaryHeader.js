import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {AiOutlinePlus} from 'react-icons/ai'

// import { Nav } from 'react-bootstrap';
import { BsClipboardData, BsCardChecklist, BsCheck } from 'react-icons/bs';

const InstructorSecondaryHeader = ({courseId}) => {
    
    useEffect(() => { 
      }, );
    
   
  return (
    
    <div className='flex justify-center'>

    <div className='flex flex-wrap justify-center w-3/4'>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link  to={`/courses/${courseId}/instructorcourseassignments`} className="flex flex-row gap-2">
         <AiOutlinePlus className='w-6 h-6'/>
          <div className=''>Add New Assignment</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link exact to={`/courses/${courseId}/instructorquizzes`} className="flex flex-row">
        <AiOutlinePlus className='w-6 h-6'/>
          <div>Quizzes</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link exact to={`/courses/${courseId}/addquiz`} className="flex flex-row gap-2">
        <AiOutlinePlus className='w-6 h-6'/>
          <div>Add New Quizz</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        {/* <Link  to={`/courses/${courseId}/UploadCourseContent`} className="flex flex-row gap-2 ">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Add Course Content</div>
        </Link> */}

        <Link  to={`/courses/${courseId}/instructorcontent`} className="flex flex-row gap-2 ">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Course Content</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
      
        <Link  to={`/courses/${courseId}/enrolledstudents`} className="flex flex-row gap-2 ">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Enrolled Students</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link exact to={`/courses/${courseId}/addmarks`} className="flex flex-row gap-2">
        <AiOutlinePlus className='w-6 h-6'/>
          <div>Add Marks</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link exact to={`/courses/${courseId}/getmarks`} className="flex flex-row gap-2">
        {/* <AiOutlinePlus className='w-6 h-6'/> */}
          <div>Marks Summary</div>
        </Link>
      </div>
    </div>
    </div>
    
  );
};


  
  export default InstructorSecondaryHeader;