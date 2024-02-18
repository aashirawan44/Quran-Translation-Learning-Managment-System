import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteCommentAdmin, likeComment, unlikeComment } from '../../redux/actions/post';
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

const likeButtonStyles = {
  base: 'flex items-center space-x-1 cursor-pointer text-gray-500 hover:text-red-500 focus:outline-none transform transition-transform duration-300 ease-in-out',
  icon: 'text-2xl',
  count: 'text-sm ml-1',
};

const AdminCommentItem = ({
  postId,
  unlikeComment,
  likeComment,
  comment: { _id, body, firstName, profilePicture, user, date, author, authorModel, likes },
  auth,
  deleteCommentAdmin
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  return (
    <div className="mr-56">
    <div className="w-10/12 mx-auto mt-10 border rounded p-4 relative">
      <div className="flex items-start justify-between">
        <Link className="flex items-center space-x-2" to={`/profile/${user}`}>
          <img className="w-10 h-10 rounded-full" src={profilePicture} alt="" />
          <div>
            <h4 className="text-base font-semibold text-slate-700">{firstName}</h4>
            <p className="text-xs font-semibold text-slate-400">{formatDate(date)}</p>
            <p className="text-xs font-semibold text-slate-400">{authorModel}</p>
          </div>
        </Link>
        {auth.user && (
            <div className="relative group">
              <button
                onClick={toggleOptions}
                className="text-gray-500 focus:outline-none"
              >
                <BiDotsVerticalRounded className="text-2xl cursor-pointer" />
              </button>
              {showOptions && (
                <div className="absolute top-0 right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
                  <button
                    onClick={() => deleteCommentAdmin(postId,_id)}
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                  {/* Add edit functionality here */}
                </div>
              )}
            </div>
          )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-900 mb-4">{body}</p>
        
      </div>
    </div>
    </div>
  );
};

AdminCommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCommentAdmin: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  unlikeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteCommentAdmin, likeComment, unlikeComment })(AdminCommentItem);
