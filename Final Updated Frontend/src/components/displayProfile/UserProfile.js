import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import Education from './Education';
import Experience from './Experience';
import { getUserProfileById } from '../../redux/actions/profile';

const UserProfile = ({ getUserProfileById, profileById }) => {
  const { id } = useParams();

  useEffect(() => {
    getUserProfileById(id);
  }, [getUserProfileById, id]);

  return (
    <section className="flex flex-col w-full">
      {profileById !== null ? (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className='w-full lg:flex lg:flex-row lg:justify-center lg:w-3/4 gap-4'>
            <div className='flex flex-col w-full lg:w-1/2 border rounded-md drop-shadow-md'>
              <ProfileTop profile={profileById} />
              <ProfileAbout profile={profileById} />
            </div>
            <div className='flex flex-col w-full lg:w-1/2 border rounded-md'>
              <Education education={profileById.education} />
              <Experience experience={profileById.experience} />
            </div>
          </div>

          {/* Additional sections can be added here based on your requirements */}

          {/* Example: Display skills */}
          {profileById.skills && (
            <div className="flex flex-col items-start gap-4 justify-center border-2 w-3/4 mb-4">
              <h3 className="px-4 mt-2 font-sans leading-2 tracking-wide text-xl text-[#111827] font-bold">
                Skills
              </h3>
              <ul className="list-disc list-inside">
                {profileById.skills.map((skill, index) => (
                  <li key={index} className="ml-6 text-md font-semibold text-[#111827]">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to="/create-instructorprofile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

UserProfile.propTypes = {
    getUserProfileById: PropTypes.func.isRequired,
  profileById: PropTypes.object,
};

const mapStateToProps = (state) => ({
  profileById: state.profile.profileById,
});

export default connect(mapStateToProps, { getUserProfileById })(UserProfile);
