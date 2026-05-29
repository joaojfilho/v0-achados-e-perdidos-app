"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";

interface ContactButtonProps {
  itemId: string;
  itemType: "lost" | "found";
  itemTitle: string;
  ownerName: string;
  className?: string;
}

export function ContactButton({
  itemId,
  itemType,
  itemTitle,
  ownerName,
  className,
}: ContactButtonProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("[v0] ContactButton rendered, open state:", open);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await sendContactMessage({
        itemId,
        itemType,
        message,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setMessage("");
      }
    } catch {
      setError("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = itemType === "lost" ? "Entrar em Contato" : "Este é meu item!";

  if (success) {
    return (
      <div className={`rounded-lg bg-green-50 p-4 text-center ${className}`}>
        <p className="font-medium text-green-800">
          As suas informações foram enviadas para o dono do item{" "}
          {itemType === "lost" ? "perdido" : "encontrado"}.
        </p>
        <p className="mt-1 text-sm text-green-600">
          Aguarde o contato de {ownerName}.
        </p>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {itemType === "lost"
              ? "Entrar em contato sobre item perdido"
              : "Reivindicar item encontrado"}
          </DialogTitle>
          <DialogDescription>
            Envie uma mensagem para {ownerName} sobre &quot;{itemTitle}&quot;.
            Suas informações de contato serão compartilhadas automaticamente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder={
                itemType === "lost"
                  ? "Olá! Vi que você perdeu este item. Acredito que posso ajudar..."
                  : "Olá! Acredito que este item é meu. Posso descrever algumas características..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !message.trim()}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
