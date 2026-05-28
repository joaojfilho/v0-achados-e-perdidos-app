'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'default' | 'high-contrast' | 'dark-high-contrast'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('accessibility-theme') as Theme
    if (savedTheme) {
      setThemeState(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('accessibility-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Sempre fornece o contexto, mesmo antes da montagem
  // Isso evita erros de SSR quando componentes usam useTheme
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
