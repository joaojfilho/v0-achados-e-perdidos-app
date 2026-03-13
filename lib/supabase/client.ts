import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log("[v0] Creating browser client with URL:", url ? "URL exists" : "URL is missing");
  console.log("[v0] Anon key:", key ? "Key exists" : "Key is missing");
  
  if (!url || !key) {
    console.error("[v0] Missing Supabase credentials - URL:", !!url, "Key:", !!key);
  }
  
  return createBrowserClient(url!, key!);
}
