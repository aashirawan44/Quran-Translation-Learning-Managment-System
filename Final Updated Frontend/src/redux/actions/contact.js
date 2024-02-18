// contactActions.js
import api from '../utils/api';
import { setAlert } from './alert';
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

// Delete Contact Submission
const deleteContactRequest = () => ({ type: DELETE_CONTACT_REQUEST });
const deleteContactSuccess = (id) => ({ type: DELETE_CONTACT_SUCCESS, payload: id });

const deleteContactFailure = (error) => ({ type: DELETE_CONTACT_FAILURE, payload: error });

export const deleteContact = (id) => async (dispatch) => {
    dispatch(deleteContactRequest());
    try {
      await api.delete(`admin/contact/${id}`);
      dispatch(deleteContactSuccess(id));
      // Wait for the delete operation to complete before fetching updated contacts
      await dispatch(fetchContacts());
      dispatch(setAlert('Contact form submission deleted successfully', 'success'));
    } catch (error) {
      dispatch(deleteContactFailure('Error deleting contact form submission'));
      dispatch(setAlert('Error deleting contact form submission', 'danger'));
    }
  };
  
  
// Fetch Contact Submissions
const fetchContactsRequest = () => ({ type: FETCH_CONTACTS_REQUEST });
const fetchContactsSuccess = (submissions) => ({ type: FETCH_CONTACTS_SUCCESS, payload: submissions });
const fetchContactsFailure = (error) => ({ type: FETCH_CONTACTS_FAILURE, payload: error });

export const fetchContacts = () => async (dispatch) => {
    dispatch(fetchContactsRequest());
    try {
      const submissions = await api.get('admin/contact');
      dispatch(fetchContactsSuccess(submissions.data));
    } catch (error) {
      dispatch(fetchContactsFailure('Error getting contact form submissions'));
    }
  };
  

// Fetch Contact Form Count
const fetchContactCountRequest = () => ({ type: FETCH_CONTACT_COUNT_REQUEST });
const fetchContactCountSuccess = (count) => ({ type: FETCH_CONTACT_COUNT_SUCCESS, payload: count });
const fetchContactCountFailure = (error) => ({ type: FETCH_CONTACT_COUNT_FAILURE, payload: error });

export const fetchContactCount = () => async (dispatch) => {
  dispatch(fetchContactCountRequest());
  try {
    const count = await api.get('admin/contact/count');
    dispatch(fetchContactCountSuccess(count.data.count));
  } catch (error) {
    dispatch(fetchContactCountFailure('Error getting contact form count'));
  }
};

// Submit Contact Form
const submitContactRequest = () => ({ type: SUBMIT_CONTACT_REQUEST });
const submitContactSuccess = (submission) => ({ type: SUBMIT_CONTACT_SUCCESS, payload: submission });
const submitContactFailure = (error) => ({ type: SUBMIT_CONTACT_FAILURE, payload: error });

export const submitContact = (formData) => async (dispatch) => {
    dispatch(submitContactRequest());
    try {
      const response = await api.post('admin/contact', formData);
      dispatch(submitContactSuccess(response.data.message));
      dispatch(setAlert('Submitted', 'success'));
    } catch (error) {
      console.error(error);  // Log the error for debugging
      dispatch(submitContactFailure('Error submitting contact form'));
      dispatch(setAlert('Error submitting contact form', 'danger'));
    }
  };
