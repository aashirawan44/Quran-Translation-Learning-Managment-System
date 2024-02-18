import axios from 'axios';
import api from '../utils/api';
import { setAlert } from './alert';
import {
  ASSIGNMENT_UPLOAD_SUCCESS,
  ASSIGNMENT_UPLOAD_FAIL,
  RESET_ASSIGNMENTS,
  GET_ASSIGNMENTS,
  CLEAR_UPLOAD_FORM,
  GET_ASSIGNMENTS_SUCCESS,
  GET_ASSIGNMENTS_FAIL,
  DOWNLOAD_ASSIGNMENT_SUCCESS,
  DOWNLOAD_ASSIGNMENT_FAIL,
  GET_ASSIGNMENT_SUCCESS,
  GET_ASSIGNMENT_FAIL,
  DELETE_ASSIGNMENT,
  ASSIGNMENT_ERROR

} from '../const';



// Upload an assignment
export const uploadAssignment = (courseId, formData) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem('token');
    const res = await axios.post(`/api/assignment/${courseId}/assignments`, formData, {
      headers: {
        'x-auth-token': authToken,
        'Content-Type': 'multipart/form-data'

      }
    });
    dispatch(setAlert('Assignment Uploaded', 'success'));
    if (res) {
    dispatch({
      type: ASSIGNMENT_UPLOAD_SUCCESS,
      payload: res.data
    });
   
  }
 
    // Clear the form if the upload was successful
    dispatch({ type: CLEAR_UPLOAD_FORM });
  } catch (err) {
    dispatch({
      type: ASSIGNMENT_UPLOAD_FAIL,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Unable to Upload Assignment', 'danger'));
    // Display an alert if the file extension is invalid
    if (err.response.data.error) {
      dispatch(setAlert(err.response.data.error, 'danger'));
    }
  }
};
export const getAssignments = (courseId) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem('token');
    const res = await axios.get(`/api/assignment/${courseId}/assignments`, {
      headers: {
        'x-auth-token': authToken,
        // 'Content-Type': 'multipart/form-data'

      }
    });
    if (res && res.data) {
      dispatch({
        type: GET_ASSIGNMENTS_SUCCESS,
        payload: res.data
      });
    }
  } catch (err) {
    const errorMessage = err.response && err.response.data ? err.response.data.message : 'Something went wrong.';
    dispatch({
      type: GET_ASSIGNMENTS_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};


export const getAssignment = (assignmentId) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem('token');
    const res = await axios.get(`/api/assignment/${assignmentId}/student`, {
      headers: {
        'x-auth-token': authToken,
        // 'Content-Type': 'multipart/form-data'

      }
    });
    console.log("actionres", res)
    if (res && res.data) {
      dispatch({
        type: GET_ASSIGNMENT_SUCCESS,
        payload: res.data
      });
    }
  } catch (err) {
    const errorMessage = err.response && err.response.data ? err.response.data.message : 'Something went wrong.';
    dispatch({
      type: GET_ASSIGNMENT_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};


// Download an assignment
// Download an assignment
// Download an assignment
export const downloadAssignment = (courseId, assignmentId) => async (dispatch) => {
  try {

    const response = await api.get(`/assignment/${courseId}/assignments/${assignmentId}`,
      { responseType: 'blob' });
    const blob = response.data;
    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '')
      : 'assignment.zip';

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Open the URL in a new window to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Dispatch action to update state with file data
    dispatch({ type: DOWNLOAD_ASSIGNMENT_SUCCESS, payload: { url, filename } });
  } catch (error) {
    dispatch({ type: DOWNLOAD_ASSIGNMENT_FAIL, payload: error.message });
  }
};

export const deleteAssignment = (assignmentId) => async (dispatch) => {
  try {
    await api.delete(`/assignment/${assignmentId}`);

    dispatch({
      type: DELETE_ASSIGNMENT,
      payload: assignmentId
    });

    dispatch(setAlert('Assignment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ASSIGNMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};




