import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '../context/PageTitleContext'
import NavigationCard from '../components/NavigationCard'
import quizImage from '../assets/quizz.webp'
import infoImage from '../assets/info-dokk1.webp'
import newsletterImage from '../assets/news.webp'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  usePageTitle('Home')
  return (
    <section>
      <p>
        Welcome to DanskNu. We're here to help you through your integration journey and guide you towards becoming Danish.
      </p>
      <nav aria-label="Page navigation">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem' }}>
          <NavigationCard
            to="/quiz"
            title="Quiz"
            description="Test your knowledge with our interactive quiz"
            image={quizImage}
            imageAlt="Quiz"
          />
          <NavigationCard
            to="/info"
            title="Info"
            description="Learn more about DanskNu and Danish language"
            image={infoImage}
            imageAlt="Info"
          />
          <NavigationCard
            to="/newsletter"
            title="Newsletter"
            description="Subscribe to get updates and tips"
            image={newsletterImage}
            imageAlt="Newsletter"
          />
        </div>
      </nav>
    </section>
  )
}
