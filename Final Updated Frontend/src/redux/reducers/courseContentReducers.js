// courseContentReducer.js

import {
  FETCH_COURSE_CONTENT_REQUEST,
  FETCH_COURSE_CONTENT_SUCCESS,
  FETCH_COURSE_CONTENT_FAILURE,
  FETCH_COURSE_CONTENTS_REQUEST,
  FETCH_COURSE_CONTENTS_SUCCESS,
  FETCH_COURSE_CONTENTS_FAILURE,
  FETCH_COURSE_CONTENT_REQUEST_BY_INSTRUCTOR,
  FETCH_COURSE_CONTENT_SUCCESS_BY_INSTRUCTOR,
  FETCH_COURSE_CONTENT_FAILURE_BY_INSTRUCTOR,
  FETCH_COURSE_CONTENTS_REQUEST_BY_INSTRUCTOR,
  FETCH_COURSE_CONTENTS_SUCCESS_BY_INSTRUCTOR,
  FETCH_COURSE_CONTENTS_FAILURE_BY_INSTRUCTOR,
  FETCH_INSTRUCTORS_REQUEST,
  FETCH_INSTRUCTORS_SUCCESS,
  FETCH_INSTRUCTORS_FAILURE,
  COURSE_CONTENT_UPLOAD_SUCCESS,
  COURSE_CONTENT_UPLOAD_FAIL,
  CLEAR_UPLOAD_FORM,
  DOWNLOAD_COURSE_CONTENT_SUCCESS,
  DOWNLOAD_COURSE_CONTENT_FAIL,
  COURSE_CONTENT_SHARE_UPLOAD_REQUEST,
  COURSE_CONTENT_SHARE_UPLOAD_SUCCESS,
  COURSE_CONTENT_SHARE_UPLOAD_FAIL,
  DELETE_COURSE_CONTENT,
  FETCH_SHARED_COURSE_CONTENT_REQUEST,
  FETCH_SHARED_COURSE_CONTENT_SUCCESS,
  FETCH_SHARED_COURSE_CONTENT_FAILURE
} from '../const';

// Initial state
const initialState = {
  courseContent: null,
  courseContents: [],
  instructors: [],
  sharedContent: null,
  loading: false,
  sharedCourseContent: [],
  error: null,
};

// Reducer function
const courseContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_CONTENT_SHARE_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COURSE_CONTENT_SHARE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        sharedContent: action.payload,
      };
    case COURSE_CONTENT_SHARE_UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case FETCH_SHARED_COURSE_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SHARED_COURSE_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        sharedCourseContent: action.payload,
      };
    case FETCH_SHARED_COURSE_CONTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COURSE_CONTENT_UPLOAD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        courseContents: [...state.courseContents, action.payload],
        loading: false,
      };
    case COURSE_CONTENT_UPLOAD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_UPLOAD_FORM:
      return {
        ...state,
        formData: {
          title: '',
          description: '',
          file: null
        }
      };
    case FETCH_COURSE_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COURSE_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        courseContent: action.payload,
      };
    case FETCH_COURSE_CONTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_COURSE_CONTENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COURSE_CONTENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        courseContents: action.payload,
      };
    case FETCH_COURSE_CONTENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_INSTRUCTORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_INSTRUCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        instructors: action.payload,
      };
    case FETCH_INSTRUCTORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_COURSE_CONTENT_REQUEST_BY_INSTRUCTOR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COURSE_CONTENT_SUCCESS_BY_INSTRUCTOR:
      return {
        ...state,
        loading: false,
        courseContent: action.payload,
      };
    case FETCH_COURSE_CONTENT_FAILURE_BY_INSTRUCTOR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_COURSE_CONTENTS_REQUEST_BY_INSTRUCTOR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COURSE_CONTENTS_SUCCESS_BY_INSTRUCTOR:
      return {
        ...state,
        loading: false,
        courseContents: action.payload,
      };
    case FETCH_COURSE_CONTENTS_FAILURE_BY_INSTRUCTOR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DOWNLOAD_COURSE_CONTENT_SUCCESS:
      return {
        ...state,
        fileUrl: action.payload.url,
        filename: action.payload.filename,
        error: null,
      };
    case DOWNLOAD_COURSE_CONTENT_FAIL:
      return {
        ...state,
        fileUrl: null,
        filename: null,
        error: action.payload,
      };
    case DELETE_COURSE_CONTENT:
      const contentIdToDelete = action.payload;
      const updatedCourseContents = state.courseContents.filter(content => content.id !== contentIdToDelete);
      return {
        ...state,
        loading: false,
        courseContents: updatedCourseContents
      };
    default:
      return state;
  }
};

export default courseContentReducer;
