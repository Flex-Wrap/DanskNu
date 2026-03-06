import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EmailForm.module.css'

interface EmailFormProps {
  onSubmit?: (email: string) => void
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.trim()) {
      onSubmit?.(email)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          {t('forms.emailForm.emailLabel')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('forms.emailForm.emailPlaceholder')}
          className={styles.input}
          required
          aria-required="true"
          aria-describedby="email-help"
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        {t('forms.emailForm.submitButton')}
      </button>
    </form>
  )
}
