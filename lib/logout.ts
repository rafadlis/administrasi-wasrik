"use server";

import { createClient } from "@/lib/supabase/server";

export async function Logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
