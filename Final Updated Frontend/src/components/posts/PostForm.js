import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/post';
import Button from '../button/Button';

const PostForm = ({ addPost, onPostCreated }) => {
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost({ body });
    setBody('');
    if (onPostCreated) {
      onPostCreated(); // Notify the parent component
    }
  };

  return (
    <div className='flex justify-center w-full mb-12'>
      <form
        className='flex flex-col w-full drop-shadow-md gap-2'
        onSubmit={handleSubmit}
      >
        <textarea
          className='flex bg-gray-50 min-h-full drop-shadow-md p-2 text-sm'
          name='body'
          placeholder='Ask a Question'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <Button type='submit' value='Submit' name='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  onPostCreated: PropTypes.func, // Callback function prop
};

export default connect(null, { addPost })(PostForm);
