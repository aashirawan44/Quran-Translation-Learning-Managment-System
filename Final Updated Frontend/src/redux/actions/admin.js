import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_VERIFIED_INSTRUCTORS,
  APPROVE_INSTRUCTOR,
  DELETE_INSTRUCTOR,
  TOGGLE_BLOCK_INSTRUCTOR,
  GET_UNVERIFIED_INSTRUCTORS,
  GET_VERIFIED_USERS,
  DELETE_USER,
  ANNOUNCEMENTS_ERROR,
  TOGGLE_BLOCK_USER,
  ADMIN_DELETE_COURSE,
  ADMIN_GET_COURSES,
} from '../const';


// Action to get all courses
export const getCourses = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/courses');

    dispatch({
      type: ADMIN_GET_COURSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Action to delete a course
export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    await api.delete(`/admin/courses/${courseId}`);

    dispatch({
      type: ADMIN_DELETE_COURSE,
      payload: courseId,
    });

    dispatch(setAlert('Course Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getVerifiedUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/users/block');

    dispatch({
      type: GET_VERIFIED_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getVerifiedInstructors = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/instructors/verified');

    dispatch({
      type: GET_VERIFIED_INSTRUCTORS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Action to get unverified instructors
export const getUnverifiedInstructors = () => async (dispatch) => {
  try {
    const res = await api.get('/admin/instructors/unverified');

    dispatch({
      type: GET_UNVERIFIED_INSTRUCTORS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const approveInstructor = (instructorId) => async (dispatch) => {
  try {
    const res = await api.put(`admin/instructors/approve/${instructorId}`);

    dispatch({
      type: APPROVE_INSTRUCTOR,
      payload: res.data.instructor,
    });

    dispatch(setAlert('Instructor Approved', 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteInstructor = (instructorId) => async (dispatch) => {
  try {
    await api.delete(`admin/instructors/${instructorId}`);

    dispatch({
      type: DELETE_INSTRUCTOR,
      payload: instructorId,
    });

    dispatch(setAlert('Instructor Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await api.delete(`admin/users/${userId}`);

    dispatch({
      type: DELETE_USER,
      payload: userId,
    });

    dispatch(setAlert('Instructor Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const toggleBlockInstructor = (instructorId, blocked) => async (dispatch) => {
  try {
    // Make an API call to toggle the block status
    const res = await api.put(`admin/instructors/block/${instructorId}`);

    dispatch({
      type: TOGGLE_BLOCK_INSTRUCTOR,
      payload: {
        instructorId,
        blocked: res.data.blocked, // Assuming the API returns the updated blocked status
      },
    });

    dispatch(setAlert(`Instructor ${res.data.blocked ? 'Blocked' : 'Unblocked'}`, 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const toggleBlockUser = (userId, blocked) => async (dispatch) => {
  try {
    // Make an API call to toggle the block status
    const res = await api.put(`admin/users/block/${userId}`);

    dispatch({
      type: TOGGLE_BLOCK_USER,
      payload: {
        userId,
        blocked: res.data.blocked, // Assuming the API returns the updated blocked status
      },
    });

    dispatch(setAlert(`User ${res.data.blocked ? 'Blocked' : 'Unblocked'}`, 'success'));
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};