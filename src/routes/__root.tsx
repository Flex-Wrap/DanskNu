import { Outlet, createRootRoute } from '@tanstack/react-router'
import BackButton from '../components/BackButton'
import { PageTitleProvider, usePageTitleValue } from '../context/PageTitleContext'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayoutContent() {
  const pageTitle = usePageTitleValue()

  return (
    <div className="app-container">
      <header className="app-header">
        <BackButton />
        <h1 className="page-title">{pageTitle}</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-group">
            <h3 className="footer-label">Contact</h3>
            <a href="mailto:dansknu@org.dk" className="footer-link">dansknu@org.dk</a>
          </div>
          <div className="footer-group">
            <h3 className="footer-label">Support</h3>
            <a href="tel:+4528788114" className="footer-link">+45 28 788 114</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function RootLayout() {
  return (
    <PageTitleProvider>
      <RootLayoutContent />
    </PageTitleProvider>
  )
}
