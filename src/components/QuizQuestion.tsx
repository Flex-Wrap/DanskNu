import styles from './QuizQuestion.module.css'

interface Answer {
  id: string
  answer_text: string
  is_correct: boolean
}

interface QuizQuestionProps {
  questionText: string
  answers: Answer[]
  selectedAnswerId?: string
  onAnswerSelect: (answerId: string) => void
}

export default function QuizQuestion({
  questionText,
  answers,
  selectedAnswerId,
  onAnswerSelect,
}: QuizQuestionProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{questionText}</h3>

      <div className={styles.answersContainer}>
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onAnswerSelect(answer.id)}
            className={`${styles.answerButton} ${
              selectedAnswerId === answer.id ? styles.selected : ''
            }`}
          >
            {answer.answer_text}
          </button>
        ))}
      </div>
    </div>
  )
}
