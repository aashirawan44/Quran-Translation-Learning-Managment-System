import {
    UPLOAD_SOLUTION_REQUEST,
    UPLOAD_SOLUTION_SUCCESS,
    UPLOAD_SOLUTION_FAILURE,
    UPLOADED_SOLUTION_REQUEST,
    UPLOADED_SOLUTION_SUCCESS,
    UPLOADED_SOLUTION_FAILURE
  } from '../const';
  
  const initialState = {
    submittingSolution: false,
    error: null,
    assignment: null
  };
  
  const submissionReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case UPLOAD_SOLUTION_REQUEST:
        return {
          ...state,
          submittingSolution: true,
          error: null
        };
      case UPLOAD_SOLUTION_SUCCESS:
        return {
          ...state,
          submittingSolution: false,
          error: null,
          assignment: payload
        };
      case UPLOAD_SOLUTION_FAILURE:
        return {
          ...state,
          submittingSolution: false,
          error: payload
        };
       
        
        case UPLOADED_SOLUTION_SUCCESS:
          return {
            ...state,
            error: null,
            assignment: payload
          };
        case UPLOADED_SOLUTION_FAILURE:
          return {
            ...state,
           assignment: null,
            error: payload
          };
      default:
        return state;
    }
  };
  
  export default submissionReducer;
  