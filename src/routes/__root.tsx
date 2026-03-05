import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import BackButton from '../components/BackButton'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const location = useLocation()

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Home'
      case '/quiz':
        return 'Quiz'
      case '/info':
        return 'Info'
      case '/newsletter':
        return 'Newsletter'
      default:
        return 'DanskNu'
    }
  }

  return (
    <div>
      <header className="app-header">
        <BackButton />
        <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
