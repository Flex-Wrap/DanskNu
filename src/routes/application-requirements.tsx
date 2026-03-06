import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../context/PageTitleContext'
import { AccordionItem } from '../components/Accordion'

export const Route = createFileRoute('/application-requirements')({
  component: ApplicationRequirementsPage,
})

function ApplicationRequirementsPage() {
  const { t } = useTranslation()
  usePageTitle(t('pages.titles.requirements'))
  const content = t('applicationRequirementsContent', { returnObjects: true }) as any

  return (
    <section>
      <AccordionItem title={content.generalInformation.title}>
        {content.generalInformation.paragraphs.map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
      </AccordionItem>

      <AccordionItem title={content.declarationOfAllegiance.title}>
        {content.declarationOfAllegiance.paragraphs.map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
      </AccordionItem>

      <AccordionItem title={content.permanentResidencePermit.title}>
        {content.permanentResidencePermit.paragraphs.map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
      </AccordionItem>

      <AccordionItem title={content.beingResident.title}>
        {content.beingResident.paragraphs.map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
      </AccordionItem>

      <AccordionItem title={content.exemptions.title}>
        {content.exemptions.paragraphs.map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
        <ul>
          {content.exemptions.exemptFromResidencePermit.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>{content.exemptions.residenceNotRequired}</p>
        <ul>
          {content.exemptions.exemptFromResidence.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem title={content.debt.title}>
        {content.debt.paragraphs.map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
        <ul>
          {content.debt.debtTypes.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>{content.debt.finalNote}</p>
      </AccordionItem>
    </section>
  )
}
