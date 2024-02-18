import { GET_ANNOUNCEMENTS, ANNOUNCEMENTS_ERROR, RESET_ANNOUNCEMENTS, REMOVE_ANNOUNCEMENT,ADD_ANNOUNCEMENT_COMMENT,REMOVE_ANNOUNCEMENT_COMMENT,UPDATE_COMMENT,
  UPDATE_ANNOUNCEMENT } from '../const';

const initialState = {
  announcements: [],
   announcement:null,
  comments:[],
  comment : null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: payload,
        loading: false,
      };
    case RESET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: [],
      };
      case UPDATE_ANNOUNCEMENT:
        return {
          ...state,
          announcements: state.announcements.map((announcement) =>
            announcement._id === payload._id ? { ...announcement, body: payload.body } : announcement
          ),
          loading: false,
        };
    case ANNOUNCEMENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
      case REMOVE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter(announcement => announcement._id !== payload),
        loading: false,
      };
      case UPDATE_COMMENT:
        return {
          ...state,
          announcements: state.announcements.map((announcement) =>
            announcement._id === payload._id ? { ...announcement, comments: payload.comments } : announcement
          ),
          loading: false,
        };
      case ADD_ANNOUNCEMENT_COMMENT:
        return {
          ...state,
          announcements: state.announcements.map((announcement) => {
            if (announcement._id === payload.announcementId) {
              return {
                ...announcement,
                comments: [payload, ...announcement.comments],
              };
            }
            return announcement;
          }),
          loading: false,
        };
      
      case REMOVE_ANNOUNCEMENT_COMMENT:
        return {
          ...state,
          announcements: state.announcements.map((announcement) => {
            if (announcement._id === payload.announcementId) {
              return {
                ...announcement,
                comments: announcement.comments.filter(
                  (comment) => comment._id !== payload.commentId
                ),
              };
            }
            return announcement;
          }),
          loading: false,
        };
    default:
      return state;
  }
}