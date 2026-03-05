import { Link } from '@tanstack/react-router'
import styles from './NavigationCard.module.css'

interface NavigationCardProps {
  to: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export default function NavigationCard({ to, title, description, image, imageAlt }: NavigationCardProps) {
  return (
    <Link to={to} className={styles.card}>
      <img 
        src={image} 
        alt={imageAlt} 
        className={styles.image}
        width={400}
        height={150}
        loading="lazy"
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  )
}
