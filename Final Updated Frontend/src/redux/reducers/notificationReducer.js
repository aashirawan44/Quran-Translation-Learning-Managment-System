// notificationReducer.js

import {
  FETCH_UNREAD_NOTIFICATION_COUNT_REQUEST,
  FETCH_UNREAD_NOTIFICATION_COUNT_SUCCESS,
  FETCH_UNREAD_NOTIFICATION_COUNT_FAILURE,
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  MARK_NOTIFICATION_AS_READ_REQUEST,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  MARK_NOTIFICATION_AS_READ_FAILURE
} from '../const';

const initialState = {
  unreadCount: 0,
  notification: {},
  isLoading: false,
  error: null
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNREAD_NOTIFICATION_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_UNREAD_NOTIFICATION_COUNT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        unreadCount: action.payload,
        error: null
      };
    case FETCH_UNREAD_NOTIFICATION_COUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        notification: action.payload,
        error: null
      };
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case MARK_NOTIFICATION_AS_READ_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case MARK_NOTIFICATION_AS_READ_SUCCESS:
      // Handle the success action here if needed
      return {
        ...state,
        isLoading: false,
        // Update state based on the success action if necessary
        // For example, you might want to remove the read notification from the state
        // You can use action.payload to access response data if sent from the action
        // Example: notification: action.payload
        error: null
      };
    case MARK_NOTIFICATION_AS_READ_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default notificationReducer;
