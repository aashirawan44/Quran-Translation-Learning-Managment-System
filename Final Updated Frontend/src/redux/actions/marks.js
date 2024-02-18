import {FETCH_COURSE_USERS_REQUEST,
  FETCH_COURSE_USERS_SUCCESS,
  FETCH_COURSE_USERS_FAILURE,
  FETCH_COURSE_USERS_MARKS_REQUEST,
  FETCH_COURSE_USERS_MARKS_SUCCESS,
  FETCH_COURSE_USERS_MARKS_FAILURE,
  GET_MARKS_BY_ID_REQUEST,
  GET_MARKS_BY_ID_SUCCESS,
  GET_MARKS_BY_ID_FAILURE,
  UPLOAD_MARKS_REQUEST,UPLOAD_MARKS_SUCCESS,
  UPLOAD_MARKS_FAILURE,FETCH_COURSE_MARKS_REQUEST,
  FETCH_COURSE_MARKS_SUCCESS,
  FETCH_COURSE_MARKS_FAILURE,
  UPDATE_MARKS_REQUEST,
  UPDATE_MARKS_SUCCESS,
  UPDATE_MARKS_FAILURE,
  FETCH_TITLES_REQUEST,
  FETCH_TITLES_SUCCESS,
   FETCH_TITLES_FAILURE,
   DELETE_MARKS_REQUEST,
 DELETE_MARKS_SUCCESS ,
 DELETE_MARKS_FAILURE,
 FETCH_MARKS_SUCCESS,
FETCH_MARKS_FAILURE,
EDIT_MARKS_SUCCESS, // Renamed action type
EDIT_MARKS_FAILURE,
FETCH_MARK_BY_ID_SUCCESS,
FETCH_MARK_BY_ID_FAILURE
} from "../const"
import { setAlert } from './alert';
import api from "../utils/api";



export const fetchMarksSuccess = (marks) => ({
  type: FETCH_MARKS_SUCCESS,
  payload: marks,
});

export const fetchMarksFailure = (error) => ({
  type: FETCH_MARKS_FAILURE,
  payload: error,
});

export const editMarksSuccess = (message) => ({
  type: EDIT_MARKS_SUCCESS,
  payload: message,
});

export const editMarksFailure = (error) => ({
  type: EDIT_MARKS_FAILURE,
  payload: error,
});

export const fetchMarkByIdSuccess = (mark) => ({
  type: FETCH_MARK_BY_ID_SUCCESS,
  payload: mark,
});

export const fetchMarkByIdFailure = (error) => ({
  type: FETCH_MARK_BY_ID_FAILURE,
  payload: error,
});



// Thunk to edit/update marks
export const editMarks = (marksId, updatedMarks) => async (dispatch) => {
  try {
    const response = await api.put(`marks/edit/${marksId}`, updatedMarks);
    dispatch(editMarksSuccess(response.data.message));
    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(editMarksFailure(error.response.data.message || 'Failed to edit marks'));
    dispatch(setAlert(error.response.data.message, 'error'));
  }
};

// Thunk to fetch mark by ID
export const fetchMarkById = (marksId) => async (dispatch) => {
  try {
    const response = await api.get(`/marks/${marksId}`);
    dispatch(fetchMarkByIdSuccess(response.data));
  } catch (error) {
    dispatch(fetchMarkByIdFailure(error.response.data.message || 'Failed to fetch mark'));
  }
};

// Action to initiate the delete request
const deleteMarksRequest = () => ({
  type: DELETE_MARKS_REQUEST,
});

// Action dispatched on successful deletion
const deleteMarksSuccess = (deletedMarks) => ({
  type: DELETE_MARKS_SUCCESS,
  payload: deletedMarks,
});

// Action dispatched on deletion failure
const deleteMarksFailure = (error) => ({
  type: DELETE_MARKS_FAILURE,
  payload: error,
});

// Async Action Creator for deleting marks
export const deleteMarks = (marksId) => async (dispatch) => {
  dispatch(deleteMarksRequest());

  try {
    // Make API call to delete marks by ID
    const response = await api.delete(`/marks/${marksId}`);

    // Dispatch success action with the deleted marks data
    dispatch(deleteMarksSuccess(response.data.deletedMarks));
  } catch (error) {
    // Dispatch failure action with the error message
    dispatch(deleteMarksFailure(error.message));
  }
};

export const fetchTitles = (courseId) => async (dispatch) => {
  dispatch({ type: FETCH_TITLES_REQUEST });

  try {
    const response = await api.get(`/marks/titles/${courseId}`);
    const { assignmentTitles, quizTitles } = response.data;

    dispatch({
      type: FETCH_TITLES_SUCCESS,
      payload: { assignmentTitles, quizTitles },
    });
  } catch (error) {
    dispatch({
      type: FETCH_TITLES_FAILURE,
      payload: error.message,
    });
  }
};


