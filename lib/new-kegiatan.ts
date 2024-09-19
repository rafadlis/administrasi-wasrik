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
    tgl_pemeriksaan_mulai,
    tgl_pemeriksaan_selesai,
    NPWPD,
    nama_wp,
    masa_pajak_awal,
    masa_pajak_akhir,
    keterangan,
    jumlah_kenaikan,
    persentase_kenaikan,
    jenis_pajak_id,
    jenis_pemeriksaan_id,
    hasil_pemeriksaan_id,
    tim_id,
  } = validatedFields.data;
  await db.kegiatanPemeriksaan.create({
    data: {
      tgl_pemeriksaan_mulai,
      tgl_pemeriksaan_selesai,
      NPWPD,
      nama_wp,
      masa_pajak_awal,
      masa_pajak_akhir,
      keterangan,
      jumlah_kenaikan,
      persentase_kenaikan,
      jenis_pajak_id,
      jenis_pemeriksaan_id,
      hasil_pemeriksaan_id,
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
