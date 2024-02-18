// AdminCourse.js

import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { getCourses, deleteCourse } from '../../redux/actions/admin'; // Update import statement
import { Link } from 'react-router-dom';

const AdminCourse = ({ dispatch, courses }) => {
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 px-12">
      <Link
        to="/AdminDashboard"
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4"
      >
        Back
      </Link>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Instructor Name</th>
              <th className="py-2 px-4 border-b">Instructor Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="py-2 px-4 border-b">{course.name}</td>
                <td className="py-2 px-4 border-b">{course.instructorName}</td>
                <td className="py-2 px-4 border-b">{course.instructorEmail}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.admin.courses,
});

// Connect the component to the Redux store
export default connect(mapStateToProps)(AdminCourse);
