// GetMarks.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCourseUsersMarks,
  get
} from '../../redux/actions/marks';
import { useParams,Link } from 'react-router-dom';

const GetMarks = ({markId}) => {
  const { courseid } = useParams()
  const dispatch = useDispatch();
  const users = useSelector((state) => state.marks.users);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchCourseUsersMarks(courseid));
  }, [dispatch, courseid]);
  // console.log(users);



  return (
    <div className='flex justify-center items-center'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='w-3/4 shadow-lg'>
          <h1 className="text-2xl font-bold mb-4">Student Marks</h1>
          {users ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#DEF7EC]">
                <tr className=''>
                  {/* <th className="px-6 py-3 text-xs font-medium text-[#03543f] uppercase tracking-wider">
                    Student Name
                  </th> */}
                  <th className="px-6 py-3 text-xs font-medium text-[#03543f] uppercase tracking-wider">
                    Title
                  </th>
                  {/* <th className="px-6 py-3 text-xs font-medium text-[#03543f] uppercase tracking-wider">
                    Total Marks
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-[#03543f] uppercase tracking-wider">
                    Obtained Marks
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  
                  <tr key={user.id}>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      {user.students && user.students[0] ? user.students[0].student.firstName : ''}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                    <Link exact to={`/marks/${user._id}/getmarks`} className="flex flex-row gap-2">
        
                      {user.title}
        </Link>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      {user.totalMarks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.students && user.students[0] ? user.students[0].obtainedMarks : ''}
                    </td> */}
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

export default GetMarks;
