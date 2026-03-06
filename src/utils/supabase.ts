import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Debug mode - set to true to limit questions to 10 for testing
const DEBUG = true
const DEBUG_LIMIT = 10

// Quiz fetching helpers
export async function fetchAllQuestions() {
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

  // Debug limit: if DEBUG is true, only return first 10 questions
  let questions = questionsData || []
  if (DEBUG && questions.length > DEBUG_LIMIT) {
    const questionIds = questions.slice(0, DEBUG_LIMIT).map((q: any) => q.id)
    const filteredAnswers = (answersData || []).filter((a: any) => questionIds.includes(a.question_id))
    return {
      questions: questions.slice(0, DEBUG_LIMIT),
      answers: filteredAnswers,
    }
  }

  return {
    questions,
    answers: answersData || [],
  }
}

export async function checkUserExists(email: string) {
  const { data: userResponses, error } = await supabase
    .from('user_responses')
    .select('email')
    .eq('email', email)
    .limit(1)

  if (error) throw error
  return userResponses && userResponses.length > 0
}

export async function fetchWeakAreaQuestions(email: string) {
  // Get user's responses
  const { data: userResponses, error: responsesError } = await supabase
    .from('user_responses')
    .select('*')
    .eq('email', email)

  if (responsesError) throw responsesError

  // Find question IDs with incorrect_count > 0
  const weakAreaQuestionIds = userResponses
    ?.filter((r: any) => r.incorrect_count > 0)
    .map((r: any) => r.question_id) || []

  if (weakAreaQuestionIds.length === 0) {
    return { questions: [], answers: [] }
  }

  // Fetch full question details
  const { data: questionsData, error: questionsError } = await supabase
    .from('questions')
    .select('*')
    .in('id', weakAreaQuestionIds)

  if (questionsError) throw questionsError

  // Fetch answers for these questions
  const { data: answersData, error: answersError } = await supabase
    .from('answers')
    .select('*')
    .in('question_id', weakAreaQuestionIds)

  if (answersError) throw answersError

  // Debug limit: if DEBUG is true, only return first 10 questions
  let questions = questionsData || []
  if (DEBUG && questions.length > DEBUG_LIMIT) {
    const limitedQuestionIds = questions.slice(0, DEBUG_LIMIT).map((q: any) => q.id)
    const filteredAnswers = (answersData || []).filter((a: any) => limitedQuestionIds.includes(a.question_id))
    return {
      questions: questions.slice(0, DEBUG_LIMIT),
      answers: filteredAnswers,
    }
  }

  return {
    questions,
    answers: answersData || [],
  }
}

export async function saveQuizResults(
  email: string,
  questions: Array<{ question: { id: string } }>,
  selectedAnswers: Record<string, string>,
  answers: Array<{ id: string; question_id: string; is_correct: boolean }>
) {
  // Fetch existing responses
  const { data: existingResponses, error: fetchError } = await supabase
    .from('user_responses')
    .select('*')
    .eq('email', email)

  if (fetchError) throw fetchError

  const userExists = existingResponses && existingResponses.length > 0
  const existingMap = new Map(
    (existingResponses || []).map((r: any) => [r.question_id, r])
  )

  // Map questions to response rows
  const responseData = questions.map((q) => {
    const selectedAnswerId = selectedAnswers[q.question.id]
    const selectedAnswer = answers.find((a) => a.id === selectedAnswerId)
    const isCorrect = selectedAnswer?.is_correct ?? false

    if (userExists) {
      const existing = existingMap.get(q.question.id)
      return {
        id: existing?.id,
        email,
        question_id: q.question.id,
        correct_count: isCorrect
          ? (existing?.correct_count ?? 0) + 1
          : existing?.correct_count ?? 0,
        incorrect_count: isCorrect
          ? existing?.incorrect_count ?? 0
          : (existing?.incorrect_count ?? 0) + 1,
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    } else {
      return {
        email,
        question_id: q.question.id,
        correct_count: isCorrect ? 1 : 0,
        incorrect_count: isCorrect ? 0 : 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  })

  // Upsert or insert
  if (userExists) {
    const { error: upsertError } = await supabase
      .from('user_responses')
      .upsert(responseData, { onConflict: 'id' })

    if (upsertError) throw upsertError
  } else {
    const { error: insertError } = await supabase
      .from('user_responses')
      .insert(responseData)

    if (insertError) throw insertError
  }
}
