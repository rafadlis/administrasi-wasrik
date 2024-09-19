import { createClient } from "./supabase/client";

export async function uploadDokumen(
  fileName: string,
  progres_id: number,
  file: File
) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("Wasrik")
    .upload(`${fileName}.${file.name.split(".")[1]}`, file);
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

export async function deleteDokumen(fileName: string) {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("Wasrik")
    .remove([fileName.split("/")[1]]);
  if (error) {
    return {
      header: "Gagal",
      message: `Dokumen gagal dihapus, error: ${error.message}`,
      type: "error",
    };
  }
  return {
    header: "Berhasil",
    message: "Dokumen berhasil dihapus",
    type: "success",
  };
}
