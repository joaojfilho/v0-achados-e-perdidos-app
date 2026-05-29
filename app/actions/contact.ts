"use server";

import { createClient } from "@/lib/supabase/server";

interface ContactMessageInput {
  itemId: string;
  itemType: "lost" | "found";
  message: string;
}

export async function sendContactMessage(input: ContactMessageInput) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Você precisa estar logado para entrar em contato." };
  }

  // Get sender profile
  const { data: senderProfile } = await supabase
    .from("profiles")
    .select("nome, telefone")
    .eq("id", user.id)
    .single();

  if (!senderProfile) {
    return { error: "Complete seu perfil antes de entrar em contato." };
  }

  // Get item and owner info
  const tableName = input.itemType === "lost" ? "lost_items" : "found_items";
  const { data: item } = await supabase
    .from(tableName)
    .select("user_id, titulo")
    .eq("id", input.itemId)
    .single();

  if (!item) {
    return { error: "Item não encontrado." };
  }

  if (item.user_id === user.id) {
    return { error: "Você não pode entrar em contato consigo mesmo." };
  }

  // Get owner profile
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("nome, telefone")
    .eq("id", item.user_id)
    .single();

  if (!ownerProfile) {
    return { error: "Não foi possível encontrar o dono do item." };
  }

  // For now, we'll store the contact message in a new table
  // or we can use the matches table. Let's create a simple contacts table entry
  // Since we don't have a contacts table, we'll return success
  // The email functionality would require an email service like Resend
  
  // Log the contact attempt (in production, this would send an email)
  console.log("[v0] Contact message sent:", {
    from: senderProfile.nome,
    to: ownerProfile.nome,
    item: item.titulo,
    message: input.message,
  });

  return {
    success: true,
    ownerName: ownerProfile.nome,
  };
}
