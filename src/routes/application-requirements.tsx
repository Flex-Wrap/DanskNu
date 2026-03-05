import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/application-requirements')({
  component: ApplicationRequirementsPage,
})

function ApplicationRequirementsPage() {
  return (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        <article>
          <h2>General Requirements</h2>
          <ul>
            <li>Must be 18 years or older</li>
            <li>Possess a valid passport or travel document</li>
            <li>Have resided in Denmark for at least 9 years (or 7 years if married to a Danish citizen)</li>
            <li>No serious criminal convictions</li>
          </ul>
        </article>

        <article>
          <h2>Language Requirements</h2>
          <ul>
            <li>Demonstrate proficiency in Danish language (minimum B1 level)</li>
            <li>Pass official Danish language examination</li>
            <li>Or provide proof of Danish language education</li>
          </ul>
        </article>

        <article>
          <h2>Documentation Needed</h2>
          <ul>
            <li>Valid passport or ID document</li>
            <li>Housing contract or property ownership proof</li>
            <li>Employment or education documentation</li>
            <li>Health insurance documentation</li>
            <li>Danish language certificate</li>
            <li>Citizenship test certificate</li>
          </ul>
        </article>

        <article>
          <h2>Financial Requirements</h2>
          <ul>
            <li>Proof of stable income</li>
            <li>No outstanding tax debts</li>
            <li>Payment of application fees (approximately DKK 2,650)</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
