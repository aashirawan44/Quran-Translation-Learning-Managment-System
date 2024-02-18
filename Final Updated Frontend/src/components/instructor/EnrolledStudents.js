import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEnrolledStudents, deleteEnrolledStudent } from '../../redux/actions/enrollment';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EnrolledStudents = ({
  getEnrolledStudents,
  deleteEnrolledStudent,
  enrolledStudents,
}) => {
  const { courseid } = useParams();

  useEffect(() => {
    getEnrolledStudents(courseid);
  }, [getEnrolledStudents, courseid]);

  const handleDelete = (studentId) => {
    deleteEnrolledStudent(courseid, studentId);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Enrolled Students List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Profile Picture</th>
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((student) => (
              <tr key={student.user} className="hover:bg-gray-100">
                <td className="border p-2">
                  <img
                    src={student.profilepicture}
                    alt={student.userName}
                    className="h-16 w-16 object-cover rounded-full border border-gray-400 mx-auto"
                  />
                </td>
                <td className="border p-2">{student.userName}</td>
                <td className="border p-2">{student.email}</td>
                <td className="border p-2 flex flex-col items-center">
                  <Link to={`/userprofile/${student.profileId}`}>
                    <button
                      className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                      title={student.profileId}
                    >
                      View Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(student.user)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

EnrolledStudents.propTypes = {
  enrolledStudents: PropTypes.array.isRequired,
  getEnrolledStudents: PropTypes.func.isRequired,
  deleteEnrolledStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  enrolledStudents: state.enrollment.enrollments,
});

const mapDispatchToProps = {
  getEnrolledStudents,
  deleteEnrolledStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrolledStudents);
