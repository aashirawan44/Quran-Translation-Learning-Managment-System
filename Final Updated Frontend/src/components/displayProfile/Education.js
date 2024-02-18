import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteInstructorEducation } from '../../redux/actions/profile';
import formatDate from '../../redux/utils/formatDate';
import {RiDeleteBinLine} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai'

const Education = ({ education, deleteInstructorEducation }) => {
  if (!education) {
    return "Loading"; // or display a loading indicator
  }
  const educations = education.map((edu) => (
    <tr key={edu._id}>
     <div className='flex flex-row mt-6'>
      <div className='flex flex-col gap-8 items-start'>

        <h1 className='font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold'>Education</h1>
        <div className='flex flex-col'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Scool</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{edu.school}</h2>
            <p>
                {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
            </p>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Degree</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{edu.degree}</h2>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Study Field</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{edu.fieldofstudy}</h2>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Description</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{edu.description}</h2>
        </div>
        
      </div>
        
    </div>
 
        
      
    </tr>
  ));

  return (
  
<div className='flex flex-col w-full m-4 overflow-auto'>

    <Fragment>
      {/* <h2 className="my-2">Education Credentials</h2> */}
      <table className="table">
        <tbody>{educations}</tbody>
      </table>
      <div>
        
        </div>
    </Fragment>
</div>
 
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteInstructorEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteInstructorEducation })(Education);
