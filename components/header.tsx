'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Plus, User } from 'lucide-react';
import { AccessibilityMenu } from '@/components/accessibility-menu';

interface HeaderProps {
  user?: { id: string } | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Achados e Perdidos</span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Início
          </Link>
          <Link href="/perdidos" className="text-sm font-medium transition-colors hover:text-primary">
            Itens Perdidos
          </Link>
          <Link href="/encontrados" className="text-sm font-medium transition-colors hover:text-primary">
            Itens Encontrados
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <AccessibilityMenu />
          
          {user ? (
            <>
              <Button asChild>
                <Link href="/registrar/perdido">
                  <Plus className="mr-2 h-4 w-4" />
                  Registrar
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="/perfil">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/auth/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/cadastro">Cadastrar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
