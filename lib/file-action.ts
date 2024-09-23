import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/client";

export async function uploadDokumen(fileName: string, file: File) {
  if (file === undefined) {
    return {
      header: "Gagal",
      message: "Dokumen tidak boleh kosong",
      type: "error",
    };
  }

  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("Wasrik")
    .upload(`${fileName}.${file.name}`, file);
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
  revalidatePath("/", "layout");
  return {
    header: "Berhasil",
    message: "Dokumen berhasil dihapus",
    type: "success",
  };
}
