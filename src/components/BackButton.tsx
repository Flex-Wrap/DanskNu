import { useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ChevronLeft } from 'lucide-react'
import styles from './BackButton.module.css'

export default function BackButton() {
  const { t } = useTranslation()
  const location = useLocation()
  const isOnHomePage = location.pathname === '/'

  const handleBack = () => {
    window.history.back()
  }

  return (
    <button
      className={styles.backButton}
      onClick={handleBack}
      disabled={isOnHomePage}
      aria-label="Go back"
    >
      <ChevronLeft size={20} className={styles.arrow} />
      <span className={styles.text}>{t('common.back')}</span>
    </button>
  )
}
