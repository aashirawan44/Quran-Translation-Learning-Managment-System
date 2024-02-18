import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  getVerifiedInstructors,
  deleteInstructor,
  toggleBlockInstructor,
} from '../../redux/actions/admin';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const VerifiedInstructor = ({ dispatch, verifiedInstructors }) => {
  useEffect(() => {
    dispatch(getVerifiedInstructors());
  }, [dispatch]);

  const handleDelete = (instructorId) => {
    dispatch(deleteInstructor(instructorId));
  };

  const handleToggleBlock = (instructorId, blocked) => {
    dispatch(toggleBlockInstructor(instructorId, !blocked));
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 px-12">
      <Link to="/AdminDashboard" className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4">
        Back
      </Link>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Verified Instructors</h2>
        {verifiedInstructors.length === 0 ? (
          <p>No Instructors Right Now</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {verifiedInstructors.map((instructor) => (
                <tr key={instructor._id}>
                  <td className="py-2 px-4 border-b">{instructor.firstName}</td>
                  <td className="py-2 px-4 border-b">{instructor.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(instructor._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleToggleBlock(instructor._id, instructor.blocked)}
                      className={`${
                        instructor.blocked ? 'bg-yellow-500' : 'bg-blue-500'
                      } text-white px-4 py-2 rounded hover:${
                        instructor.blocked ? 'bg-yellow-600' : 'bg-blue-600'
                      } ml-2`}
                    >
                      {instructor.blocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  verifiedInstructors: state.admin.verifiedInstructors,
});

// Connect the component to the Redux store
export default connect(mapStateToProps)(VerifiedInstructor);
