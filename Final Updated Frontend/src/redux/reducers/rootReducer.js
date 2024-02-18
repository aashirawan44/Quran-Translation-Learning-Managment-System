import { combineReducers } from "redux";
import reducer from "./surahReducer";
import loginReducer from "./loginReducer";
import profile from "./profile"
// import auth from "./auth"
import authReducer from "./auth";
import alert from "./alert"
import post  from "./post";
import course from "./course"
import assignment from "./assignment";
import announcement from "./announcement";
import enrollment from "./enrollment";
import submission from "./submission";
import quiz from "./quizReducer";
import courseContent from "./courseContentReducers";
import addMarks from "./marks";
import searchReducer from "./search"
import notificationReducer from "./notificationReducer";
import admin from "./admin";
import contact from "./contact";

export default combineReducers({
  alert,
  surah: reducer,
  auth: authReducer,
  profile,
  post,
  course,
  assignment,
  announcement,
  enrollment,
  submission,
  quiz,
  courseContent,
  marks:addMarks,
  search:searchReducer,
  notificationReducer,
  admin,
  contact

  // login: loginReducer
});
