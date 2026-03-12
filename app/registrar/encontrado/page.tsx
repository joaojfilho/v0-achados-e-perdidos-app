import { Header } from "@/components/header";
import { FoundItemForm } from "@/components/found-item-form";
import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";

export default async function RegistrarEncontradoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('nome');

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Registrar Item Encontrado</h1>
          <p className="text-muted-foreground">
            Você encontrou algo? Registre aqui para ajudar o dono a recuperá-lo.
          </p>
        </div>
        <FoundItemForm categories={categories || []} userId={user.id} />
      </div>
    </div>
  );
}
