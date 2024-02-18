import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorQuizById, updateQuiz } from '../../redux/actions/quizActions';
import { useParams } from 'react-router-dom';

const QuizInstructorDetails = () => {
    const { quizId } = useParams()
    
    const dispatch = useDispatch();
    const quiz = useSelector(state => state.quiz.quiz); // Assuming you store the instructor quiz data in 'instructorQuiz' state
    const [isEditMode, setIsEditMode] = useState(false);

    const [editedQuizData, setEditedQuizData] = useState(quiz || null); // Maintain local state for edited data

    const handleSaveClick = () => {
        // Call updateQuiz action with editedQuizData
        dispatch(updateQuiz(quizId, editedQuizData));
        setIsEditMode(false); // Exit edit mode after saving
         dispatch(fetchInstructorQuizById(quizId));
    };

    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
        setEditedQuizData(quiz);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchInstructorQuizById(quizId));
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchData();
    }, [dispatch, quizId]);

    // useEffect(() => {
    //     if (quiz) {
    //         setEditedQuizData(quiz); // Set editedQuizData when quiz data is available
    //     } else {
    //         dispatch(fetchInstructorQuizById(quizId));
    //     }
    // }, [dispatch, quizId, quiz]);

    useEffect(() => {
        if (quiz) {
            // Create a copy of the quiz object and make sure it has a questions array
            const updatedQuizData = {
                ...quiz,
                questions: quiz.questions || [], // Ensure questions property is an array or initialize it as an empty array
            };
            setEditedQuizData(updatedQuizData);
        } else {
            dispatch(fetchInstructorQuizById(quizId));
        }
    }, [dispatch, quizId, quiz]);
    

    const handleInputChange = (e, questionIndex, property, isOption) => {
        const { name, value } = e.target;
    
        // Create a copy of the editedQuizData
        const updatedQuizData = { ...editedQuizData };
    
        // If updating mapped fields (questions and options)
        if (questionIndex !== undefined && property !== undefined) {
            if (isOption) {
                updatedQuizData.questions[questionIndex].options[property].option = value;
            } else {
                updatedQuizData.questions[questionIndex][property] = value;
            }
        } else {
            // If updating non-mapped fields (like title, timeLimit, passingScore, etc.)
            updatedQuizData[name] = value;
        }
    
        // Update the state with the modified data
        setEditedQuizData(updatedQuizData);
    };
    
    


    if (!quiz && !editedQuizData) {
        return <div>Loading quiz data...</div>; // Display loading message while quiz data is being fetched
    }

    return (
        <div className="container mx-auto mt-8">

            {isEditMode ? (
                <div className="bg-white p-8 rounded shadow">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={editedQuizData.title}
                        onChange={handleInputChange}
                        className="mb-4 p-2 w-full"
                    />
                    <label>Time Limit (minutes):</label>
                    <input
                        type="number"
                        name="timeLimit"
                        value={editedQuizData.timeLimit}
                        onChange={handleInputChange}
                        className="mb-4 p-2 w-full"
                    />
                    <label>Passing Score:</label>
                    <input
                        type="number"
                        name="passingScore"
                        value={editedQuizData.passingScore}
                        onChange={handleInputChange}
                        className="mb-4 p-2 w-full"
                    />

                    <h3 className="text-xl font-semibold mt-6 mb-2">Questions:</h3>
                    {editedQuizData.questions.map((question, questionIndex) => (
                        <div key={question._id} className="mb-4">
                            <label>Question {questionIndex + 1}:</label>
                            <input
                                type="text"
                                name={`questions[${questionIndex}].text`}
                                value={question.text}
                                onChange={(e) => handleInputChange(e, questionIndex, 'text')}
                                className="mb-2 p-2 w-full"
                            />

                            <label>Options:</label>
                            {question.options.map((option, optionIndex) => (
                                <div key={option._id}>
                                    <input
                                        type="text"
                                        name={`questions[${questionIndex}].options[${optionIndex}].option`}
                                        value={option.option}
                                        onChange={(e) => handleInputChange(e, questionIndex, optionIndex, 'isOption')}
                                        className="mb-2 p-2 w-full"
                                    />

                                </div>
                            ))}
                            <label>Correct Option:</label>
                            <input
                                type="number"
                                name={`questions[${questionIndex}].correctOption`}
                                value={question.correctOption}
                                onChange={handleInputChange}
                                className="mb-2 p-2 w-full"
                            />
                            <label>Marks:</label>
                            <input
                                type="number"
                                name={`questions[${questionIndex}].marks`}
                                value={question.marks}
                                onChange={handleInputChange}
                                className="mb-4 p-2 w-full"
                            />
                        </div>
                    ))}

                    <button onClick={handleSaveClick} className="bg-green-500 text-white px-4 py-2 rounded mt-4 mr-4">
                        Save
                    </button>
                    <button onClick={handleEditClick} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="bg-white p-8 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">{quiz.title}</h2>
                    <p>Course: {quiz.course}</p>
                    <p>Instructor: {quiz.instructor}</p>
                    <p>Time Limit: {quiz.timeLimit} minutes</p>
                    <p>Passing Score: {quiz.passingScore}</p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Questions:</h3>
                   
                    <ul>
                        {quiz?.questions?.map(question => (
                            <li key={question._id} className="mb-4">
                                <p className="font-semibold">{question.text}</p>
                                <ul className="ml-4">
                                    {question.options.map(option => (
                                        <li key={option._id}>{option.option}</li>
                                    ))}
                                </ul>
                                <p>Correct Option: {question.correctOption}</p>
                                <p>Marks: {question.marks}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                        Edit
                    </button>
                </div>

            )}






        </div>
    );
};

export default QuizInstructorDetails;
