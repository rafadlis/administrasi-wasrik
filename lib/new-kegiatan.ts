"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { newKegiatanSchema } from "./new-kegiatan-schema";
import { z } from "zod";
import { DaftarKegiatanNoRelationType } from "./get-kegiatan";

export async function newKegiatan(data: z.infer<typeof newKegiatanSchema>) {
  const validatedFields = newKegiatanSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      header: "Gagal",
      message: "gagal menvalidasi data input",
      type: "error",
    };
  }
  const {
    NPWPD,
    nama_wp,
    masa_pajak_awal,
    masa_pajak_akhir,
    keterangan,
    jumlah_kenaikan,
    persentase_kenaikan,
    jenis_pajak_id,
    hasil_pemeriksaan_id,
    tim_id,
  } = validatedFields.data;

  // Mark: check if the WP and masa pajak is already exist
  const isWPAndMasaPajakExist = await db.kegiatanPemeriksaan.findFirst({
    where: {
      NPWPD,
      masa_pajak_awal,
      masa_pajak_akhir,
    },
  });

  if (isWPAndMasaPajakExist) {
    console.log("WP and masa pajak is already exist");
    return {
      header: "Anda yakin?",
      message: "Kegiatan dengan WP dan masa pajak tersebut sudah ada",
      type: "warning",
    };
  }

  await db.kegiatanPemeriksaan.create({
    data: {
      NPWPD,
      nama_wp,
      masa_pajak_awal,
      masa_pajak_akhir,
      keterangan,
      jumlah_kenaikan,
      persentase_kenaikan,
      jenis_pajak_id,
      kategori_hasil_pemeriksaan_id: hasil_pemeriksaan_id,
      tim_id,
      ProgresPemeriksaan: {
        create: [
          {
            kategori_progres_id: 1,
          },
          {
            kategori_progres_id: 2,
          },
          {
            kategori_progres_id: 3,
          },
          {
            kategori_progres_id: 4,
          },
          {
            kategori_progres_id: 5,
          },
        ],
      },
    },
  });

  revalidatePath("/");
  return {
    header: "Berhasil",
    message: "Kegiatan baru telah ditambahkan",
    type: "success",
  };
}

export async function deleteKegiatan(id: number) {
  // Delete related ProgresPemeriksaan records first
  const deletedProgres = await db.progresPemeriksaan.deleteMany({
    where: {
      kegiatan_pemeriksaan_id: id,
    },
  });

  // Then delete the KegiatanPemeriksaan record
  const deletedData = await db.kegiatanPemeriksaan.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  return {
    header: "Berhasil",
    message: "Kegiatan telah dihapus",
    type: "success",
    deletedData,
    deletedProgres,
  };
}

export async function undoDeleteKegiatan(
  data: DaftarKegiatanNoRelationType[0]
) {
  await db.kegiatanPemeriksaan.create({
    data: {
      ...data,
      ProgresPemeriksaan: {
        create: [
          {
            kategori_progres_id: 1,
          },
          {
            kategori_progres_id: 2,
          },
          {
            kategori_progres_id: 3,
          },
          {
            kategori_progres_id: 4,
          },
          {
            kategori_progres_id: 5,
          },
        ],
      },
    },
  });

  revalidatePath("/");
  return {
    header: "Berhasil",
    message: "Kegiatan telah dikembalikan",
    type: "success",
  };
}

export async function createProgresPemeriksaan(data: {
  kegiatan_pemeriksaan_id: number;
  kategori_progres_id: number;
}) {
  try {
    await db.progresPemeriksaan.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    return {
      header: "Gagal",
      message: "Gagal menambahkan progres, " + error,
      type: "error",
    };
  }
  revalidatePath("/");
  return {
    header: "Berhasil",
    message: "Progres telah ditambahkan",
    type: "success",
  };
}

export async function deleteProgresPemeriksaan(id: number) {
  try {
    await db.progresPemeriksaan.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      header: "Gagal",
      message: "Gagal menghapus progres, " + error,
      type: "error",
    };
  }
  revalidatePath("/");
  return {
    header: "Berhasil",
    message: "Progres telah dihapus",
    type: "success",
  };
}
