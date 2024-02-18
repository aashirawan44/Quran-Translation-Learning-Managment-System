import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import { getProfileById } from '../../redux/actions/profile';

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import Button from '../button/Button';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
    const { id } = useParams();
    useEffect(() => {
      getProfileById(id);
     
    }, [getProfileById, id]);

    return (

        <div className='flex flex-col h-full w-[1200] pt-6 sm:pt-0 bg-gray-50'>
           {profile === null ? (
            <>
             <p>You have not yet setup a profile, please add some info</p>
             <Link to="/create-profile" className="btn btn-primary my-1">
               <Button>Create Profile</Button>
             </Link>
            </>
             ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
            <div className='mt-6 items-start'>
                <h2 className='font-sans leading-4 text-start tracking-wider ml-60 text-2xl text-[#111827] font-bold'>
                    Profile
                </h2>
            </div>
            <div className='flex flex-row flex-wrap grid grid-cols-2 mr-48 mt-6 h-full gap-2'>
                <div>
                <ProfileTop profile={profile} />
            
                </div>
                <div>
                <ProfileAbout profile={profile} />
                </div>
                <div>
                {profile.education.length > 0 ? (
                  <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                    key={education._id}
                    education={education}
                    />
                    ))}
                    </Fragment>
                    ) : (
                <h4>No education credentials</h4>
              )}
                </div>
                <div>
                {profile.experience.length > 0 ? (
                  <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                      />
                      ))}
                      </Fragment>
                      ) : (
                        <h4>No experience credentials</h4>
                      )}
                </div>
            </div>
            </Fragment>
            )}
        </div>
          
    )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);