import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../context/PageTitleContext'
import NavigationCard from '../components/NavigationCard'
import quizImage from '../assets/quizz.webp'
import infoImage from '../assets/info-dokk1.webp'
import newsletterImage from '../assets/news.webp'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { t } = useTranslation()
  usePageTitle('Home')
  return (
    <section>
      <p>
        {t('pages.home.welcome')}
      </p>
      <nav aria-label="Page navigation">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem' }}>
          <NavigationCard
            to="/quiz"
            title={t('navigation.quiz.title')}
            description={t('navigation.quiz.description')}
            image={quizImage}
            imageAlt={t('navigation.quiz.imageAlt')}
          />
          <NavigationCard
            to="/info"
            title={t('navigation.info.title')}
            description={t('navigation.info.description')}
            image={infoImage}
            imageAlt={t('navigation.info.imageAlt')}
          />
          <NavigationCard
            to="/newsletter"
            title={t('navigation.newsletter.title')}
            description={t('navigation.newsletter.description')}
            image={newsletterImage}
            imageAlt={t('navigation.newsletter.imageAlt')}
          />
        </div>
      </nav>
    </section>
  )
}
