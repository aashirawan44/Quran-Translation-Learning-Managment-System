import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAttemptedQuizById } from '../../redux/actions/quizActions';
import { useParams, Link } from 'react-router-dom';

const QuizResult = ({ fetchAttemptedQuizById, quiz, loading, error }) => {
    const { quizId } = useParams();

    useEffect(() => {
        // Fetch the attempted quiz data when the component mounts
        fetchAttemptedQuizById(quizId);
    }, [fetchAttemptedQuizById, quizId]);

    const attemptedData = quiz;

    if (loading) {
        return <p>Loading...</p>;
    }

    

    if (!quiz || !Array.isArray(quiz) || quiz.length === 0) {
        return <p>No Attempts found for the specified quiz.</p>;
    }

    return (
        <div>
            <h2>Quiz Result</h2>
            <div className='flex flex-col justify-center items-center gap-2'>
                {attemptedData.map((attempt) => (
                    <div
                        className='flex flex-col gap-4 text-start w-1/2 block px-4 py-2 bg-[#DEF7EC] hover:bg-green-600 text-[#03543f] hover:text-white rounded-lg'
                        key={attempt.id}
                    >
                        <p>Score: {attempt.attempt.score}</p>
                        <p>Passed: {attempt.attempt.isPassed ? 'Yes' : 'No'}</p>
                    </div>
                ))}
                <Link to={`/quizzes/${quizId}`}
                
                onClick={() => {
    // Reset the time remaining in localStorage when trying again
    localStorage.removeItem(`timeRemaining_${quizId}`);
  }}
                >
                    <button
                        className='bg-[#00cc81] rounded p-2 text-white'
                    >
                        Try Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
    error: state.quiz.error,
});

export default connect(mapStateToProps, { fetchAttemptedQuizById })(QuizResult);
