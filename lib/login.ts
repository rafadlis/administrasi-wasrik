"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse({
    email: values.email,
    password: values.password,
  });
  if (!validatedFields.success) {
    return {
      header: "Input Salah",
      message: "tolong perhatikan inputan anda",
      type: "error",
    };
  }
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });
  if (error) {
    console.log(error);
    return { head: "Gagal Login", message: error.message, type: "error" };
  }
  revalidatePath("/");
  redirect("/");
}
