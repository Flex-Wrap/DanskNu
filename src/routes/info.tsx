import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../context/PageTitleContext'
import InfoCard from '../components/InfoCard'
import NavigationCard from '../components/NavigationCard'
import Modal from '../components/Modal'
import applicationImage from '../assets/application.webp'

export const Route = createFileRoute('/info')({
  component: InfoPage,
})

function InfoPage() {
  const { t } = useTranslation()
  usePageTitle(t('pages.titles.info'))
  const [openModal, setOpenModal] = useState<string | null>(null)
  const modalContent = t('modals', { returnObjects: true }) as any

  return (
    <section>
      <nav aria-label="Info sections navigation">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <NavigationCard
            to="/application-requirements"
            title={t('infoCards.applicationRequirements.title')}
            description={t('infoCards.applicationRequirements.description')}
            image={applicationImage}
            imageAlt={t('infoCards.applicationRequirements.title')}
          />
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1rem' }}>
        <InfoCard
          title={t('infoCards.danishNationalityExam.title')}
          description={t('infoCards.danishNationalityExam.description')}
          deadlineDate="2026-04-20"
          onClick={() => setOpenModal('nationality')}
        />
        <InfoCard
          title={t('infoCards.danishLanguageExam.title')}
          description={t('infoCards.danishLanguageExam.description')}
          deadlineDate="2026-05-15"
          onClick={() => setOpenModal('language')}
        />
        <InfoCard
          title={t('infoCards.naturalizationApplication.title')}
          description={t('infoCards.naturalizationApplication.description')}
          deadlineDate="2026-06-01"
          onClick={() => setOpenModal('naturalization')}
        />
      </div>

      <Modal
        isOpen={openModal === 'nationality'}
        onClose={() => setOpenModal(null)}
        title={modalContent.danishNationalityExam.title}
        deadlineDate="2026-04-20"
      >
        <p>{modalContent.danishNationalityExam.content}</p>
        <h3>{modalContent.danishNationalityExam.keyInformation}</h3>
        <ul>
          {modalContent.danishNationalityExam.items?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Modal>

      <Modal
        isOpen={openModal === 'language'}
        onClose={() => setOpenModal(null)}
        title={modalContent.danishLanguageExam.title}
        deadlineDate="2026-05-15"
      >
        <p>{modalContent.danishLanguageExam.content}</p>
        <h3>{modalContent.danishLanguageExam.keyInformation}</h3>
        <ul>
          {modalContent.danishLanguageExam.items?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Modal>

      <Modal
        isOpen={openModal === 'naturalization'}
        onClose={() => setOpenModal(null)}
        title={modalContent.naturalizationApplication.title}
        deadlineDate="2026-06-01"
      >
        <p>{modalContent.naturalizationApplication.content}</p>
        <h3>{modalContent.naturalizationApplication.keyInformation}</h3>
        <ul>
          {modalContent.naturalizationApplication.items?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Modal>
    </section>
  )
}
