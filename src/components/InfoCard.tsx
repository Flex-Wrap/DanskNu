import { useTranslation } from 'react-i18next'
import styles from './InfoCard.module.css'

interface InfoCardProps {
  title: string
  description: string
  daysUntil: number
  onClick?: () => void
}

export default function InfoCard({ title, description, daysUntil, onClick }: InfoCardProps) {
  const { t } = useTranslation()
  return (
    <article className={styles.card} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.counter}>
        <div className={styles.number}>{daysUntil}</div>
        <div className={styles.label}>{t('common.days')}</div>
      </div>
    </article>
  )
}
