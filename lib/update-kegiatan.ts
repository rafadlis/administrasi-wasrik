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
  const startNumber = await db.progresPemeriksaan.findFirst({
    where: {
      id: id,
    },
    select: {
      nomor_surat: true,
      KategoriProgresPemeriksaan: {
        select: {
          awalan_nomor_surat: true,
        },
      },
    },
  });
  if (!startNumber) {
    console.log("startNumber tidak ada");
    return {
      header: "Gagal",
      message: "Hubungi admin untuk mengetahi penyebabnya",
      type: "error",
    };
  }
  let isNomorSuratHasValidStartNumber;
  if (data.nomor_surat) {
    isNomorSuratHasValidStartNumber = data.nomor_surat?.startsWith(
      startNumber.KategoriProgresPemeriksaan.awalan_nomor_surat
    );
    if (!isNomorSuratHasValidStartNumber) {
      return {
        header: "Awalan Nomor Surat Tidak Sesuai",
        message: `Untuk jenis surat ini, gunakan awalan ${startNumber.KategoriProgresPemeriksaan.awalan_nomor_surat}`,
        type: "warning",
      };
    }
  }
  try {
    if (data.nomor_surat) {
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
