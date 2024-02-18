import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizById, attemptQuiz } from '../../redux/actions/quizActions';
import { useNavigate, useParams } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector(state => state.quiz.quiz);
  const loading = useSelector(state => state.quiz.loading);
  const error = useSelector(state => state.quiz.error);

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    dispatch(fetchQuizById(quizId));
  }, [dispatch, quizId]);

  useEffect(() => {
    if (quiz && quiz.timeLimit) {
      const storedTime = localStorage.getItem(`timeRemaining_${quizId}`);
      setTimeRemaining(storedTime ? parseInt(storedTime, 10) : quiz.timeLimit * 60);
 // Convert minutes to seconds
    }
  }, [quiz]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining !== null && timeRemaining > 0) {
        localStorage.setItem(`timeRemaining_${quizId}`, timeRemaining.toString());
        setTimeRemaining(timeRemaining - 1);
      } else if (timeRemaining === 0) {
        handleSubmitQuiz();
      }
    }, 1000); // Update every second

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setUserAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: optionIndex }));
  };

 // Inside handleSubmitQuiz function in QuizDetails component
const handleSubmitQuiz = async () => {
  let totalScore = 0;
  const answersData = [];

  quiz.questions.forEach(question => {
      const userSelectedOptionIndex = userAnswers[question._id];
      if (userSelectedOptionIndex === question.correctOption) {
          totalScore += question.marks;
      }

      answersData.push({
          question: question._id,
          selectedOption: userSelectedOptionIndex,
      });
  });

  const quizAttemptData = {
      answers: answersData,
  };

  try {
    localStorage.removeItem(`timeRemaining_${quizId}`);
      await dispatch(attemptQuiz(quizId, quizAttemptData));
      await dispatch(fetchQuizById(quizId)); // Fetch the quiz details again
      setScore(totalScore);
      setTimeRemaining(quiz.timeLimit * 60);
      navigate(`/quizzres/${quizId}`);
      
  } catch (error) {
      console.error("Error submitting quiz:", error);
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      {quiz ? (
        <>
          <h2 className="text-3xl font-semibold mb-4">{quiz.title}</h2>
          <div className="fixed top-20 left-0 bg-red-500 p-4 shadow-md z-50">
            <h4 className="text-1xl font-semibold mb-2 text-white">Time Remaining</h4>
            {/* Display time remaining */}
            <div className=" text-white">{formatTime(timeRemaining)}</div>
          </div>
          <div className="mt-16"> {/* Adjust margin-top to create space below fixed time limit */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ul>
                {quiz.questions && quiz.questions.map((question, index) => (
                  <li key={question._id} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{question.text}</h3>
                    <ol className="list-decimal pl-4">
                      {question.options.map((option, optionIndex) => (
                        <li key={option._id} className="mb-2">
                          <button
                            className={`${
                              userAnswers[question._id] === optionIndex
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700'
                            } px-2 py-1 rounded`}
                            onClick={() => handleOptionSelect(question._id, optionIndex)}
                            disabled={score > 0}
                          >
                            {String.fromCharCode(97 + optionIndex)}) {option.option}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default QuizDetails;
