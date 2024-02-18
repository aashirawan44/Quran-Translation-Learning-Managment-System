import api from '../utils/api';
import axios from 'axios';
import { setAlert } from './alert';
import {
  ENROLL_COURSE_FAIL,
  ENROLL_COURSE_SUCCESS,
  GET_ENROLLMENTS_SUCCESS,
  GET_ENROLLMENTS_FAIL,
  GET_ENROLLED_STUDENT_SUCCESS,
  GET_ENROLLED_STUDENT_FAIL,
  DELETE_ENROLLED_STUDENT_SUCCESS,
  DELETE_ENROLLED_STUDENT_FAIL

} from '../const'
// Enroll in a course
export const enrollCourse = (id) => async (dispatch) => {
  try {
    const res = await api.post(`enrollment/course/${id}/enroll`);
    dispatch({
      type: ENROLL_COURSE_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('COURSE Ernolled', 'success'));
  } catch (err) {
    dispatch({
      type: ENROLL_COURSE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('COURSE Already Enrolled', 'danger'));
  }
};

// Get the current student's course enrollments
export const getEnrolledCourses = () => async (dispatch) => {
  try {
    const res = await api.get('/enrollment/courses/enrolled');
    dispatch({
      type: GET_ENROLLMENTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ENROLLMENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getEnrolledStudents = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/enrollment/${courseId}/students`);
    dispatch({
      type: GET_ENROLLED_STUDENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ENROLLED_STUDENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEnrolledStudent = (courseId, studentId) => async (dispatch) => {
  try {
    const res = await api.delete(`/enrollment/${courseId}/student/${studentId}`);
    dispatch({
      type: DELETE_ENROLLED_STUDENT_SUCCESS,
      payload: res.data // You can send additional data if needed
    });
    dispatch(setAlert('Student Removed from Course', 'success'));
    dispatch(getEnrolledCourses(courseId));
  } catch (err) {
    dispatch({
      type: DELETE_ENROLLED_STUDENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Failed to Remove Student from Course', 'danger'));
  }
};