import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENT_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  FORUM_COMMENT_UPDATED,
  FORUM_POST_UPDATED
} from '../const';

const initialState = {
  posts: [],
  comments:[],
  post: null,
  comment : null,
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
     // reducers/post.js

     case UPDATE_COMMENT_LIKE:
  const { postId, commentId, likes } = payload;
  return {
    ...state,
    post: {
      ...state.post,
      comments: state.post.comments.map((comment) =>
        comment._id === commentId ? { ...comment, likes } : comment
      ),
    },
    loading: false,
  };


case UPDATE_LIKES:
  return {
    ...state,
    posts: state.posts.map((post) =>
      post._id === payload.id ? { ...post, likes: payload.likes } : post
    ),
    loading: false
  };

  case ADD_COMMENT:
  return {
    ...state,
    post: {
      ...state.post,
      comments: [payload, ...state.post.comments],
    },
    loading: false
  };

      
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
      case FORUM_POST_UPDATED:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === payload._id ? { ...post, body: payload.body } : post
          ),
          loading: false,
        };
        case FORUM_COMMENT_UPDATED:
          return {
            ...state,
            posts: state.posts.map((post) =>
              post._id === payload._id ? { ...post, comments: payload.comments } : post
            ),
            loading: false,
          };
    default:
      return state;
  }
}

export default postReducer;
