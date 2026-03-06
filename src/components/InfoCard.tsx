import { useTranslation } from 'react-i18next'
import styles from './InfoCard.module.css'

interface InfoCardProps {
  title: string
  description: string
  deadlineDate: string // ISO format: YYYY-MM-DD
  onClick?: () => void
}

export default function InfoCard({ title, description, deadlineDate, onClick }: InfoCardProps) {
  const { t } = useTranslation()

  const calculateDaysUntil = (deadline: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to start of day for accurate calculation
    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    const timeDiff = deadlineDate.getTime() - today.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    return Math.max(0, daysDiff) // Don't show negative days
  }

  const daysRemaining = calculateDaysUntil(deadlineDate)

  return (
    <article className={styles.card} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.counter}>
        <div className={styles.number}>{daysRemaining}</div>
        <div className={styles.label}>{t('common.days')}</div>
      </div>
    </article>
  )
}
