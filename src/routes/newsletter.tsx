import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/newsletter')({
  component: NewsletterPage,
})

function NewsletterPage() {
  return (
    <div>
      <h1>Newsletter Page</h1>
    </div>
  )
}
