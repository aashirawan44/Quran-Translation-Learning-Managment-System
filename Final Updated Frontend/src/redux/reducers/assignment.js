import {
  GET_ASSIGNMENTS,
  ASSIGNMENT_UPLOAD_SUCCESS,
  ASSIGNMENT_UPLOAD_FAIL,
  RESET_ASSIGNMENTS,
  CLEAR_UPLOAD_FORM,
  GET_ASSIGNMENTS_SUCCESS,
  GET_ASSIGNMENTS_FAIL,
  GET_ASSIGNMENT_SUCCESS,
  GET_ASSIGNMENT_FAIL,
  DOWNLOAD_ASSIGNMENT_SUCCESS,
  DOWNLOAD_ASSIGNMENT_FAIL,
  DELETE_ASSIGNMENT,
  ASSIGNMENT_ERROR
} from '../const';

const initialState = {
  assignments: [],
  assignment: null,
  fileUrl: null,
  filename: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: payload,
        loading: false,
      };
    case ASSIGNMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        assignments: [...state.assignments, payload],
        loading: false,
      };
    case RESET_ASSIGNMENTS:
      return {
        ...state,
        assignments: [],
        loading: true,
      };
    case CLEAR_UPLOAD_FORM:
      return {
        ...state,
        formData: {
          title: '',
          description: '',
          dueDate: '',
          file: null
        }
      };
    case ASSIGNMENT_UPLOAD_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        assignments: payload,
        error: null,
        loading: false

      };
    case GET_ASSIGNMENTS_FAIL:
      return {
        ...state,
        assignments: [],
        error: payload.error
      };
    case GET_ASSIGNMENT_SUCCESS:
      console.log(payload)
      return {
        ...state,
        assignment: payload,
        error: null,
        loading: false

      };
    case GET_ASSIGNMENT_FAIL:
      return {
        ...state,
        assignment: [],
        error: payload.error
      };
    case DOWNLOAD_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        fileUrl: action.payload.url,
        filename: action.payload.filename,
        error: null,
      };
    case DOWNLOAD_ASSIGNMENT_FAIL:
      return {
        ...state,
        fileUrl: null,
        filename: null,
        error: action.payload,
      };
    case DELETE_ASSIGNMENT:
      const assignmentIdToDelete = action.payload;
      const updatedAssignments = state.assignments.filter(ass => ass.id !== assignmentIdToDelete);
      return {
        ...state,
        loading: false,
        assignments: updatedAssignments
      };
    default:
      return state;
  }
}
