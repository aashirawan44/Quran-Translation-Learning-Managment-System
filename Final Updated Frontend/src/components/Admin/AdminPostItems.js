import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePostAdmin } from '../../redux/actions/post';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const AdminPostItems = ({
  deletePostAdmin,
  post,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  if (!post || typeof post !== 'object' || !post._id) {
    return null; // or handle accordingly
  }

  const {
    _id,
    authorModel,
    firstName,
    profilePicture,
    body,
    comments,
    date,
  } = post;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    
    <div className="mr-56 ">
      
      <div className="w-10/12 mx-auto mt-10 border rounded p-4 relative bg-white">
        
        <div className="flex items-center justify-between mb-5 ">
          <Link to={`/profile/${authorModel}`} className="flex items-center space-x-2">
            <img className="w-10 h-10 rounded-full" src={profilePicture} alt="" />
            <div className="flex flex-col items-start">
              <h4 className="text-base font-semibold text-slate-700">{firstName}</h4>
              <p className="text-xs font-semibold text-slate-400">{formattedDate}</p>
              <p className="text-xs font-semibold text-slate-400">{authorModel}</p>
            </div>
          </Link>
          <div className="relative group">
            <button
              onClick={toggleOptions}
              className="text-gray-500 focus:outline-none"
            >
              <BiDotsVerticalRounded className="text-2xl cursor-pointer" />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
                <button
                  onClick={() => deletePostAdmin(_id)}
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-900 mb-4">{body}</p>

        <div className="flex items-center space-x-4">
          <Link
            to={`/admin/forums/${_id}`}
            className="btn btn-primary transition-transform hover:scale-110"
          >
            Discussion{' '}
            {comments && comments.length > 0 && (
              <span className="comment-count ml-1 inline-block px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                {comments.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

AdminPostItems.propTypes = {
  post: PropTypes.object.isRequired,
  deletePostAdmin: PropTypes.func.isRequired,
};

export default connect(null, { deletePostAdmin })(AdminPostItems);
