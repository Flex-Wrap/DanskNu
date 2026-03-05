import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePageTitle } from '../context/PageTitleContext'
import { supabase } from '../utils/supabase'
import ProgressBar from '../components/ProgressBar'
import QuizQuestion from '../components/QuizQuestion'
import QuizResult from '../components/QuizResult'
import styles from './normal-quizz.module.css'

export const Route = createFileRoute('/normal-quizz')({
  component: NormalQuizzPage,
})

interface Question {
  id: string
  question_text: string
}

interface Answer {
  id: string
  question_id: string
  answer_text: string
  is_correct: boolean
}

interface QuestionWithAnswers {
  question: Question
  answers: Answer[]
}

function NormalQuizzPage() {
  usePageTitle('Normal Quiz')
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch all questions
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .order('created_at', { ascending: true })

        if (questionsError) throw questionsError

        // Fetch all answers
        const { data: answersData, error: answersError } = await supabase
          .from('answers')
          .select('*')
          .order('question_id', { ascending: true })

        if (answersError) throw answersError

        // Combine questions with their answers
        const combined: QuestionWithAnswers[] = (questionsData || []).map((q: Question) => ({
          question: q,
          answers: (answersData || []).filter((a: Answer) => a.question_id === q.id),
        }))

        setQuestions(combined)
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].question.id]: answerId,
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Quiz complete
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleAceQuiz = () => {
    const allCorrectAnswers: Record<string, string> = {}
    questions.forEach((q) => {
      const correctAnswer = q.answers.find((a) => a.is_correct)
      if (correctAnswer) {
        allCorrectAnswers[q.question.id] = correctAnswer.id
      }
    })
    setSelectedAnswers(allCorrectAnswers)
    setShowResults(true)
  }

  const handleYellowQuiz = () => {
    const answers: Record<string, string> = {}
    questions.forEach((q, index) => {
      // Select correct answer for first 27 questions
      if (index < 27) {
        const correctAnswer = q.answers.find((a) => a.is_correct)
        if (correctAnswer) {
          answers[q.question.id] = correctAnswer.id
        }
      } else {
        // Select incorrect answer for remaining questions
        const incorrectAnswer = q.answers.find((a) => !a.is_correct)
        if (incorrectAnswer) {
          answers[q.question.id] = incorrectAnswer.id
        }
      }
    })
    setSelectedAnswers(answers)
    setShowResults(true)
  }

  const handleRedQuiz = () => {
    const answers: Record<string, string> = {}
    questions.forEach((q, index) => {
      // Select incorrect answer for first 20 questions
      if (index < 20) {
        const incorrectAnswer = q.answers.find((a) => !a.is_correct)
        if (incorrectAnswer) {
          answers[q.question.id] = incorrectAnswer.id
        }
      } else {
        // Select correct answer for remaining questions
        const correctAnswer = q.answers.find((a) => a.is_correct)
        if (correctAnswer) {
          answers[q.question.id] = correctAnswer.id
        }
      }
    })
    setSelectedAnswers(answers)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      const selectedAnswerId = selectedAnswers[q.question.id]
      const selectedAnswer = q.answers.find((a) => a.id === selectedAnswerId)
      if (selectedAnswer?.is_correct) {
        correct++
      }
    })
    return correct
  }

  if (loading) {
    return (
      <section>
        <p>Loading questions...</p>
      </section>
    )
  }

  if (questions.length === 0) {
    return (
      <section>
        <p>No questions available.</p>
      </section>
    )
  }

  if (showResults) {
    const score = calculateScore()

    return (
      <section>
        <QuizResult
          score={score}
          total={questions.length}
          onTryAgain={() => {
            setCurrentIndex(0)
            setSelectedAnswers({})
            setShowResults(false)
          }}
        />
      </section>
    )
  }

  const currentQuestion = questions[currentIndex]
  const currentAnswers = currentQuestion.answers || []
  const isAnswered = !!selectedAnswers[currentQuestion.question.id]

  return (
    <section>
      <ProgressBar current={currentIndex} total={questions.length} />

      <QuizQuestion
        questionText={currentQuestion.question.question_text}
        answers={currentAnswers}
        selectedAnswerId={selectedAnswers[currentQuestion.question.id]}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className={styles.navigationButtons}>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={styles.previousButton}
          aria-label="Previous question"
        >
          <ChevronLeft size={20} className={styles.icon} />
          <span className={styles.text}>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={styles.nextButton}
          aria-label={currentIndex === questions.length - 1 ? 'Finish quiz' : 'Next question'}
        >
          <span className={styles.text}>{currentIndex === questions.length - 1 ? 'Finish' : 'Next'}</span>
          <ChevronRight size={20} className={styles.icon} />
        </button>
      </div>

      <button
        onClick={handleAceQuiz}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginTop: '2rem',
          border: 'none',
          background: 'transparent',
          color: '#28a745',
          fontSize: '0.75rem',
          cursor: 'pointer',
          opacity: 0.6,
          textDecoration: 'underline',
        }}
      >
        Ace Quiz (Green)
      </button>
      <button
        onClick={handleYellowQuiz}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginTop: '2rem',
          border: 'none',
          background: 'transparent',
          color: '#ffc107',
          fontSize: '0.75rem',
          cursor: 'pointer',
          opacity: 0.6,
          textDecoration: 'underline',
        }}
      >
        Yellow Quiz (27/40)
      </button>
      <button
        onClick={handleRedQuiz}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: 'none',
          background: 'transparent',
          color: '#dc3545',
          fontSize: '0.75rem',
          cursor: 'pointer',
          opacity: 0.6,
          textDecoration: 'underline',
        }}
      >
        Red Quiz (20/40)
      </button>
    </section>
  )
}
