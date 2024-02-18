import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addAnnouncementComment,deleteComment } from '../../redux/actions/announcement';
import { getAnnouncements } from '../../redux/actions/announcement'
import { RiSendPlane2Fill } from 'react-icons/ri'
import Azam from '../img/Azam.jpg'

const CourseAnnouncementsComment = ({ announcementId, addAnnouncementComment,profilePicture,deleteComment,getAnnouncements,announcements }) => {
  const [body, setBody] = useState('');
  console.log(announcements)
  const { courseid } = useParams();

  return (
    <div className='w-full'>
      <form
        className='flex justify-center gap-4 mt-4'
        onSubmit={e => {
          e.preventDefault();
          // console.log("Form Submitted");
          addAnnouncementComment(announcementId, { body }).then(() => {
            // After successfully adding the comment, fetch announcements again to update the state
            getAnnouncements(courseid);
            // Reset the comment input field
            setBody('');
          });

          // window.location.reload();
        }}
      >
        <img className="w-8 h-8 rounded-full self-center" src={profilePicture} alt="" />
        <div className='flex flex-row justify-center border rounded-full w-3/4 px-4'>
        <textarea
        className='outline-none mt-4 text-sm'
        name='text'
        placeholder='Add Class Comment...'
        cols='100'
        value={body}
        onChange={e => setBody(e.target.value)}
        required
        />
        </div>
        <button type='submit'>
          <RiSendPlane2Fill className='w-8 h-8 p-2 rounded bg-[#00A86B] text-white' />
        </button>
        
      </form>
    </div>
  );
};

CourseAnnouncementsComment.propTypes = {
  addAnnouncementComment: PropTypes.func.isRequired,
  getAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired,
  
};

const mapStateToProps = (state) => ({
  
  profilePicture: state.profile.profile?.user?.profilepicture,
  announcements: state.announcement.announcements,
});

export default connect(
  mapStateToProps,
  { addAnnouncementComment,getAnnouncements }
)(CourseAnnouncementsComment);
