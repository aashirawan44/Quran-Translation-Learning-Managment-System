import api from '../utils/api';
import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_COURSES,
  GET_INSTRUCTOR_COURSES,
  COURSE_ERROR,
  DELETE_COURSE,
  ADD_COURSE,
  GET_COURSE,
  ENROLL_SUCCESS,
  ENROLL_ERROR,
} from '../const';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get COURSE
export const getCourses = () => async (dispatch) => {
  try {
    const res = await api.get('/course');

    dispatch({
      type: GET_COURSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get COURSE for Instructor
export const getInstructorCourses = () => async (dispatch) => {
  try {
    const res = await api.get('/course/instructorcourses');

    dispatch({
      type: GET_INSTRUCTOR_COURSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};




// Delete Course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.delete(`/course/${id}`);

    dispatch({
      type: DELETE_COURSE,
      payload: id
    });

    dispatch(setAlert('Course Removed', 'success'));
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Add course
export const addCourse = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/course/add', formData);

    dispatch({
      type: ADD_COURSE,
      payload: res.data
    });

    dispatch(setAlert('COURSE Created', 'success'));
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get course
export const getCourse= (id) => async (dispatch) => {
  try {
    const res = await api.get(`/course/${id}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


