import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAnnouncement, getAnnouncements ,deleteAnnouncement} from '../../redux/actions/announcement';
import { useParams } from 'react-router-dom';
import Button from '../button/Button';
import CourseAnnouncements from './CourseAnnouncements';

const AddAnnouncements = ({ announcements, addAnnouncement, getAnnouncements }) => {
  const { courseid } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [localAnnouncements, setLocalAnnouncements] = useState([]);

  useEffect(() => {
    if (courseid) {
      getAnnouncements(courseid);
    }
  }, [getAnnouncements, courseid]);

  useEffect(() => {
    // Update localAnnouncements when announcements prop changes
    setLocalAnnouncements(announcements);
  }, [announcements]);

  const onSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(courseid, { title, body });
    setTitle('');
    setBody('');

    // Optionally fetch announcements again after submitting a new one
    getAnnouncements(courseid);

  };

  return (
    <div className='flex justify-center p-4'>
    <div className="flex flex-col w-full">
      <div className='flex justify-center flex-col w-full'>
        <h1 className="font-sans leading-4 tracking-wider md:text-2xl text-xl text-[#111827] font-bold">Add Announcements</h1>
        <p className="font-sans md:text-lg text-sm text-[#111827] font-semibold">
          <i className="fas fa-user" /> Welcome to Course Community
        </p>
      </div>

      <div className='flex justify-center my-4'>
        <form
          className='flex flex-col w-full md:w-1/2 drop-shadow-md gap-2'
          onSubmit={onSubmit}
        >
          <textarea
            className='flex bg-gray-50 md:text-md text-sm min-h-full drop-shadow-md p-2'
            name='body'
            placeholder='Announce Something to your class'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <Button type='submit' value='Submit' name='Submit' />
        </form>
      </div>

      <CourseAnnouncements announcements={localAnnouncements} />
    </div>
  </div>
  );
};

AddAnnouncements.propTypes = {
  addAnnouncement: PropTypes.func.isRequired,
  getAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  announcements: state.announcement.announcements,
});

export default connect(mapStateToProps, { addAnnouncement, getAnnouncements })(AddAnnouncements);
