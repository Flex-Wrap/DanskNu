import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../context/PageTitleContext'
import NavigationCard from '../components/NavigationCard'
import quizzImage from '../assets/quizz.webp'
import improveImage from '../assets/improve.webp'

export const Route = createFileRoute('/quiz')({
  component: QuizPage,
})

function QuizPage() {
  const { t } = useTranslation()
  usePageTitle(t('pages.titles.quiz'))
  return (
    <section>
      <p>
        {t('pages.quiz.welcome')}
      </p>
      
      <nav aria-label="Quiz options navigation">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem' }}>
          <NavigationCard
            to="/normal-quizz"
            title={t('navigation.normalQuiz.title')}
            description={t('navigation.normalQuiz.description')}
            image={quizzImage}
            imageAlt={t('navigation.normalQuiz.imageAlt')}
          />
          
          <div style={{ position: 'relative' }}>
            <span style={{ 
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              backgroundColor: 'var(--primary-blue)',
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              zIndex: 10
            }}>
              {t('navigation.improve.badge')}
            </span>
            <NavigationCard
              to="/improve-quizz"
              title={t('navigation.improve.title')}
              description={t('navigation.improve.description')}
              image={improveImage}
              imageAlt={t('navigation.improve.imageAlt')}
            />
          </div>
        </div>
      </nav>
    </section>
  )
}
