import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import InfoCard from '../components/InfoCard'
import NavigationCard from '../components/NavigationCard'
import Modal from '../components/Modal'
import applicationImage from '../assets/application.webp'

export const Route = createFileRoute('/info')({
  component: InfoPage,
})

function InfoPage() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  return (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        <NavigationCard
          to="/application-requirements"
          title="Application Requirements"
          description="Complete list of requirements for Danish citizenship"
          image={applicationImage}
          imageAlt="Application Requirements"
        />

        <InfoCard
          title="Danish Nationality Exam"
          description="Official examination for Danish citizenship applicants"
          daysUntil={45}
          onClick={() => setOpenModal('nationality')}
        />
        <InfoCard
          title="Danish Language Exam"
          description="Proof of Danish language proficiency required for integration"
          daysUntil={30}
          onClick={() => setOpenModal('language')}
        />
        <InfoCard
          title="Naturalization Application"
          description="Submission deadline for citizenship request"
          daysUntil={15}
          onClick={() => setOpenModal('naturalization')}
        />
      </div>

      <Modal
        isOpen={openModal === 'nationality'}
        onClose={() => setOpenModal(null)}
        title="Danish Nationality Exam"
        daysUntil={45}
      >
        <p>
          The Danish Nationality Exam, officially known as the Danish Citizenship Test, assesses your knowledge of Danish culture, history, society, and values. This examination is a crucial step in your path to becoming a Danish citizen.
        </p>
        <h3>Key Information:</h3>
        <ul>
          <li>Duration: Approximately 45 minutes</li>
          <li>Format: Multiple choice questions</li>
          <li>Passing score: 40 out of 60 points</li>
          <li>Cost: DKK 1,000 (approximately €135)</li>
        </ul>
      </Modal>

      <Modal
        isOpen={openModal === 'language'}
        onClose={() => setOpenModal(null)}
        title="Danish Language Exam"
        daysUntil={30}
      >
        <p>
          The Danish Language Exam evaluates your proficiency in reading, writing, listening, and speaking Danish. It's a requirement for demonstrating integration competency and is often required for citizenship applications.
        </p>
        <h3>Key Information:</h3>
        <ul>
          <li>Duration: 3-4 hours depending on the level</li>
          <li>Levels: A2, B1, B2</li>
          <li>Passing score: Minimum B1 level typically required</li>
          <li>Format: Written and oral components</li>
        </ul>
      </Modal>

      <Modal
        isOpen={openModal === 'naturalization'}
        onClose={() => setOpenModal(null)}
        title="Naturalization Application"
        daysUntil={15}
      >
        <p>
          The naturalization process allows you to formally apply for Danish citizenship. This is the final step after meeting all requirements including language proficiency and citizenship test.
        </p>
        <h3>Key Information:</h3>
        <ul>
          <li>Required documents: Passport, language certificate, citizenship test proof</li>
          <li>Processing time: 3-6 months</li>
          <li>Application fee: DKK 2,650 (approximately €355)</li>
          <li>Submit applications to: The Danish Immigration Service</li>
        </ul>
      </Modal>
    </section>
  )
}
