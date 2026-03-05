import { Outlet, Link, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
        <Link to="/">Home</Link> | <Link to="/quiz">Quiz</Link> | <Link to="/info">Info</Link> | <Link to="/newsletter">Newsletter</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  ),
})
