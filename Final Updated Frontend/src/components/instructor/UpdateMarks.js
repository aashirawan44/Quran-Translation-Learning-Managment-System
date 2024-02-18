// src/components/instructor/UpdateMarks.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseUsersMarks, deleteMarks } from '../../redux/actions/marks'; // Import the deleteMarks action
import { useParams, Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UpdateMarks = ({ markId }) => {
  const { courseid } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.marks.users);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchCourseUsersMarks(courseid));
  }, [dispatch, courseid]);

  const handleDelete = async (userId) => {
    // Dispatch the deleteMarks action with the user ID
    await dispatch(deleteMarks(userId));
  
    // Fetch the updated list of marks after successful deletion
    dispatch(fetchCourseUsersMarks(courseid));
  };

  return (
    <div className='flex justify-center items-center'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='w-3/4 shadow-lg'>
          <h1 className='text-2xl font-bold mb-4'>Marks Uploaded </h1>
          {users ? (
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-[#DEF7EC]'>
                <tr className=''>
                  <th className='px-6 py-3 text-xs font-medium text-[#03543f] uppercase tracking-wider'>
                    Title
                  </th>
                  <th className='px-6 py-3 text-xs font-medium text-[#03543f] uppercase tracking-wider'>
                    
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                     
                        {user.title}
                      
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Link to={`/${courseid}/edit/marks/${user._id}`} className='text-blue-500 mr-2'>
                        <FaEdit />
                      </Link>
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(user._id)}>
                        <FaTrash />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateMarks;
