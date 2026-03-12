import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Mail } from 'lucide-react';
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { notFound } from 'next/navigation';

export default async function FoundItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: item } = await supabase
    .from('found_items')
    .select(`
      *,
      categories:categoria_id (nome),
      profiles:user_id (nome, telefone)
    `)
    .eq('id', id)
    .single();

  if (!item) {
    notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.id === item.user_id;

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-lg bg-muted">
            {item.imagem_url ? (
              <Image
                src={item.imagem_url || "/placeholder.svg"}
                alt={item.titulo}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-96 items-center justify-center">
                <span className="text-6xl text-muted-foreground">📦</span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold">{item.titulo}</h1>
                <Badge className="shrink-0">Encontrado</Badge>
              </div>
              <p className="text-muted-foreground">{item.descricao}</p>
            </div>

            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Local</p>
                    <p className="font-medium">{item.local_encontrado}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-medium">
                      {new Date(item.data_encontrado).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg">📁</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Categoria</p>
                    <p className="font-medium">{item.categories?.nome || 'Outros'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-4 font-semibold">Informações de Contato</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{item.profiles?.nome || 'Usuário'}</span>
                  </div>
                  {item.profiles?.telefone && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{item.profiles.telefone}</span>
                    </div>
                  )}
                </div>
                {!isOwner && (
                  <Button className="mt-4 w-full">Este é meu item!</Button>
                )}
              </CardContent>
            </Card>

            {isOwner && (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  Editar
                </Button>
                <Button variant="default" className="flex-1">
                  Marcar como Devolvido
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
