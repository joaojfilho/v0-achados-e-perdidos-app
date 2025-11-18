"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

interface Category {
  id: string;
  nome: string;
}

interface FoundItemFormProps {
  categories: Category[];
  userId: string;
}

export function FoundItemForm({ categories, userId }: FoundItemFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria_id: "",
    local_encontrado: "",
    data_encontrado: "",
    imagem_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const { error: insertError } = await supabase
        .from('found_items')
        .insert({
          ...formData,
          user_id: userId,
          status: 'disponivel',
        });

      if (insertError) throw insertError;

      router.push('/meus-itens');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título do item *</Label>
            <Input
              id="titulo"
              placeholder="Ex: Carteira marrom encontrada"
              required
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição detalhada *</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva o item encontrado com detalhes..."
              rows={4}
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select
              required
              value={formData.categoria_id}
              onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}
            >
              <SelectTrigger id="categoria">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="local">Local onde encontrou *</Label>
            <Input
              id="local"
              placeholder="Ex: Estação de metrô, Parque da cidade"
              required
              value={formData.local_encontrado}
              onChange={(e) => setFormData({ ...formData, local_encontrado: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Data em que encontrou *</Label>
            <Input
              id="data"
              type="date"
              required
              value={formData.data_encontrado}
              onChange={(e) => setFormData({ ...formData, data_encontrado: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagem">URL da imagem (opcional)</Label>
            <Input
              id="imagem"
              type="url"
              placeholder="https://..."
              value={formData.imagem_url}
              onChange={(e) => setFormData({ ...formData, imagem_url: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Cole o link de uma foto do item encontrado
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                "Registrar Item"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
