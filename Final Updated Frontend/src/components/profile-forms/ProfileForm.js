import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/actions/profile';
import Button from '../button/Button';
import AvatarEditor from 'react-avatar-editor';
import Azam from "../img/Azam.jpg"
import {CgProfile} from "react-icons/cg";

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
  country: '',
  bio: '',
  address: '',
  contact: '',
  profilepicture: '',
  userName: '',
  email: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState(initialState);
  const [fileInput, setFileInput] = useState(null); // State for file input
  const [editedImage, setEditedImage] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);


  const creatingProfile = useMatch('/create-profile');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      // for (const key in profile.social) {
      //   if (key in profileData) profileData[key] = profile.social[key];
      // }
      // the skills may be an array from our API response
      // if (Array.isArray(profileData.skills))
      //   profileData.skills = profileData.skills.join(', ');
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    country,
    bio,
    address,
    contact,
    profilepicture,
    userName,
    email
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileInput(file);
  };

  // const handleFormSubmit = (e) => {
  //   // console.log("Clicked")
  //   const editing = profile ? true : false;
  //   e.preventDefault();
  //   createProfile(formData, editing).then(() => {
  //     if (!editing) navigate('/dashboard');
  //   });
  // };

  const handleFormSubmit = (e) => {
    const editing = profile ? true : false;
    e.preventDefault();

    // Create a new FormData object to include the file
    const formDataWithFile = new FormData();

    // Append the other fields to the FormData object
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }

    // Append the selected file to the FormData object
    formDataWithFile.append('profilepicture', fileInput);

    createProfile(formDataWithFile, editing).then(() => {
      if (!editing) navigate('/dashboard');
    });
  };




  // Function to handle image editing
  const handleImageEdit = () => {
    if (fileInput) {
      const reader = new FileReader();
      reader.onload = () => {
        // Use the FileReader to display the selected image in the editor
        setEditedImage(reader.result);

        setIsEditingImage((prevState) => !prevState);
      };
      reader.readAsDataURL(fileInput);
    }
  };

  // const onSubmit = (e) => {
  //   const editing = profile ? true : false;
  //   e.preventDefault();
  //   createProfile(formData, editing).then(() => {
  //     if (!editing) navigate('/dashboard');
  //   });
  // };



  return (
    <>
    <div className="relative">

      <div className='flex items-center justify-center'>

        <section className="flex flex-col items-center justify-center gap-2 w-full mt-2">
          <div className='flex flex-col w-1/2 mt-2'>

            <h1 className="font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold">
              {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
            </h1>
            <p className="font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-semibold">
              <i className="fas fa-user" />
              {creatingProfile
                ? ` Let's get some information to make your Profile`
                : ' Add some changes to your profile'}
            </p>
            {/* <small className=''>* = required field</small> */}
          </div>
          <div className="flex flex-row gap-4 w-full justify-center mt-4">
            <div className='flex flex-col items-center p-8 w-1/6 bg-[#eefbf5] rounded shadow'>

              <label className='flex cursor-pointer'>
                {fileInput ? (
                  <img className="w-28 h-28 rounded-full" src={URL.createObjectURL(fileInput)} alt="" />
                  
                  ) : (
                    <CgProfile className="w-28 h-28 rounded-full"/>
                    
                    )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                  />

              </label>

              <h2 className='p-2'>{userName}</h2>
              <h4 className='text-sm text-gray-400'>{email}</h4>


              {/* {fileInput && (
                <button onClick={handleImageEdit}>
                  {isEditingImage ? 'Cancel Edit' : 'Edit Image'}
                </button>
                )}
                {editedImage && (
                  <AvatarEditor
                  image={editedImage}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  />
                )} */}
            </div>
            <form className="form flex flex-col items-start gap-4 w-1/3 shadow p-4 rounded">

              <div className="flex flex-col w-full gap-2">
                <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Country</h3>
                <input
                  className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={onChange}
                  />
                <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Address</h3>
                <input
                  className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={onChange}
                />
                <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Contact</h3>
                <input
                  className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                  type="text"
                  placeholder="Contact"
                  name="contact"
                  value={contact}
                  onChange={onChange}
                  />

                <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Description</h3>
                <textarea
                  className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={bio}
                  onChange={onChange}
                  />
                <small className="font-sans text-start tracking-wide text-sm text-[#111827] font-md">Tell us a little about yourself</small>

              </div>


            </form>
          </div>
        </section>



      </div>
      <div className='flex flex-row sticky bottom-0 border justify-between shadow-md transform origin-top h-20 mt-16 p-6'>

        <Link className="" to="/dashboard">
          <Button name='Previous' />
        </Link>
        <button type="button" onClick={handleFormSubmit}>

          <Button name='Submit' />

        </button>
        {/* </div> */}
      </div>

                  </div>

    </>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
