import { Header } from "@/components/header";
import { AuthNav } from "@/components/auth-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen">
      <Header>
        <AuthNav />
      </Header>
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>
                Seus dados de login e identificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={profile?.nome || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input value={profile?.telefone || 'Não informado'} disabled />
              </div>
              <Button variant="outline" className="w-full">
                Editar Informações
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações por Email</CardTitle>
              <CardDescription>
                Configure quando deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novos itens encontrados</p>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas quando um item similar ao seu for encontrado
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mensagens de contato</p>
                  <p className="text-sm text-muted-foreground">
                    Quando alguém entrar em contato sobre seus itens
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessão</CardTitle>
              <CardDescription>
                Gerenciar sua sessão atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LogoutButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
