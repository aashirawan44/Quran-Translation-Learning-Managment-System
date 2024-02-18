import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profile';
import formatDate from '../../redux/utils/formatDate';
import {AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom';

import {RiDeleteBinLine} from 'react-icons/ri'

const Experience = ({ experience, deleteExperience }) => {
  if (!experience) {
    return "Loading"; // or display a loading indicator
  }
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <div className='flex flex-row mt-6'>
      <div className='flex flex-col gap-8 items-start'>
        <h1 className='font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold'>Experience</h1>
        <div className='flex flex-col'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Company</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{exp.company}</h2>
            <p>
                {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
            </p>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Company</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{exp.title}</h2>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Job Location</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>
            {exp.location}
            </h2>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Description</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{exp.description}</h2>
        </div>
        </div>
        <div>
       
          </div>
    </div>
       
      
    </tr>
  ));

  return (
    <div className='flex flex-col w-full h-1/2 overflow-auto m-4 scrollbar-w-4'>

    <Fragment>
      {/* <h2 className="my-2">Experience Credentials</h2> */}
    
    
        <tbody>{experiences}</tbody>
        <div>
        </div>
     
    </Fragment>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
