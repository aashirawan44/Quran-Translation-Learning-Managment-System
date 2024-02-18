import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseMarks } from '../../redux/actions/marks';
import { useParams } from 'react-router-dom';

const MarksComponent = () => {
  const { courseid } = useParams();
  const dispatch = useDispatch();
  const { marks, loading, error } = useSelector((state) => state.marks);

  useEffect(() => {
    dispatch(fetchCourseMarks(courseid));
  }, [dispatch, courseid]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className='flex items-center justify-center'>

    <div className="p-4 w-3/4">
      <h1 className="text-3xl font-bold mb-4">Course Marks</h1>

      {marks && (
          <>

          <h2 className="text-2xl font-bold mb-4">Quiz:</h2>
          <div className='shadow-lg'>

          <div className='p-4'>
          <div className="grid grid-cols-4 gap-2 mb-2 bg-green-500 p-4">
            <div className="font-semibold">Title</div>
            <div className="font-semibold">Marks</div>
            <div className="font-semibold">Total Marks</div>
            <div className="font-semibold">Comments</div>
          </div>
          </div>
          <ul className=''>
            {marks.quiz.map((quizItem) => (
                <li key={quizItem.title} className="grid grid-cols-4 gap-2 mb-2">
                <div>{quizItem.title}</div>
                <div>{quizItem.obtainedMarks}</div>
                <div>{quizItem.totalMarks}</div>
                <div>{quizItem.comments}</div>
              </li>
            ))}
          </ul>
            </div>

          <h2 className="text-2xl font-bold mt-8">Assignment:</h2>
          <div className='shadow-lg'>
            <div className='p-4'>


          <div className="grid grid-cols-4 gap-2 mb-10 bg-green-500 p-4">
            <div className="font-semibold">Title</div>
            <div className="font-semibold">Marks</div>
            <div className="font-semibold">Total Marks</div>
            <div className="font-semibold">Comments</div>
          </div>
            </div>
          <ul className=''>
            {marks.assignment.map((assignmentItem) => (
                <li key={assignmentItem.title} className="grid grid-cols-4 gap-2 mb-2">
                <div>{assignmentItem.title}</div>
                <div>{assignmentItem.obtainedMarks}</div>
                <div>{assignmentItem.totalMarks}</div>
                <div>{assignmentItem.comments}</div>
              </li>
            ))}
          </ul>
            </div>
        </>
      )}
    </div>
            </div>
  );
};

export default MarksComponent;
