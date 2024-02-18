import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  getVerifiedUsers,
  deleteUser,
  toggleBlockUser,
} from '../../redux/actions/admin';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const VerifiedUser = ({ dispatch, verifiedUsers }) => {
  useEffect(() => {
    dispatch(getVerifiedUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleToggleBlock = (userId, blocked) => {
    dispatch(toggleBlockUser(userId, !blocked));
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 px-12">
      <Link to="/AdminDashboard" className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4">
        Back
      </Link>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Verified Users</h2>
        {verifiedUsers.length === 0 ? (
          <p>No Verified Users Right Now</p>
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
              {verifiedUsers.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.firstName}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleToggleBlock(user._id, user.blocked)}
                      className={`${
                        user.blocked ? 'bg-yellow-500' : 'bg-blue-500'
                      } text-white px-4 py-2 rounded hover:${
                        user.blocked ? 'bg-yellow-600' : 'bg-blue-600'
                      } ml-2`}
                    >
                      {user.blocked ? 'Unblock' : 'Block'}
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
  verifiedUsers: state.admin.verifiedUsers,
});

// Connect the component to the Redux store
export default connect(mapStateToProps)(VerifiedUser);
