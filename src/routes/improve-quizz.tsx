import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { usePageTitle } from '../context/PageTitleContext'
import { 
  checkUserExists, 
  fetchAllQuestions, 
  fetchWeakAreaQuestions, 
  saveQuizResults 
} from '../utils/supabase'
import Quiz, { type QuestionWithAnswers } from '../components/Quiz'
import EmailForm from '../components/EmailForm'

export const Route = createFileRoute('/improve-quizz')({
  component: ImproveQuizzPage,
})

function ImproveQuizzPage() {
  usePageTitle('Improve Quiz')
  const [email, setEmail] = useState<string | null>(null)
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([])
  const [loading, setLoading] = useState(false)
  const [emailFound, setEmailFound] = useState<boolean | null>(null)

  const handleEmailSubmit = async (submittedEmail: string) => {
    setLoading(true)
    setEmail(submittedEmail)

    try {
      const userExists = await checkUserExists(submittedEmail)

      if (!userExists) {
        // Email not found - load normal quiz questions
        setEmailFound(false)
        const { questions: questionsData, answers: answersData } = await fetchAllQuestions()

        const combined: QuestionWithAnswers[] = questionsData.map((q: any) => ({
          question: q,
          answers: answersData.filter((a: any) => a.question_id === q.id),
        }))

        setQuestions(combined)
      } else {
        // Email found - Load weak area questions
        setEmailFound(true)
        const { questions: questionsData, answers: answersData } = await fetchWeakAreaQuestions(submittedEmail)

        const combined: QuestionWithAnswers[] = questionsData.map((q: any) => ({
          question: q,
          answers: answersData.filter((a: any) => a.question_id === q.id),
        }))

        setQuestions(combined)
      }
    } catch (error) {
      console.error('Error during email submission:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuizComplete = async (selectedAnswers: Record<string, string>) => {
    if (!email || questions.length === 0) return

    try {
      await saveQuizResults(email, questions, selectedAnswers, 
        questions.flatMap((q) => q.answers))
      console.log('Quiz results saved successfully')
    } catch (error) {
      console.error('Error saving quiz results:', error)
    }
  }

  if (!email) {
    return (
      <section style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>Improve Your Weak Areas</h2>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Enter your email to see questions from topics you struggled with.
        </p>
        <EmailForm onSubmit={handleEmailSubmit} />
      </section>
    )
  }

  if (loading) {
    return (
      <section>
        <p>Loading quiz...</p>
      </section>
    )
  }

  if (emailFound === false && questions.length > 0) {
    return (
      <>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          No previous results found for this email. Taking a normal quiz to establish a baseline.
        </p>
        <Quiz questions={questions} onComplete={handleQuizComplete} />
      </>
    )
  }

  if (emailFound === true) {
    if (questions.length === 0) {
      return (
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>No Weak Areas Found!</h2>
          <p style={{ color: '#666' }}>
            You've answered all your previous questions correctly. Great job! 🎉
          </p>
        </section>
      )
    }

    return (
      <>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Here are the topics you struggled with before. Let's practice them!
        </p>
        <Quiz questions={questions} onComplete={handleQuizComplete} />
      </>
    )
  }

  return (
    <section>
      <p>Unable to load quiz. Please try again.</p>
    </section>
  )
}
