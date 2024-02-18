import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../redux/actions/profile';
import Navbar from '../Navbar/Navbar';
import InstructorNavbar from '../instructor/InstructorNavbar';
import CustomNavbar from '../Navbar/CustomNavbar';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  

  return (
    <>
    <CustomNavbar/>
    {/* <Navbar/> */}
    <section className="flex flex-col justify-center mt-4 items-center ">
      <div>
        
      </div>
      {loading ? (
          <Spinner />
          ) : (
              <Fragment>
          <h1 className="font-sans leading-4 text-start tracking-wider ml-60 text-4xl text-[#111827] font-bold mr-[17.0rem]">Instructor</h1>
          <p className="font-sans leading-4 text-start tracking-wider ml-60 text-xl text-[#111827] font-semibold mt-6 mr-[17.0rem]">
            <i className="fab fa-connectdevelop" />  
              Instructors Profiles
          </p>
          <div className="flex flex-col bg-white w-3/4 p-8 min-h-fit mt-4 items-start gap-8 drop-shadow-md rounded">
            {profiles.length > 0 ? (
                profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                    ))
                    ) : (
                        <h4>No profiles found...</h4>
                        )}
          </div>
        </Fragment>
      )}
    </section>
      </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
