// components/AddMarks.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseUsers, uploadMarks, fetchTitles } from '../../redux/actions/marks';
import { useParams, Link } from 'react-router-dom';

function AddMarks() {
  const { courseid } = useParams();
  const dispatch = useDispatch();
  const { users, loading, error, assignmentTitles, quizTitles } = useSelector((state) => state.marks);

  const [marksData, setMarksData] = useState({
    title: 'Assignment', // Default title
    totalMarks: 10,       // Default totalMarks as a number
    marksType: 'Quiz',
    students: [],
  });

  const { title, totalMarks, marksType, students } = marksData;

  const [selectedType, setSelectedType] = useState('Quiz');

  useEffect(() => {
    dispatch(fetchCourseUsers(courseid));
    dispatch(fetchTitles(courseid));
  }, [dispatch, courseid]);

  useEffect(() => {
    if (users.length > 0) {
      setMarksData({
        title: 'Assignment',
        totalMarks: 10,
        marksType: 'Quiz',
        students: users.map((user) => ({
          student: user._id,
          obtainedMarks: '', // Default obtainedMarks as an empty string
          comments: '',
        })),
      });
    }
  }, [users]);

  const handleMarksChange = (event, studentIndex, field) => {
    const updatedStudents = [...marksData.students];
    // Convert obtainedMarks to a number using parseInt
    updatedStudents[studentIndex][field] = field === 'obtainedMarks' ? parseInt(event.target.value, 10) : event.target.value;

    setMarksData({
      ...marksData,
      students: updatedStudents,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmptyField = students.some(
      (student) => student.obtainedMarks === '' || student.comments === ''
    );

    if (isEmptyField) {
      alert('Please fill in all fields for each student.');
      return;
    }

    dispatch(uploadMarks(courseid, { ...marksData, marksType: selectedType }))
      .then(() => {
        // Redirect to GetMarks component on success
        // history.push(`/courses/${courseid}/getmarks`);
      })
      .catch((error) => {
        console.error('Error uploading marks:', error);
      });

    setMarksData({
      title: 'Assignment',
      totalMarks: 10,
      marksType: 'Quiz',
      students: users.map((user) => ({
        student: user._id,
        obtainedMarks: '',
        comments: '',
      })),
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='text-lg font-bold mt-4'>Upload Marks</h2>

      {/* Edit Marks Link */}
      <div className='flex flex-col border-2 hover:border-[#03543f] rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-[#DEF7EC] hover:text-[#03543f]'>
        <Link exact to={`/courses/${courseid}/updatemarks`} className='flex flex-row gap-2'>
          <div>Edit Marks</div>
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col border p-2 shadow-lg w-full items-center justify-center mt-6'
      >
        {/* Header Section */}
        <div className='flex flex-col md:flex-row bg-[#00A86B] w-full items-center justify-center p-4 gap-4'>
        <div className='flex flex-row items-center gap-2'>
  <label className='block text-[#DEF7EC] text-sm font-bold mb-2'>Title:</label>
  <input
    name='title'
    value={title}
    onChange={(e) => {
      const selectedValue = e.target.value;
      const extractedTitle = selectedValue.split(': ')[1]; // Extract title without prefix
      setMarksData({ ...marksData, title: extractedTitle });
    }}
    className='border p-2 w-36'
    list='titleOptions'
    placeholder='Type or select a title'
  />
  <datalist id='titleOptions'>
    {assignmentTitles.map((title) => (
      <option key={`assignment_${title}`} value={`Assignment: ${title}`}>
        {`Assignment: ${title}`}
      </option>
    ))}
    {quizTitles.map((title) => (
      <option key={`quiz_${title}`} value={`Quiz: ${title}`}>
        {`Quiz: ${title}`}
      </option>
    ))}
  </datalist>
</div>



          <div className='flex flex-row items-center gap-2'>
            <label className='block text-white text-sm font-bold mb-2'>Total Marks:</label>
            <input
  type='number'
  name='totalMarks'
  value={totalMarks}
  onChange={(e) => {
    const enteredValue = e.target.value;
    
    // Check if the entered value is not negative before updating the state
    if (enteredValue >= 0) {
      setMarksData({ ...marksData, totalMarks: enteredValue });
    }
  }}
  className='border p-2'
/>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <label className='block text-white text-sm font-bold mb-2'>Type:</label>
            <select
              name='type'
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='border p-2'
            >
              <option value='Quiz'>Quiz</option>
              <option value='Assignment'>Assignment</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <table className='w-full'>
          <thead>
            <tr>
              <th className='w-1/6'>No</th>
              <th className='w-1/4'>Student</th>
              <th className='w-1/4'>Father</th>
              <th className='w-1/6'>Obtained Marks</th>
              <th className='w-1/3'>Comments</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.student}>
                <td className='text-center'>{index + 1}</td>
                <td>{users[index] ? users[index].firstName : ''}</td>
                <td>{users[index] ? users[index].lastName : ''}</td>
                <td>
                <input
  type='number'
  value={student.obtainedMarks}
  onChange={(e) => {
    const enteredValue = e.target.value;
    
    // Check if the entered value is not negative before updating the state
    if (enteredValue >= 0) {
      handleMarksChange(e, index, 'obtainedMarks');
    }
  }}
  className='border rounded-lg p-2 w-16'
/>
                </td>
                <td>
                  <textarea
                    value={student.comments}
                    onChange={(e) => handleMarksChange(e, index, 'comments')}
                    className='border rounded-lg p-2'
                    placeholder='Comments'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submit Button */}
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMarks;
