import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        Question {current + 1} / {total}
      </p>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
