import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({ routeTree, basepath: '/DanskNu' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Handle GitHub Pages 404 redirect
function handleGitHubPagesRedirect() {
  const params = new URLSearchParams(window.location.search)
  const redirectPath = params.get('p')
  
  if (redirectPath) {
    // Decode the path (replace ~and~ back to &)
    const cleanPath = redirectPath.replace(/~and~/g, '&')
    // Remove the redirect params and navigate
    window.history.replaceState(null, '', cleanPath)
  }
}

handleGitHubPagesRedirect()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
