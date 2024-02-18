import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profile';
import ProfileTop from '../profile/ProfileTop';
import DashboardTop from './DashboardTop';
import ProfileAbout from '../profile/ProfileAbout';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className="flex flex-col w-full">
      <p className="font-sans leading-2 tracking-wide text-xl text-[#111827] font-bold m-4">
        Welcome {user && user.firstName}
      </p>
      {profile !== null ? (
        <>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='w-full lg:flex lg:flex-row lg:justify-center lg:w-3/4 gap-4'>
              <div className='flex flex-col w-full lg:w-1/2 border rounded-md drop-shadow-md'>
                <DashboardTop profile={profile} />
                <ProfileAbout profile={profile} />
              </div>
              <div className='flex flex-col w-full lg:w-1/2 border rounded-md'>
                <Education education={profile.education} />
                <Experience experience={profile.experience} />
              </div>
            </div>

            {/* <div className="flex flex-col items-start gap-4 justify-center border-2 w-full lg:w-3/4 mb-4">
              <h3 className='px-4 mt-2 font-sans leading-2 tracking-wide text-xl text-[#111827] font-bold'>Delete this account</h3>
              <div className='w-11/12 ml-12 h-px bg-[#00A86B]'></div>
              <h4 className='px-4 mt-2 font-sans text-xl text-[#111827] font-bold'>Are you sure you want to delete this account?</h4>
              <button className="flex justify-center items-center p-4 ml-4 mb-2 bg-[#00cc81] text-white rounded" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus" /> Yes, delete my account
              </button>
            </div> */}
          </div>
        </>
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

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
