import { Header } from "@/components/header";
import { AuthNav } from "@/components/auth-nav";
import { ItemCard } from "@/components/item-card";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { createClient } from "@/lib/supabase/server";

export default async function EncontradosPage() {
  const supabase = await createClient();
  
  // Fetch all found items
  const { data: foundItems } = await supabase
    .from('found_items')
    .select(`
      *,
      categories:categoria_id (nome)
    `)
    .eq('status', 'disponivel')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen">
      <Header>
        <AuthNav />
      </Header>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Itens Encontrados</h1>
          <p className="text-muted-foreground">
            Veja se alguém encontrou o que você perdeu
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar itens encontrados..." 
              className="pl-10"
            />
          </div>
        </div>

        {foundItems && foundItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <p className="text-muted-foreground">Nenhum item encontrado registrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
