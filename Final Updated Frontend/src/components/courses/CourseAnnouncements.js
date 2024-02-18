import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getAnnouncements, deleteAnnouncement ,updateAnnouncement} from '../../redux/actions/announcement';
import { deleteComment } from '../../redux/actions/post';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const CourseAnnouncements = ({
  announcements = [],
  deleteComment,
  deleteAnnouncement,
  updateAnnouncement,
  getAnnouncements,
  profile,
}) => {
  const { courseid } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [editedAnnouncement, setEditedAnnouncement] = useState({});
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
  const [editedAnnouncementText, setEditedAnnouncementText] = useState('');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDropdownToggle = (id) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    deleteAnnouncement(announcementId);
    getAnnouncements(courseid);
  };

  const handleDeleteComment = (announcementId, commentId) => {
    deleteComment(announcementId, commentId);
    getAnnouncements(courseid);
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncementId(announcement._id);
    setEditedAnnouncement({ ...announcement });
    setEditedAnnouncementText(announcement.body);
  };

  const handleUpdateAnnouncement = async () => {
    const formData = {
      body: editedAnnouncementText,
      // other fields you want to update
    };

    await updateAnnouncement(editedAnnouncement._id, formData);
    setEditingAnnouncementId(null);
    setEditedAnnouncement({});
    setEditedAnnouncementText('');
    getAnnouncements(courseid);
  };

  return (
    <div className="flex w-full justify-center py-4">
      {announcements && Array.isArray(announcements) && announcements.length > 0 ? (
        <div className="w-1/2">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="flex flex-col items-start mt-10 border-2 rounded p-2 w-full"
            >
              <div className="flex flex-col p-2 w-full border">
                <div className="flex flex-row gap-4 items-center">
                  <img
                    className="sm:w-10 sm:h-10 w-6 h-6 rounded-full ml-2"
                    src={announcement.profilePicture}
                    alt=""
                  />
                  <h4 className="font-sans sm:text-sm text-[6px] text-slate-700 font-semibold">
                    {announcement.firstName}
                  </h4>
                  <p className="font-sans sm:text-xs text-[4px] text-slate-400 font-semibold text-start">
                    Instructor
                  </p>

                  {profile?.profile?.user?._id === announcement.author && (
                    <BiDotsVerticalRounded
                      onClick={() => handleDropdownToggle(announcement._id)}
                      className="w-6 h-6 cursor-pointer ml-auto text-gray-600 hover:text-gray-800"
                    />
                  )}
                </div>
                {/* Dropdown menu */}
                {isDropdownOpen === announcement._id && (
                  <div className="absolute bg-white rounded-md shadow-lg ml-[35.25rem]">
                    <button
                      className="block p-2 text-gray-800 hover:bg-gray-100 w-full"
                      onClick={() => handleDeleteAnnouncement(announcement._id)}
                    >
                      Delete
                    </button>
                    <div
                      className="block p-2 text-gray-800 hover:bg-gray-100 w-full "
                      onClick={() => handleEditAnnouncement(announcement)}
                    >
                      Edit
                    </div>
                  </div>
                )}
                {editingAnnouncementId === announcement._id ? (
                  <div className="flex flex-col items-start">
                  <textarea
                    value={editedAnnouncementText || ''}
                    onChange={(e) => setEditedAnnouncementText(e.target.value)}
                    className="w-full p-2 mb-2 border rounded "
                    style={{ resize: 'none', width: '40.5rem' }}
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={handleUpdateAnnouncement}
                      className="ml-[17.0rem] block p-2 text-white bg-green-500 hover:bg-green-600 rounded w-24"
                    >
                      Update
                    </button>
                  </div>
                </div>
                ) : (
                  <p className="font-sans text-start p-2 md:text-lg sm:text-sm text-[8px] text-[#111827] font-semibold">
                    {announcement.body}
                  </p>
                )}
              </div>
              {announcement.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex flex-col items-start mt-2 rounded p-4"
                >
                  <div className="flex flex-row justify-between w-full border-t border-gray-200 p-4">
                    <div className="flex flex-row items-center">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={comment.profilePicture}
                        alt=""
                      />
                      <p className="font-sans sm:text-sm text-[6px] text-slate-400 font-medium px-2 text-start">
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
                      {/* Dropdown menu */}
                      {isDropdownOpen === comment._id && (
                        <div className="absolute bg-white rounded-md shadow-lg">
                          <button
                            className="block p-2 text-gray-800 hover:bg-gray-100 w-full"
                            onClick={() =>
                              handleDeleteComment(
                                announcement._id,
                                comment._id
                              )
                            }
                          >
                            Delete
                          </button>
                          <div className="block p-2 text-gray-800 hover:bg-gray-100 w-full">
                            Edit
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-sans leading-2 tracking-wide sm:text-sm text-[6px] text-[#111827] font-semibold px-4 mt-2">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className='mt-6'>No announcements for this course.</p>
      )}
    </div>
  );
};

CourseAnnouncements.propTypes = {
  getAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteAnnouncement: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  updateAnnouncement: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  deleteComment,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
})(CourseAnnouncements);