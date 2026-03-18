import { Header } from "@/components/header";
import { AuthNav } from "@/components/auth-nav";
import { ItemCard } from "@/components/item-card";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { createClient } from "@/lib/supabase/server";

export default async function PerdidosPage() {
  const supabase = await createClient();
  
  // Fetch all lost items
  const { data: lostItems } = await supabase
    .from('lost_items')
    .select(`
      *,
      categories:categoria_id (nome)
    `)
    .eq('status', 'perdido')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen">
      <Header>
        <AuthNav />
      </Header>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Itens Perdidos</h1>
          <p className="text-muted-foreground">
            Navegue pelos itens perdidos e ajude alguém a encontrar o que procura
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar itens perdidos..." 
              className="pl-10"
            />
          </div>
        </div>

        {lostItems && lostItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <p className="text-muted-foreground">Nenhum item perdido registrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
