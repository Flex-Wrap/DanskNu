import { createFileRoute } from '@tanstack/react-router'
import InfoCard from '../components/InfoCard'

export const Route = createFileRoute('/info')({
  component: InfoPage,
})

function InfoPage() {
  return (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        <InfoCard
          title="Danish Nationality Exam"
          description="Official examination for Danish citizenship applicants"
          daysUntil={45}
        />
        <InfoCard
          title="Danish Language Exam"
          description="Proof of Danish language proficiency required for integration"
          daysUntil={30}
        />
        <InfoCard
          title="Naturalization Application"
          description="Submission deadline for citizenship request"
          daysUntil={15}
        />
      </div>
    </section>
  )
}
