import styles from './QuizResult.module.css'

interface QuizResultProps {
  score: number
  total: number
  onTryAgain: () => void
}

export default function QuizResult({ score, total, onTryAgain }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100)

  const getResultType = () => {
    if (percentage >= 75) return 'success'
    if (percentage >= 50) return 'warning'
    return 'failure'
  }

  const getEncouragementMessage = () => {
    if (resultType === 'success') {
      return 'Great result! But stay sharp!'
    }
    if (resultType === 'warning') {
      return 'Almost there! You got this!'
    }
    return 'This is what quizzes are for! Keep practicing!'
  }

  const resultType = getResultType()
  const encouragementMessage = getEncouragementMessage()

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Quiz Complete!</h2>

      <div className={`${styles.iconContainer} ${styles[resultType]}`}>
        {resultType === 'success' && (
          <div className={styles.checkmark} />
        )}
        {resultType === 'warning' && (
          <div className={styles.minus} />
        )}
        {resultType === 'failure' && (
          <div className={styles.x} />
        )}
      </div>

      <p className={styles.encouragement}>{encouragementMessage}</p>

      <div className={styles.scoreSection}>
        <h3 className={styles.scoreLabel}>Your Score</h3>
        <p className={styles.score}>
          {score} / {total}
        </p>
        <p className={styles.percentage}>({percentage}%)</p>
      </div>

      <button onClick={onTryAgain} className={styles.tryAgainButton}>
        Try Again
      </button>
    </section>
  )
}
