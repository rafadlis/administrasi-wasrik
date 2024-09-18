import { createClient } from "./supabase/client";

export async function uploadDokumen(
  nomor_dok: string,
  progres_id: number,
  file: File
) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
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
    data: data,
  };
}
