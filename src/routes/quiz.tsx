import { createFileRoute } from '@tanstack/react-router'
import NavigationCard from '../components/NavigationCard'
import quizzImage from '../assets/quizz.webp'
import improveImage from '../assets/improve.webp'

export const Route = createFileRoute('/quiz')({
  component: QuizPage,
})

function QuizPage() {
  return (
    <section>
      <p>
        Welcome to the Quiz. Here you can practice for the Danish citizenship exam. Test your knowledge of Danish culture, history, society, and values.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem' }}>
        <NavigationCard
          to="/quiz"
          title="Take a Normal Quiz"
          description="Test your knowledge with a random selection of citizenship exam questions"
          image={quizzImage}
          imageAlt="Take a Normal Quiz"
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
            Email Required
          </span>
          <NavigationCard
            to="/quiz"
            title="Improve Your Weak Areas"
            description="Take a personalized quiz based on your previous results"
            image={improveImage}
            imageAlt="Improve Your Weak Areas"
          />
        </div>
      </div>
    </section>
  )
}
