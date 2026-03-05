import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { usePageTitle } from '../context/PageTitleContext'
import { supabase } from '../utils/supabase'
import Quiz, { type QuestionWithAnswers } from '../components/Quiz'

export const Route = createFileRoute('/normal-quizz')({
  component: NormalQuizzPage,
})

function NormalQuizzPage() {
  usePageTitle('Normal Quiz')
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .order('created_at', { ascending: true })

        if (questionsError) throw questionsError

        const { data: answersData, error: answersError } = await supabase
          .from('answers')
          .select('*')
          .order('question_id', { ascending: true })

        if (answersError) throw answersError

        const combined: QuestionWithAnswers[] = (questionsData || []).map((q: any) => ({
          question: q,
          answers: (answersData || []).filter((a: any) => a.question_id === q.id),
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

  const handleAceQuiz = () => {
    // Hack button logic - fill all correct answers
    const allCorrectAnswers: Record<string, string> = {}
    questions.forEach((q) => {
      const correctAnswer = q.answers.find((a) => a.is_correct)
      if (correctAnswer) {
        allCorrectAnswers[q.question.id] = correctAnswer.id
      }
    })
  }

  const handleYellowQuiz = () => {
    // Hack button logic - 27 correct, 13 incorrect
    const answers: Record<string, string> = {}
    questions.forEach((q, index) => {
      if (index < 27) {
        const correctAnswer = q.answers.find((a) => a.is_correct)
        if (correctAnswer) {
          answers[q.question.id] = correctAnswer.id
        }
      } else {
        const incorrectAnswer = q.answers.find((a) => !a.is_correct)
        if (incorrectAnswer) {
          answers[q.question.id] = incorrectAnswer.id
        }
      }
    })
  }

  const handleRedQuiz = () => {
    // Hack button logic - 20 correct, 20 incorrect
    const answers: Record<string, string> = {}
    questions.forEach((q, index) => {
      if (index < 20) {
        const incorrectAnswer = q.answers.find((a) => !a.is_correct)
        if (incorrectAnswer) {
          answers[q.question.id] = incorrectAnswer.id
        }
      } else {
        const correctAnswer = q.answers.find((a) => a.is_correct)
        if (correctAnswer) {
          answers[q.question.id] = correctAnswer.id
        }
      }
    })
  }

  if (loading) {
    return (
      <section>
        <p>Loading questions...</p>
      </section>
    )
  }

  return (
    <>
      <Quiz questions={questions} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
        <button
          onClick={handleAceQuiz}
          style={{
            width: '100%',
            padding: '0.5rem',
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
      </div>
    </>
  )
}
