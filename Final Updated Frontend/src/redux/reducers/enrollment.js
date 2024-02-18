import {
  ENROLL_COURSE_SUCCESS,
  ENROLL_COURSE_FAIL,
  GET_ENROLLMENTS_SUCCESS,
  GET_ENROLLMENTS_FAIL,
  GET_ENROLLED_STUDENT_SUCCESS,
  GET_ENROLLED_STUDENT_FAIL,
  DELETE_ENROLLED_STUDENT_SUCCESS,
  DELETE_ENROLLED_STUDENT_FAIL
} from '../const';

const initialState = {
  enrollments: [],
  loading: true,
  error: {}
};

function enrollmentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ENROLL_COURSE_SUCCESS:
      return {
        ...state,
        enrollments: [payload, ...state.enrollments],
        loading: false
      };
    case ENROLL_COURSE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        enrollments: payload,
        loading: false
      };
    case GET_ENROLLMENTS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_ENROLLED_STUDENT_SUCCESS:
      return {
        ...state,
        enrollments: payload,
        loading: false
      };
    case GET_ENROLLED_STUDENT_FAIL:
    case DELETE_ENROLLED_STUDENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_ENROLLED_STUDENT_SUCCESS:
      // Remove the deleted student from the enrollments array
      return {
        ...state,
        enrollments: state.enrollments.filter(enrollment => enrollment.id !== payload.id),
        loading: false
      };
    default:
      return state;
  }
}
export default enrollmentReducer;

