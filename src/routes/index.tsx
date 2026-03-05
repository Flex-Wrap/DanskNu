import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to DanskNu</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/quiz" style={{ padding: '1rem', backgroundColor: '#007bff', color: '#fff', textAlign: 'center', borderRadius: '0.375rem', textDecoration: 'none' }}>Go to Quiz</Link>
        <Link to="/info" style={{ padding: '1rem', backgroundColor: '#007bff', color: '#fff', textAlign: 'center', borderRadius: '0.375rem', textDecoration: 'none' }}>Go to Info</Link>
        <Link to="/newsletter" style={{ padding: '1rem', backgroundColor: '#007bff', color: '#fff', textAlign: 'center', borderRadius: '0.375rem', textDecoration: 'none' }}>Go to Newsletter</Link>
      </div>
    </div>
  )
}
