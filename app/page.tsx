import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemCard } from "@/components/item-card";
import { Search, Plus, FileSearch, Heart, Users, Shield } from 'lucide-react';
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  let lostItems = null;
  
  try {
    const supabase = await createClient();
    
    // Fetch recent lost items with category names
    const { data } = await supabase
      .from('lost_items')
      .select(`
        *,
        categories:categoria_id (nome)
      `)
      .eq('status', 'perdido')
      .order('created_at', { ascending: false })
      .limit(6);
    
    lostItems = data;
  } catch (error) {
    // Silently handle errors, page will show empty state
    console.error('Failed to fetch lost items:', error);
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-accent/20 to-background py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Heart className="h-4 w-4" />
              <span>Comunidade de Ajuda Mútua</span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Encontre o que perdeu.<br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Ajude quem procura.
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
              Uma plataforma comunitária para conectar pessoas com seus itens perdidos. 
              Registre, busque e ajude outras pessoas a recuperar o que é importante.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="flex-1 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
                <Link href="/registrar/perdido">
                  <Plus className="mr-2 h-5 w-5" />
                  Registrar Item Perdido
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="flex-1 border-2 transition-all hover:border-primary hover:bg-primary/5">
                <Link href="/registrar/encontrado">
                  <FileSearch className="mr-2 h-5 w-5" />
                  Encontrei Algo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card py-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-2xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Buscar por item, local ou categoria..." 
                className="h-12 border-2 pl-12 text-base transition-all focus:border-primary"
              />
            </div>
            <Button size="lg" className="h-12 px-8">Buscar</Button>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Seguro e Confiável</h3>
              <p className="text-foreground/80">
                Seus dados estão protegidos com segurança de ponta
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Comunidade Ativa</h3>
              <p className="text-foreground/80">
                Milhares de pessoas ajudando umas às outras
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">100% Gratuito</h3>
              <p className="text-foreground/80">
                Sem taxas, sem cobranças, apenas solidariedade
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">Itens Perdidos Recentes</h2>
              <p className="text-lg text-muted-foreground">Ajude alguém a encontrar o que perdeu</p>
            </div>
            <Button variant="outline" size="lg" asChild className="hidden md:flex">
              <Link href="/perdidos">Ver todos</Link>
            </Button>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lostItems && lostItems.length > 0 ? (
              lostItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  titulo={item.titulo}
                  descricao={item.descricao}
                  categoria={item.categories?.nome || 'Outros'}
                  local={item.local_perdido}
                  data={item.data_perdido}
                  imagemUrl={item.imagem_url || undefined}
                  tipo="perdido"
                />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border-2 border-dashed bg-muted/30 py-16 text-center">
                <FileSearch className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium text-muted-foreground">Nenhum item perdido registrado ainda.</p>
                <p className="mt-2 text-sm text-muted-foreground">Seja o primeiro a registrar um item!</p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" size="lg" asChild>
              <Link href="/perdidos">Ver todos os itens</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y bg-gradient-to-br from-primary/5 via-accent/10 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Faça parte da comunidade</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Cadastre-se gratuitamente e ajude a reunir pessoas com seus pertences perdidos.
          </p>
          <Button size="lg" asChild className="shadow-lg shadow-primary/20">
            <Link href="/auth/cadastro">Criar Conta Gratuita</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t bg-card py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Achados e Perdidos. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs text-muted-foreground">Feito com ❤️ para ajudar a comunidade</p>
        </div>
      </footer>
    </div>
  );
}
