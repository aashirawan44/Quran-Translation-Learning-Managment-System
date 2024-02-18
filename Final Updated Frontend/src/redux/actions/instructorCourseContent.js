
import {
    FETCH_COURSE_CONTENTS_FAILURE_BY_INSTRUCTOR,
    FETCH_COURSE_CONTENTS_REQUEST_BY_INSTRUCTOR,
    FETCH_COURSE_CONTENTS_SUCCESS_BY_INSTRUCTOR, 
    FETCH_COURSE_CONTENT_FAILURE_BY_INSTRUCTOR, 
    FETCH_COURSE_CONTENT_REQUEST_BY_INSTRUCTOR, 
    FETCH_COURSE_CONTENT_SUCCESS_BY_INSTRUCTOR,
    FETCH_INSTRUCTORS_REQUEST,
    FETCH_INSTRUCTORS_SUCCESS,
    FETCH_INSTRUCTORS_FAILURE,
    COURSE_CONTENT_SHARE_UPLOAD_REQUEST, 
    COURSE_CONTENT_SHARE_UPLOAD_SUCCESS, 
    COURSE_CONTENT_SHARE_UPLOAD_FAIL, 
    CLEAR_UPLOAD_FORM, 
    DOWNLOAD_COURSE_CONTENT_SUCCESS, 
    DOWNLOAD_COURSE_CONTENT_FAIL,
    DELETE_COURSE_CONTENT,
    COURSE_CONTENT_ERROR
  } from "../const"
  import api from '../utils/api';
  import axios from "axios";
  import { setAlert } from './alert';
  
  // Action creators
  export const fetchCourseContentsRequestByInstructor = () => {
    return {
      type: FETCH_COURSE_CONTENTS_REQUEST_BY_INSTRUCTOR,
    };
  };
  
  export const fetchCourseContentsSuccessByInstructor = (courseContents) => {
    return {
      type: FETCH_COURSE_CONTENTS_SUCCESS_BY_INSTRUCTOR,
      payload: courseContents,
    };
  };
  
  export const fetchCourseContentsFailureByInstructor = (error) => {
    return {
      type: FETCH_COURSE_CONTENTS_FAILURE_BY_INSTRUCTOR,
      payload: error,
    };
  };
  
  export const fetchInstructorsRequest = () => {
    return {
      type: FETCH_INSTRUCTORS_REQUEST,
    };
  };
  
  export const fetchInstructorSuccess = (instructors) => {
    return {
      type: FETCH_INSTRUCTORS_SUCCESS,
      payload: instructors,
    };
  };
  
  export const fetchInstructorsFailure = (error) => {
    return {
      type: FETCH_INSTRUCTORS_FAILURE,
      payload: error,
    };
  };

  export const fetchCourseContentRequestByInstructor = () => {
    return {
      type: FETCH_COURSE_CONTENT_REQUEST_BY_INSTRUCTOR,
    };
  };
  
  export const fetchCourseContentSuccessByInstructor = (courseContent) => {
    return {
      type: FETCH_COURSE_CONTENT_SUCCESS_BY_INSTRUCTOR,
      payload: courseContent,
    };
  };
  
  export const fetchCourseContentFailureByInstructor = (error) => {
    return {
      type: FETCH_COURSE_CONTENT_FAILURE_BY_INSTRUCTOR,
      payload: error,
    };
  };

  export const shareContentRequest = () => ({
    type: COURSE_CONTENT_SHARE_UPLOAD_REQUEST,
  });
  
  export const shareContentSuccess = () => ({
    type: COURSE_CONTENT_SHARE_UPLOAD_SUCCESS,
    
  });
  
  export const shareContentFailure = (error) => ({
    type: COURSE_CONTENT_SHARE_UPLOAD_FAIL,
    payload: error,
  });

  export const shareCourseContent = (contentId,instructorIds) => {
    return async (dispatch) => {
      dispatch(shareContentRequest());
  
      try {
        console.log("Instructors",instructorIds)
        // Make POST request using axios
        const response = await api.post(`/courseContent/share/${contentId}/${instructorIds.join(',')}`);
  
        
        // Dispatch success action with the received data if needed
        dispatch(shareContentSuccess(response.data));
        dispatch(setAlert('Coursse Content Shared ', 'success'));
      } catch (error) {
        // Dispatch failure action with the error message
        dispatch(shareContentFailure(error.message));
      }
    };
  };
  
  // Thunk function to fetch course content
  export const fetchCourseContentByInstructor = (courseId) => {
    return (dispatch) => {
      dispatch(fetchCourseContentsRequestByInstructor());
      console.log("Action worked");
      api
        .get(`/courseContent/course/${courseId}`)
        .then((response) => {
  
          const courseContents = response.data; // Assuming the API response contains the course content
          dispatch(fetchCourseContentsSuccessByInstructor(courseContents));
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(fetchCourseContentsFailureByInstructor(errorMessage));
        });
    };
  };
  
  export const fetchCourseContentByIdInstructor = (contentId) => {
    return (dispatch) => {
      dispatch(fetchCourseContentRequestByInstructor());
      console.log("Action worked");
      api
        .get(`/courseContent/${contentId}/instructor`)
        .then((response) => {
  
          const courseContent = response.data; // Assuming the API response contains the course content
          dispatch(fetchCourseContentSuccessByInstructor(courseContent));
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(fetchCourseContentFailureByInstructor(errorMessage));
        });
    };
  };

  export const fetchInstructors = () => {
    return (dispatch) => {
      dispatch(fetchInstructorsRequest());
      console.log("Action worked Ins");
      api
        .get(`/instructors`)
        .then((response) => {
  
          const instructors = response.data; // Assuming the API response contains the course content
          dispatch(fetchInstructorSuccess(instructors));
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(fetchInstructorsFailure(errorMessage));
        });
    };
  };
  
//   export const uploadCoursecontent = (courseId, formData) => async (dispatch) => {
//     console.log(formData);
//     try {
//       const authToken = localStorage.getItem('token');
//       const res = await axios.post(`/api/courseContent/upload/${courseId}`, formData, {
//         headers: {
//           'x-auth-token': authToken,
//           'Content-Type': 'multipart/form-data'
  
//         }
//       });
//       dispatch({
//         type: COURSE_CONTENT_UPLOAD_SUCCESS,
//         payload: res.data
//       });
//       dispatch(setAlert('Coursse Content Uploaded', 'success'));
//       // console.log(res);
//       // Clear the form if the upload was successful
//       dispatch({ type: CLEAR_UPLOAD_FORM });
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.error) {
//         dispatch(setAlert(err.response.data.error, 'danger'));
//       } else {
//         dispatch(setAlert('An error occurred while uploading content', 'danger'));
//       }
  
//       let status = err.response ? err.response.status : 'Unknown';
//       dispatch({
//         type: COURSE_CONTENT_UPLOAD_FAIL,
//         payload: { status }
//       });
//     }
//   };
  
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
  
  export const deleteCourseContent = (contentId) => async (dispatch) => {
    try {
      await api.delete(`/courseContent/${contentId}`);
  
      dispatch({
        type: DELETE_COURSE_CONTENT,
        payload: contentId
      });
  
      dispatch(setAlert('Course Content Removed', 'success'));
    } catch (err) {
      dispatch({
        type: COURSE_CONTENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };