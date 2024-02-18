import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post';
import { RiSendPlane2Fill } from 'react-icons/ri';

const CommentForm = ({ postId, addComment }) => {
  const [body, setBody] = useState('');

  return (
      <form
        className='flex items-center ml-60'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { body });
          setBody('');
        }}
      >
        <textarea
          className='border rounded-full m-2 px-4 py-2 w-80'
          name='text'
          placeholder='Add Class Comment...'
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        <button type='submit' className='bg-blue-500 text-white rounded-full p-2 ml-2'>
          <RiSendPlane2Fill className='w-8 h-8' />
        </button>
      </form>
   
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
