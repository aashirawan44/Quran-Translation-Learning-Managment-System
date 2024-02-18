// admin.js

import { configureStore } from '@reduxjs/toolkit';
import {
    GET_VERIFIED_INSTRUCTORS,
    APPROVE_INSTRUCTOR,
    DELETE_INSTRUCTOR,
    TOGGLE_BLOCK_INSTRUCTOR,
    GET_UNVERIFIED_INSTRUCTORS,
    GET_VERIFIED_USERS,
    DELETE_USER,
    TOGGLE_BLOCK_USER,
    ADMIN_DELETE_COURSE,
    ADMIN_GET_COURSES,
  } from '../const';
  
  const initialState = {
    verifiedInstructors: [],
    unverifiedInstructors: [],
    verifiedUsers:[],
    courses :[],
  };
  
  const admin = (state = initialState, action) => {
    switch (action.type) {
      case GET_VERIFIED_INSTRUCTORS:
        return {
          ...state,
          verifiedInstructors: action.payload,
        };
        case GET_VERIFIED_USERS:
        return {
          ...state,
          verifiedUsers: action.payload,
        };
      case APPROVE_INSTRUCTOR:
        return {
          ...state,
          unverifiedInstructors: state.unverifiedInstructors.filter(
            (instructor) => instructor._id !== action.payload._id
          ),
          verifiedInstructors: [...state.verifiedInstructors, action.payload],
        };
        case GET_UNVERIFIED_INSTRUCTORS: // Add this case
        return {
          ...state,
          unverifiedInstructors: action.payload,
        };
      case DELETE_INSTRUCTOR:
        return {
          ...state,
          verifiedInstructors: state.verifiedInstructors.filter(
            (instructor) => instructor._id !== action.payload
          ),
        };
        case ADMIN_GET_COURSES:
          return {
            ...state,
            courses: action.payload,
          };
        case ADMIN_DELETE_COURSE:
          return {
            ...state,
            courses: state.courses.filter(
              (course) => course._id !== action.payload
            ),
          };
    
        case DELETE_USER:
          return {
            ...state,
            verifiedUsers: state.verifiedUsers.filter(
              (user) => user._id !== action.payload
            ),
          };
        case TOGGLE_BLOCK_INSTRUCTOR:
          return {
            ...state,
            verifiedInstructors: state.verifiedInstructors.map((instructor) =>
              instructor._id === action.payload.instructorId
                ? { ...instructor, blocked: action.payload.blocked }
                : instructor
            ),
          };
          case TOGGLE_BLOCK_USER:
          return {
            ...state,
            verifiedUsers: state.verifiedUsers.map((user) =>
              user._id === action.payload.userId
                ? { ...user, blocked: action.payload.blocked }
                : user
            ),
          };
      default:
        return state;
    }
  };
  
  export default admin;