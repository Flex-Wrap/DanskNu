import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'flag-icons/css/flag-icons.min.css'
import styles from './LanguageSwitcher.module.css'

interface Language {
  code: string
  name: string
  flagCode: string
}

const LANGUAGES: Language[] = [
  { code: 'da', name: 'Dansk', flagCode: 'dk' },
  { code: 'en', name: 'English', flagCode: 'gb' },
  { code: 'de', name: 'Deutsch', flagCode: 'de' },
  { code: 'pl', name: 'Polski', flagCode: 'pl' },
  { code: 'es', name: 'Español', flagCode: 'es' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0]

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.label}>{currentLanguage.name}</span>
        <span className={`fi fi-${currentLanguage.flagCode}`} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === i18n.language}>
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className={`${styles.option} ${lang.code === i18n.language ? styles.active : ''}`}
              >
                <span>{lang.name}</span>
                <span className={`fi fi-${lang.flagCode}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
