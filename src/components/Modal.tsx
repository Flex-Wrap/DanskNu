import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  deadlineDate?: string // ISO format: YYYY-MM-DD
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, deadlineDate, children }: ModalProps) {
  const { t } = useTranslation()
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getFormattedDeadlineDate = () => {
    if (!deadlineDate) return null
    const date = new Date(deadlineDate)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.header}>
          <div>
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
            {deadlineDate && (
              <p className={styles.date}>{t('common.deadline')}: {getFormattedDeadlineDate()}</p>
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
