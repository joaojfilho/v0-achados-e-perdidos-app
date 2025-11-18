'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Accessibility, Check } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export function AccessibilityMenu() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: 'default' as const, label: 'Padrão', description: 'Design moderno e colorido' },
    { value: 'high-contrast' as const, label: 'Alto Contraste Claro', description: 'Melhor legibilidade em fundo claro' },
    { value: 'dark-high-contrast' as const, label: 'Alto Contraste Escuro', description: 'Melhor legibilidade em fundo escuro' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9 transition-colors hover:bg-primary/10 hover:text-primary"
          aria-label="Opções de acessibilidade"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-base">Acessibilidade</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className="flex items-start gap-3 cursor-pointer py-3"
          >
            <div className="flex h-5 w-5 items-center justify-center">
              {theme === themeOption.value && <Check className="h-4 w-4 text-primary" />}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{themeOption.label}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {themeOption.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
