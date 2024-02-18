import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEnrolledCourses } from '../../redux/actions/enrollment';
import { Nav } from 'react-bootstrap';
import { BsClipboardData, BsCardChecklist, BsCheck } from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai'

const SecondaryHeader = ({courseId}) => {
    
    useEffect(() => { 
      }, );
    
   
  return (
    
    // <Nav  style={{ marginTop:80 }} variant="tabs" className="d-flex justify-content-between align-items-center mt-10">
    //   <Nav.Item>
    //     <NavLink  to={`/courses/${courseId}/assignments`} className="nav-link d-flex flex-row align-items-center">
    //       <BsClipboardData size={40} />
    //       <div>Assignments</div>
    //     </NavLink>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <NavLink to={`/courses/${courseId}/quizzes`} className="nav-link d-flex flex-column align-items-center">
    //       <BsCardChecklist size={40} />
    //       <div>Quizzes</div>
    //     </NavLink>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <NavLink exact to={`/courses/${courseId}/content`} className="nav-link d-flex flex-column align-items-center">
    //       <BsCheck size={40} />
    //       <div>Course Content</div>
    //     </NavLink>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <NavLink exact to="/marks" className="nav-link d-flex flex-column align-items-center">
    //       <BsCheck size={40} />
    //       <div>Marks</div>
    //     </NavLink>
    //   </Nav.Item>
    // </Nav>

    <div className='flex flex-wrap justify-center'>

    <div className='flex flex-row'>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link  to={`/courses/${courseId}/assignments`} className="flex flex-row ">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Assignments</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link exact to={`/courses/${courseId}/quizzes`} className="flex flex-row">
        <AiOutlinePlus className='w-6 h-6'/>
          <div>Quizzes</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link  to={`/courses/${courseId}/content`} className="flex flex-row ">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Course Content</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link exact to={`/courses/${courseId}/markscomponent`} className="flex flex-row">
        <AiOutlinePlus className='w-6 h-6'/>
          <div>Marks Summary</div>
        </Link>
      </div>
    </div>
    </div>
    
  );
};


  
  export default SecondaryHeader;