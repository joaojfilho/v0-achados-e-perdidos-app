import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

interface ItemCardProps {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  local: string;
  data: string;
  imagemUrl?: string;
  tipo: "perdido" | "encontrado";
}

export function ItemCard({ 
  id, 
  titulo, 
  descricao, 
  categoria, 
  local, 
  data, 
  imagemUrl, 
  tipo 
}: ItemCardProps) {
  return (
    <Link href={`/${tipo === "perdido" ? "perdidos" : "encontrados"}/${id}`}>
      <Card className="group overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
        {imagemUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={imagemUrl || "/placeholder.svg"}
              alt={titulo}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        {!imagemUrl && (
          <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <span className="text-5xl opacity-50">📦</span>
          </div>
        )}
        <CardContent className="p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-lg font-bold group-hover:text-primary">{titulo}</h3>
            <Badge 
              variant={tipo === "perdido" ? "destructive" : "default"}
              className="shrink-0"
            >
              {tipo === "perdido" ? "Perdido" : "Encontrado"}
            </Badge>
          </div>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{descricao}</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="line-clamp-1">{local}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-primary/70" />
              <span>{new Date(data).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/30 p-4">
          <span className="text-sm font-semibold text-primary">{categoria}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
