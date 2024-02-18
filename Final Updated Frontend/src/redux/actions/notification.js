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
} from "../const"
import api from "../utils/api";

export const fetchUnreadNotificationCount = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_UNREAD_NOTIFICATION_COUNT_REQUEST });

        try {
            const response = await api.get('/notification/unread-count');
            // const data = await response;
            // console.log(response)

            dispatch({
                type: FETCH_UNREAD_NOTIFICATION_COUNT_SUCCESS,
                payload: response
            });
        } catch (error) {
            dispatch({
                type: FETCH_UNREAD_NOTIFICATION_COUNT_FAILURE,
                error: error.message
            });
        }
    };
};

export const fetchNotifications = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });

        try {
            const response = await api.get('/notification/');
            // const data = await response;
            console.log(response)

            dispatch({
                type: FETCH_NOTIFICATIONS_SUCCESS,
                payload: response
            });
        } catch (error) {
            dispatch({
                type: FETCH_NOTIFICATIONS_FAILURE,
                error: error.message
            });
        }
    };
};

export const markNotificationAsRead = (notificationId) => {
    return async (dispatch) => {
        dispatch({ type: MARK_NOTIFICATION_AS_READ_REQUEST });

        try {
            const response = await api.put(`/notification/${notificationId}/mark-as-read`);
            // You can handle the response data if needed
            console.log(response);

            dispatch({
                type: MARK_NOTIFICATION_AS_READ_SUCCESS,
                payload: response // You can update the state with response if needed
            });
        } catch (error) {
            dispatch({
                type: MARK_NOTIFICATION_AS_READ_FAILURE,
                error: error.message
            });
        }
    };
};