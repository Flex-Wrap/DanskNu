import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  daysUntil?: number
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, daysUntil, children }: ModalProps) {
  const { t } = useTranslation()
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getDeadlineDate = () => {
    if (!daysUntil) return null
    const today = new Date()
    const deadline = new Date(today.getTime() + daysUntil * 24 * 60 * 60 * 1000)
    return deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.header}>
          <div>
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
            {daysUntil && (
              <p className={styles.date}>{t('common.deadline')}: {getDeadlineDate()}</p>
            )}
          </div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
