import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillKeyboardFill } from 'react-icons/bs'
import { generateQuiz } from '../../redux/actions/search';
import VirtualKeyboard from '../VR keyboard/VirtualKeyboard';

const QuizComponent = () => {
  const dispatch = useDispatch();
//   const quizData = useSelector((state) => state.search.results);
//   console.log(quizData);
const [toggle, setToggle] = useState(false);
const [query, setQuery] = useState('');



  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const handleInputChange = (value) => {
    if (value === 'Backspace') {
        setQuery(query.slice(0, -1));
    } else {
        setQuery(query + value);
    }
};
const handleQueryChange = (e) => {
  setQuery(e.target.value);
};

  const handleGenerateQuiz = async () => {
    setLoading(true);

    try {
      await dispatch(generateQuiz(query));
    } catch (error) {
      console.error('Error generating quiz:', error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Generate Quiz</h1>
      <div className="flex justify-center items-center mb-4">
        <div className="py-4">
          <BsFillKeyboardFill
            className="w-8 h-8 md:w-10 md:h-6 cursor-pointer mr-4"
            onClick={() => {
              setToggle(!toggle);
            }}
          />
        </div>
        <input
          type="text"
          placeholder="Enter a word"
          value={query}
          onChange={handleQueryChange}
          className="border p-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded"
          onClick={handleGenerateQuiz}
          disabled={loading}
        >
          Generate Quiz
        </button>
      </div>
      <div className="flex items-center justify-center">
        {toggle && <VirtualKeyboard onKeyPress={handleInputChange} />}
      </div>
      {loading && <p className="mt-4">Loading...</p>}
    </div>
  );
};

export default QuizComponent;