import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/item-card";
import { Plus } from 'lucide-react';
import Link from "next/link";
import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default async function MeusItensPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch user's lost items
  const { data: lostItems } = await supabase
    .from('lost_items')
    .select(`
      *,
      categories:categoria_id (nome)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch user's found items
  const { data: foundItems } = await supabase
    .from('found_items')
    .select(`
      *,
      categories:categoria_id (nome)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Meus Itens</h1>
            <p className="text-muted-foreground">Gerencie seus itens perdidos e encontrados</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/registrar/perdido">
                <Plus className="mr-2 h-4 w-4" />
                Item Perdido
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/registrar/encontrado">
                <Plus className="mr-2 h-4 w-4" />
                Item Encontrado
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="perdidos" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="perdidos">
              Itens Perdidos ({lostItems?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="encontrados">
              Itens Encontrados ({foundItems?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perdidos" className="mt-6">
            {lostItems && lostItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {lostItems.map((item) => (
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
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="mb-4 text-muted-foreground">Você ainda não registrou nenhum item perdido.</p>
                <Button asChild>
                  <Link href="/registrar/perdido">Registrar Primeiro Item</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="encontrados" className="mt-6">
            {foundItems && foundItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {foundItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    titulo={item.titulo}
                    descricao={item.descricao}
                    categoria={item.categories?.nome || 'Outros'}
                    local={item.local_encontrado}
                    data={item.data_encontrado}
                    imagemUrl={item.imagem_url || undefined}
                    tipo="encontrado"
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="mb-4 text-muted-foreground">Você ainda não registrou nenhum item encontrado.</p>
                <Button asChild variant="outline">
                  <Link href="/registrar/encontrado">Registrar Primeiro Item</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
