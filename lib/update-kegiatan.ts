"use server";

import { db } from "@/lib/db";
import { KegiatanPemeriksaan, ProgresPemeriksaan } from "@prisma/client";
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

export async function updateProgresPemeriksaan(
  id: number,
  data: Partial<ProgresPemeriksaan>
) {
  try {
    const existingNomorSurat = await db.progresPemeriksaan.findUnique({
      where: { nomor_surat: data.nomor_surat || "" },
      select: {
        nomor_surat: true,
      },
    });
    if (existingNomorSurat) {
      return {
        header: "Nomor surat sudah ada",
        message: "Gunakan nomor surat yang lain",
        type: "warning",
      };
    }
    const updatedData = await db.progresPemeriksaan.update({
      where: { id },
      data: {
        ...data,
      },
    });

    revalidatePath("/");
    return {
      header: "Berhasil",
      message: "Progres berhasil diupdate",
      type: "success",
      updatedData,
    };
  } catch (error) {
    return {
      header: "Gagal",
      message: "Progres gagal diupdate",
      type: "error",
    };
  }
}
