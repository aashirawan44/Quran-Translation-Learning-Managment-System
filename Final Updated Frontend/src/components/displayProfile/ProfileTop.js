import React from 'react';
import Azam from '../img/Azam.jpg';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile }) => {
  // Check if the profile object is defined
  if (!profile) {
    return null; // Return null or another fallback UI element if profile is undefined
  }

  // Use optional chaining to safely access properties
  const {
    country,
    bio,
    address,
    contact,
    userName,
    date,
    user: { profilepicture } = {}, // Provide a default empty object for user if it's undefined
  } = profile;

  // Check if required properties are defined
  if (!country || !bio || !address || !contact || !userName) {
    return null; // Return null or another fallback UI element if any required property is missing
  }
  const formattedDate = new Date(date).toLocaleDateString();
 

  return (
    <div className='flex flex-col p-8 gap-4 rounded border bg-zinc-200 m-4'>
      <div className='flex flex-row items-center space-x-8'>
        {profilepicture ? (
          <img
            className='w-28 h-28 rounded-full'
            src={profilepicture}
            alt=''
          />
        ) : (
          <img
            className='w-28 h-28 rounded-full'
            src={Azam} // Provide a default image source if profilepicture is undefined
            alt=''
          />
        )}
        <div className='font-medium dark:text-white'>
          <div className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-bold'>
            {userName}
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
          Profile Created on: {formattedDate}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-sans text-sm text-gray-600 text-start'>Country</h2>
        <h2 className='font-sans leading-2 text-start tracking-wide text-md font-bold text-[#111827]'>
          {country}
        </h2>
      </div>
      <div className='flex flex-col items-start'>
        <h2 className='font-sans text-sm text-gray-600 text-start'>Bio</h2>
        <h2 className='font-sans leading-2 text-start tracking-wide text-md font-bold text-[#111827]'>
          {bio}
        </h2>
      </div>
      <div className='flex flex-col items-start'>
        <h2 className='font-sans text-sm text-gray-600 text-start'>Address</h2>
        <h2 className='font-sans leading-2 text-start tracking-wide text-md font-bold text-[#111827]'>
          {address}
        </h2>
      </div>
      <div className='flex flex-col items-start'>
        <h2 className='font-sans text-sm text-gray-600 text-start'>Contact</h2>
        <h2 className='font-sans leading-2 text-start tracking-wide text-md font-bold text-[#111827]'>
          {contact}
        </h2>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object,
};

export default ProfileTop;
