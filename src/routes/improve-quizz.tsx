import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { usePageTitle } from '../context/PageTitleContext'
import { supabase } from '../utils/supabase'
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
      // Check if email exists in user_responses
      const { data: userResponses, error: checkError } = await supabase
        .from('user_responses')
        .select('email')
        .eq('email', submittedEmail)
        .limit(1)

      if (checkError) throw checkError

      const userExists = userResponses && userResponses.length > 0

      if (!userExists) {
        // Email not found - load normal quiz questions
        setEmailFound(false)
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
      } else {
        // Email found - TODO: Load weak area questions
        setEmailFound(true)
        // TODO: Fetch questions based on weak areas
      }
    } catch (error) {
      console.error('Error checking email:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuizComplete = async (selectedAnswers: Record<string, string>, score: number) => {
    if (!email || questions.length === 0) return

    try {
      // Calculate correct and incorrect counts
      let correctCount = 0
      let incorrectCount = 0

      questions.forEach((q) => {
        const selectedAnswerId = selectedAnswers[q.question.id]
        const selectedAnswer = q.answers.find((a) => a.id === selectedAnswerId)
        if (selectedAnswer?.is_correct) {
          correctCount++
        } else {
          incorrectCount++
        }
      })

      // Save to database - insert or update user response
      const { error } = await supabase.from('user_responses').insert([
        {
          email,
          correct_count: correctCount,
          incorrect_count: incorrectCount,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) throw error
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
    return (
      <section>
        <p>TODO: Show personalized weak areas quiz for {email}</p>
      </section>
    )
  }

  return (
    <section>
      <p>Unable to load quiz. Please try again.</p>
    </section>
  )
}
