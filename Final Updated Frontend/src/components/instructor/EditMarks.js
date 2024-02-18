import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMarkById, editMarks } from '../../redux/actions/marks';

function EditMarks() {
  const { marksId } = useParams();
  const dispatch = useDispatch();
  const { mark, loading, error } = useSelector((state) => state.marks);

  const [marksData, setMarksData] = useState({
    title: '',
    totalMarks: 0,
    marksType: '',
    students: [],
  });

  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    dispatch(fetchMarkById(marksId));
  }, [dispatch, marksId]);

  useEffect(() => {
    if (mark) {
      setMarksData({
        title: mark.title,
        totalMarks: mark.totalMarks,
        marksType: mark.marksType,
        students: mark.students,
      });
      setSelectedType(mark.marksType);
    }
  }, [mark]);

  const handleMarksChange = (event, studentIndex, field) => {
    const updatedStudents = [...marksData.students];
    updatedStudents[studentIndex][field] =
      field === 'obtainedMarks' ? parseInt(event.target.value, 10) : event.target.value;

    setMarksData({
      ...marksData,
      students: updatedStudents,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudents = marksData.students.map((student) => {
      return {
        student: student.student._id, // Assuming _id is the student ID
        obtainedMarks: student.obtainedMarks,
        comments: student.comments,
      };
    });

    const updatedMarksData = {
      title: marksData.title,
      totalMarks: marksData.totalMarks,
      marksType: selectedType, // Use the selectedType state
      students: updatedStudents,
    };

    dispatch(editMarks(marksId, updatedMarksData))
      .then(() => {
        // Redirect or handle success as needed
      })
      .catch((error) => {
        console.error('Error updating marks:', error);
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
      <h2 className='text-lg font-bold mt-4'>Edit Marks</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col border p-2 shadow-lg w-full items-center justify-center mt-6'
      >
        {/* Header Section */}
        <div className='flex flex-col md:flex-row bg-[#00A86B] w-full items-center justify-center p-4 gap-4'>
          <div className='flex flex-row items-center gap-2'>
            <label className='block text-[#DEF7EC] text-sm font-bold mb-2'>Title:</label>
            <div className='border p-2 w-36 bg-gray-100 rounded-md'>
              <span className='text-gray-700 font-semibold'>{marksData.title}</span>
            </div>
          </div>

          <div className='flex flex-row items-center gap-2'>
            <label className='block text-white text-sm font-bold mb-2'>Total Marks:</label>
            <input
              type='number'
              name='totalMarks'
              value={marksData.totalMarks}
              onChange={(e) => setMarksData({ ...marksData, totalMarks: e.target.value })}
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
              <th className='w-1/6'>Obtained Marks</th>
              <th className='w-1/3'>Comments</th>
            </tr>
          </thead>
          <tbody>
            {marksData.students.map((student, index) => (
              <tr key={student._id}>
                <td className='text-center'>{index + 1}</td>
                <td>{student.student.firstName}</td>
                <td>
                  <input
                    type='number'
                    value={student.obtainedMarks}
                    onChange={(e) => handleMarksChange(e, index, 'obtainedMarks')}
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditMarks;