export const fetchCourseUsersRequest = () => ({
    type: FETCH_COURSE_USERS_REQUEST,
  });
  
  export const fetchCourseUsersSuccess = (users) => ({
    type: FETCH_COURSE_USERS_SUCCESS,
    payload: users,
  });
  
  export const fetchCourseUsersFailure = (error) => ({
    type: FETCH_COURSE_USERS_FAILURE,
    payload: error,
  });

  export const getMarksByIdRequest = () => ({
    type: GET_MARKS_BY_ID_REQUEST,
  });
  
  export const getMarksByIdSuccess = (marks) => ({
    type: GET_MARKS_BY_ID_SUCCESS,
    payload: marks,
  });
  
  export const getMarksByIdFailure = (error) => ({
    type: GET_MARKS_BY_ID_FAILURE,
    payload: error,
  });

  export const fetchCourseUsers = (courseId) => {
    return (dispatch) => {
      dispatch(fetchCourseUsersRequest());
      api
        .get(`/marks/enrolled/${courseId}`)
        .then((response) => {
          const users = response.data; // Assuming the API returns the list of users
          dispatch(fetchCourseUsersSuccess(users));
        })
        .catch((error) => {
          dispatch(fetchCourseUsersFailure(error.message));
        });
    };
  };

  export const getMarksById = (marksId) => {
    return (dispatch) => {
      dispatch(getMarksByIdRequest());
      api
        .get(`/marks/${marksId}`)
        .then((response) => {
          const marks = response.data; // Assuming the API returns the list of users
          dispatch(getMarksByIdSuccess(marks));
        })
        .catch((error) => {
          dispatch(getMarksByIdFailure(error.message));
        });
    };
  };


  export const fetchCourseUsersMarksRequest = () => ({
    type: FETCH_COURSE_USERS_MARKS_REQUEST,
  });
  
  export const fetchCourseUsersMarksSuccess = (users) => ({
    type: FETCH_COURSE_USERS_MARKS_SUCCESS,
    payload: users,
    
  });
  
  export const fetchCourseUsersMarksFailure = (error) => ({
    type: FETCH_COURSE_USERS_MARKS_FAILURE,
    payload: error,
  });

  export const fetchCourseUsersMarks = (courseId) => {
    // console.log(courseId);
    return (dispatch) => {
      dispatch(fetchCourseUsersMarksRequest());
      api
        .get(`/marks/course/${courseId}`)
        .then((response) => {
          const users = response.data; // Assuming the API returns the list of users
          dispatch(fetchCourseUsersMarksSuccess(users));
         
        })
        .catch((error) => {
          dispatch(fetchCourseUsersMarksFailure(error.message));
        });
    };
  };

  export const fetchCourseMarksRequest = () => ({
    type: FETCH_COURSE_MARKS_REQUEST,
  });
  
  export const fetchCourseMarksSuccess = (users) => ({
    type: FETCH_COURSE_MARKS_SUCCESS,
    payload: users,
  });
  
  export const fetchCourseMarksFailure = (error) => ({
    type: FETCH_COURSE_MARKS_FAILURE,
    payload: error,
  });

  export const fetchCourseMarks = (courseId) => {
    console.log(courseId);
    return (dispatch) => {
      dispatch(fetchCourseMarksRequest());
      api
        .get(`/marks/user/${courseId}`)
        .then((response) => {
          const users = response.data; // Assuming the API returns the list of users
          dispatch(fetchCourseMarksSuccess(users));
        })
        .catch((error) => {
          dispatch(fetchCourseMarksFailure(error.message));
        });
    };
  };

// Action Creators
export const uploadMarksRequest = () => ({
  type: UPLOAD_MARKS_REQUEST,
});

export const uploadMarksSuccess = (data) => ({
  type: UPLOAD_MARKS_SUCCESS,
  payload: data,
});

export const uploadMarksFailure = (error) => ({
  type: UPLOAD_MARKS_FAILURE,
  payload: error,
});

// Async Action Creator
export const uploadMarks = (courseId, data) => async (dispatch) => {
  try {
    dispatch(uploadMarksRequest());
    console.log('Data to be sent:', data);
    const response = await api.post(`/marks/upload/${courseId}`, data);
    console.log('Response from server:', response.data);
    dispatch(uploadMarksSuccess(response.data));
    dispatch(setAlert('Marks Uploaded', 'success'));
  } catch (error) {
    console.error('Error uploading marks:', error);
    dispatch(uploadMarksFailure(error.message));
  }
};


export const updateMarksRequest = () => ({
  type: UPDATE_MARKS_REQUEST,
});

export const updateMarksSuccess = (data) => ({
  type: UPDATE_MARKS_SUCCESS,
  payload: data,
});

export const updateMarksFailure = (error) => ({
  type: UPDATE_MARKS_FAILURE,
  payload: error,
});

export const updateMarks = (userId, newMarks) => async (dispatch) => {
  dispatch(updateMarksRequest());
  try {
    const response = await api.put(`/marks/edit/${userId}`, { marks: newMarks });
    dispatch(updateMarksSuccess(response.data));
    // Optionally, you can dispatch a success alert here
  } catch (error) {
    dispatch(updateMarksFailure(error.message));
    // Optionally, you can dispatch an error alert here
  }
};


