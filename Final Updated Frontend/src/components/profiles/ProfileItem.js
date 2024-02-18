import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../button/Button';

const ProfileItem = ({ profile }) => {
  // Check if profile is null or undefined
  if (!profile || !profile.user) {
    return null; // or render a loading state, an error message, etc.
  }

  const {
    user: { _id, firstName },
    profilepicture,
    status,
    company,
    location,
    skills
  } = profile;

  return (
    <>
      <div className='flex w-11/12 px-[15px] bg-gray-100 py-[15px] items-center drop-shadow-lg gap-20 mx-auto mt-4'>
        <img src={profilepicture} alt='' className='w-10 h-10 rounded-full' />
        <div className='flex flex-col items-start gap-2'>
          <h2 className='font-sans leading-4 text-start tracking-wider text-xl text-[#111827] font-bold'>{firstName}</h2>
          <p className='font-sans leading-2 text-start tracking-wider text-md text-gray-600 font-semibold'>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='font-sans leading-2 text-start tracking-wider text-md text-[#111827] font-semibold'>{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`}>
            <Button name="View Profile" />
          </Link>
        </div>

        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='bg-[#DEF7EC] rounded-md p-2 text-[#03543f] mt-2 w-28'>
              <i className='fas fa-check' /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object,
};

export default ProfileItem;
