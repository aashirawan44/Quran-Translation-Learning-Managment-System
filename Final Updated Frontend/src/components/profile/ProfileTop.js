import React from 'react'
import Azam from "../img/Azam.jpg"
import PropTypes from 'prop-types';

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar }
    }
}) => {
    return (
        <>

            <div className='flex flex-col bg-white w-3/4 p-8 min-h-fit ml-60 items-start gap-4 drop-shadow-md rounded'>
                <div className="flex flex-col items-center space-x-4">
                    <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
                    <div className="font-medium dark:text-white">
                        <div className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-bold'>{name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2015</div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Company</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>{status} {company ? <span> at {company}</span> : null}</h2>
                </div>
                <div className='flex flex-col items-start'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Location</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>{location ? <span>{location}</span> : null}</h2>
                </div>
                <div className='flex flex-col items-start'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Website</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>{website ? (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe fa-2x" />
                        </a>
                    ) : null}</h2>
                </div>
                <div className='flex flex-col items-start'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Social</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>www.fb.com, www.insta.com</h2>
                </div>
            </div>
        </>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
  };

export default ProfileTop

