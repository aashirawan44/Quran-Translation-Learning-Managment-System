import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ANNOUNCEMENTS, ANNOUNCEMENTS_ERROR, RESET_ANNOUNCEMENTS, ADD_ANNOUNCEMENTS,REMOVE_ANNOUNCEMENT
  ,ADD_ANNOUNCEMENT_COMMENT,REMOVE_ANNOUNCEMENT_COMMENT,UPDATE_COMMENT,UPDATE_ANNOUNCEMENT
} from '../const';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/
export const updateAnnouncement = (announcementId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/announcements/${announcementId}`, formData);

    dispatch({
      type: UPDATE_ANNOUNCEMENT,
      payload: res.data.announcement,
    });

    dispatch(setAlert('Announcement Updated', 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addAnnouncement = (courseId, formData,) => async (dispatch) => {
  try {
    const res = await api.post(`/announcements/${courseId}/post`, formData);

    dispatch({
      type: ADD_ANNOUNCEMENTS,
      payload: res.data
    });

    dispatch(setAlert('Announcment Created', 'success'));
    dispatch(getAnnouncements(courseId))
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get posts
export const getAnnouncements = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/announcements/${courseId}/all`);

    dispatch({
      type: GET_ANNOUNCEMENTS,
      payload: res.data.filter((announcement) => announcement.course === courseId),
    });
  } catch (err) {
    if (err.response.status === 404) {
      dispatch({
        type: RESET_ANNOUNCEMENTS,
      });
    }
    //   dispatch({
    //     type: ANNOUNCEMENTS_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    //   });
  }
};

export const deleteAnnouncement = (announcementId) => async (dispatch) => {
  // console.log(postId, commentId);
  try {
    await api.delete(`/announcements/${announcementId}`);

    dispatch({
      type: REMOVE_ANNOUNCEMENT,
      payload: announcementId
    });

    dispatch(setAlert('Announcement Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addAnnouncementComment = (announcementId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/announcements/${announcementId}/comments`, formData);

    dispatch({
      type: ADD_ANNOUNCEMENT_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    // Check if the error response is available
    const errorMsg = err.response ? err.response.data.message : 'An error occurred';

    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: errorMsg, status: err.response ? err.response.status : 500 }
    });

    dispatch(setAlert(errorMsg, 'danger'));
  }
};

// Delete comment
export const deleteComment = (announcementId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/announcements/${announcementId}/comments/${commentId}`);
    
    dispatch({
      type: REMOVE_ANNOUNCEMENT_COMMENT,
      payload: { announcementId, commentId } // pass both IDs to identify the comment
    });

    dispatch(setAlert('Comment Removed', 'success'));
   
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Comment
export const updateComment = (announcementId, commentId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/announcements/${announcementId}/comments/${commentId}`, formData);

    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data.announcement, // Assuming the server returns the updated announcement
    });

    dispatch(setAlert('Comment updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_COMMENT,
      payload: null,
    });
  }
};
