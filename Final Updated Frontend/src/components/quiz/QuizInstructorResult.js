import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAttemptedQuizInstructorById } from '../../redux/actions/quizActions';
import { useParams } from 'react-router-dom';

const QuizInstructorResult = ({ fetchAttemptedQuizInstructorById, quiz, loading, error }) => {
  const { quizId } = useParams();

  useEffect(() => {
    // Fetch the attempted quiz data when the component mounts or quizId changes
    fetchAttemptedQuizInstructorById(quizId);
  }, [fetchAttemptedQuizInstructorById, quizId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">No Attempts found for the specified quiz.</p>;
  }

  if (!quiz || !quiz.userHighestScores) {
    return <p className="text-center text-red-600">No Attempts found for the specified quiz.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Quiz Result</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quiz.userHighestScores.map((attempt) => (
          <div
            key={attempt._id}
            className={`flex flex-col bg-${attempt.isPassed ? 'green-200' : 'red-200'} text-${
              attempt.isPassed ? 'green-800' : 'red-800'
            } p-4 rounded-lg shadow-md mb-4`}
          >
            <p className="font-semibold text-lg mb-2">Name: {attempt.user.firstName}</p>
            <p className="font-semibold text-sm text-gray-700 mb-2">Email: {attempt.user.email}</p>
            <p className="font-semibold text-lg mb-2">Score: {attempt.score}</p>
            <p className="font-semibold">
              Passed: {attempt.isPassed ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quiz: state.quiz.instructorQuiz,
  loading: state.quiz.loading,
  error: state.quiz.error,
});

export default connect(mapStateToProps, { fetchAttemptedQuizInstructorById })(QuizInstructorResult);
