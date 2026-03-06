import { useTranslation } from 'react-i18next'
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const { t } = useTranslation()
  const percentage = ((current + 1) / total) * 100

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        {t('quiz.questionLabel')} {current + 1} / {total}
      </p>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
