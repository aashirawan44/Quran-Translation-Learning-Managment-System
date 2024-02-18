// components/QuizList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuizzesByCourse, fetchQuizById, fetchAttemptedQuizById } from '../../redux/actions/quizActions';
import { Link, useParams } from 'react-router-dom';
import { MdQuiz } from "react-icons/md"

const QuizList = ({ quizzes, loading, error,quiz, fetchQuizzesByCourse, fetchQuizById, fetchAttemptedQuizById }) => {
    const { courseid } = useParams();
    useEffect(() => {
        fetchQuizzesByCourse(courseid);
        quiz=null;
    }, [fetchQuizzesByCourse, courseid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                to={quiz.isAttempt ? `/quizzres/${quiz._id}` : `/quizzes/${quiz._id}`}
                                className="flex flex-row"
                                onClick={() => handleQuizLinkClick(quiz._id, quiz.isAttempt)}
                                >
                                <div className='flex flex-row'>

                                <MdQuiz className='w-8 h-8'/>
                                <span className='text-lg ml-4'>

                                {quiz.title}
                                </span>
                                </div>
                            </Link>
                            <Link to={`/quizzres/${quiz._id}`}
                            >
                                <button className='flex bg-[#03543f] text-[#DEF7EC] p-2 rounded hover:bg-[#DEF7EC] hover:text-[#03543f]'>View Results</button>
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
    quiz: state.quiz.quiz,
});

export default connect(mapStateToProps, { fetchQuizzesByCourse, fetchQuizById, fetchAttemptedQuizById })(QuizList);
