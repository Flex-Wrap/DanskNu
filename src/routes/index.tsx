import { createFileRoute } from '@tanstack/react-router'
import NavigationCard from '../components/NavigationCard'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      <p>
        Welcome to DanskNu. We're here to help you through your integration journey and guide you towards becoming Danish.
      </p>
      <nav aria-label="Page navigation">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem' }}>
          <NavigationCard
            to="/quiz"
            title="Quiz"
            description="Test your knowledge with our interactive quiz"
          />
          <NavigationCard
            to="/info"
            title="Info"
            description="Learn more about DanskNu and Danish language"
          />
          <NavigationCard
            to="/newsletter"
            title="Newsletter"
            description="Subscribe to get updates and tips"
          />
        </div>
      </nav>
    </div>
  )
}
