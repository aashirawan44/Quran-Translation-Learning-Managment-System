import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import PostItem from '../posts/PostItem';

import CommentItem from '../Admin/AdminCommentItem';
import { getPost } from '../../redux/actions/post';
import AdminPostItems from './AdminPostItems';

const AdminPost = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100 px-12">
    <section className="ml-60 ">
      <Link to="/admin/forums" className="btn">
        <p className="mt-4">Back To Posts</p>
      </Link>
      <AdminPostItems  post={post} />
      {/* <CommentForm postId={post._id} /> */}
      <div className="comments ">
        {Array.isArray(post.comments) && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </section>
    </div>

  );
};

AdminPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(AdminPost);
