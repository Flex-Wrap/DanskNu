import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../context/PageTitleContext'
import { fetchAllQuestions } from '../utils/supabase'
import Quiz, { type QuestionWithAnswers } from '../components/Quiz'

export const Route = createFileRoute('/normal-quizz')({
  component: NormalQuizzPage,
})

function NormalQuizzPage() {
  const { t } = useTranslation()
  usePageTitle('Normal Quiz')
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const { questions: questionsData, answers: answersData } = await fetchAllQuestions()

        const combined: QuestionWithAnswers[] = questionsData.map((q: any) => ({
          question: q,
          answers: answersData.filter((a: any) => a.question_id === q.id),
        }))

        setQuestions(combined)
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  if (loading) {
    return (
      <section>
        <p>{t('common.loadingQuestions')}</p>
      </section>
    )
  }

  return <Quiz questions={questions} />
}
