import { Link } from '@tanstack/react-router'
import styles from './NavigationCard.module.css'

interface NavigationCardProps {
  to: string
  title: string
  description: string
}

export default function NavigationCard({ to, title, description }: NavigationCardProps) {
  return (
    <Link to={to} className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </Link>
  )
}
