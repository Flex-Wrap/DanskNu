import { createContext, useContext, useState, type ReactNode } from 'react'

interface PageTitleContextType {
  title: string
  setTitle: (title: string) => void
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined)

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('DanskNu')

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  )
}

export function usePageTitle(title: string) {
  const context = useContext(PageTitleContext)
  if (!context) {
    throw new Error('usePageTitle must be used within PageTitleProvider')
  }
  
  // Set title when component mounts
  context.setTitle(title)
  
  return title
}

export function usePageTitleValue() {
  const context = useContext(PageTitleContext)
  if (!context) {
    throw new Error('usePageTitleValue must be used within PageTitleProvider')
  }
  return context.title
}
