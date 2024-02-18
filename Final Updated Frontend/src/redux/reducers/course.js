import {
    GET_COURSES,
    COURSE_ERROR,
    DELETE_COURSE,
    ADD_COURSE,
    GET_COURSE,
    GET_INSTRUCTOR_COURSES
  } from '../const';
  
  const initialState = {
    courses: [],
    course: null,
    loading: true,
    error: {}
  };
  
  function courseReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_COURSES:
        return {
          ...state,
          courses: payload,
          loading: false
        };
      case GET_COURSE:
        return {
          ...state,
          course: payload,
          loading: false
        };
        case GET_INSTRUCTOR_COURSES:
          return {
            ...state,
            courses: payload,
            loading: false
          };
      case ADD_COURSE:
        return {
          ...state,
          courses: [payload, ...state.courses],
          loading: false
        };
      case DELETE_COURSE:
        return {
          ...state,
          courses: state.courses.filter((course) => course._id !== payload),
          loading: false
        };
      case COURSE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
  export default courseReducer;
  