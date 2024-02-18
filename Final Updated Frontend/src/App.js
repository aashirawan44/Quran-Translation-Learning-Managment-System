
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import Card from './components/Cards/Card';
import Dropdown from './components/Dropdown/Dropdown';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Reading from './components/Reading/Reading';
import Alert from "./components/layout/Alert";


import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import '../src/constants/fonts.css'
import ProfilePage from "./pages/ProfilePage";
import { LOGOUT } from './redux/const';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import { loadInstructor } from './redux/actions/auth';
import setAuthToken from './redux/utils/setAuthToken';
import { Provider } from 'react-redux';
import Profiles from './components/profiles/Profiles';
import PrivateRoute from './components/routing/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import ProfileFormPage from './pages/ProfileFormPage';
import AddExperiencePage from './pages/AddExperiencePage';
import AddEducationPage from './pages/AddEducationPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import InstructorLoginPage from './pages/InstructorLoginPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import AddCoursePage from './pages/AddCoursePage';
import InstructorCoursesPage from './pages/InstructorCoursesPage';
import InstructorAssignments from './components/instructor/InstructorAssignments';
import InstructorAssignmentsPage from './pages/InstructorAssignmentPage';
import InstructorAnnouncementPage from './pages/InstructorAnnouncmentPage';
import CoursesListPage from './pages/CourseListPage';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';
import AnnouncementPage from './pages/AnnouncmentPage';
import Assignments from './components/courses/Assignments';
import AssignmentsPage from './pages/AssignmentsPage';
import AddInstructorEducation from './components/profile-forms/AddInstructorEducation';
import AddInstructorEducationPage from './pages/AddInstructorEducationPage';
import AddInstructorExperiencePage from './pages/AddInstructorExperiencePage';
import QuizListPage from './pages/QuizListPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import AddQuizPage from './pages/AddQuizPage';
import EmailVerifyPage from './pages/EmailVerifyPage';
import QuizResultPage from './pages/QuizResultPage';
import courseContentPageList from './pages/courseContentListPage';
import CourseContentPage from './pages/CourseContentPage';
import AddCourseContentPage from './pages/AddCourseContentPage';
import InstructorCourseAssignments from './components/instructor/InstructorCourseAssignments';
import InstrucotrCourseAssignmentsPage from './pages/InstrucotrCourseAssignmentsPage';
import SubmissionsPage from './pages/SubmissionsPage';
import AssignmentPage from './pages/AssignmentPage';
import AddMarksPage from './pages/AddMarksPage';
import GetMarksPage from './pages/GetMarksPage';
import MarksComponentPage from './pages/MarksComponentPage';
import CourseContentPopupPage from './pages/CourseContentPopupPage';
import InstructorCourseContentlistPage from './pages/InstructorCourseContentlistPage';
import InstructorCoursecontentpopup from './components/courseContent/InstructorCoursecontentpopup';
import InstructorCoursecontentpopupPage from './pages/InstructorCoursecontentpopupPage';
import InstructorlistPage from './pages/InstructorlistPage';
import UpdateMarksPage from './pages/UpdateMarksPage';
import InstructorProfilePage from './pages/InstructorProfilePage';
import EnrolledStudentsPage from './pages/EnrolledStudentsPage';
import InstructorQuizListPage from './pages/InstructorQuizListPage';
import QuizInstructorDetailsPage from './pages/QuizInstructorDetailsPage';
import TarjumaPage from './pages/tarjumaPage';
import InstructorReading from './components/Reading/InstructorReading';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TarjumaReading from './components/Reading/TarjumaReading';
import QuizInstructorResultPage from './pages/QuizInstructorResultPage';
import InstructorForgotPasswordPage from './pages/InstructorForgotPasswordPage';
import InstructorResetPasswordPage from './pages/InstructorResetPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import InstructorChangePasswordPage from './pages/InstructorChangePasswordPage';
import EnrolledUserProfilePage from './pages/EnrolledUserProfilePage';
import InstructorRegister from './components/instructor/InstructorRegister';
import InstructorVerifyEmail from './components/Mail/InstructorVerifyEmail';
import GetMarksByIdPage from './pages/GetMarksByIdPage';
import { loadAdmin } from './redux/actions/auth';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboardPage from './pages/AdminDashboardPage';
import VerifiedInstructorPage from './pages/VerifiedInstructorPage';
import UnverifiedInstructorPage from './pages/UnverifiedInstructorPage';
import VerifiedUserPage from './pages/VerifiedUserPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import AdminForumPage from './pages/AdminForumPage';
import AdminCommentPage from './pages/AdminCommentPage';
import Contact from './components/Contact/Contact';
import ContactPage from './pages/ContactPage';
import AdminContactPage from './pages/AdminContactPage'
import SharedCourseContentPage from './pages/SharedCourseContentPage'
import EditMarksPage from './pages/EditMarksPage';
// import EmailVerify from './components/emailverification/EmailVerify';




