import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAnnouncements, deleteAnnouncement,deleteComment ,updateComment } from '../../redux/actions/announcement'

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Azam from '../img/Azam.jpg'
import CommentForm from '../post/CommentForm';
import CourseAnnouncementsComment from './CourseAnnouncementsComment';
import { AiFillDelete } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import announcement from '../../redux/reducers/announcement';


// ... (other imports)

const CourseUserAnnouncements = ({
    announcements = [],
    getAnnouncements,
    deleteComment,
    updateComment,
    deleteAnnouncement,
    profile,
  }) => {
    const { courseid } = useParams();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
    const [commentDropdownState, setCommentDropdownState] = useState({});
    const [editedComment, setEditedComment] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');
  
    const handleCommentChange = (commentId, value) => {
      setEditedCommentText(value);
      setEditedComment((prev) => ({
        ...prev,
        [commentId]: value,
      }));
    };
  
    useEffect(() => {
      if (courseid) {
        getAnnouncements(courseid);
      }
    }, [getAnnouncements, courseid]);
  
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const handleUpdateComment = async (announcementId, commentId, newCommentBody) => {
      const formData = { body: newCommentBody };
  
      try {
        await updateComment(announcementId, commentId, formData);
        setEditedComment((prev) => ({
          ...prev,
          [commentId]: '',
        }));
        setEditedCommentText('');
        setEditingCommentId(null);
        getAnnouncements(courseid);
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    };
  
    const handleDropdownToggle = (commentId) => {
      setCommentDropdownState((prevState) => ({
        ...prevState,
        [commentId]: !prevState[commentId],
      }));
    };
  
    const handleAnnouncementDropdownToggle = (announcementId) => {
      setIsDropdownVisible(!isDropdownVisible);
      setSelectedAnnouncementId((prev) =>
        prev === announcementId ? null : announcementId
      );
    };
  
    const handleDelete = async (announcementId, commentId) => {
      await deleteComment(announcementId, commentId);
      setCommentDropdownState((prevState) => ({
        ...prevState,
        [commentId]: false,
      }));
      getAnnouncements(courseid);
    };
  
    const handleDeleteAnnouncement = (announcementId) => {
      deleteAnnouncement(announcementId);
      getAnnouncements(courseid);
    };
  
    return (
      <>
        <div className="flex justify-center py-4">
          {announcements.length === 0 ? (
            <p>No announcements for this course.</p>
          ) : (
            <div className="row">
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="flex flex-col items-start mt-10 border-2 rounded w-[60rem] p-2"
                >
                  <div className="flex flex-col p-2 w-full border">
                    <div className="flex flex-row gap-4 items-center">
                      <img
                        className="w-10 h-10 rounded-full ml-2"
                        src={announcement.profilePicture}
                        alt=""
                      />
                      <h4 className="font-sans text-xl text-slate-700 font-semibold">
                        {announcement.firstName}
                      </h4>
                      <p className="font-sans text-xs text-slate-400 font-medium px-2 text-start">
                        {formatDate(announcement.date)}
                      </p>
                      {profile?.profile?.user?._id === announcement.author && (
                        <BiDotsVerticalRounded
                          onClick={() =>
                            handleAnnouncementDropdownToggle(announcement._id)
                          }
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                    <p className="font-sans text-xs text-slate-400 font-semibold text-start px-16">
                      Instructor
                    </p>
                    {isDropdownVisible &&
                      selectedAnnouncementId === announcement._id && (
                        <div className="absolute bg-white rounded-md shadow-lg">
                          <button
                            className="block p-2 text-gray-800 hover:bg-gray-100 w-24 "
                            onClick={() =>
                              handleDeleteAnnouncement(announcement._id)
                            }
                          >
                            Delete
                          </button>
                          <div className="block p-2 text-gray-800 hover:bg-gray-100 w-24">
                            Edit
                          </div>
                        </div>
                      )}
                    <p className="font-sans text-start p-2 text-lg text-[#111827] font-semibold">
                      {announcement.body}
                    </p>
                  </div>
                  {announcement.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex flex-col items-start mt-2 rounded w-full p-4 "
                    >
                      <div className="flex flex-row justify-between w-full border-t border-gray-200 p-4">
                        <div className="flex flex-row items-center">
                          <img
                            className="w-6 h-6 rounded-full"
                            src={comment.profilePicture}
                            alt=""
                          />
                          <p className="font-sans text-xs text-slate-400 font-medium px-2 text-start">
                            {comment.firstName}
                          </p>
                          <p className="font-sans text-xs text-slate-400 font-medium px-2 text-start">
                            {formatDate(comment.date)}
                          </p>
                        </div>
                        <div>
                          {profile?.profile?.user?._id === comment.author && (
                            <BiDotsVerticalRounded
                              onClick={() => handleDropdownToggle(comment._id)}
                              className="cursor-pointer"
                            />
                          )}
                          {commentDropdownState[comment._id] && (
                            <div
                              key={comment._id}
                              className="absolute bg-white rounded-md shadow-lg"
                            >
                              <button
                                className="block p-2 text-gray-800 hover:bg-gray-100 w-24 "
                                onClick={() =>
                                  handleDelete(announcement._id, comment._id)
                                }
                              >
                                Delete
                              </button>
                              <div
                                className="block p-2 text-gray-800 hover:bg-gray-100 w-24"
                                onClick={() => setEditingCommentId(comment._id)}
                              >
                                Edit
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {editingCommentId === comment._id ? (
  <div className="flex flex-col items-start">
    <textarea
      value={editedCommentText || comment.body}
      onChange={(e) =>
        handleCommentChange(comment._id, e.target.value)
      }
      className="w-full p-2 mb-2 border rounded "
      style={{ resize: 'none', width:'58rem' }} // Disable textarea resizing
    />
    <div className="flex justify-center">
      <button
        onClick={() =>
          handleUpdateComment(
            announcement._id,
            comment._id,
            editedCommentText
          )
        }
        className="ml-[25.0rem] block p-2 text-white bg-green-500 hover:bg-green-600 rounded w-24"
      >
        Update 
      </button>
    </div>
  </div>
) : (
  <p dangerouslySetInnerHTML={{ __html: comment.body }} />
)}
                    </div>
                  ))}
                  <CourseAnnouncementsComment announcementId={announcement._id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };
  
  CourseUserAnnouncements.propTypes = {
    getAnnouncements: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    announcements: PropTypes.array.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    announcements: state.announcement.announcements,
    profile: state.profile,
  });
  
  export default connect(mapStateToProps, {
    getAnnouncements,
    deleteComment,
    deleteAnnouncement,
    updateComment,
  })(CourseUserAnnouncements);