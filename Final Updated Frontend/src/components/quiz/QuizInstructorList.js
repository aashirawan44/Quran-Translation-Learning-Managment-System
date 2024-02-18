// components/QuizList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuizzesByCourse, fetchQuizById, fetchAttemptedQuizById,deleteInstructorQuizById } from '../../redux/actions/quizActions';
import { Link, useParams } from 'react-router-dom';
import { MdQuiz } from "react-icons/md"

const QuizInstructorList = ({ quizzes, loading, error, fetchQuizzesByCourse, fetchQuizById, fetchAttemptedQuizById,deleteInstructorQuizById }) => {
    const { courseid } = useParams();
    useEffect(() => {
        fetchQuizzesByCourse(courseid);
    }, [fetchQuizzesByCourse, courseid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDeleteQuizClick = (quizId) => {
        // Dispatch the delete action
        deleteInstructorQuizById(quizId);
        fetchQuizzesByCourse(courseid);
    };
    const handleQuizLinkClick = (quizId, isAttempt) => {
        console.log("Clicked quizId:", quizId);
        console.log("isAttempt:", isAttempt);

        if (isAttempt) {
            fetchAttemptedQuizById(quizId);
        } else {
            fetchQuizById(quizId);
        }
    };

    return (
        <div className='flex justify-center'>

            <div className="flex flex-col py-8 w-1/2">
                <h2 className="text-2xl font-semibold mb-4 text-center">Quiz List</h2>
                <ul className="list-none pl-0">
                    {quizzes.map((quiz) => (
                        <li key={quiz._id} className="mb-2">
                            <div className='flex flex-row justify-between text-start block px-4 py-2 bg-[#DEF7EC] hover:bg-green-600 text-[#03543f] hover:text-white rounded-lg'>

                            <Link
                                to={`/instructorquizzes/${quiz._id}`}
                                className="flex flex-row"
                                
                                >
                                <div className='flex flex-row'>

                                <MdQuiz className='w-8 h-8'/>
                                <span className='text-lg ml-4'>

                                {quiz.title}
                                </span>
                                </div>
                            </Link>
                            
                            <button
                                    onClick={() => handleDeleteQuizClick(quiz._id)}
                                    className='flex  ml-auto bg-red-500 text-white p-2 rounded hover:bg-white hover:text-red-500'
                                >
                                    Delete Quiz
                                </button>
                            <Link to={`/quizzinsres/${quiz._id}`}>
                                <button className='flex ml-4 bg-[#03543f] text-[#DEF7EC] p-2 rounded hover:bg-[#DEF7EC] hover:text-[#03543f]'>View Results</button>
                            </Link>
                                </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    quizzes: state.quiz.quizzes,
    loading: state.quiz.loading,
    error: state.quiz.error,
});

export default connect(mapStateToProps, {deleteInstructorQuizById, fetchQuizzesByCourse, fetchQuizById, fetchAttemptedQuizById })(QuizInstructorList);
