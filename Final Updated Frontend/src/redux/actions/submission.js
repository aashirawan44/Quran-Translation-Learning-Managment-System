import axios from 'axios';

import {
  UPLOAD_SOLUTION_REQUEST,
  UPLOAD_SOLUTION_SUCCESS,
  UPLOAD_SOLUTION_FAILURE,
  UPLOADED_SOLUTION_REQUEST,
  UPLOADED_SOLUTION_SUCCESS,
  UPLOADED_SOLUTION_FAILURE,
  DOWNLOAD_ASSIGNMENT_SUCCESS,
  DOWNLOAD_ASSIGNMENT_FAIL
} from '../const';
import api from '../utils/api';
import { setAlert } from './alert';

// Action Creators
export const uploadSolution = (courseId, assignmentId, formData) => async (dispatch) => {
  try {
   
    const authToken = localStorage.getItem('token');
    const res = await axios.post(`/api/submission/${courseId}/assignments/${assignmentId}/submit`, formData, {
      headers: {
        'x-auth-token': authToken,
        'Content-Type': 'multipart/form-data'

      }
    });
  
      dispatch({
        type: UPLOAD_SOLUTION_SUCCESS,
        payload: res.data,
    });

    dispatch(setAlert("Uploaded Successfully",'success'))

  } catch (error) {
    dispatch(setAlert("Error Uploading",'danger'))
    console.log(error.message);
    dispatch({
      type: UPLOAD_SOLUTION_FAILURE,
      payload: error.message || 'An unknown error occurred',
    });
  }
};


export const uploadedSolution = (courseId, assignmentId) => async (dispatch) => {
  try {
    
    const authToken = localStorage.getItem('token');
    const res = await axios.get(`/api/submission/${courseId}/assignments/${assignmentId}/submissions`, {
      headers: {
        'x-auth-token': authToken,
       

      }
    });
  
      dispatch({
        type: UPLOADED_SOLUTION_SUCCESS,
        payload: res.data,
    });

    // dispatch(setAlert("Uploaded Successfully",'success'))

  } catch (error) {
    // dispatch(setAlert("Error Uploading",'danger'))
    console.log(error.message);
    dispatch({
      type: UPLOADED_SOLUTION_FAILURE,
      payload: error.message || 'An unknown error occurred',
    });
  }
};

export const downloadSubmission = (submissionId) => async (dispatch) => {
  try {

    const response = await api.get(`/submission/download/${submissionId}`,
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