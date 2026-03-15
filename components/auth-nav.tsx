import { Button } from "@/components/ui/button";
import { Plus, User } from 'lucide-react';
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function AuthNav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return (
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
    );
  }

  return (
    <>
      <Button variant="outline" asChild>
        <Link href="/auth/login">Entrar</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/cadastro">Cadastrar</Link>
      </Button>
    </>
  );
}