function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    const storedUserRole = localStorage.getItem('userRole');
    // console.log('Testing Role',storedUserRole);
    if (!localStorage.token) {
      store.dispatch({ type: LOGOUT });
    }
    else if (storedUserRole === 'instructor') {
      // If the role is 'instructor', dispatch the instructor action
      store.dispatch(loadInstructor());
    } 
    else if(storedUserRole === 'admin'){
      store.dispatch(loadAdmin());
    }
    else {
      // Otherwise, dispatch the regular user action
      store.dispatch(loadUser());
    }
    // store.dispatch(loadInstructor());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
      setTimeout(() => {
        store.dispatch(loadUser()); // Dispatch loadUser action to reset the state
      }, 100);
    });
  }, []);
  return (
    <div className="App font-[Opensansfontmedium]">
      <Provider store={store}>
        <Router>
          <Alert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/Reading" element={<Reading />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/Contact" element={<ContactPage />} />
            <Route path="/instructorlogin" element={<InstructorLoginPage />} />
            <Route path="/instructorregister" element={<InstructorRegister />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="/profiles" element={<Profiles />} />
            {/* <Route path="/Instructorprofiles" element={<Profiles />} /> */}
            <Route path="/users/:id/verify/:token" element={<EmailVerifyPage />} />
            <Route path="/instructors/:id/verify/:token" element={<InstructorVerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/password-reset/:id/:token" element={<ResetPasswordPage />} />
            <Route path="/instructor/forgot-password" element={<InstructorForgotPasswordPage />} />
            <Route path="/instructor/password-reset/:id/:token" element={<InstructorResetPasswordPage />} />
            <Route
              path="Instructorprofiles"
              element={<PrivateRoute
                component={Profiles}
                allowedRoles={['instructor','user']}
              />
              }
            />
            <Route
              path="sharedCourseContent"
              element={<PrivateRoute
                component={SharedCourseContentPage}
                allowedRoles={['instructor']}
              />
              }
            />

            <Route
              path="instructorDashboard"
              element={<PrivateRoute
                component={InstructorDashboardPage}
                allowedRoles={['instructor']}
              />
              }
            />
                <Route
              path="/admin/forums"
              element={<PrivateRoute
                component={AdminForumPage}
                allowedRoles={['admin']}
              />
              }
            />
            <Route
              path="/admin/forums/:id"
              element={<PrivateRoute
                component={AdminCommentPage}
                allowedRoles={['admin']}
              />
              }
            />
             <Route
              path="AdminDashboard"
              element={<PrivateRoute
                component={AdminDashboardPage}
                allowedRoles={['admin']}
              />
              }
            />
             <Route
              path="admin/verifiedInstructors"
              element={<PrivateRoute
                component={VerifiedInstructorPage}
                allowedRoles={['admin']}
              />
              }
            />
             <Route
              path="admin/Requests"
              element={<PrivateRoute
                component={AdminContactPage}
                allowedRoles={['admin']}
              />
              }
            />
            <Route
              path="admin/unverifiedInstructors"
              element={<PrivateRoute
                component={UnverifiedInstructorPage}
                allowedRoles={['admin']}
              />
              }
            />
            <Route
              path="admin/users"
              element={<PrivateRoute
                component={VerifiedUserPage}
                allowedRoles={['admin']}
              />
              }
            />
            <Route
              path="admin/courses"
              element={<PrivateRoute
                component={AdminCoursesPage}
                allowedRoles={['admin']}
              />
              }
            />
            <Route
              path="userprofile/:id"
              element={<PrivateRoute
                component={EnrolledUserProfilePage}
                allowedRoles={['instructor']}
              />
              }
            />
          <Route path="posts" element={<PrivateRoute component={PostsPage} allowedRoles={['instructor','user']} />} />
            <Route path="posts/:id" element={<PrivateRoute component={PostPage} allowedRoles={['instructor','user']} />} />

            <Route
              path="create-instructorprofile"
              element={<PrivateRoute
                component={InstructorProfilePage}
                allowedRoles={['instructor']}
              />
              }
            />

            <Route
              path="instructorchange-password"
              element={<PrivateRoute
                component={InstructorChangePasswordPage}
                allowedRoles={['instructor']}
              />
              }
            />


            <Route
              path="tarjumaReading"
              element={<PrivateRoute
                component={TarjumaReading}
                allowedRoles={['instructor']}
              />
              }
            />
            <Route
              path="InstructorReading"
              element={<PrivateRoute
                component={InstructorReading}
                allowedRoles={['instructor']}
              />
              }
            />

            <Route
              path="tarjuma"
              element={<PrivateRoute component={TarjumaPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="dashboard"
              element={<PrivateRoute component={DashboardPage} allowedRoles={['user']} />}
            />
            <Route
              path="change-password"
              element={<PrivateRoute component={ChangePasswordPage} allowedRoles={['user']} />}
            />
            <Route
              path="instructorcourses"
              element={<PrivateRoute component={InstructorCoursesPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses/:courseid/instructorassignments"
              element={<PrivateRoute component={InstructorAssignmentsPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses/:courseid/UploadCourseContent"
              element={<PrivateRoute component={AddCourseContentPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses/:courseid/addquiz"
              element={<PrivateRoute component={AddQuizPage} allowedRoles={['instructor']} />}
            />

            <Route
              path=":courseid/edit/marks/:marksId"
              element={<PrivateRoute component={EditMarksPage} allowedRoles={['instructor']} />}
            />

            

            <Route
              path="instructorcourses/:courseid/announcements"
              element={<PrivateRoute component={InstructorAnnouncementPage} allowedRoles={['instructor']} />}
            />
            <Route
              path="courses/:courseid/announcements"
              element={<PrivateRoute component={AnnouncementPage} allowedRoles={['user']} />}
            />
            <Route
              path="courses/:courseid/assignments"
              element={<PrivateRoute component={AssignmentsPage} allowedRoles={['user']} />}
            />
            <Route
              path="courses/:courseid/:assignmentid/assignment"
              element={<PrivateRoute component={AssignmentPage} allowedRoles={['user']} />}
            />
            <Route
              path="courses/:courseid/instructorcourseassignments"
              element={<PrivateRoute component={InstrucotrCourseAssignmentsPage} allowedRoles={['instructor']} />}
            />
            <Route
              path="/courses/:courseid/assignments/:assignmentid/submissions"
              element={<PrivateRoute component={SubmissionsPage} allowedRoles={['instructor']} />}
            />
            <Route
              path="courses/:courseid/quizzes"
              element={<PrivateRoute component={QuizListPage} allowedRoles={['user']} />}
            />
            <Route
              path="courses/:courseid/instructorquizzes"
              element={<PrivateRoute component={InstructorQuizListPage} allowedRoles={['instructor']} />}
            />
            <Route
              path="/quizzes/:quizId"
              element={<PrivateRoute component={QuizDetailsPage} allowedRoles={['user']} />}
            />

            <Route
              path="/instructorquizzes/:quizId"
              element={<PrivateRoute component={QuizInstructorDetailsPage} allowedRoles={['instructor']} />}
            />
            <Route
              path="/quizzres/:quizId"
              element={<PrivateRoute component={QuizResultPage} allowedRoles={['user']} />}
            />

            <Route
              path="/quizzinsres/:quizId"
              element={<PrivateRoute component={QuizInstructorResultPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses"
              element={<PrivateRoute component={CoursesListPage} allowedRoles={['user']} />}
            />
            <Route
              path="create-profile"
              element={<PrivateRoute component={ProfileFormPage} allowedRoles={['user']} />}
            />
            <Route
              path="enrolledCourses"
              element={<PrivateRoute component={EnrolledCoursesPage} allowedRoles={['user']} />}
            />

            <Route
              path="edit-profile"
              element={<PrivateRoute component={ProfileFormPage} allowedRoles={['user']} />}
            />
            <Route
              path="addcourse"
              element={<PrivateRoute component={AddCoursePage} allowedRoles={['instructor']} />}
            />
            <Route
              path="add-experience"
              element={<PrivateRoute component={AddExperiencePage} allowedRoles={['user']} />}
            />
            <Route
              path="add-Instructor-experience"
              element={<PrivateRoute component={AddInstructorExperiencePage} allowedRoles={['instructor']} />}
            />
            <Route
              path="add-Instructor-education"
              element={<PrivateRoute component={AddInstructorEducationPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="add-education"
              element={<PrivateRoute component={AddEducationPage} allowedRoles={['user']} />}
            />
            <Route path="posts" element={<PrivateRoute component={PostsPage} allowedRoles={['instructor']} />} />
            <Route path="posts/:id" element={<PrivateRoute component={PostPage} allowedRoles={['instructor']} />} />

            <Route
              path="courses/:courseid/content"
              element={<PrivateRoute component={courseContentPageList} allowedRoles={['user']} />}
            />

            <Route
              path="courses/:courseid/enrolledstudents"
              element={<PrivateRoute component={EnrolledStudentsPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses/:courseid/instructorcontent"
              element={<PrivateRoute component={InstructorCourseContentlistPage} allowedRoles={['instructor']} />}
            />


            <Route
              path="courses/:courseid/addmarks"
              element={<PrivateRoute component={AddMarksPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses/:courseid/getmarks"
              element={<PrivateRoute component={GetMarksPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="marks/:markid/getmarks"
              element={<PrivateRoute component={GetMarksByIdPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses/:courseid/updatemarks"
              element={<PrivateRoute component={UpdateMarksPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="courses/:courseid/markscomponent"
              element={<PrivateRoute component={MarksComponentPage} allowedRoles={['user']} />}
            />

            <Route
              path="/courseContent/:contentId"
              element={<PrivateRoute component={CourseContentPage} allowedRoles={['user']} />}
            />
            <Route
              path="/instructorcourseContent/:contentId"
              element={<PrivateRoute component={InstructorCoursecontentpopupPage} allowedRoles={['instructor']} />}
            />

            <Route
              path="/instructorlist"
              element={<PrivateRoute component={InstructorlistPage} allowedRoles={['instructor']} />}
            />

            {/* 
            <Route
              path="/courseContent/:contentId"
              element={<PrivateRoute component={CourseContentPopupPage} />}
            /> */}

          </Routes>
        </Router>
      </Provider>


      {/* <Home/> */}
      {/* <Reading/>       */}
      {/* <Dropdown/> */}
    </div>
  );
}

export default App;
