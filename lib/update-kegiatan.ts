"use server";

import { db } from "@/lib/db";
import { KegiatanPemeriksaan } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateKegiatanPemeriksaan(
  id: number,
  data: Partial<KegiatanPemeriksaan>
) {
  try {
    const updatedData = await db.kegiatanPemeriksaan.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath("/");
    return {
      header: "Berhasil",
      message: "Kegiatan berhasil diupdate",
      type: "success",
      updatedData,
    };
  } catch (error) {
    return {
      header: "Gagal",
      message: "Kegiatan gagal diupdate",
      type: "error",
    };
  }
}
