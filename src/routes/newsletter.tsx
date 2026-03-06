import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../context/PageTitleContext'

export const Route = createFileRoute('/newsletter')({
  component: NewsletterPage,
})

function NewsletterPage() {
  const { t } = useTranslation()
  usePageTitle(t('pages.titles.newsletter'))

  return (
    <section style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚧 Under Construction 🚧</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          We're building something exciting!
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px', 
        padding: '2rem',
        textAlign: 'left'
      }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>📰 Coming Soon:</h2>
        
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Your personalized news feed will bring the latest Danish citizenship-related news and updates from trusted sources:
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🇩🇰 DR (Danmarks Radio)
          </h3>
          <p style={{ color: '#666', marginLeft: '1.5rem' }}>
            Denmark's national public broadcasting corporation
          </p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📺 TV2
          </h3>
          <p style={{ color: '#666', marginLeft: '1.5rem' }}>
            Major Danish television broadcaster
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🌐 BCC
          </h3>
          <p style={{ color: '#666', marginLeft: '1.5rem' }}>
            International news source for global perspectives
          </p>
        </div>
      </div>

      <p style={{ marginTop: '2rem', color: '#999', fontSize: '0.9rem' }}>
        Check back soon for curated news updates! 📬
      </p>
    </section>
  )
}
