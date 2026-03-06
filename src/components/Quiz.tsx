import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProgressBar from './ProgressBar'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import styles from './Quiz.module.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Question {
  id: string
  question_text: string
}

export interface Answer {
  id: string
  question_id: string
  answer_text: string
  is_correct: boolean
}

export interface QuestionWithAnswers {
  question: Question
  answers: Answer[]
}

interface QuizProps {
  questions: QuestionWithAnswers[]
  onComplete?: (selectedAnswers: Record<string, string>, score: number) => void
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

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
      setShowResults(true)
      // Call onComplete callback after quiz is finished
      const finalAnswers = selectedAnswers
      const finalScore = calculateScore()
      setTimeout(() => {
        onComplete?.(finalAnswers, finalScore)
      }, 0)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
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

  const handleTryAgain = () => {
    setCurrentIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  if (questions.length === 0) {
    return (
      <section>
        <p>{t('quiz.noQuestionsAvailable')}</p>
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
          onTryAgain={handleTryAgain}
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
          <span className={styles.text}>{t('quiz.previous')}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={styles.nextButton}
          aria-label={currentIndex === questions.length - 1 ? 'Finish quiz' : 'Next question'}
        >
          <span className={styles.text}>{currentIndex === questions.length - 1 ? t('quiz.finish') : t('quiz.next')}</span>
          <ChevronRight size={20} className={styles.icon} />
        </button>
      </div>
    </section>
  )
}
