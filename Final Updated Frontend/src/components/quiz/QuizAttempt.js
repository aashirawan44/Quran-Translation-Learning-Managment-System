import React from 'react'
import {fetchAttemptedQuizById} from "../../redux/actions/quizActions"
import { useParams } from 'react-router-dom'

const QuizAttempt = ({quiz, loading, error, fetchQuizById}) => {
    const quizId = useParams();
  return (
    <div>QuizAttempt</div>
  )
}

export default QuizAttempt