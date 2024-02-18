import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from '../actions/surahAction';
  
  // Initial state
  const initialState = {
    loading: false,
    error: null,
  };
  
  // Reducer
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case SIGNUP_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  