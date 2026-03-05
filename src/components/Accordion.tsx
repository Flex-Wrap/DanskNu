import { useState } from 'react'
import styles from './Accordion.module.css'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.item}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={`${styles.icon} ${isOpen ? styles.open : ''}`}></div>
        <span className={styles.title}>{title}</span>
      </button>
      {isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  )
}
