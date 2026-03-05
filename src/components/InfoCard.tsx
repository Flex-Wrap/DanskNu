import styles from './InfoCard.module.css'

interface InfoCardProps {
  title: string
  description: string
  daysUntil: number
}

export default function InfoCard({ title, description, daysUntil }: InfoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.counter}>
        <div className={styles.number}>{daysUntil}</div>
        <div className={styles.label}>days</div>
      </div>
    </article>
  )
}
