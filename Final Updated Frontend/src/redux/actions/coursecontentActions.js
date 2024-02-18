
import {
  FETCH_COURSE_CONTENTS_FAILURE,
  FETCH_COURSE_CONTENTS_REQUEST,
  FETCH_COURSE_CONTENTS_SUCCESS,
  FETCH_COURSE_CONTENT_FAILURE,
  FETCH_COURSE_CONTENT_REQUEST,
  FETCH_COURSE_CONTENT_SUCCESS,
  COURSE_CONTENT_UPLOAD_SUCCESS,
  COURSE_CONTENT_UPLOAD_FAIL,
  CLEAR_UPLOAD_FORM,
  DOWNLOAD_COURSE_CONTENT_SUCCESS,
  DOWNLOAD_COURSE_CONTENT_FAIL,
  FETCH_SHARED_COURSE_CONTENT_FAILURE,
  FETCH_SHARED_COURSE_CONTENT_SUCCESS,
  FETCH_SHARED_COURSE_CONTENT_REQUEST
} from "../const"
import api from '../utils/api';
import axios from "axios";
import { setAlert } from './alert';

// Action creators
export const fetchCourseContentsRequest = () => {
  return {
    type: FETCH_COURSE_CONTENTS_REQUEST,
  };
};

export const fetchCourseContentsSuccess = (courseContents) => {
  return {
    type: FETCH_COURSE_CONTENTS_SUCCESS,
    payload: courseContents,
  };
};

export const fetchCourseContentsFailure = (error) => {
  return {
    type: FETCH_COURSE_CONTENTS_FAILURE,
    payload: error,
  };
};

export const fetchCourseContentRequest = () => {
  return {
    type: FETCH_COURSE_CONTENT_REQUEST,
  };
};

export const fetchCourseContentSuccess = (courseContent) => {
  return {
    type: FETCH_COURSE_CONTENT_SUCCESS,
    payload: courseContent,
  };
};

export const fetchCourseContentFailure = (error) => {
  return {
    type: FETCH_COURSE_CONTENT_FAILURE,
    payload: error,
  };
};

// Thunk function to fetch course content
export const fetchCourseContent = (courseId) => {
  return (dispatch) => {
    dispatch(fetchCourseContentsRequest());
    console.log("Action worked");
    api
      .get(`/courseContent/course/${courseId}/student`)
      .then((response) => {

        const courseContents = response.data; // Assuming the API response contains the course content
        dispatch(fetchCourseContentsSuccess(courseContents));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchCourseContentsFailure(errorMessage));
      });
  };
};

export const fetchCourseContentById = (contentId) => {
  return (dispatch) => {
    dispatch(fetchCourseContentRequest());
    console.log("Action worked");
    api
      .get(`/courseContent/${contentId}`)
      .then((response) => {

        const courseContent = response.data; // Assuming the API response contains the course content
        dispatch(fetchCourseContentSuccess(courseContent));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchCourseContentFailure(errorMessage));
      });
  };
};

export const uploadCoursecontent = (courseId, formData) => async (dispatch) => {
  console.log(formData);
  try {
    const authToken = localStorage.getItem('token');
    const res = await axios.post(`/api/courseContent/upload/${courseId}`, formData, {
      headers: {
        'x-auth-token': authToken,
        'Content-Type': 'multipart/form-data'

      }
    });
    dispatch({
      type: COURSE_CONTENT_UPLOAD_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Coursse Content Uploaded', 'success'));
    // console.log(res);
    // Clear the form if the upload was successful
    dispatch({ type: CLEAR_UPLOAD_FORM });
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      dispatch(setAlert(err.response.data.error, 'danger'));
    } else {
      dispatch(setAlert('An error occurred while uploading content', 'danger'));
    }

    let status = err.response ? err.response.status : 'Unknown';
    dispatch({
      type: COURSE_CONTENT_UPLOAD_FAIL,
      payload: { status }
    });
  }
};

export const downloadCoursecontent = (contentId) => async (dispatch) => {
  try {

    const response = await api.get(`/courseContent/download/${contentId}`,
      { responseType: 'blob' });
    const blob = response.data;
    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '')
      : 'coursecontent.zip';

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
    dispatch({ type: DOWNLOAD_COURSE_CONTENT_SUCCESS, payload: { url, filename } });
  } catch (error) {
    dispatch({ type: DOWNLOAD_COURSE_CONTENT_FAIL, payload: error.message });
  }
};

export const fetchSharedCourseContentRequest = () => ({
  type: FETCH_SHARED_COURSE_CONTENT_REQUEST,
});

export const fetchSharedCourseContentSuccess = (sharedCourseContent) => ({
  type: FETCH_SHARED_COURSE_CONTENT_SUCCESS,
  payload: sharedCourseContent,
});

export const fetchSharedCourseContentFailure = (error) => ({
  type: FETCH_SHARED_COURSE_CONTENT_FAILURE,
  payload: error,
});

// Thunk to fetch shared course content
export const fetchSharedCourseContent = () => async (dispatch) => {
  dispatch(fetchSharedCourseContentRequest());

  try {
    const response = await api.get('/courseContent/shared/me');
    const sharedCourseContent = response.data;
    dispatch(fetchSharedCourseContentSuccess(sharedCourseContent));
  } catch (error) {
    const errorMessage = error.message || 'Failed to fetch shared course content';
    dispatch(fetchSharedCourseContentFailure(errorMessage));
  }
};