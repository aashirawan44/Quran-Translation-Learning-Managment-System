import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENT_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  FORUM_POST_UPDATED,
  FORUM_COMMENT_UPDATED

} from '../const';


/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/
export const updateForumPost = (forumId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/forums/${forumId}`, formData);

    dispatch({
      type: 'FORUM_POST_UPDATED',
      payload: res.data,
    });

    dispatch(setAlert('Forum post updated', 'success'));
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
    });

    dispatch(setAlert('Forum post update failed', 'error'));
  }
};
// Update Comment
export const updateComment = (forumId, commentId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/forums/${forumId}/comments/${commentId}`,  formData );

    dispatch({
      type: 'FORUM_COMMENT_UPDATED',
      payload: res.data,
    });

    dispatch(setAlert('Comment updated', 'success'));
    dispatch(getPost(forumId));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
    });

    dispatch(setAlert('Comment update failed', 'error'));
  }
};
// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/forums');
    console.log('API Response for getPosts:', res);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Action to like a comment within a forum post by ID
export const likeComment = (postId, commentId) => async (dispatch) => {
  try {
    // Send a PUT request to like the comment
    const res = await api.put(`/forums/${postId}/comments/${commentId}/like`);
    console.log('API Response:', res);
    

    const updatedLikes = res.data.likes; // Extract the updated likes count
    console.log('Updated Likes:', updatedLikes); // Log the updated likes count
    console.log('Response Data:', res.data);

    
    dispatch({
      type: UPDATE_COMMENT_LIKE,
      payload: { postId, commentId, likes: res.data.likes } // Update likes count
      
    });
    dispatch(setAlert('Comment Liked', 'success'));
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Action to unlike a comment within a forum post by ID
export const unlikeComment = (postId, commentId) => async (dispatch) => {
  try {
    // Send a PUT request to unlike the comment
    const res = await api.put(`/forums/${postId}/comments/${commentId}/unlike`);

    dispatch({
      type: UPDATE_COMMENT_LIKE,
      payload: { postId, commentId, likes: res.data.likes }, // Update likes count
    });
    dispatch(setAlert('Comment UnLiked', 'danger'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/forums/like/${id}`);
    

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
    dispatch(getPost(id));
    dispatch(setAlert('Post Liked', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/forums/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
    dispatch(getPost(id));
    dispatch(setAlert('Post UNLiked', 'danger'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/forums/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePostAdmin = (id) => async (dispatch) => {
  try {
    await api.delete(`/admin/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/forums', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/forums/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    console.log('Sending request with postId:', postId);
    console.log('Sending request with formData:', formData);
    const res = await api.post(`/forums/${postId}/comments`, formData);
    console.log("Api Worked",res.data);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(getPost(postId));

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/forums/${postId}/comments/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



// Delete comment
export const deleteCommentAdmin = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/admin/${postId}/comments/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
