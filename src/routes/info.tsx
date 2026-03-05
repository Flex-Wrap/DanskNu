import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info')({
  component: InfoPage,
})

function InfoPage() {
  return (
    <div>
      <h1>Info Page</h1>
    </div>
  )
}
