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

  if (loading) {
    return (
      <section>
        <p>Loading questions...</p>
      </section>
    )
  }

  return <Quiz questions={questions} />
}
