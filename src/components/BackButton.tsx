import { useLocation } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import styles from './BackButton.module.css'

export default function BackButton() {
  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }

  const handleBack = () => {
    window.history.back()
  }

  return (
    <button
      className={styles.backButton}
      onClick={handleBack}
      aria-label="Go back"
    >
      <ChevronLeft size={20} className={styles.arrow} />
      <span className={styles.text}>Back</span>
    </button>
  )
}
