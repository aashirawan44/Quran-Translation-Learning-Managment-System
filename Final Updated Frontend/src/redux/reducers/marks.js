// reducers/courseReducer.js

import {
    FETCH_COURSE_USERS_REQUEST,
    FETCH_COURSE_USERS_SUCCESS,
    FETCH_COURSE_USERS_FAILURE,
    FETCH_COURSE_USERS_MARKS_REQUEST,
    FETCH_COURSE_USERS_MARKS_SUCCESS,
    FETCH_COURSE_USERS_MARKS_FAILURE,
    UPLOAD_MARKS_REQUEST,
    UPLOAD_MARKS_SUCCESS,
    UPLOAD_MARKS_FAILURE,
    FETCH_COURSE_MARKS_REQUEST,
    FETCH_COURSE_MARKS_SUCCESS,
    FETCH_COURSE_MARKS_FAILURE,
    UPDATE_MARKS_REQUEST,
    UPDATE_MARKS_SUCCESS,
    UPDATE_MARKS_FAILURE,
    GET_MARKS_BY_ID_REQUEST,
    GET_MARKS_BY_ID_SUCCESS,
    GET_MARKS_BY_ID_FAILURE,
    FETCH_TITLES_SUCCESS, FETCH_TITLES_FAILURE,
    FETCH_TITLES_REQUEST,
    DELETE_MARKS_REQUEST,
    DELETE_MARKS_SUCCESS ,
    DELETE_MARKS_FAILURE,
    FETCH_MARKS_SUCCESS,
    FETCH_MARKS_FAILURE,
    EDIT_MARKS_SUCCESS,
    EDIT_MARKS_FAILURE,
    FETCH_MARK_BY_ID_SUCCESS,
    FETCH_MARK_BY_ID_FAILURE,
} from '../const';

const initialState = {
    users: [],
    marks: null,
    assignmentTitles: [],
  quizTitles: [],
    loading: false,
    uploading: false,
    updating:false,
    uploaded: false,
    error: null,
};

const addMarks = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MARKS_SUCCESS:
      return {
        ...state,
        marks: action.payload,
        error: null,
      };
    case FETCH_MARKS_FAILURE:
      return {
        ...state,
        marks: [],
        error: action.payload,
      };
    case EDIT_MARKS_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case EDIT_MARKS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_MARK_BY_ID_SUCCESS:
      return {
        ...state,
        mark: action.payload,
        error: null,
      };
    case FETCH_MARK_BY_ID_FAILURE:
      return {
        ...state,
        mark: null,
        error: action.payload,
      };

        case DELETE_MARKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_MARKS_SUCCESS:
      return {
        ...state,
        loading: false,
        // Handle the deleted marks in your state as needed
        // For example, you might filter the existing marks to remove the deleted one
        // marks: state.marks.filter(mark => mark.id !== action.payload.id),
      };
    case DELETE_MARKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
        case FETCH_TITLES_SUCCESS:
            return {
              ...state,
              assignmentTitles: action.payload.assignmentTitles,
              quizTitles: action.payload.quizTitles,
              loading: false,
              error: null,
            };
          case FETCH_TITLES_FAILURE:
            return {
              ...state,
              assignmentTitles: [],
              quizTitles: [],
              loading: false,
              error: action.payload,
            };
        case FETCH_COURSE_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COURSE_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            };
        case FETCH_COURSE_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

            case GET_MARKS_BY_ID_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case GET_MARKS_BY_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    marks: action.payload,
                    error: null,
                };
            case GET_MARKS_BY_ID_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
        case FETCH_COURSE_USERS_MARKS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COURSE_USERS_MARKS_SUCCESS:
            // console.log(action.payload);
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            };
        case FETCH_COURSE_USERS_MARKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
         case FETCH_TITLES_REQUEST:
        case FETCH_COURSE_MARKS_REQUEST:
            return {
                ...state,
                loading: true,
            };
             case FETCH_TITLES_REQUEST:
        case FETCH_COURSE_MARKS_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                marks: action.payload,
                error: null,
            };
        case FETCH_COURSE_MARKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPLOAD_MARKS_REQUEST:
            return {
                ...state,
                uploading: true,
                uploaded: false,
                error: null,
            };
        case UPLOAD_MARKS_SUCCESS:
            return {
                ...state,
                uploading: false,
                uploaded: true,
                error: null,
            };
        case UPLOAD_MARKS_FAILURE:
            return {
                ...state,
                uploading: false,
                uploaded: false,
                error: action.payload,
            };
        case UPDATE_MARKS_REQUEST:
            return {
                ...state,
                updating: true,
            };
        case UPDATE_MARKS_SUCCESS:
            return {
                ...state,
                updating: false,
                // Optionally, update the state with the new marks data if needed
            };
        case UPDATE_MARKS_FAILURE:
            return {
                ...state,
                updating: false,
                // Handle error state if needed
            };
        default:
            return state;
    }
};

export default addMarks;
