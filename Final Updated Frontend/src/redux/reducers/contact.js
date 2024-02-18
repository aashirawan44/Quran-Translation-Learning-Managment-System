// contactReducer.js
import {
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE,
    FETCH_CONTACTS_REQUEST,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    FETCH_CONTACT_COUNT_REQUEST,
    FETCH_CONTACT_COUNT_SUCCESS,
    FETCH_CONTACT_COUNT_FAILURE,
    SUBMIT_CONTACT_REQUEST,
    SUBMIT_CONTACT_SUCCESS,
    SUBMIT_CONTACT_FAILURE,
  } from '../const';
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
    submissions: [],
    count: 0,
  };
  
  function contact(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      // Delete Contact Submission
      case DELETE_CONTACT_REQUEST:
        return { ...state, loading: true, success: false, error: null };
        case DELETE_CONTACT_SUCCESS:
            // Remove the deleted contact from submissions
            const updatedSubmissions = state.submissions.filter(
              (submission) => submission._id !== payload._id
            );
            return { ...state, loading: false, success: true, error: null, submissions: updatedSubmissions };
      case DELETE_CONTACT_FAILURE:
        return { ...state, loading: false, success: false, error: payload };
  
      // Fetch Contact Submissions
      case FETCH_CONTACTS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CONTACTS_SUCCESS:
        return { ...state, loading: false, submissions: payload, error: null };
      case FETCH_CONTACTS_FAILURE:
        return { ...state, loading: false, submissions: [], error: payload };
  
      // Fetch Contact Form Count
      case FETCH_CONTACT_COUNT_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CONTACT_COUNT_SUCCESS:
        return { ...state, loading: false, count: payload, error: null };
      case FETCH_CONTACT_COUNT_FAILURE:
        return { ...state, loading: false, count: 0, error: payload };
  
      // Submit Contact Form
      case SUBMIT_CONTACT_REQUEST:
        return { ...state, loading: true, success: false, error: null };
        case SUBMIT_CONTACT_SUCCESS:
            return {
              ...state,
              loading: false,
              success: true,
              error: null,
              submissions: [...state.submissions, payload], // Assuming payload is the new submission object
            };
      case SUBMIT_CONTACT_FAILURE:
        return { ...state, loading: false, success: false, error: payload };
  
      default:
        return state;
    }
  }
  
  export default contact;
  