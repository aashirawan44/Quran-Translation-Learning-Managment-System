import React from 'react'
import PropTypes from 'prop-types';
import formatDate from '../../redux/utils/formatDate'

const ProfileExperience = ({
    experience: { company, title, location, current, to, from, description }
}) => (
    <div className='flex flex-col bg-white w-3/4 p-8 min-h-fit ml-28 items-start gap-10 drop-shadow-md rounded'>
        <h1 className='font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold'>Experience</h1>
        <div className='flex flex-col'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Company</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{company}</h2>
            <p>
                {formatDate(from)} - {to ? formatDate(to) : 'Now'}
            </p>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Company</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{title}</h2>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Job Location</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>
            {location}
            </h2>
        </div>
        <div className='flex flex-col items-start'>
            <h2 className='font-sans leading-2 tracking-wide text-lg font-semibold text-gray-600 text-start'>Description</h2>
            <h2 className='font-sans leading-2 text-start tracking-wide text-lg font-semibold text-[#111827]'>{description}</h2>
        </div>
    </div>
)

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
  };

export default ProfileExperience