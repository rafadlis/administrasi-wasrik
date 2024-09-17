import { createClient } from "./supabase/client";

export async function uploadDokumen(nomor_dok: string, file: File) {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("Wasrik")
    .upload(`${nomor_dok}-${file.name}`, file);
  if (error) {
    return {
      header: "Gagal",
      message: `Dokumen gagal diupload, error: ${error.message}`,
      type: "error",
    };
  }
  return {
    header: "Berhasil",
    message: "Dokumen berhasil diupload",
    type: "success",
  };
}
