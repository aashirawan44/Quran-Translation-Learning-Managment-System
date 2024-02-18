  import React, { useState } from 'react';
  import PropTypes from 'prop-types';
  import { Link } from 'react-router-dom';
  import { connect } from 'react-redux';
  import { addLike, removeLike, deletePost,updateForumPost,getPosts } from '../../redux/actions/post';
  import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';
  import { BiDotsVerticalRounded } from 'react-icons/bi';

  const PostItem = ({
    addLike,
    removeLike,
    deletePost,
    updateForumPost,
    auth,
    post,
  }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [editedAnnouncement, setEditedAnnouncement] = useState({});
    const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
    const [editedAnnouncementText, setEditedAnnouncementText] = useState('');

    if (!post || typeof post !== 'object' || !post._id) {
      return null; // or handle accordingly
    }

    const {
      _id,
      authorModel,
      author,
      body,
      firstName,
      profilePicture,
      likes,
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
    const handleEditAnnouncement = (post) => {
      setEditingAnnouncementId(post._id);
      setEditedAnnouncement({ ...post });
      setEditedAnnouncementText(post.body);
    };
  
    const handleUpdateAnnouncement = async () => {
      
        const formData = {
          body: editedAnnouncementText,
          // other fields you want to update
        };
    
        await updateForumPost(editedAnnouncement._id, formData);
        setEditingAnnouncementId(null);
        setEditedAnnouncement({});
        setEditedAnnouncementText('');
        getPosts();
      
    };

    const likeButtonStyles = {
      base: 'flex items-center space-x-1 cursor-pointer text-gray-500 hover:text-red-500 focus:outline-none transform transition-transform duration-300 ease-in-out',
      icon: 'text-xl', // Adjust the font size for the icon
      count: 'text-sm ml-1', // Adjust the font size for the count
    };
    
    
    

    return (
      <div className="w-full ">
      <div className="mx-auto mt-10 border rounded p-4 relative ">
        <div className="flex items-center justify-between mb-5">
          <Link to={`/profile/${author}`} className="flex items-center space-x-2">
            <img className="w-10 h-10 rounded-full" src={profilePicture} alt="" />
            <div  className="flex flex-col items-start">
              <h4 className="text-base font-semibold text-slate-700">{firstName}</h4>
              <p className="text-xs font-semibold text-slate-400">{formattedDate}</p>
              <p className="text-xs font-semibold text-slate-400">{authorModel}</p>
            </div>
          </Link>
          {auth.user && author === auth.user._id && (
            <div className="relative group">
              <button
                onClick={toggleOptions}
                className="text-gray-500 focus:outline-none"
              >
                <BiDotsVerticalRounded className="md:text-2xl text-lg cursor-pointer" />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
                  <button
                    onClick={() => deletePost(_id)}
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                  <button
                   onClick={() => handleEditAnnouncement(post)}
                    className="block px-4 py-2 text-sm text-green-500 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  {/* Add edit functionality here */}
                </div>
              )}
              
            </div>
          )}
        </div>

        {editingAnnouncementId === post._id ? (
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
                  <div>
                  <p className="font-sans mb-8 text-start p-2 md:text-lg sm:text-sm text-[8px] text-[#111827] font-semibold">
                    {post.body}
                  </p>
                  <hr className="w-full border-t border-gray-200 my-4" />
                </div>

                )}

        <div className="flex items-center space-x-4">
    <button
      onClick={() => addLike(_id)}
      type="button"
      className={`${likeButtonStyles.base} hover:scale-110`}
    >
      <AiTwotoneLike className={`${likeButtonStyles.icon} text-blue-500 md:h-6 md:w-6 w-4 h-4`} />
    </button>
    <span className={`${likeButtonStyles.count} text-blue-500`}>{likes ? likes.length : 0}</span>
    <button
      onClick={() => removeLike(_id)}
      type="button"
      className={`${likeButtonStyles.base} hover:scale-110`}
    >
      <AiTwotoneDislike className={`${likeButtonStyles.icon} text-red-500 md:h-6 md:w-6 w-4 h-4`} />
    </button>
    <Link
      to={`/posts/${_id}`}
      className="btn btn-primary transition-transform hover:scale-110 text-xs md:text-sm"
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

  PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    updateForumPost: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });

  export default connect(mapStateToProps, { addLike, removeLike, deletePost,updateForumPost })(
    PostItem
  );
