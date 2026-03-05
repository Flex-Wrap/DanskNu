import { useState, type FormEvent } from 'react'
import styles from './EmailForm.module.css'

interface EmailFormProps {
  onSubmit?: (email: string) => void
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
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
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={styles.input}
          required
          aria-required="true"
          aria-describedby="email-help"
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Start Quiz
      </button>
    </form>
  )
}
