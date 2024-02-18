import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../redux/actions/post';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  // console.log('Posts in Posts component:', posts);

  // Define a callback function to refetch posts
  const refetchPosts = useCallback(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="flex justify-center items-center flex-col">
      <div className='w-3/4'>

      <div className='p-4 border rounded 1px mt-12' >
      <p className="font-sans leading-2 text-start tracking-wide md:text-2xl text-lg text-[#111827] font-semibold">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm onPostCreated={refetchPosts} />
      </div>
      <div className="flex flex-col w-full ">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
          ))}
      </div>
          </div>
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,

});

export default connect(mapStateToProps, { getPosts })(Posts);
