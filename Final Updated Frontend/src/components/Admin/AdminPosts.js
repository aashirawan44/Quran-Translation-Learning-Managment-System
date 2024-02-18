import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminPostItems from './AdminPostItems';
import { Link } from 'react-router-dom';

import { getPosts } from '../../redux/actions/post';

const AdminPosts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
    console.log('Posts in Posts component:', posts);

  // Define a callback function to refetch posts
  const refetchPosts = useCallback(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="flex   bg-gray-100 px-12">
    <section className="flex ml-60 mt-4 flex-col items-start">
      <h1 className="font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold">Posts</h1>
      <p className="font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-semibold">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <Link to="/AdminDashboard" className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-96">
        Back
      </Link>
      
      <div className="flex flex-col ">
        {posts.map((post) => (
          <AdminPostItems key={post._id} post={post} />
        ))}
      </div>
    </section>
    </div>
  );
};

AdminPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  
});

export default connect(mapStateToProps, { getPosts })(AdminPosts);
